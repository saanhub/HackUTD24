import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

name = input("what's the name of your file? ")
data = pd.read_csv(name) # reads csv file

# time to datetime
data['Time'] = pd.to_datetime(data['Time'])


# interpolation for missing percentage values
data['Inj Gas Valve Percent Open'] = data['Inj Gas Valve Percent Open'].interpolate(method='linear')
data['Inj Gas Meter Volume Instantaneous'] = data['Inj Gas Meter Volume Instantaneous'].interpolate(method='linear')

setpoint_value = data['Inj Gas Meter Volume Setpoint'].dropna().iloc[0]
print(setpoint_value)
data['Inj Gas Meter Volume Setpoint'] = setpoint_value

# error between the instantaneous gas meter volumes and setpoint
data['Error'] = data['Inj Gas Meter Volume Instantaneous'] - data['Inj Gas Meter Volume Setpoint']
# data.head()


# sample thresholds to determine hydrate formation
high_volume_threshold = data['Inj Gas Meter Volume Instantaneous'].quantile(0.75)  # top 25% as "high volume"
low_percent_threshold = data['Inj Gas Valve Percent Open'].quantile(0.25)  # bottom 25% as "low percent"


# 'Hydrate_Formed' based on these conditions
data['Hydrate_Formed'] = (
    (data['Inj Gas Meter Volume Instantaneous'] > high_volume_threshold) &
    (data['Inj Gas Valve Percent Open'] < low_percent_threshold) &
    (data['Error'] > 0)
)
data['Hydrate_Formed'] = data['Hydrate_Formed'].astype(int)
# data.head(50)

X = data[['Inj Gas Valve Percent Open', 'Error', 'Inj Gas Meter Volume Instantaneous']]
y = data['Hydrate_Formed']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


model = LogisticRegression()
model.fit(X_train, y_train)
print(X_train, y_train)
model.predict(X_test)

y_pred = model.predict(X_test)

fig, axes = plt.subplots(1, 3, figsize=(18, 5))


# scatter plot for 'Inj Gas Valve Percent Open'
sns.scatterplot(data=X_test, x='Inj Gas Valve Percent Open', y=y_test, hue=y_pred, palette='coolwarm', ax=axes[0])
axes[0].set_title('Gas Valve Percent Open vs Hydrate Formation')
axes[0].set_xlabel('Inj Gas Valve Percent Open')
axes[0].set_ylabel('Hydrate Formed (True/False)')


# scatter plot for 'Error'
sns.scatterplot(data=X_test, x='Error', y=y_test, hue=y_pred, palette='coolwarm', ax=axes[1])
axes[1].set_title('Error vs Hydrate Formation')
axes[1].set_xlabel('Error')
axes[1].set_ylabel('Hydrate Formed (True/False)')


# scatter plot for 'Inj Gas Meter Volume Instantaneous'
sns.scatterplot(data=X_test, x='Inj Gas Meter Volume Instantaneous', y=y_test, hue=y_pred, palette='coolwarm', ax=axes[2])
axes[2].set_title('Gas Meter Volume vs Hydrate Formation')
axes[2].set_xlabel('Inj Gas Meter Volume Instantaneous')
axes[2].set_ylabel('Hydrate Formed (True/False)')

plt.tight_layout()
plt.show()