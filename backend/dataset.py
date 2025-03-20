import pandas as pd

# Sample data for food recommendations
data = {
    "goal": ["weight_loss", "gain_weight", "maintain", "weight_loss", "gain_weight", "maintain"],
    "target_calories": [1500, 2500, 2000, 1500, 2500, 2000],
    "food": ["Oatmeal", "Chicken Sandwich", "Grilled Fish", "Fruit Salad", "Pasta", "Brown Rice"],
    "calories": [300, 600, 500, 250, 700, 400],
    "protein": [10, 35, 40, 5, 30, 20],
    "fat": [5, 20, 15, 2, 25, 10],
    "carbs": [45, 60, 50, 55, 80, 50],
    "meal_type": ["breakfast", "lunch", "dinner", "breakfast", "lunch", "dinner"]
}

# Create a DataFrame
df = pd.DataFrame(data)

# Save to CSV
csv_path = "food_dataset.csv"
df.to_csv(csv_path, index=False)

print(f"✅ CSV created successfully at {csv_path}")
