import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

 # name = input("what's the name of your file? ")
data = pd.read_csv('python files + env\bold.csv') # reads csv file

# convert the 'Time' column to datetime format
data['Time'] = pd.to_datetime(data['Time'], format='%m/%d/%Y %I:%M:%S %p')

start = data['Time'].iloc[0].date()
end = data['Time'].iloc[-1].date() 
print(f"The dates in this file are from {start} to {end}.")

# filter over a single day: YYYY-MM-DD testing - 2024-10-31
input_date = input("Which day would you like to inspect? Type in YYYY-MM-DD.")
day = data[data['Time'].dt.date == pd.to_datetime(input_date).date()]

day['Inj Gas Valve Percent Open'] = day['Inj Gas Valve Percent Open'].interpolate(method='linear')
day['Inj Gas Meter Volume Instantaneous'] = day['Inj Gas Meter Volume Instantaneous'].interpolate(method='linear')
# print(day[['Time', 'Inj Gas Valve Percent Open', 'Inj Gas Meter Volume Instantaneous']])

sns.set_theme()

# plotting
fig, ax1 = plt.subplots(figsize=(12, 6))
sns.lineplot(x='Time', y='Inj Gas Meter Volume Instantaneous', data=day, ax=ax1, color='blue', label='Gas Volume')

# only time
ax1.xaxis.set_major_formatter(plt.matplotlib.dates.DateFormatter('%H:%M'))

ax1.set_xlabel('Time')
ax1.set_ylabel('Inj Gas Meter Volume Instantaneous')
plt.title(f"Gas Volume over Time on {input_date}")
plt.xticks(rotation=30)

fig_percent, ax2 = plt.subplots(figsize=(8,6))
sns.lineplot(x='Time', y='Inj Gas Valve Percent Open', data=day, ax=ax2, color='red', label='Gas Valve Percent Open')
ax2.xaxis.set_major_formatter(plt.matplotlib.dates.DateFormatter('%H:%M'))
ax2.set_xlabel('Time')
ax2.set_ylabel('Inj Gas Valve Percent Open')
plt.title(f"Gas Valve Percent Open on {input_date}")
plt.xticks(rotation=30)
plt.tight_layout()

plt.show()
