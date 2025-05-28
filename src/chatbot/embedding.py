class EmbeddingGenerator:
    def __init__(self, model):
        self.model = model

    def generate_embedding(self, text):
        # Convert text to vector representation using the model
        embedding = self.model.encode(text)
        return embedding

    def batch_generate_embeddings(self, texts):
        # Generate embeddings for a batch of texts
        embeddings = self.model.encode(texts)
        return embeddings