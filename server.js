const express = require("express");
const { Client } = require("pg"); 
const PORT = 3005;
const app = express();
app.use(express.json());

const client = new Client({
  host: 'localhost',           
  user: 'postgres',            
  password: 'saba@123',        
  database: 'postgres',       
  port: 5432,                  
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Connection error', err.stack));

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "hello World" });
});

app.get("/items", async (req, res) => {
  const items = await client.query(
    'SELECT * FROM student'
  );
  res.status(200).json(items.rows);
});

app.post("/items", async (req, res) => {
  const newItem = req.body;
  const createdItem = await client.query(
    `INSERT INTO student(name, id, email) VALUES('${newItem.name}', ${newItem.id}, '${newItem.email}') RETURNING *`
  );
  res.status(201).json(createdItem.rows[0]);
});

app.put("/items/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const updatedItemData = await client.query(
    `UPDATE student SET name ='${updatedItem.name}', email = '${updatedItem.email}' WHERE id =${updatedItem.id} RETURNING *`
  );
  res.status(200).json(updatedItemData.rows[0]);
});

app.delete("/items/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const deletedItem = await client.query(
    `DELETE FROM student WHERE id = ${id} RETURNING *`);
  res.status(200).json(deletedItem.rows[0]);
});

app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});
