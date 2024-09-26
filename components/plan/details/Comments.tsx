'use client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

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
  // 대댓글 다루기
  const [addCommentParentId, setAddCommentParentId] = useState<number>()
  const [nextRefOrder, setNextRefOrder] = useState<number>(1) // 다음 refOrder를 저장하기 위한 상태

  const addCommentRef = useRef<HTMLDivElement | null>(null) // 스크롤 이동을 위한 ref
  const handleAddChildComment = (parentId: number) => {
    setAddCommentParentId(parentId)
  }

  useEffect(() => {
    if (addCommentParentId !== undefined && addCommentRef.current) {
      addCommentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }) // t

      // refOrder 계산 로직 추가
      const targetCommentGroup = sortedComments.find(
        commentGroup => commentGroup.parentComment?.id === addCommentParentId,
      )

      if (targetCommentGroup) {
        const lastChildComment = targetCommentGroup.childComments[targetCommentGroup.childComments.length - 1]
        const lastRefOrder = lastChildComment ? lastChildComment.refOrder : 0 // 마지막 대댓글의 refOrder
        setNextRefOrder(lastRefOrder + 1) // 다음 refOrder 설정
      } else {
        setNextRefOrder(1) // 대댓글이 없는 경우 1로 설정
      }
    }
  }, [addCommentParentId]) // addCommentParentId가 변경될 때마다 스크롤 이동

  // #0. 댓글/답글 작성 버튼 클릭시
  const addChildCommentHandler = () => {}

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
  console.log(sortedComments)

  return (
    <div className={cn('relative flex flex-col items-end justify-start gap-2', className)}>
      <p className='w-full py-3 text-xl font-semibold'>댓글&nbsp;{comments?.length}개</p>
      <PostComment id='parentComment' user={user} planId={planId} />

      {sortedComments.map(commentGroup => (
        <div
          key={commentGroup.parentComment?.id}
          className='relative flex w-full flex-col items-end justify-start gap-3 border-b-2 border-solid border-tbPlaceholder pb-6'
        >
          <PlanComment
            id='parentComment'
            comment={commentGroup.parentComment as CommentResponse}
            handleAddChildComment={handleAddChildComment}
          />
          {commentGroup.childComments.map(childComment => (
            <PlanComment
              id='childComment'
              comment={childComment}
              key={childComment.id}
              handleAddChildComment={handleAddChildComment}
            />
          ))}
          <div ref={addCommentRef} className='w-[95%]'>
            {addCommentParentId && commentGroup.parentComment?.id === addCommentParentId && (
              <PostComment
                id='childComment'
                user={user}
                planId={planId}
                addCommentParentId={addCommentParentId}
                nextRefOrder={nextRefOrder}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments

/**
 * 댓글 적기 컴포넌트
 */
interface PostCommentProps {
  id: 'parentComment' | 'childComment'
  user: any
  planId: number
  addCommentParentId?: number
  nextRefOrder?: number
}
const PostComment = ({ id, user, planId, addCommentParentId, nextRefOrder }: PostCommentProps) => {
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
        parentId: id === 'parentComment' ? 0 : (addCommentParentId as number),
        content: commentRef.current.value,
        time: new Date(),
        refOrder: id === 'parentComment' ? 0 : (nextRefOrder as number), // New Comment
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

        <Button variant={id === 'parentComment' ? 'tbPrimary' : 'tbSecondary'} onClick={handleSubmit}>
          {id === 'parentComment' ? '댓글 작성' : '답글 작성'}
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
  handleAddChildComment: (parentId: number) => void
}
const PlanComment = ({ id, comment, handleAddChildComment }: PlanCommentProps): ReactNode => {
  const { content, time, userImgsrc, userName, userStatusMessage } = comment

  const handleClick = () => {
    if (id === 'parentComment') {
      handleAddChildComment(comment.id)
    } else if (id === 'childComment') {
      handleAddChildComment(comment.parentId)
    }
  }

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
              <LucideIcon onClick={handleClick} name='MessageCircle' size={18} className='cursor-pointer' />

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
