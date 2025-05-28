from chatbot.rag import RAG
from chatbot.api import setup_api

def main():
    # Initialize the RAG chatbot
    rag_chatbot = RAG()

    # Set up the API for user interaction
    app = setup_api(rag_chatbot)

    # Start the interaction loop
    app.run(debug=True)

if __name__ == "__main__":
    main()