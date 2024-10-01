export const removeTagsAndParentheses = (text: string) => {
  return text.replace(/<.*?>|\(.*?\)/g, '').trim()
}

export const formatNumOfReview = (num: number) => {
  if (num <= 999) {
    return num.toString()
  } else {
    return '999+'
  }
}
