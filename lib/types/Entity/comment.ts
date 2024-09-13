/**
필수: POST Request때 필요한 Data,
모두: GET Request때 받은 Data
*/

export interface Comment {
  id: number
  parentId: number
  userId: number

  date: Date
  content: string
  thumbCnt: number
}
