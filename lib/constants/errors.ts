export const ClientModalData = {
  // 성공
  signInSuccess: {
    id: 'info',
    title: '회원가입 완료',
    description: 'TRABOOK의 회원이 되신것을 진심으로 환영합니다!',
    isError: false,
  },
  signOutSuccess: {
    id: 'info',
    title: '회원탈퇴 완료',
    description: '더 좋은 서비스를 제공하기 위해 노력하겠습니다',
    isError: false,
  },
  submitPlan: {
    id: 'confirm',
    title: '여행 글쓰기',
    description: '여행계획을 마치고 이를 개시하겠습니까?',
    isError: false,
  },
  // 실패
  dupUserError: {
    id: 'info',
    title: '회원가입',
    description: '이미 가입된 이메일입니다',
    isError: true,
  },
  dupEmailError: {
    id: 'info',
    title: '이메일 인증',
    description: '이미 가입된 이메일입니다',
    isError: true,
  },
  diffCodeError: {
    id: 'info',
    title: '이메일 인증',
    description: '올바른 인증번호가 아닙니다',
    isError: true,
  },
  signUpStepError: {
    id: 'info',
    title: '단계 오류',
    description: '현재 단계를 완료해주세요',
    isError: true,
  },
  signUpNetError: {
    id: 'info',
    title: '회원가입',
    description: '회원가입이 실패하였습니다. 다시 시도해주세요',
    isError: true,
  },
  saveSkipError: {
    id: 'confirm',
    title: '변경 내용 저장',
    description: '변경된 내용을 저장하지 않고 이동하시겠습니까?',
    isError: true,
  },
  loginRequiredError: {
    id: 'confirm',
    title: '로그인 필요',
    description: '로그인 창으로 이동하시겠습니까?',
    isError: true,
  },

  checkImageError: {
    id: 'info',
    title: '썸네일 이미지 입력',
    description: '여행 썸네일 이미지를 첨부해주세요',
    isError: true,
  },
  checkTitleError: {
    id: 'info',
    title: '여행 제목 입력',
    description: '여행 제목을 입력해주세요',
    isError: true,
  },
  checkDescriptionError: {
    id: 'info',
    title: '여행 설명 입력',
    description: '여행 설명을 입력해주세요',
    isError: true,
  },
  checkMemberCntError: {
    id: 'info',
    title: '여행 인원 입력',
    description: '인원수를 입력해주세요',
    isError: true,
  },
  checkBudgetError: {
    id: 'info',
    title: '여행 예산 입력',
    description: '여행 예산을 입력해주세요',
    isError: true,
  },

  // Server Error
  serverError: {
    id: 'info',
    title: '서버 오류',
    description: '일시적 오류. 다시 시도해주세요',
    isError: true,
  },
  // Temporary
  serviceOnReady: {
    id: 'info',
    title: '서비스 준비중입니다!',
    description: '더 좋은 서비스로 돌아오겠습니다',
    isError: false,
  },

  //Confirm
  routeWithoutSave: {
    id: 'confirm',
    title: '변경사항 저장',
    description: '이동하기 전에 꼭 저장해주세요!',
    isError: true,
  },
  deleteScrap: {
    id: 'confirm',
    title: '여행지 보관함 삭제',
    description: '선택하신 여행지를 보관함에서 삭제하시겠습니까?',
    isError: false,
  },
} as const
