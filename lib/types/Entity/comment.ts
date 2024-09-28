/**
필수: POST Request때 필요한 Data,
모두: GET Request때 받은 Data
*/

export interface CommentRequest {
  planId: number

  parentId: number

  content: string
  time: string
  refOrder: number
}

export interface CommentResponse extends CommentRequest {
  id: number

  userId: number
  userName: string
  userImgsrc: string
  userStatusMessage: string
}
