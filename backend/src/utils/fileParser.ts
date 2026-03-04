import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs/promises';
import path from 'path';

/**
 * Extract text from PDF file
 */
export async function extractTextFromPDF(filePath: string): Promise<string> {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    const err = error as Error;
    throw new Error(`PDF parsing error: ${err.message}`);
  }
}

/**
 * Extract text from DOCX file
 */
export async function extractTextFromDOCX(filePath: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    const err = error as Error;
    throw new Error(`DOCX parsing error: ${err.message}`);
  }
}

/**
 * Parse resume file based on extension
 */
export async function parseResumeFile(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.pdf') {
    return await extractTextFromPDF(filePath);
  } else if (ext === '.docx') {
    return await extractTextFromDOCX(filePath);
  } else {
    throw new Error('Unsupported file format. Please upload PDF or DOCX file.');
  }
}

/**
 * Clean and normalize text
 */
export function normalizeText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .trim();
}

export default {
  parseResumeFile,
  extractTextFromPDF,
  extractTextFromDOCX,
  normalizeText
};
