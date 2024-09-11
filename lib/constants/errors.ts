export const ClientModalData = {
  // 성공
  signInSuccess: {
    title: '회원가입 완료',
    description: 'TRABOOK의 회원이 되신것을 진심으로 환영합니다!',
    isError: false,
  },
  signOutSuccess: {
    title: '회원탈퇴 완료',
    description: '더 좋은 서비스를 제공하기 위해 노력하겠습니다',
    isError: false,
  },
  // Error
  dupUserError: {
    title: '회원가입 실패',
    description: '이미 가입된 이메일입니다',
    isError: true,
  },
  dupEmailError: {
    title: '이메일 인증',
    description: '이미 가입된 이메일입니다',
    isError: true,
  },
  diffCodeError: {
    title: '이메일 인증',
    description: '올바른 인증번호가 아닙니다',
    isError: true,
  },
  signUpStepError: {
    title: '단계 오류',
    description: '현재 단계를 완료해주세요',
    isError: true,
  },
  signUpNetError: {
    title: '회원가입 실패',
    description: '회원가입이 실패하였습니다. 다시 시도해주세요',
    isError: true,
  },

  // Server Error
  serverError: {
    title: '서버 오류',
    description: '일시적 오류. 다시 시도해주세요',
    isError: true,
  },
} as const
