import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt
import seaborn as sns

def load_and_process_data(file_path):
    data = pd.read_csv(file_path)

    data['Time'] = pd.to_datetime(data['Time'], format='%m/%d/%Y %I:%M:%S %p')

    data['Volume Error'] = data['Inj Gas Meter Volume Instantaneous'] - 375.0

    return data

def filter_data_for_day(data, specific_day):
    filtered_data = data[data['Time'].dt.date.astype(str) == specific_day]
    return filtered_data

def train_model(data):
    X = data[['Inj Gas Meter Volume Instantaneous', 'Inj Gas Valve Percent Open', 'Volume Error']]
    y = (data['Volume Error'] > 0).astype(int)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = LogisticRegression(max_iter=1000)

    model.fit(X_train, y_train)

    y_predict = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy: {accuracy * 100:.2f}%")

    return model

def make_prediction(model, input_data):
    prediction = model.predict(input_data)
    return prediction

def plot_predictions(data, specific_day):
    filtered_data = filter_data_for_day(data, specific_day)

    sns.set_theme(style="whitegrid")
    fig, ax1 = plt.subplots(figsize=(10, 6))

    sns.lineplot(x='Time', y='Volume Error', data=filtered_data, ax=ax1, color='b', label='Volume Error')
    ax1.set_xlabel('Time')
    ax1.set_ylabel('Volume Error (m^3)', color='b')
    ax1.tick_params(axis='y', labelcolor='b')

    ax2 = ax1.twinx()
    sns.lineplot(x='Time', y='Inj Gas Valve Percent Open', data=filtered_data, ax=ax2, color='g', label='Inj Gas Valve Percent Open')
    ax2.set_ylabel('Gas Valve Percent Open', color='g')
    ax2.tick_params(axis='y', labelcolor='g')

    plt.title(f'Volume Error and Gas Valve Percent Open on {specific_day}', fontsize=16)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    file_path = 'path/to/dataset.csv'

    data = load_and_process_data(file_path)

    model = train_model(data)

    specific_day = input('Enter specific day in YYYY-MM-DD format: ')

    plot_predictions(data, specific_day)

    filtered_data = filter_data_for_day(data, specific_day)
    input_data = filtered_data[['Inj Gas Meter Volume Instantaneous', 'Inj Gas Valve Percent Open', 'Volume Error']]

    predictions = make_prediction(model, input_data)

    print("Predictions for hydrate formation (1 = yes, 0 = no):")
    print(predictions)
