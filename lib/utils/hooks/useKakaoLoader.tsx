import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk'
// 참고 https://apis.map.kakao.com/web/guide/
export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_API as string,
    libraries: ['clusterer', 'drawing', 'services'],
  })
}
