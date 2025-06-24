import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { api } from "./_generated/api.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey,
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    });

    // Prepare metadata array matching splitText length
    const metadata = args.splitText.map(() => ({ fileId: args.fileId }));

    await ConvexVectorStore.fromTexts(
      args.splitText,
      metadata,
      embeddings,
      { ctx }
    );

    return "Completed";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;  //fetching gemini api key

    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey, 
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx });

    const resultOne = (await vectorStore.similaritySearch(args.query, 5))
    .filter(q => q.metadata.fileId == args.fileId)
    console.log(resultOne);

    return JSON.stringify(resultOne)  
  },
});