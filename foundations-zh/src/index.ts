import {
  handleCustomError,
  isChrome,
  handleChromeError,
  handleFFError
} from './utils';

interface ErrorItem {
  line: number
  column: number
  filename: string
}
export interface ErrorMessage {
  message: string
  stack: Array < ErrorItem >
}


export function parseError(err: Error): ErrorMessage {
  const customStrs = handleCustomError(err);
  const message = isChrome() ? customStrs.shift() !.split(': ')[1] : '';
  const resultArray = isChrome() ? handleChromeError(customStrs) : handleFFError(customStrs);
  const stack = resultArray.map(x => {
    const [filename, line, column] = x!.replace(/(\w+):(\w+):(\w+)/g, "$1 $2 $3").split(' ');
    return {
      line: Number(line),
      column: Number(column),
      filename
    }
  })
  return {
    message,
    stack
  }
}