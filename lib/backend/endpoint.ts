// 백엔드 엔드포인트를 정의하는 곳
const server =
  process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCAL_URL : process.env.NEXT_PUBLIC_BACKEND_URL
