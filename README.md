# TraBook

## 🍀 서비스 이름 및 소개

<strong>여행을 간편하고 편리하게 계획하자, TraBook 입니다.</strong>

## 👤 TraBook_CLIENT TEAM

|                       **김지호**                       |                       **신진건**                       |
| :----------------------------------------------------: | :----------------------------------------------------: |
| <center><img src="" width="130" height="130"></center> | <center><img src="" width="130" height="130"></center> |
|         [김지호](https://github.com/jihostudy)         |         [신진건](https://github.com/sjg729729)         |

## 🔗 기술스택

|   **category**   |                                                                                                                                                                                                      **stack**                                                                                                                                                                                                      |
| :--------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   Environment    |                                                                                                                                                        ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)                                                                                                                                                         |
|      Common      |                                                                                                  ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)                                                                                                  |
|     Language     |                                                                                                                                                ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                                                                                |
|      Style       |                                                                                                                                            ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)                                                                                                                                             |
|  Data Fetching   |                                                                                                ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white) ![ReactQuery](https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)                                                                                                 |
| State Management |                                                                                                                                                  ![zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)                                                                                                                                                  |
|    Deployment    |                                                                                                                                                    ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                                                     |
|  Collaboration   | ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white) ![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white)![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white) |

## 📚 주요 라이브러리

Updated Later...

## 📂 폴더 구조

Updated Later...

## ✍️ 컨벤션

### ✨ Git 컨벤션

<!--  <details> -->
<summary>  1️⃣ Commit 컨벤션  </summary>
<br />
<strong> - 기본적으로 (괄호) 안에 Commit과 관련된 route(--page)를 적도록 한다. </strong>

<br />
<strong>Commit Example</strong>
<br /><br />

```
git commit -m ‘✨Feat(startpage): 대표이미지 설정’
```

