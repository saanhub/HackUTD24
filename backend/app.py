# Flask app file to run server
from flask import Flask, request, jsonify
from model.model import predict_hydrate_formation
from notifications.notifier import send_notifications

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        feature1 = data['feature1']
        feature2 = data['feature2']

        prediction = predict_hydrate_formation(feature1, feature2)

        if prediction == 1:
            send_notifications("Hydrate formation. Action is required.")

        return jsonify({"prediction": prediction, "message": "Success"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)