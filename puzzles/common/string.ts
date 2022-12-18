const pad = (text: string, width: number): string => {
  let result = text;
  while (result.length < width) {
    result = " " + result;
  }
  return result;
};

export { pad };
