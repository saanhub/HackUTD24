# Model will be loaded and predictions are made
import numpy as np
import joblib

model = joblib.load('model/hydrate_model.pkl') # add proper model name

def predict_hydrate_formation(feature1, feature2):
    features = np.array([[feature1, feature2]])

    prediction = model.predict(features)

    return prediction[0]
