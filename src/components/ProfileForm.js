import React, { useState, useEffect } from "react";

const ProfileForm = ({ userId, onProfileUpdate }) => {
  // ✅ Initialize state with default empty values
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("sedentary");

  useEffect(() => {
    if (!userId) return;

    // ✅ Fetch user data and populate form fields
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setWeight(data.weight || "");
          setHeight(data.height || "");
          setAge(data.age || "");
          setGender(data.gender || "male");
          setActivityLevel(data.activityLevel || "sedentary");
        }
      })
      .catch(err => console.error("❌ Error fetching user profile:", err));
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("🔍 Sending Profile Update:", { userId, weight, height, age, gender, activityLevel });
  
      const response = await fetch("http://localhost:5000/api/users/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, weight, height, age, gender, activityLevel }),
      });
  
      const data = await response.json();
      console.log("✅ Profile Updated:", data);
  
      if (data.calorieGoal) {
        onProfileUpdate(data.calorieGoal); // ✅ Reset remaining calories to new goal
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    }
  };
  

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Weight (kg):</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />

        <label>Height (cm):</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />

        <label>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />

        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Activity Level:</label>
        <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
          <option value="sedentary">Sedentary</option>
          <option value="light">Lightly Active</option>
          <option value="moderate">Moderately Active</option>
          <option value="active">Very Active</option>
        </select>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
