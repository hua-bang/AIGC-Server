import { OpenAI } from 'langchain/llms/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { Document } from "langchain/document";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
// 改为新的导入方式
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

// Load environment variables
dotenv.config();


// Check if API key is configured
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in the environment variables");
}

const model = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.2
}, {
  baseURL: process.env.BASE_URL
});

// Create embeddings instance
const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
}, {
  baseURL: process.env.BASE_URL
});

/**
 * Function to load documents from a directory
 * @param directoryPath Path to directory containing text files
 */
async function loadDocumentsFromDirectory(directoryPath: string): Promise<Document[]> {
  const documents: Document[] = [];
  
  try {
    const files = fs.readdirSync(directoryPath);
    
    for (const file of files) {
      if (path.extname(file).toLowerCase() === '.txt') {
        const filePath = path.join(directoryPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        documents.push(
          new Document({
            pageContent: content,
            metadata: { source: filePath },
          })
        );
      }
    }
  } catch (error) {
    console.error("Error loading documents:", error);
  }
  
  return documents;
}

async function runRAGDemo() {
  console.log("Loading documents...");
  
  // Load documents (replace with your documents directory)
  const documents = await loadDocumentsFromDirectory("./documents");
  
  if (documents.length === 0) {
    console.log("No documents found. Please add some .txt files to the 'documents' directory.");
    return;
  }
  
  console.log(`Loaded ${documents.length} documents.`);
  
  // Split text into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  
  console.log("Splitting documents into chunks...");
  const splitDocs = await textSplitter.splitDocuments(documents);
  console.log(`Created ${splitDocs.length} chunks.`);

   // Create vector store from documents
  console.log("Creating vector store...");
  // 初始化 Pinecone 客户端
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const pineconeIndex = client.Index(process.env.PINECONE_INDEX!);
  
  // 直接使用已存在的向量库进行检索
  console.log("Connecting to existing vector store...");
  const vectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
      pineconeIndex,
      namespace: "jasper-web-docs",
    }
  );

  // Create retrieval chain
  console.log("Creating retrieval chain...");
  // 创建检索链时启用详细日志
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    returnSourceDocuments: true,
    verbose: true
  });

  async function askQuestion(question: string) {
    console.log(`\nQuestion: ${question}`);
    console.log("Thinking...");
    
    try {
      const result = await chain.call({
        query: question,
        verbose: true
      });
      
      console.log("\n=== RAG 处理过程 ===");
      console.log("1. 检索到的相关文档:");
      result.sourceDocuments?.forEach((doc, index) => {
        console.log(`\n文档 ${index + 1}:`);
        console.log(`来源: ${doc.metadata.source}`);
        console.log(`内容片段: ${doc.pageContent.substring(0, 150)}...`);
      });
      
      console.log("\n2. AI 生成的答案:");
      console.log(result.text);
    } catch (error) {
      console.error("Error during question answering:", error);
    }
  }

  // Example questions - replace with your own or implement a CLI interface
  await askQuestion("JasperWeb 具体指是什么");  
}

runRAGDemo();