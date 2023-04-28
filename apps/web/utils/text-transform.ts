
export const trimText = (text: string, n: number) => {
  if (text.length <= n) {
    return text
  }
  return text.substring(0, n) + '...'
}
