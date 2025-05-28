class RAG:
    def __init__(self, retriever, generator):
        self.retriever = retriever
        self.generator = generator

    def generate_response(self, query):
        retrieved_docs = self.retriever.retrieve(query)
        context = self._combine_context(retrieved_docs)
        response = self.generator.generate(context, query)
        return response

    def _combine_context(self, documents):
        return " ".join(documents)  # Simple concatenation of retrieved documents for context