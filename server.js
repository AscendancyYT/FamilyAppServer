const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.json()); // Parses incoming requests with JSON payloads
app.use(cors()); 

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://MindlessCoder:1234aziz4321@familycluster.pbyv9.mongodb.net/?retryWrites=true&w=majority&appName=FamilyCluster",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define simple models (for example purposes)
const Product = mongoose.model("Product", { name: String });
const Task = mongoose.model("Task", {
  description: String,
  assignedTo: String,
});
const DinnerPlan = mongoose.model("DinnerPlan", { plan: String });

// Products routes
app.post("/api/products", async (req, res) => {
  const product = new Product({ name: req.body.name });
  await product.save();
  res.status(201).json(product);
});

app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// Tasks routes
app.post("/api/tasks", async (req, res) => {
  const task = new Task({
    description: req.body.description,
    assignedTo: req.body.assignedTo,
  });
  await task.save();
  res.status(201).json(task);
});

app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

// Dinner route
app.post("/api/dinner", async (req, res) => {
  const dinnerPlan = new DinnerPlan({ plan: req.body.plan });
  await dinnerPlan.save();
  res.status(201).json(dinnerPlan);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
