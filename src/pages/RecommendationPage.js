import React, { useState } from 'react';

const RecommendationPage = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [goal, setGoal] = useState('');
  const [recommendedFood, setRecommendedFood] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      activity_level: Number(activityLevel),
      goal: goal
    };
  
    try {
      const response = await fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch recommendation');
      }
  
      const result = await response.json();
      if (result.error) {
        setRecommendedFood(`Error: ${result.error}`);
      } else {
        setRecommendedFood(`
          Breakfast: ${result.breakfast} 
          Lunch: ${result.lunch} 
          Dinner: ${result.dinner}
        `);
      }
    } catch (error) {
      console.error('Error:', error);
      setRecommendedFood('Error fetching recommendation');
    }
  };
  

  return (
    <div>
      <h1>Food Recommendation</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <br />
        <label>
          Weight (kg):
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <br />
        <label>
          Height (cm):
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        <br />
        <label>
          Activity Level (1-5):
          <input type="number" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} />
        </label>
        <br />
        <label>
          Goal:
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="weight_loss">Weight Loss</option>
            <option value="gain_weight">Gain Weight</option>
            <option value="maintain">Maintain</option>
          </select>
        </label>
        <br />
        <button type="submit">Get Recommendation</button>
      </form>
      {recommendedFood && (
  <div>
    <h3>Recommended Food:</h3>
    {recommendedFood.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ))}
  </div>
)}
    </div>
  );
};

export default RecommendationPage;
