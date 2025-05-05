import { NextResponse } from 'next/server';
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// const pdfUrl = "https://reminiscent-caribou-546.convex.cloud/api/storage/47f4e256-e124-4e61-b86d-38a366d05def"
export async function GET(req) {

    const reqUrl = req.url;
    const {searchParams} = new URL(reqUrl);
    const pdfUrl = searchParams.get('pdfUrl');
    console.log(pdfUrl);
    //1. Load the pdf file
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = '';
    docs.forEach((doc) => {
        pdfTextContent += doc.pageContent;
    });

    //2. Split the text into smaller chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });
      
    const output = await splitter.createDocuments([pdfTextContent]);
    let splitterList=[];
    output.forEach((doc) => {
        splitterList.push(doc.pageContent);
    });

    return NextResponse.json({result:splitterList})
}