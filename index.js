const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const collection = require("./DataSchema");
const ListR = require('./ListR'); // Ensure the path is correct

const app = express();
const cors = require('cors');

app.use(cors());
const port = 4000;


app.use(bodyParser.json());
mongoose.set("strictQuery",true)

// Connect to MongoDB
mongoose.connect('mongodb+srv://premesh:12345@cluster0.tbhbjbt.mongodb.net/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/tasks', ListR); // Use /tasks  (http://localhost:4000/tasks/)

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello World");
  });
  
  app.post("/", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const check = await collection.findOne({ email: email, password: password });
  
      if (check) {
        res.json("exist");
      } else {
        res.json("not exist");
      }
    } catch (e) {
      console.error(e);
      res.json("not exist");
    }
  });
  
  app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
  
    const data = {
      email: email,
      password: password,
    };
  
    try {
      const check = await collection.findOne({ email: email });
  
      if (check) {
        res.json("exist");
      } else {
        await collection.insertMany([{ email: email, password: password }]);
        res.json("not exist");
      }
    } catch (e) {
      console.error(e);
      res.json("not exist");
    }
  });