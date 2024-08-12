/**
필수: POST Request때 필요한 Data,
모두: GET Request때 받은 Data
*/
export interface BaseComment {
  userID: number
  date: Date
  content: string
}
export interface Comment extends BaseComment {
  imageSrc: string
  name: string
}
