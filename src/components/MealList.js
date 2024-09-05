import React from 'react';
import './MealList.css'; // Import the styles

function MealList({ meals }) {
    return (
        <div className="meal-list-container">
            <h3 className="meal-list-title">Logged Meals:</h3>
            <ul>
                {meals.map(meal => (
                    <li key={meal._id} className="meal-item">
                        <div>
                            <strong>{meal.mealName}</strong> - {meal.calories} calories
                        </div>
                        <div className="meal-date">
                            {new Date(meal.date).toLocaleDateString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MealList;
