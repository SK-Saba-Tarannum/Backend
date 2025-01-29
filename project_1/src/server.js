const { Client }=require('pg');
const cors = require('cors');  
const express=require( 'express' );
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const PORT=3013;
const session = require('express-session'); 
const JWT_SECRET="lalala123lalala123lalala123lalala123lalala123"


const app=express();
app.use(cors());
app.use(session({
    secret: JWT_SECRET,  
    resave: false,             
    saveUninitialized: true,   
    cookie: { secure: false }  
}));

app.use(express.json());
const client=new Client({
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password:'saba@123',
    port:5432
});
client.connect();


const registration=`
    CREATE TABLE IF NOT EXISTS register(
    id SERIAL PRIMARY KEY,
    Role VARCHAR(100) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100)  NOT NULL,
    CreatedAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createtable=`
    CREATE TABLE IF NOT EXISTS bookstore(
    id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(100)  NOT NULL,
    Role VARCHAR(100) NOT NULL,
    Title VARCHAR(100) NOT NULL,
    Quantity INTEGER NOT NULL,
    Price   INTEGER,
    CreatedAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Returndate VARCHAR(100) NOT NULL

);
`;
client.query(registration)
    .then(()=>{console.log(registration)})
    .catch(err=>console.log('error in creating table',err))

client.query(createtable)
    .then(()=>{console.log(createtable)})
    .catch(err=>console.log('error in creating table',err))


app.post('/register', async (req, res) => {
    const { name, email,role,password} = req.body;
    console.log('Received data:', { name, email });
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await client.query(
            `INSERT INTO register (Name, Email,Role,password) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email,role,hashedPassword]
        );
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to insert data', message: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { name, email, password, role, title, qnt, price, date } = req.body;
    console.log('Received data:', { name, email, password, role, title, qnt, price,date });

    if (!password || !date) {
        return res.status(400).json({ error: 'Password and return date are required' });
    }
    try {
        const result = await client.query(
            `SELECT * FROM register WHERE Name=$1 AND Email=$2`,
            [name, email]
        );
        console.log("Database query result:", result);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign({ email: user.email,role:user.role }, JWT_SECRET, { expiresIn: '24h' });
            req.session.token = token;
            const result2 = await client.query(
                `INSERT INTO bookstore (Name, Email, Password, Role, Title, Quantity, Price, Returndate)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                [name, email, password, role, title, qnt, price, date]
            );
            console.log("Bookstore entry created:", result2.rows[0]);
            return res.status(200).json({ result: result2.rows[0], token });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error in login route:', error.message);
        res.status(500).json({ error: 'Failed to log in', message: error.message });
    }
});

app.put("/update/:id",async(req,res)=>{
    const id=parseInt(req.params.id)
    console.log("hi update")
    const { name, email,role,password, title, qnt, price, returndate } = req.body;
    try{
        const result = await client.query(
        `UPDATE bookstore
        SET Name=$1, Email=$2, Role=$3, Title=$4, Quantity=$5, Price=$6, Returndate=$7 ,Password=$8
        WHERE id=$9
        RETURNING *`,
        [name, email, role, title, qnt, price, returndate,password,id]
        );

    console.log("hi inside query update")
    res.status(201).json(result.rows[0])
    }catch(err){
        res.status(404).json({err:"error"})
    }
})
app.delete('/delete/:id',async(req,res)=>{
    const id=parseInt(req.params.id)
    try{
        const result = await client.query(
                `DELETE FROM bookstore WHERE id=$1 RETURNING *`,
                [id]
        );
        res.status(200).json(result.rows[0])
    }catch(error){
        res.status(404).json({error:"iam delete error"})
    }
})

const authenticateToken = (req, res, next) => {
    const token = req.session.token || req.headers['authorization']?.split(' ')[1];  
    console.log(token)
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

app.get('/customer', authenticateToken, async (req, res) => {
  try {
    const email = req.user.email; 
    console.log(email)
    const result = await client.query('SELECT * FROM bookstore WHERE Email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

app.get('/admin',authenticateToken, authorizeRole('admin'),async(req,res)=>{
    try{
        const result=await client.query('select * from bookstore')
         
        res.status(200).json(result.rows)
    }catch(error){
        res.status(404).json({error:"i am error"})
    }
})

app.get('/books', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        const result = await client.query(`
            SELECT 
                books.title,books.number, 
                COUNT(bookstore.quantity) AS Rentedbooks,
                STRING_AGG(bookstore.name, ', ') AS rented_to, 
                books.number - COUNT(bookstore.quantity) AS remaining_books
            FROM 
                books 
            LEFT JOIN 
                bookstore ON books.title = bookstore.title
            GROUP BY 
                books.title, books.number;
        `);
        console.log(result.rows)
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "An error occurred while fetching the data" });
    }
});

app.listen(PORT,()=>{
    console.log("iam saba raa")
});




