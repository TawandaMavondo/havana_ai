import * as dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import { BufferMemory } from "langchain/memory";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatOpenAI } from "@langchain/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// 6. Ask questions
const runQuery = async (question: string): Promise<string> => {
  const rawText = fs.readFileSync("./src/rag.txt", "utf-8");

  // 2. Split text into chunks
  const splitter = new CharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const docs = await splitter.createDocuments([rawText]);

  // 3. Embed the documents
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

  // 4. Create LLM + memory
  const model = new ChatOpenAI({
    modelName: "gpt-4", // or "gpt-3.5-turbo"
    temperature: 0.7,
    apiKey: process.env.OPENAI_API_KEY,
    
  });
  const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an expert on Harvard student enrollment. Use only official enrollment criteria, deadlines, and application procedures to respond. If unsure, say 'I don't know.'",
    ],
    ["human", "{input}"],
  ]);

  const memory = new BufferMemory({
    returnMessages: true,
    memoryKey: "chat_history",
  });

  // 5. Setup Conversational Retrieval Chain
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      memory,
      
    }
  );
  const response = await chain.invoke({ question });

  return response.text;
};

export default runQuery;
