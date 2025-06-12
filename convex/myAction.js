//Orignal
// import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
// import { action } from "./_generated/server.js";
// import { api } from "./_generated/api.js";
// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
// import { TaskType } from "@google/generative-ai";
// import { v } from "convex/values";

// export const ingest = action({
//   args: {
//     splitText: v.any(),
//     fileId: v.string()
//   },
//   handler: async (ctx, args) => {
//     await ConvexVectorStore.fromTexts(
//       args.splitText,
//       args.fileId,
//       new GoogleGenerativeAIEmbeddings({
//         apiKey: 'AIzaSyBesw2lALeS7dv_ahEXvKx_rkDSLjdcUfo', // Your Google API key
//         model: "text-embedding-004", // 768 dimensions
//         taskType: TaskType.RETRIEVAL_DOCUMENT,
//         title: "Document title",
//       }),
//       { ctx }

//     );
//     return "Completed"
//   },
// });

// export const search = action({
//   args: {
//     query: v.string(),
//     fileId: v.string()
//   },
//   handler: async (ctx, args) => {
//     const vectorStore = new ConvexVectorStore(
//       new GoogleGenerativeAIEmbeddings({
//         apiKey: 'AIzaSyBesw2lALeS7dv_ahEXvKx_rkDSLjdcUfo', // Your Google API key
//         model: "text-embedding-004", // 768 dimensions
//         taskType: TaskType.RETRIEVAL_DOCUMENT,
//         title: "Document title",
//       }),
//       { ctx });

//     const resultOne = (await vectorStore.similaritySearch(args.query, 1))
//     .filter(q => q.metadata.fileId == args.fileId)
//     console.log(resultOne);

//     return JSON.stringify(resultOne)
//   },
// });


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
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: 'AIzaSyBesw2lALeS7dv_ahEXvKx_rkDSLjdcUfo',
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
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: 'AIzaSyBesw2lALeS7dv_ahEXvKx_rkDSLjdcUfo',
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    });

    const vectorStore = new ConvexVectorStore(embeddings, { ctx });

    const allResults = await vectorStore.similaritySearch(args.query, 10);
    const filtered = allResults.filter(
      (r) => r.metadata?.fileId === args.fileId
    );

    console.log("🔍 Filtered results:", filtered);
    return JSON.stringify(filtered);
  },
});





//Code wroking with only storing metadata as string

// import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
// import { action } from "./_generated/server.js";
// import { api } from "./_generated/api.js";
// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
// import { TaskType } from "@google/generative-ai";
// import { v } from "convex/values";

// export const ingest = action({
//   args: {
//     splitText: v.any(),
//     fileId: v.string()
//   },
//   handler: async (ctx, args) => {
//     // Create an array of fileId strings, one for each text chunk
//     const metadataArray = args.splitText.map(() => args.fileId);
    
//     await ConvexVectorStore.fromTexts(
//       args.splitText,
//       metadataArray,  // Just passing the fileId as the metadata for each text
//       new GoogleGenerativeAIEmbeddings({
//         apiKey: 'AIzaSyBesw2lALeS7dv_ahEXvKx_rkDSLjdcUfo',
//         model: "text-embedding-004",
//         taskType: TaskType.RETRIEVAL_DOCUMENT,
//         title: "Document title",
//       }),
//       { ctx }
//     );
//     return "Completed";
//   },
// });

// export const search = action({
//   args: {
//     query: v.string(),
//     fileId: v.string()
//   },
//   handler: async (ctx, args) => {
//     const vectorStore = new ConvexVectorStore(
//       new GoogleGenerativeAIEmbeddings({
//         apiKey: 'AIzaSyBesw2lALeS7dv_ahEXvKx_rkDSLjdcUfo',
//         model: "text-embedding-004",
//         taskType: TaskType.RETRIEVAL_DOCUMENT,
//         title: "Document title",
//       }),
//       { ctx }
//     );
    
//     // Get similarity search results
//     const results = await vectorStore.similaritySearch(args.query, 10);
    
//     // Filter where metadata equals the fileId string
//     const resultOne = results.filter(q => q.metadata === args.fileId);
    
//     console.log(resultOne);
//     return JSON.stringify(resultOne);
//   },
// });