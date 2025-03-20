from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and label encoders
try:
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully!")
except (FileNotFoundError, EOFError):
    print("❗ Model not found or corrupted. Please train the model using model.py.")
    exit()

# Load dataset for food recommendations
df = pd.read_csv('food_dataset.csv')

# Ensure consistent data
df['goal'] = df['goal'].str.strip()
df['meal_type'] = df['meal_type'].str.strip()
print("Loaded Data:\n", df.head())
print("Unique Goals in Data:", df['goal'].unique())
print("Meal Types in Data:", df['meal_type'].unique())

@app.route('/')
def home():
    return "Welcome to the Food Recommendation API. Use the '/recommend' endpoint to get personalized food recommendations."

# Get food recommendations safely
def get_food_recommendations(df, meal_type):
    meal_df = df[df['meal_type'] == meal_type]
    if meal_df.empty:
        return f"No {meal_type} options available."
    return meal_df.sample(n=min(len(meal_df), 1))['food'].tolist()[0]

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.get_json()
        print("Received Data:", data)

        # Extract data safely
        age = int(data.get('age', 0))
        weight = int(data.get('weight', 0))
        height = int(data.get('height', 0))
        activity_level = int(data.get('activity_level', 0))
        goal = data.get('goal', '').strip()

        # Validate goal
        if goal not in ['weight_loss', 'gain_weight', 'maintain']:
            return jsonify({"error": "Invalid goal. Choose from 'weight_loss', 'gain_weight', or 'maintain'"}), 400

        # Filter foods based on goal
        filtered_df = df[df['goal'] == goal]
        print("Filtered Data:", filtered_df)
        if filtered_df.empty:
            return jsonify({"error": "No matching foods found for the selected goal"}), 404

        # Get recommendations for each meal
        recommended_breakfast = get_food_recommendations(filtered_df, 'breakfast')
        recommended_lunch = get_food_recommendations(filtered_df, 'lunch')
        recommended_dinner = get_food_recommendations(filtered_df, 'dinner')

        print("Breakfast:", recommended_breakfast)
        print("Lunch:", recommended_lunch)
        print("Dinner:", recommended_dinner)

        return jsonify({
            "breakfast": recommended_breakfast,
            "lunch": recommended_lunch,
            "dinner": recommended_dinner
        })

    except Exception as e:
        print("❗ Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
