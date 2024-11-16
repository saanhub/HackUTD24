# For data preprocessing
def preprocess_data(data):

    """ 
    Process incoming data to format the model
    """

    feature1 = data.get('feature1', 0)
    feature2 = data.get('feature2', 0)

    return feature1, feature2