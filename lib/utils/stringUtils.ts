export const removeTagsAndParentheses = (text: string) => {
  return text.replace(/<.*?>|\(.*?\)/g, '').trim()
}
