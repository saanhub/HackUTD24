from flask import Flask, request, jsonify
import numpy as np
import joblib

app = Flask(__name__)

@app.route('/')
def home():
    return "something"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        feature1 = data['feature1']
        feature2 = data['feature2']

        model = joblib.load('model_path.pkl')
        prediction = model.predict(np.array([[feature1, feature2]]))

        return jsonify({'prediction:', prediction.tolist()})
    except Exception as e:
        return jsonify({'error:', str(e)}), 400
    
if __name__ == "__main__":
    app.run(debug=True)