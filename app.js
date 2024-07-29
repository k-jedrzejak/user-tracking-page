import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { connect } from 'mongoose';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT || 3000
const URI = process.env.MONGODB_URI;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

try {
  connect(URI);
  console.log("MongoDB connection successful.", URI);
} catch (err) {
  console.error("Failed to connect to MongoDB:", err);
}

app.get('/', (req, res) => {
  res.render("index");
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
