import { Geo } from '../types/Entity/place'

const KAKAO_MOBILITY_URL = 'https://apis-navi.kakaomobility.com/v1/directions'

export const fetchDuration = async (start: Geo, end: Geo) => {
  const origin = `${start.longitude},${start.latitude}`
  const destination = `${end.longitude},${end.latitude}`
  const priority = 'RECOMMEND'
  const url = `${KAKAO_MOBILITY_URL}?origin=${origin}&destination=${destination}&priority=${priority}`

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API}`,
        'Content-Type': 'application/json',
      },

      // credentials: 'include',
    })

    const data = await res.json()

    if (res.ok) {
      return Math.floor(data.routes[0].summary.duration / 60)
    } else {
      return 0
    }
  } catch (error) {
    return 0
  }
}
