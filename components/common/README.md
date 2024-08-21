### 프로젝트 전반적으로 공통으로 사용되는 컴포넌트들을 위치시킵니다.

### MotionWrapper.tsx

유명한 애니메이션 라이브러리인 Framer Motion에서 사용하기 위해서는 기본적으로 `use client`가 필수입니다.

다만, nextjs에서 서버 컴포넌트를 사용하며 Prerendering하기 위해서는 최소한의 부분만을 `use client`로 사용해야 합니다.

그러므로, Framer moiotn Wrapper를 생성하였습니다. `MotionWrapper.tsx`

사용방법

1. props

- tag: 기본적으로 `<motion.div>` 이지만, `li` `span` 등 framer motion에서 지원하는 태그를 사용할 수 있습니다
- className: tailwindcss
- animation: 가장 중요한 props로, framer motion에서 제공하는 애니메이션을 지정하는데 사용됩니다.
  라이브러리에서 제공하는 props들을 객체 형식으로 받으며, 추가가 필요한 props는 추가하여 사용하면 됩니다.

ex

```Typescript
<Motion
  key={slogan}
  animation={{
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.9], delay: index * 0.5 },
  }}
  className='font-mclaren text-4xl font-bold md:text-5xl'
>
  {slogan}
</Motion>
```

2. `animation.ts` : 애니메이션 Type 저장 및 자주 사용하는 애니메이션 저장소

Type Animation : Motion Wrapper에서 사용하는 animation 객체의 형식

```Typescript
export type Animation = {
  initial: object
  animate: object
  transition: object
  whileInView: object
  viewport: object
}
```

Type partialAnimation : TS 유틸리티 함수인 Partial을 사용하여 Animation 필드를 not required로 바꿔줍니다.
`Animation` 의 모든 값이 필수는 아니므로, 이를 활용하여 Type을 사용하면 됩니다.

```Typescript
export type partialAnimation = Partial<Animation>
```
