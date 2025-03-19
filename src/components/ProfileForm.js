import React, { useState, useEffect } from "react";

const ProfileForm = ({ userId, onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "male",
    activityLevel: "sedentary",
  });

  // ✅ Fetch existing user profile when component loads
  useEffect(() => {
    if (!userId) return;
    
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.weight) {
          setFormData({
            weight: data.weight,
            height: data.height,
            age: data.age,
            gender: data.gender,
            activityLevel: data.activityLevel,
          });
        }
      })
      .catch(error => console.error("Error fetching user profile:", error));
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...formData }),
    });

    const data = await response.json();
    if (data.calorieGoal) {
      alert(`Your daily calorie goal has been updated to ${data.calorieGoal} kcal`);
      onProfileUpdate(data.calorieGoal); // ✅ Update the calorie goal on the dashboard
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="weight" value={formData.weight} placeholder="Weight (kg)" onChange={handleChange} required />
      <input type="number" name="height" value={formData.height} placeholder="Height (cm)" onChange={handleChange} required />
      <input type="number" name="age" value={formData.age} placeholder="Age" onChange={handleChange} required />
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
        <option value="sedentary">Sedentary (Little to no exercise)</option>
        <option value="light">Light (1-3 days exercise per week)</option>
        <option value="moderate">Moderate (3-5 days exercise per week)</option>
        <option value="active">Active (6-7 days exercise per week)</option>
      </select>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
