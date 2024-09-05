import React, { useState, useEffect } from 'react';
import './App.css';
import AddMeal from './components/AddMeal';
import MealList from './components/MealList';
import CalorieGoal from './components/CalorieGoal';
import axios from 'axios';

function App() {
  const [showForm, setShowForm] = useState(false); // For AddMeal form
  const [meals, setMeals] = useState([]);          // For storing meal data
  const [showMeals, setShowMeals] = useState(false); // For showing/hiding meal list
  const [totalCaloriesToday, setTotalCaloriesToday] = useState(0); // For calorie goal widget

  // Fetch today's meals and calculate total calories
  const fetchTodayMeals = () => {
    axios.get('http://localhost:5000/api/meals')
      .then(response => {
        const today = new Date().toLocaleDateString();
        const todayMeals = response.data.filter(meal =>
          new Date(meal.date).toLocaleDateString() === today
        );

        setMeals(response.data); // Set the meal data
        setTotalCaloriesToday(
          todayMeals.reduce((acc, meal) => acc + Number(meal.calories), 0)
        );
      })
      .catch(error => {
        console.error('Error fetching meals', error);
      });
  };

  // Fetch today's meals and total calories when the app first loads
  useEffect(() => {
    fetchTodayMeals();  // Fetch meals when the component mounts
  }, []);

  // Toggle form visibility
  const handleAddMealClick = () => {
    setShowForm(!showForm);
  };

  // Toggle meal list visibility when "Everyday Tracking" is clicked
  const handleTrackingClick = () => {
    setShowMeals(!showMeals);
  };

  return (
    <div className="App">
      <h1>Diet Tracker</h1>

      {/* Button to toggle AddMeal form */}
      <button onClick={handleAddMealClick}>
        {showForm ? 'Close Meal Form' : 'Add a meal'}
      </button>

      {/* Button to toggle Everyday Tracking */}
      <button onClick={handleTrackingClick}>
        {showMeals ? 'Hide Everyday Tracking' : 'Everyday Tracking'}
      </button>

      {/* Conditionally render AddMeal form */}
      {showForm && <AddMeal setShowForm={setShowForm} fetchTodayMeals={fetchTodayMeals} />}  {/* Pass fetchTodayMeals */}

      {/* Conditionally render MealList if showMeals is true */}
      {showMeals && <MealList meals={meals} />}

      {/* Render CalorieGoal widget */}
      <CalorieGoal totalCaloriesToday={totalCaloriesToday} />
    </div>
  );
}

export default App;
