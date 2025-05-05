
## Getting Started


## Project Structure

This is a monorepo project and contains a backend nodejs application under backend/

First, run the development servers for the frontend and the backend:

```bash
yarn install

yarn dev
```

To run the backend:

1. cd backend/
2. Create .env file under the backend/ folder
3. Add OPENAI_API_KEY inside the .env file
4. run yarn install
5. run yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture design

The project depends on Nextjs and Nodejs.

# 🧠 Building a Domain-Specific Assistant with RAG (Retrieval-Augmented Generation)

## 📘 Overview

**RAG (Retrieval-Augmented Generation)** enhances a language model like GPT-4 by combining it with a **retrieval system** that provides accurate, up-to-date, or domain-specific knowledge at query time.

This makes it ideal for building assistants tailored to specific areas like:
- Admissions (e.g., enrolling students into Harvard)
- Legal, medical, or technical Q&A
- Customer support bots
- Internal documentation agents

The project has a tailored RAG document that will enhance the responses to be very specific to the usecases of the project.

User Input
A natural language question is sent (e.g., "How can I apply to Harvard's MBA program?").

Embedding
The question is converted into a vector using an embedding model (e.g., text-embedding-3-small).

Retrieval
The vector is matched against a vector database (InMemory Vector Database) to retrieve the most relevant document chunks.

Augmented Prompt
The original question + retrieved content are fed into the language model (e.g., GPT-4) to generate a grounded answer.

Response
The model answers based on real documents, reducing hallucination and increasing accuracy.

A Dashboard that has bookings made by the AI is available at  [Bookings](http://localhost:3000/dashboard/bookings) 
