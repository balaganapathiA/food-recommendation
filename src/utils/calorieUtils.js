function calculateCalorieGoal(user) {
    let BMR;
    
    if (user.gender === "male") {
      BMR = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
    } else {
      BMR = 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
    }
  
    const activityMultiplier = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
    };
  
    let dailyCalories = BMR * activityMultiplier[user.activityLevel];
  
    if (user.goal === "lose") {
      dailyCalories -= 500; // Reduce 500 kcal for weight loss
    } else if (user.goal === "gain") {
      dailyCalories += 500; // Add 500 kcal for weight gain
    }
  
    return Math.round(dailyCalories);
  }
  
  module.exports = calculateCalorieGoal;
  