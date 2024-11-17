import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

data = pd.read_csv('bold.csv') # reads csv file

# convert the 'Time' column to datetime format
data['Time'] = pd.to_datetime(data['Time'], format='%m/%d/%Y %I:%M:%S %p')

# filter over a single day: YYYY-MM-DD
day = data[data['Time'].dt.date == pd.to_datetime(input("YYYY-MM-DD?")).date()]

sns.set_theme(style="whitegrid")
fig, ax1 = plt.subplots(figsize=(10, 6)) # two axises -- meter volume, percentage

# plots Inj Gas Meter Volume Instantaneous on primary y-axis
sns.lineplot(x='Time', y='Inj Gas Meter Volume Instantaneous', data=day, marker='o', color='b', ax=ax1)
ax1.set_xlabel('Time', fontsize=14)
ax1.set_ylabel('Inj Gas Meter Volume Instantaneous', fontsize=14, color='b')
ax1.tick_params(axis='y', labelcolor='b')

# secondary y-axis for Inj Gas Valve Percent Open
ax2 = ax1.twinx()
sns.lineplot(x='Time', y='Inj Gas Valve Percent Open', data=day, marker='o', color='g', ax=ax2) # ax= ax2
ax2.set_ylabel('Inj Gas Valve Percent Open', fontsize=14, color='g')
ax2.tick_params(axis='y', labelcolor='g')


plt.title(f"Inj Gas Meter Volume & Inj Gas Valve Percent Open over Time on {day}", fontsize=16)
#plt.xticks(rotation=45)
plt.show()