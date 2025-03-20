import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pickle

# Load dataset
df = pd.read_csv('food_dataset.csv')
print(df.columns)
print(df.head())


# Encode goal as numerical values
goal_mapping = {'weight_loss': 0, 'gain_weight': 1, 'maintain': 2}
df['goal'] = df['goal'].map(goal_mapping)

# Features and target
X = df[['goal', 'target_calories', 'calories', 'protein', 'fat', 'carbs']]
y = df['meal_type']

print("Training Features:\n", X.head())
print("Target Labels:\n", y.head())

# Train the model
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Save the model
import pickle
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("✅ Model trained and saved successfully!")
