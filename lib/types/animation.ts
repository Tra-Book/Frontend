export type Animation = {
  initial: object
  animate: object
  exit: object
  transition: object
  whileInView: object
  viewport: object
}
export type partialAnimation = Partial<Animation>

export type AnimationKey = keyof Animation

export const fadeInLeft = (duration: number = 0.5, delay: number = 0): partialAnimation => {
  return { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration, delay } }
}

export const fadeInRight = (duration: number = 0.5, delay: number = 0): partialAnimation => {
  return { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, transition: { duration, delay } }
}

export const fadeIn = (duration: number = 1, delay: number = 0): partialAnimation => {
  return { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration, delay } }
}

export const fadeOut = (duration: number = 1, delay: number = 0): partialAnimation => {
  return { initial: { opacity: 1 }, animate: { opacity: 0 }, transition: { duration, delay } }
}

export const bounce = (
  duration: number = 0.8, // 전체 애니메이션의 시간
  delay: number = 0, // 시작 전 대기 시간
  bounceHeight: number = 30, // 바운싱 높이
  stayDuration: number = 0.5, // 아래에서 머무는 시간
): partialAnimation => {
  return {
    initial: { y: 0 }, // 시작 위치
    animate: { y: [0, -bounceHeight, 0] }, // y 값 변화: 0 → -bounceHeight → 0
    transition: {
      duration, // 애니메이션 시간
      delay, // 애니메이션 시작 전 대기 시간
      times: [0, 0.3, 1], // 타이밍 배열: 애니메이션이 30%에서 가장 높이 도달
      ease: ['easeOut', 'easeIn'], // easeOut으로 빠르게 올라가고, easeIn으로 천천히 내려옴
      repeat: Infinity, // 무한 반복
      repeatType: 'loop', // 반복될 때마다 애니메이션 재시작
      repeatDelay: stayDuration, // 반복 사이에 대기 시간 (아래에서 머무는 시간)
    },
  }
}
