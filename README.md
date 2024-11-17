# Hydrate Solutions
A web application for lease operators to upload their data and view how each variable contributes to hydrate formation.
-----------------------------------------------------------------------------------------------------------------



- Seaborn & Matplotlib libraries to hypothesize the conditions under which hydrates will form.
    - User inputted data, which the program cleans and asks for a specific day given the date range in the dataset.
    - User inputs the date, which then showcases the graph for how both variables far over that particular day.
- Hypothesis: When the difference between the Instantaneously Injected Gas Meter Volume and the Injected Gas Meter Volume Setpoint exceeds a certain amount, hydrate will form.
- Logistic Regression utilized to train and predict whether hydrate will form for a given dataset, using our hypothesis. 


