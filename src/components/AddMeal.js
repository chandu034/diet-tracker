import React, { useState } from 'react';
import axios from 'axios';
import './AddMeal.css';  // Importing the CSS file

function AddMeal({ setShowForm, fetchTodayMeals }) {
    const [mealName, setMealName] = useState('');
    const [calories, setCalories] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const mealData = {
            mealName,
            calories,
            date
        };

        try {
            // Send a POST request to the backend to save the meal
            await axios.post('http://localhost:5000/api/meals', mealData);
            alert('Meal logged successfully!');

            // Fetch updated meals and close the form
            fetchTodayMeals();  // Update the calorie goal after meal is added
            setShowForm(false);  // Close the form after successful submission
        } catch (error) {
            console.error('Error saving meal data:', error);
            alert('Error saving the meal. Please try again.');
        }
    };

    return (
        <div className="container">
            <h3 className="heading">Enter the details of your Meal/Food</h3>
            <form onSubmit={handleSubmit}>
                <p className="label">Enter the Name:</p>
                <input
                    type="text"
                    className="input"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    required
                />

                <p className="label">Enter amount of calories:</p>
                <input
                    type="text"
                    className="input"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    required
                />

                <p className="label">Enter the date:</p>
                <input
                    type="date"
                    className="input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <button type="submit" className="button">Submit</button>
            </form>
        </div>
    );
}

export default AddMeal;
