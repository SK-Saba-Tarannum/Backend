require('dotenv').config();
const { Client } = require('pg');

const cors = require('cors');  
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PORT = 3014;
const session = require('express-session'); 
const JWT_SECRET = process.env.JWT_SECRET;


const app = express();
app.use(cors());
app.use(session({
    secret: JWT_SECRET,  
    resave: false,             
    saveUninitialized: true,   
    cookie: { secure: false }  
}));

app.use(express.json());

// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: 'saba@123',
//     port: 5432
// });
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

const registration = `
    CREATE TABLE IF NOT EXISTS register (
    id SERIAL PRIMARY KEY,
    Role VARCHAR(100) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
    );
`;

const logindetails = `
    CREATE TABLE IF NOT EXISTS login (
    id SERIAL PRIMARY KEY,
    Role VARCHAR(100) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
    );
`;

const createtable = `
    CREATE TABLE IF NOT EXISTS booksdetails (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Title VARCHAR(100) NOT NULL,
    Genra VARCHAR(100) NOT NULL,
    Author VARCHAR(100) NOT NULL,
    Publisheddate VARCHAR(100) NOT NULL,
    Quantity INTEGER NOT NULL,
    Price INTEGER
    );
`;

const customerdetails = `
    CREATE TABLE IF NOT EXISTS customer (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Bookname VARCHAR(100) NOT NULL,
    Genra VARCHAR(100) NOT NULL,
    Author VARCHAR(100) NOT NULL,
    Quantity INTEGER NOT NULL,
    Price INTEGER,
    Renteddate VARCHAR(100) NOT NULL,
    Returningdate VARCHAR(100) NOT NULL
    );
`;

client.query(registration)
    .then(() => { console.log("Registration Table Created") })
    .catch(err => console.log('Error creating register table', err));

client.query(logindetails)
    .then(() => { console.log("Login Table Created") })
    .catch(err => console.log('Error creating login table', err));

client.query(createtable)
    .then(() => { console.log("Books Table Created") })
    .catch(err => console.log('Error creating books table', err));

client.query(customerdetails)
    .then(() => { console.log("Customer Table Created",customerdetails) })
    .catch(err => console.log('Error creating customer table', err));


const authenticateToken = (req, res, next) => {
    const token = req.session.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
        }
        next();
    };
};

app.post('/register', async (req, res) => {
    const { name, email, role, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await client.query(
            `INSERT INTO register (Name, Email, Role, password) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, role, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to insert data', message: error.message });
    }
});


app.post('/login', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await client.query(
      `SELECT * FROM register WHERE Name=$1 AND Email=$2`,
      [name, email]
    );
    console.log(result.rows[0])
    if (result.rows.length > 0) {
      const user = result.rows[0];
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", passwordMatch);

      const token = jwt.sign(
        { id: user.id,name:user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.status(200).json({ result: user, token });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in', message: error.message });
  }
});


app.post('/addbooks', authenticateToken, authorizeRole('admin'), async (req, res) => {
    const { name, title, author, genre, publisheddate, qnt, price } = req.body;
    try {
        const result = await client.query(
            `INSERT INTO booksdetails (Name, Title, Genra, Author, Publisheddate, Quantity, Price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, title, genre, author, publisheddate, qnt, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to insert data', message: error.message });
    }
});

app.get('/allbooks', async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const totalCountResult = await client.query("SELECT COUNT(*) FROM booksdetails");
    const totalItems = parseInt(totalCountResult.rows[0].count);

    const result = await client.query(
      "SELECT * FROM booksdetails ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      data: result.rows,
      totalItems,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books', message: error.message });
  }
});

app.delete('/deletebook/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await client.query(
            `DELETE FROM booksdetails WHERE id = $1 RETURNING *`,
            [id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete data', message: error.message });
    }
});


app.put("/updatebooks/:id", authenticateToken, authorizeRole('admin'), async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, title, author, genre, qnt, price, publisheddate } = req.body;
    try {
        const result = await client.query(
            `UPDATE booksdetails SET Name=$1, Title=$2, Genra=$3, Author=$4, Publisheddate=$5, Quantity=$6, Price=$7 WHERE id=$8 RETURNING *`,
            [name, title, genre, author, publisheddate, qnt, price, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update data', message: error.message });
    }
});

app.post('/newcustomer', async (req, res) => {
    const { name, bookname, author, genre, qnt, price, renteddate, returningdate } = req.body;
    try {
        const result = await client.query(
            `INSERT INTO customer (Name, Bookname, Genra, Author, Quantity, Price, Renteddate, Returningdate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name, bookname, genre, author, qnt, price, renteddate, returningdate]
        );
        console.log(result.rows)
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting customer data:', error);  // Log the error for debugging
        res.status(500).json({ error: 'Failed to insert data', message: error.message });
    }
});



app.get('/allcustomer', async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM customer");
        res.status(200).json(result.rows);
        console.log(result.rows)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data', message: error.message });
    }
});   

app.get('/singlecustomer/:name', async (req, res) => {
    const name = req.params.name;

    try {
        const result = await client.query(`
            SELECT * FROM "customer" WHERE Name = $1
        `, [name]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Customer not found or no books rented' });
        }

        console.log(result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data', message: error.message });
    }
});

app.delete('/deletecustomer/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await client.query(
            'DELETE FROM customer WHERE id = $1 RETURNING *', 
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(result.rows[0]); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete customer', message: error.message });
    }
});


app.put("/updatecustomer/:id",async(req,res)=>{
    const id=parseInt(req.params.id)
    console.log("hi update")
    const { name,bookname,author,genre, qnt, price, renteddate,returningdate } = req.body;
    try{
        const result = await client.query(
        `UPDATE customer
        SET Name=$1, Bookname=$2, Genra=$3, Author=$4, Quantity=$5,Price=$6,Renteddate=$7,Returningdate=$8
        WHERE id=$9
        RETURNING *`,
        [name, bookname, genre, author, qnt, price,renteddate,returningdate,id]
        );

    console.log("hi inside query update")
    res.status(201).json(result.rows[0])
    }catch(err){
        res.status(404).json({err:"error"})
    }
}) 

app.get('/rentaldetails', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const result = await client.query(`
      SELECT * FROM (
          SELECT 
              b.Title,
              b.Quantity,
              COUNT(c.Bookname) AS rentedbooks,
              STRING_AGG(c.Name, ', ') AS rented_to,
              (b.Quantity - COUNT(c.Bookname)) AS remaining_books
          FROM 
              booksdetails b
          LEFT JOIN 
              customer c ON b.name = c.bookname
          GROUP BY 
              b.Title, b.Quantity
      ) AS rental_summary
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    const countResult = await client.query(`
      SELECT COUNT(*) FROM (
          SELECT b.Title
          FROM booksdetails b
          LEFT JOIN customer c ON b.name = c.bookname
          GROUP BY b.Title, b.Quantity
      ) AS count_table
    `);

    const total = parseInt(countResult.rows[0].count);

    res.status(200).json({
      data: result.rows,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (error) {
    console.error("Error fetching rental details:", error);
    res.status(500).json({ error: "Failed to fetch rental details" });
  }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


