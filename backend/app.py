import pandas as pd
from flask import Flask, request, jsonify
from model.model import predict_with_model, train_model
from notifications.notifier import send_notifications
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model, scaler = train_model()

file_path = "/Users/trishaporeddy/Downloads/dataset.csv"

@app.route('/predict', methods = ['POST'])
def predict():
    data = request.get_json()

    try:
        if not os.path.exists(file_path):
            return jsonify({"error": f"File not found: {file_path}"}), 400

        df = pd.read_csv(file_path)

        columns_required = ['Inj Gas Meter Volume Instantaneous', 'Inj Gas Meter Volume Setpoint', 'Inj Gas Valve Percent Open']

        columns_missing = [col for col in columns_required if col not in df.columns]

        if columns_missing:
            return jsonify({"error": f"Missing columns: {', '.join(columns_missing)}"}), 400
        
        predictions = []
        
        # making predictions
        for _, row in df.iterrows():
            gas_injection_volume = data['Inj Gas Meter Volume Instantaneous']
            target_gas_injection_volume = data['Inj Gas Meter Volume Setpoint']
            valve_percent_open = data['Inj Gas Valve Percent Open']

            prediction = predict_with_model(model, scaler, gas_injection_volume, target_gas_injection_volume, valve_percent_open)

            if prediction == 1:
                send_notifications("Hydrate formation detected. Please take necessary action.")

            predictions.append({
                'gas_injection_volume': gas_injection_volume,
                'target_gas_injection_volume': target_gas_injection_volume,
                'valve_percent_open': valve_percent_open,
                'prediction': prediction,
                'message': "Prediction successful"
            })

        return jsonify(predictions), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
if __name__ == '__main__':
    app.run(debug=True)