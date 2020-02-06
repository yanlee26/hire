type strArray = string[];

export function isChrome(ua:string = 'Chrome'){
  return /Chrome/g.test(ua);
}

export function handleCustomError(err: Error){
  return err.toString().split('\n').filter(x=>x && !/<anonymous>/g.test(x)).map(y=>y.trim());
}

export function handleChromeError(array: strArray){
  return array.map(x=>x.split(' ').pop());
}


export function handleFFError(array: strArray){
  return array.map(x=>x.replace(/(\w+)@(\w+)/g,"$2"))
}