- **Commit 메시지 종류 설명** (Recommend using gitmoji (![gitmoji](https://gitmoji.dev/)))

| Emoji(선택) |   제목   |               내용                |
| :---------: | :------: | :-------------------------------: |
|     🎉      |   Init   |          브랜치 첫 커밋           |
|     ✨      |   Feat   |      새로운 기능에 대한 커밋      |
|     ♻️      | Refactor |     코드 리팩토링에 대한 커밋     |
|     🐛      |   Fix    |       버그 수정에 대한 커밋       |
|     💄      |  Design  | CSS 등 사용자 UI 디자인 변경 커밋 |
|     ✅      |   Test   |            테스트 커밋            |
|     📝      |   Docs   |       문서 수정에 대한 커밋       |

<br/>

<!--  </details> -->

<!--  <details> -->
<summary>  2️⃣ branch 전략  </summary>
<br />

- `Github flow`
- 브랜치 운영
  - `main` : 완전히 안전하다고 판단되었을 때, 즉 배포가 가능한 최종 merge하는 곳
  - `develop` : 배포하기 전 개발 중일 때 각자의 브랜치에서 merge하는 브랜치
  - `feature/페이지명/#issue-구현 기능`: feature 브랜치. 새로운 기능 개발
  - `init/페이지명/#issue-구현 기능` : init 브랜치. 초기세팅 구현
  - `fix/페이지명/#issue-구현 기능` : fix 브랜치. 버그가 발생 시 수정
  - `refactor/페이지명/#issue-구현 기능` : refactor 브랜치. 리팩토링 구현

```
main
  ㄴ develop
       ㄴ feature/페이지명/#이슈번호-구현 기능(소문자 스네이크 케이스)
```

<!--  </details> -->

<!--  <details> -->

### ✅ 코딩 컨벤션 (Stricted)

<br />

- <strong>컴포넌트</strong>

  - Install Nextjs Snippets on vscode extension & use `tscmp` → TypeScript + ReactNode Snippet (설정 되어있음)
  - 인터페이스 네이밍은 `컴포넌트 네임 + Props` 로 네이밍한다.
  - `props` 는 구조 분해 할당을 한 상태로 가져온다.
  - 꼭 필수적인 prop이 아닌 것들은 `?:` (optional) 타입으로 선언
  - `?:` 옵셔널 타입의 prop은 사용 시 `undefined` 가 될 수 있으므로, 되도록이면 구조 분해 할당으로 가져올 시 `default` 값을 할당해준다.
    ```jsx
    const Button = ({ size = 'medium' }) => {...}
    ```

- <strong>폴더명</strong>

  - 소문자로 시작
  - 단수형으로 작성
  - camelCase

- <strong>타입</strong>

  - 컴포넌트 인터페이스 생성 시 `HTMLAttributes` 혹은 `ComponentWith(out)Props` 인터페이스 상속을 적극 고려해보자.
  - 항상 상속을 이용하였을 때는 rest 문법으로 작성한 `...props` 을 컴포넌트의 prop으로 넘겨주자. </br>
    ```jsx
    const Button = ({ ...props }: ButtonProps) => {
    return <button {...props}>Button</button>
    }
    ```
  - PascalCase 사용

- <strong>변수</strong>

  - `var` 절대 사용 금지
  - 상수는 대문자의 스네이크 케이스 사용 : `GUIDE_MESSAGE`
  - 변수명은 네이밍이 길어져도 무방하니, 의미가 퇴색되지 않게 “잘” 짓다.
  - `boolean` 의 변수는 `is-` 로 짓는다. : `isOpen` , `isSelected`

- <strong>함수</strong>

  - 화살표 함수로 작성한다.
  - 네이밍은 `동사 + 목적어` 로 생성한다. : `checkValidation` , `getResult`
  - 분기 처리(조건문)이 다수 있다면 `early return` 을 적극 권장한다.

- <strong>기타</strong>
  - 선언형 프로그래밍 !
    - `forEach, map` 등을 적극 사용하자. `for, while` 등은 지양한다.
  - 객체 혹은 배열에서 `구조 분해할당` 을 적극 사용한다.
  - 시맨틱 태그를 적극 사용한다.
  - 무분별한 `div` 에 주의한다.
  - tailwind-style-[] 값을 줄이고, 이를 정형화하여 tailwindconfig.css에 저장한다.
  - img 태그의 `alt` 를 꼭 사용하자.

<!--  </details> -->

<!--  <details> -->

### ⭐ 네이밍 컨벤션 (Recommended)

<br />

- `컴포넌트`: 파스칼 케이스 `PascalCase` ex) MainHeader
- `이벤트 핸들러` : 카멜 케이스 `handle` 로 시작 ex) handleClick
- 이벤트 핸들러 `prop` : 카멜 케이스 `on` 으로 시작 ex) onClick
- `이외 변수명` : 카멜 케이스 `camelCase`
- `common` 컴포넌트가 아닌, 도메인을 포함하는 컴포넌트는, `prop` 또한 도메인을 포함시키도록 네이밍
  - ex) `onReservationComplete`
- 네이밍은 길어져도 무방하니, 최대한 해당 `변수` , `함수` , `컴포넌트` 등의 의미를 파악하기 쉽게 짓는다.
- 핸들러: 동사 + 목적어면, (handle)+`목적어-동사` 순으로 작성한다 ex) `handleModalOpen`
- Boolean Prop : `isClicked` , `isOpen` , `isSelected`
- 유틸함수: `동사 + 목적어` 순으로 작성한다. ex) `checkValidation` , `getCalculatedAge`
- 타입명
  - 직관적으로 작성: PascalCase
  - prop type : `ButtonProps` (컴포넌트명 + Props)
  - api 응답 type : `-Data`
  - 객체 변수의 경우 : 그 변수가 무엇인지를 쓰세요.
    - ex. `MemberId`
    - ex. `UserInfo`

<!--  </details> -->
