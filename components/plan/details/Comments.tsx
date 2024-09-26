'use client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useRef } from 'react'

import UserAvatar from '@/components/common/UserAvatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { USER_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { addComment } from '@/lib/HTTP/plan/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import { CommentRequest, CommentResponse } from '@/lib/types/Entity/comment'
import { USER_DEAFULT_STATUSMESSAGE } from '@/lib/types/Entity/user'
import { cn } from '@/lib/utils/cn'
import { toast } from '@/lib/utils/hooks/useToast'
import { Nullable } from '@/lib/utils/typeUtils'

interface CommentsProps {
  planId: number
  comments: Nullable<CommentResponse[]>
  user: any
  className?: string
}
interface GroupedComments {
  [key: number]: CommentResponse[] // 숫자형 키를 사용하여 CommentResponse 배열을 저장
}
const Comments = ({ planId, comments, user, className }: CommentsProps): ReactNode => {
  // #0. 댓글/답글 작성 버튼 클릭시
  const addChildCommentHandler = () => {}

  // 예시 데이터
  // 예시 데이터
  const dummy_comments = [
    {
      id: 0,
      planId: 1,
      parentId: 0, // 본댓글
      content:
        '정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. ',
      time: new Date('2024-09-26T08:00:00'),
      refOrder: 1,
      userId: 1,
      userName: 'User1',
      userImgsrc: 'img1.png',
      userStatusMessage: 'Hello',
    },
    {
      id: 1,
      planId: 1,
      parentId: 1, // id 1에 대한 대댓글
      content:
        '정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. ',
      time: new Date('2024-09-26T09:00:00'),
      refOrder: 1,
      userId: 2,
      userName: 'User2',
      userImgsrc: 'img2.png',
      userStatusMessage: 'Hi',
    },
    {
      id: 3,
      planId: 1,
      parentId: 0, // 본댓글
      content:
        '정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. 정말 아름다운 여행이로군요. ',
      time: new Date('2024-09-26T10:00:00'),
      refOrder: 2,
      userId: 3,
      userName: 'User3',
      userImgsrc: 'img3.png',
      userStatusMessage: 'Good morning',
    },
    {
      id: 4,
      planId: 1,
      parentId: 1, // id 3에 대한 대댓글
      content: '대댓글 2-1',
      time: new Date('2024-09-26T11:00:00'),
      refOrder: 1,
      userId: 4,
      userName: 'User4',
      userImgsrc: 'img4.png',
      userStatusMessage: 'Good day',
    },
    {
      id: 5,
      planId: 1,
      parentId: 1, // id 3에 대한 대댓글
      content: '대댓글 3-1',
      time: new Date('2024-09-26T11:00:00'),
      refOrder: 2,
      userId: 4,
      userName: 'User4',
      userImgsrc: 'img4.png',
      userStatusMessage: 'Good day',
    },
  ]

  // 1. parentId로 그룹화
  const groupedComments: GroupedComments = dummy_comments
    ? dummy_comments.reduce((acc, comment) => {
        const { parentId } = comment
        if (!acc[parentId]) {
          acc[parentId] = []
        }
        acc[parentId].push(comment)
        return acc
      }, {} as GroupedComments)
    : []
  // console.log(groupedComments)

  // 2. 본댓글과 대댓글 분리 및 본댓글 기준 정렬
  const sortedComments = Object.values(groupedComments)
    .filter((group: CommentResponse[]) => group.some(comment => comment.id === comment.parentId))
    .map((group: CommentResponse[]) => {
      // 본댓글 (parentId == id)
      const parentComment = group.find(comment => comment.id === comment.parentId)
      // 대댓글 (parentId != id)
      const childComments = group
        .filter((comment: CommentResponse) => comment.id !== comment.parentId)
        .sort((a, b) => a.refOrder - b.refOrder) // refOrder를 기준으로 오름차순 정렬

      return { parentComment, childComments }
    })
    .sort((a, b) => a.parentComment!.time.getMilliseconds() - b.parentComment!.time.getMilliseconds()) // 본댓글을 기준으로 시간 오름차순 정렬

  return (
    <div className={cn('relative flex flex-col items-end justify-start gap-2', className)}>
      <p className='w-full py-3 text-xl font-semibold'>댓글&nbsp;{comments?.length}개</p>
      <PostComment user={user} planId={planId} />

      {sortedComments.map(commentGroup => (
        <React.Fragment key={commentGroup.parentComment?.id}>
          <PlanComment id='parentComment' comment={commentGroup.parentComment as CommentResponse} />
          {commentGroup.childComments.map(childComment => (
            <PlanComment id='childComment' comment={childComment} key={childComment.id} />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Comments

/**
 * 댓글 적기 컴포넌트
 */
interface PostCommentProps {
  user: any
  planId: number
}
const PostComment = ({ user, planId }: PostCommentProps) => {
  const router = useRouter()
  // console.log('user:', user)

  const commentRef = useRef<HTMLTextAreaElement>(null)

  // #0. 제출
  const { mutate } = useMutation({
    mutationKey: ['plan', 'comment', planId],
    mutationFn: addComment,
    onSuccess: () => {
      // router.refresh()
      toast({ title: '댓글 업로드 성공' })
    },
    onError: error => {
      toast({ title: error.message })
    },
    onSettled: () => {
      if (commentRef.current) commentRef.current.value = '' // 입력값 초기화
    },
  })

  // #1. 엔터키 눌렀을때 제출
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }
  // #1. 버튼 클릭시 제출
  const handleSubmit = () => {
    const comment = commentRef.current?.value.trim()
    if (comment && commentRef.current) {
      const newComment: CommentRequest = {
        planId: planId,
        parentId: 0,
        content: commentRef.current.value,
        time: new Date(),
        refOrder: 0, // New Comment
      }
      console.log(newComment)

      mutate({ newComment: newComment, accessToken: user.accessToken })
    }
  }

  return (
    <div className='flex w-full flex-col items-start justify-start gap-3'>
      <div className='flex items-center justify-start gap-2'>
        {/* Todo: 실제 유저 이미지로 변경하기 */}
        {/* <UserAvatar imgSrc={session.data.image || USER_DEFAULT_IMAGE} /> */}
        <UserAvatar imgSrc={USER_DEFAULT_IMAGE} />

        <div className='flex flex-col items-start justify-start'>
          <p className='text-lg font-semibold'>{'김지호'}</p>
          <p className='text-sm text-tbGray'>{USER_DEAFULT_STATUSMESSAGE}</p>
        </div>
      </div>
      <div className='flex w-full items-end justify-start gap-4'>
        <Textarea ref={commentRef} placeholder={'멋진 댓글을 달아주세요!'} onKeyDown={handleKeyDown} />

        <Button variant='tbPrimary' onClick={handleSubmit}>
          댓글 작성
        </Button>
      </div>
    </div>
  )
}

/**
 * 완성된 댓글 컴포넌트
 */
interface PlanCommentProps {
  id: 'parentComment' | 'childComment'
  comment: CommentResponse
}
const PlanComment = ({ id, comment }: PlanCommentProps): ReactNode => {
  const { content, time, userImgsrc, userName, userStatusMessage } = comment
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start justify-start gap-3 rounded-md px-2 py-4',
        id === 'parentComment' ? 'bg-white' : 'w-[95%] bg-tbPlaceholder',
      )}
    >
      <div className='flex w-full items-center justify-start gap-2'>
        {/* Todo: 실제 유저 이미지로 변경하기 */}
        {/* <UserAvatar imgSrc={session.data.image || USER_DEFAULT_IMAGE} /> */}
        <UserAvatar imgSrc={userImgsrc} />

        <div className='flex flex-grow flex-col items-start justify-start'>
          <div className='relative w-full text-lg font-semibold'>
            {userName}
            <div className='absolute right-0 top-0 flex flex-row items-center justify-end gap-2'>
              <LucideIcon name='MessageCircle' size={18} className='cursor-pointer' />

              <LucideIcon name='EllipsisVertical' size={18} className='cursor-pointer' />
            </div>
          </div>
          <p className='text-sm text-tbGray'>{userStatusMessage}</p>
        </div>
      </div>
      <div className='line-clamp-2 flex w-full items-end justify-start gap-4'>{content}</div>
    </div>
  )
}
