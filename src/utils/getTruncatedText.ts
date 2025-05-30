export function getTruncatedText(text: string, length: number) {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
}
