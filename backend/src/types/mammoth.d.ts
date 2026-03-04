declare module 'mammoth' {
  interface ExtractRawTextResult {
    value: string;
    messages: any[];
  }

  interface Options {
    path?: string;
    buffer?: Buffer;
  }

  export function extractRawText(options: Options): Promise<ExtractRawTextResult>;
  export function convertToHtml(options: Options): Promise<{ value: string; messages: any[] }>;
}
