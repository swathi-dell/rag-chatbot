def load_data(file_path):
    """Load data from a specified file path."""
    with open(file_path, 'r') as file:
        data = file.read()
    return data

def save_data(file_path, data):
    """Save data to a specified file path."""
    with open(file_path, 'w') as file:
        file.write(data)