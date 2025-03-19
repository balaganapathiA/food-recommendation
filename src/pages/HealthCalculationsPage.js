import React, { useState } from "react";

const HealthCalculationsPage = () => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    waistSize: "",
    age: "",
    gender: "male",
    activityLevel: "sedentary",
  });

  const [results, setResults] = useState(null);
  const [goal, setGoal] = useState("maintain"); // ✅ Allow goal modification

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateHealthMetrics = () => {
    const { height, weight, waistSize, age, gender, activityLevel } = formData;

    if (!height || !weight || !waistSize || !age || height <= 0 || weight <= 0 || waistSize <= 0 || age <= 0) {
      alert("Please enter valid positive values.");
      return;
    }

    const heightInMeters = Number(height) / 100;
    const bmi = (Number(weight) / (heightInMeters ** 2)).toFixed(2);
    const waistToHeightRatio = (Number(waistSize) / Number(height)).toFixed(2);

    // Estimate Body Fat Percentage
    const bodyFatPercentage = gender === "male"
      ? (1.2 * bmi + 0.23 * age - 16.2).toFixed(2)
      : (1.2 * bmi + 0.23 * age - 5.4).toFixed(2);

    // Calculate Calorie Needs (BMR + Activity Factor)
    const bmr = gender === "male"
      ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age
      : 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;

    const activityFactors = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extra_active: 1.9,
    };

    const calorieNeeds = (bmr * activityFactors[activityLevel]).toFixed(2);

    // ✅ Suggest goal based on BMI, but allow user to change it
    let suggestedGoal = "maintain";
    if (bmi < 18.5) suggestedGoal = "gain";
    else if (bmi > 25) suggestedGoal = "lose";

    setGoal(suggestedGoal); // ✅ Set suggested goal but let user modify it
    setResults({ bmi, waistToHeightRatio, bodyFatPercentage, calorieNeeds });
  };

  return (
    <div className="form-container">
      <h1>Health Calculations</h1>

      <label>Height (cm)</label>
      <input type="number" name="height" value={formData.height} onChange={handleChange} />

      <label>Weight (kg)</label>
      <input type="number" name="weight" value={formData.weight} onChange={handleChange} />

      <label>Waist Size (cm)</label>
      <input type="number" name="waistSize" value={formData.waistSize} onChange={handleChange} />

      <label>Age</label>
      <input type="number" name="age" value={formData.age} onChange={handleChange} />

      <label>Gender</label>
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label>Activity Level</label>
      <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
        <option value="sedentary">Sedentary</option>
        <option value="lightly_active">Lightly Active</option>
        <option value="moderately_active">Moderately Active</option>
        <option value="very_active">Very Active</option>
        <option value="extra_active">Extra Active</option>
      </select>

      <button onClick={calculateHealthMetrics}>Calculate</button>

      {results && (
        <div className="results">
          <h2>Results</h2>
          <p><strong>BMI:</strong> {results.bmi}</p>
          <p><strong>Waist-to-Height Ratio:</strong> {results.waistToHeightRatio}</p>
          <p><strong>Body Fat Percentage:</strong> {results.bodyFatPercentage}%</p>
          <p><strong>Daily Calorie Needs:</strong> {results.calorieNeeds} kcal/day</p>

          <h2>Modify Goal</h2>
          <select value={goal} onChange={(e) => setGoal(e.target.value)}> {/* ✅ User can modify goal */}
            <option value="maintain">Maintain</option>
            <option value="gain">Gain</option>
            <option value="lose">Lose</option>
          </select>

          <h2>Recommended Food</h2>
          <p>Click below to get food recommendations based on your health results:</p>
          <button onClick={() => {
            localStorage.setItem("goal", goal); // ✅ Store selected goal
            window.location.href = "/food-recommendations";
          }}>
            Get Food Recommendations
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthCalculationsPage;
