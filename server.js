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

async function getItems() {
  const result = await client.query('SELECT * FROM student');
  return result.rows;
}

async function addItem(newItem) {
  const result = await client.query(
    'INSERT INTO student(name, id, email) VALUES($1, $2, $3) RETURNING *',
    [newItem.name, newItem.id, newItem.email]
  );
  return result.rows[0];
}

async function updateItem(id, updatedItem) {
  const result = await client.query(
    'UPDATE student SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [updatedItem.name,updatedItem.email, updatedItem.id ]
  );
  return result.rows[0];
}

async function deleteItem(id) {
  const result = await client.query(
    'DELETE FROM student WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "hello World" });
});

app.get("/items", async (req, res) => {
  const items = await getItems();
  res.status(200).json(items);
});

app.post("/items", async (req, res) => {
  const newItem = req.body;
  const createdItem = await addItem(newItem);
  res.status(201).json(createdItem);
});

app.put("/items/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const updatedItemData = await updateItem(id, updatedItem);
  res.status(200).json(updatedItemData);
});

app.delete("/items/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const deletedItem = await deleteItem(id);
  res.status(200).json(deletedItem);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
