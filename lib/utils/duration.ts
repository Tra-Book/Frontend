const KAKAO_MOBILITY_URL = 'https://apis-navi.kakaomobility.com/v1/directions'

type Place = {
  x: string
  y: string
}

export const getDuration = async (start: Place, end: Place) => {
  const origin = `${start.x},${start.y}`
  const destination = `${end.x},${end.y}`
  const priority = 'RECOMMEND'
  const url = `${KAKAO_MOBILITY_URL}?origin=${origin}&destination=${destination}&priority=${priority}`

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await res.json()

    if (res.ok) {
      return Math.floor(data.routes[0].summary.duration / 60)
    } else {
      return { message: 'fetch failed' }
    }
  } catch (error) {
    return { message: 'fetch error' }
  }
}

// 판교역
const dummy1: Place = {
  x: '127.11015314141542',
  y: '37.394912',
}

// 강남역
const dummy2: Place = {
  x: '127.028361548',
  y: '37.496486063',
}

export const testDuration = async () => {
  const result = await getDuration(dummy1, dummy2)
  return result
}
