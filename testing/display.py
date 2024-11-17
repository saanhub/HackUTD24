import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

data = pd.read_csv('bold.csv') # reads csv file

# convert the 'Time' column to datetime format
data['Time'] = pd.to_datetime(data['Time'], format='%m/%d/%Y %I:%M:%S %p')

# filter over a single day: YYYY-MM-DD testing - 2024-10-31
day = data[data['Time'].dt.date == pd.to_datetime(input("YYYY-MM-DD?")).date()]

day['Inj Gas Valve Percent Open'] = day['Inj Gas Valve Percent Open'].interpolate(method='linear')
day['Inj Gas Meter Volume Instantaneous'] = day['Inj Gas Meter Volume Instantaneous'].interpolate(method='linear')
# print(day[['Time', 'Inj Gas Valve Percent Open', 'Inj Gas Meter Volume Instantaneous']])

sns.set_theme()

# plotting
fig, ax1 = plt.subplots(figsize=(8, 6))
sns.lineplot(x='Time', y='Inj Gas Meter Volume Instantaneous', data=day, ax=ax1, color='blue', label='Gas Volume')

# only time
ax1.xaxis.set_major_formatter(plt.matplotlib.dates.DateFormatter('%H:%M'))

ax1.set_xlabel('Time')
ax1.set_ylabel('Inj Gas Meter Volume Instantaneous')
plt.title(f"Gas Volume over Time on {input_date}")

fig_percent, ax2 = plt.subplots(figsize=(8,6))
sns.lineplot(x='Time', y='Inj Gas Valve Percent Open', data=day, ax=ax2, color='red', label='Gas Valve Percent Open')
ax2.xaxis.set_major_formatter(plt.matplotlib.dates.DateFormatter('%H:%M'))
ax2.set_xlabel('Time')
ax2.set_ylabel('Inj Gas Valve Percent Open')
plt.title(f"Gas Valve Percent Open on {input_date}")
plt.xticks(rotation=30)
plt.tight_layout()
plt.show()

# time to datetime
day['Time'] = pd.to_datetime(day['Time'], format='%m/%d/%Y %I:%M:%S %p')

# # Filter for a single day
input_date = input("Enter the date (YYYY-MM-DD): ")  # Example: '2024-10-31'
day = data[data['Time'].dt.date == pd.to_datetime(input_date).date()]

# # Interpolate missing values
day['Inj Gas Valve Percent Open'] = day['Inj Gas Valve Percent Open'].interpolate(method='linear')
day['Inj Gas Meter Volume Instantaneous'] = day['Inj Gas Meter Volume Instantaneous'].interpolate(method='linear')

# filling setpoint values with constant value of 375
day['Inj Gas Meter Volume Setpoint'] = 375.0

# error between the instantaneous gas meter volumes and setpoint
day['Error'] = day['Inj Gas Meter Volume Instantaneous'] - day['Inj Gas Meter Volume Setpoint']
data.head()

#'Hydrate_Formed' based on these conditions
day['Hydrate_Formed'] = (
     (day['Inj Gas Valve Percent Open'] < 35) &
     (day['Error'] > 15)
 )
day['Hydrate_Formed'] = day['Hydrate_Formed'].astype(int)
day.head(50)

X = data[['Inj Gas Valve Percent Open', 'Error', 'Inj Gas Meter Volume Instantaneous']]
y = data['Hydrate_Formed']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)
print(X_train, y_train)
model.predict(X_test)