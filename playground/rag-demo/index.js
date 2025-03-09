"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var openai_1 = require("langchain/llms/openai");
var text_splitter_1 = require("langchain/text_splitter");
var openai_2 = require("langchain/embeddings/openai");
var chains_1 = require("langchain/chains");
var document_1 = require("langchain/document");
var fs = require("fs");
var path = require("path");
var dotenv = require("dotenv");
// 改为新的导入方式
var pinecone_1 = require("@pinecone-database/pinecone");
var pinecone_2 = require("langchain/vectorstores/pinecone");
// Load environment variables
dotenv.config();
// Check if API key is configured
if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in the environment variables");
}
var model = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.2
}, {
    baseURL: process.env.BASE_URL
});
// Create embeddings instance
var embeddings = new openai_2.OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
}, {
    baseURL: process.env.BASE_URL
});
/**
 * Function to load documents from a directory
 * @param directoryPath Path to directory containing text files
 */
function loadDocumentsFromDirectory(directoryPath) {
    return __awaiter(this, void 0, void 0, function () {
        var documents, files, _i, files_1, file, filePath, content;
        return __generator(this, function (_a) {
            documents = [];
            try {
                files = fs.readdirSync(directoryPath);
                for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                    file = files_1[_i];
                    if (path.extname(file).toLowerCase() === '.txt') {
                        filePath = path.join(directoryPath, file);
                        content = fs.readFileSync(filePath, 'utf-8');
                        documents.push(new document_1.Document({
                            pageContent: content,
                            metadata: { source: filePath },
                        }));
                    }
                }
            }
            catch (error) {
                console.error("Error loading documents:", error);
            }
            return [2 /*return*/, documents];
        });
    });
}
function runRAGDemo() {
    return __awaiter(this, void 0, void 0, function () {
        function askQuestion(question) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log("\nQuestion: ".concat(question));
                            console.log("Thinking...");
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, chain.call({
                                    query: question,
                                    verbose: true
                                })];
                        case 2:
                            result = _b.sent();
                            console.log("\n=== RAG 处理过程 ===");
                            console.log("1. 检索到的相关文档:");
                            (_a = result.sourceDocuments) === null || _a === void 0 ? void 0 : _a.forEach(function (doc, index) {
                                console.log("\n\u6587\u6863 ".concat(index + 1, ":"));
                                console.log("\u6765\u6E90: ".concat(doc.metadata.source));
                                console.log("\u5185\u5BB9\u7247\u6BB5: ".concat(doc.pageContent.substring(0, 150), "..."));
                            });
                            console.log("\n2. AI 生成的答案:");
                            console.log(result.text);
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _b.sent();
                            console.error("Error during question answering:", error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        var documents, textSplitter, splitDocs, client, pineconeIndex, vectorStore, chain;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Loading documents...");
                    return [4 /*yield*/, loadDocumentsFromDirectory("./documents")];
                case 1:
                    documents = _a.sent();
                    if (documents.length === 0) {
                        console.log("No documents found. Please add some .txt files to the 'documents' directory.");
                        return [2 /*return*/];
                    }
                    console.log("Loaded ".concat(documents.length, " documents."));
                    textSplitter = new text_splitter_1.RecursiveCharacterTextSplitter({
                        chunkSize: 1000,
                        chunkOverlap: 200,
                    });
                    console.log("Splitting documents into chunks...");
                    return [4 /*yield*/, textSplitter.splitDocuments(documents)];
                case 2:
                    splitDocs = _a.sent();
                    console.log("Created ".concat(splitDocs.length, " chunks."));
                    // Create vector store from documents
                    console.log("Creating vector store...");
                    client = new pinecone_1.Pinecone({
                        apiKey: process.env.PINECONE_API_KEY,
                    });
                    pineconeIndex = client.Index(process.env.PINECONE_INDEX);
                    // 直接使用已存在的向量库进行检索
                    console.log("Connecting to existing vector store...");
                    return [4 /*yield*/, pinecone_2.PineconeStore.fromExistingIndex(embeddings, {
                            pineconeIndex: pineconeIndex,
                            namespace: "jasper-web-docs",
                        })];
                case 3:
                    vectorStore = _a.sent();
                    // Create retrieval chain
                    console.log("Creating retrieval chain...");
                    chain = chains_1.RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
                        returnSourceDocuments: true,
                        verbose: true
                    });
                    // Example questions - replace with your own or implement a CLI interface
                    return [4 /*yield*/, askQuestion("JasperWeb 具体指是什么")];
                case 4:
                    // Example questions - replace with your own or implement a CLI interface
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
runRAGDemo();
