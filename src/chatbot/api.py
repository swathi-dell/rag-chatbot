from fastapi import FastAPI, HTTPException
from chatbot.rag import RAG
from chatbot.chunking import chunk_text
from chatbot.embedding import EmbeddingGenerator

app = FastAPI()
rag_model = RAG()
embedding_generator = EmbeddingGenerator()

@app.post("/chat")
async def chat(user_input: str):
    try:
        chunks = chunk_text(user_input)
        embeddings = [embedding_generator.generate_embedding(chunk) for chunk in chunks]
        response = rag_model.generate_response(embeddings)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))