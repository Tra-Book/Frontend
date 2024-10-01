export const PLACE_TAG: string[] = [
  '관광지',
  '문화시설',
  '레포츠',
  '쇼핑',
  '음식점',
  '숙박',
  '축제/공연/행사',
  '여행코스',
]

export type PlaceTagType = (typeof PLACE_TAG)[number]
