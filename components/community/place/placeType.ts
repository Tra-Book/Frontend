export interface CommunityPlace {
  address: string
  category: string
  cityId: number
  imgSrc: string | null
  latitude: number
  longitude: number
  numOfAdded: string
  numOfReview: number | null
  placeId: number
  ratingScore: number | null
  scrapped: boolean
  scraps: number
  star: number
  placeName: string
  description?: null
  subcategory?: string
  isScrapped?: boolean | null
}

type Comment = {
  commentId: number
  placeId: number
  content: string
  date: string
}

export interface DetailPlace {
  place: CommunityPlace
  comments: Comment[]
}
