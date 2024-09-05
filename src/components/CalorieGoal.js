import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CalorieGoal.css';  // Custom styles

function CalorieGoal({ totalCaloriesToday }) {
    const [calorieGoal, setCalorieGoal] = useState(1000);
    const [showInput, setShowInput] = useState(false);
    const percentage = (totalCaloriesToday / calorieGoal) * 100;

    const handleCalorieGoalChange = (e) => {
        setCalorieGoal(e.target.value);
    };

    const toggleInput = () => {
        setShowInput(!showInput);
    };

    return (
        <div className="calorie-widget">
            <h3>Daily Calorie Goal</h3>
            <button onClick={toggleInput}>
                {showInput ? 'Save Goal' : 'Set Calorie Goal'}
            </button>

            {showInput && (
                <input
                    type="number"
                    value={calorieGoal}
                    onChange={handleCalorieGoalChange}
                    className="goal-input"
                    placeholder="Enter daily calorie goal"
                />
            )}

            <div className="progress-bar">
                <CircularProgressbar
                    value={percentage}
                    text={`${Math.round(percentage)}%`}
                    styles={buildStyles({
                        pathColor: percentage > 100 ? 'red' : 'green',
                        textColor: percentage > 100 ? 'red' : 'green',
                        trailColor: '#d6d6d6',
                    })}
                />
            </div>

            <p>{totalCaloriesToday} / {calorieGoal} calories consumed</p>
        </div>
    );
}

export default CalorieGoal;
