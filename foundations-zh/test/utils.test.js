const { handleCustomError, isChrome, handleChromeError, handleFFError } = require('../src/utils');
const mockErrorString1 = `TypeError: Error raised
at bar http://192.168.31.8:8000/c.js:2:9
at foo http://192.168.31.8:8000/b.js:4:15
at calc http://192.168.31.8:8000/a.js:4:3
at <anonymous>:1:11
at http://192.168.31.8:8000/a.js:22:3
`;

const mockStrResult1 = ["TypeError: Error raised", "at bar http://192.168.31.8:8000/c.js:2:9", "at foo http://192.168.31.8:8000/b.js:4:15", "at calc http://192.168.31.8:8000/a.js:4:3", "at http://192.168.31.8:8000/a.js:22:3"];
const mockArrResult1 = ["http://192.168.31.8:8000/c.js:2:9", "http://192.168.31.8:8000/b.js:4:15", "http://192.168.31.8:8000/a.js:4:3", "http://192.168.31.8:8000/a.js:22:3"];
const mockErrorString2 = `
bar@http://192.168.31.8:8000/c.js:2:9
foo@http://192.168.31.8:8000/b.js:4:15
calc@http://192.168.31.8:8000/a.js:4:3
<anonymous>:1:11
http://192.168.31.8:8000/a.js:22:3
`;
const mockStrResult2 = ["bar@http://192.168.31.8:8000/c.js:2:9", "foo@http://192.168.31.8:8000/b.js:4:15", "calc@http://192.168.31.8:8000/a.js:4:3","http://192.168.31.8:8000/a.js:22:3"];
test('isChrome true', () => {
  expect(isChrome("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36")).toBe(true);
});

test('isChrome false', () => {
  expect(isChrome("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0")).toBe(false);
});

test('handleCustomError', () => {
  expect(handleCustomError(mockErrorString1).toString()).toBe(mockStrResult1.toString());
  expect(handleCustomError(mockErrorString2).toString()).toBe(mockStrResult2.toString());
});

test('handleChromeError', () => {
  const tempArray = mockStrResult1.slice();
  tempArray.shift();
  expect(handleChromeError(tempArray).toString()).toBe(mockArrResult1.toString());
});

test('handleFFError', () => {
  const tempArray = mockStrResult2.slice();
  expect(handleFFError(tempArray).toString()).toBe(mockArrResult1.toString());
});