const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());  // Enable CORS for cross-origin requests
app.use(express.json());  // Parse incoming requests with JSON payloads

// MongoDB connection (Replace with your own connection string)
mongoose.connect('mongodb+srv://sekharpulaparthi256:sSKtPMwMKIRmDzVJ@cluster0.ewj6t.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Create a Schema and Model for meals
const mealSchema = new mongoose.Schema({
    mealName: String,
    calories: String,
    date: { type: Date, default: Date.now }
});

const Meal = mongoose.model('Meal', mealSchema);

// API route to save meal data
app.post('/api/meals', async (req, res) => {
    const { mealName, calories, date } = req.body;

    const newMeal = new Meal({
        mealName,
        calories,
        date
    });

    try {
        await newMeal.save();
        res.status(201).json({ message: 'Meal logged successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save meal' });
    }
});

// API route to get all meals
app.get('/api/meals', async (req, res) => {
    try {
        const meals = await Meal.find(); // Fetch all meals from the database
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch meals' });
    }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
