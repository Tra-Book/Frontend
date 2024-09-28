export interface CommunityPlace {
  address: string
  category: string
  cityId: number
  imageSrc: string | null
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
}
