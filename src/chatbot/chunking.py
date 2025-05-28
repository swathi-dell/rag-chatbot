def chunk_text(text, chunk_size=100):
    """
    Splits the input text into chunks of specified size.

    Parameters:
    text (str): The text to be chunked.
    chunk_size (int): The maximum size of each chunk.

    Returns:
    list: A list of text chunks.
    """
    # Split the text into words
    words = text.split()
    chunks = []
    current_chunk = []

    for word in words:
        current_chunk.append(word)
        if len(current_chunk) >= chunk_size:
            chunks.append(' '.join(current_chunk))
            current_chunk = []

    # Add any remaining words as the last chunk
    if current_chunk:
        chunks.append(' '.join(current_chunk))

    return chunks