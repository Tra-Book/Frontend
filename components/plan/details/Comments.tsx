'use client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

import Loading from '@/components/common/Loading'
import UserAvatar from '@/components/common/UserAvatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { USER_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { ClientModalData } from '@/lib/constants/errors'
import { ROUTES } from '@/lib/constants/routes'
import { queryClient } from '@/lib/HTTP/http'
import { addComment } from '@/lib/HTTP/plan/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import { CommentRequest, CommentResponse } from '@/lib/types/Entity/comment'
import { USER_DEAFULT_STATUSMESSAGE } from '@/lib/types/Entity/user'
import { cn } from '@/lib/utils/cn'
import { getRelativeTimeString } from '@/lib/utils/dateUtils'
import useModal from '@/lib/utils/hooks/useModal'
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
  const [planComments, setPlanComments] = useState<Nullable<CommentResponse[]>>(comments)
  // 대댓글 다루기
  const [addCommentParentId, setAddCommentParentId] = useState<number>()
  const [nextRefOrder, setNextRefOrder] = useState<number>(1) // 다음 refOrder를 저장하기 위한 상태

  const addCommentRef = useRef<HTMLDivElement | null>(null) // 스크롤 이동을 위한 ref

  /**
   * 대댓글창 열기 함수
   * @param parentId 열고자 하는 댓글의 부모 ID
   */
  const handleAddChildComment = (parentId: number | undefined) => {
    setAddCommentParentId(parentId)
  }
  const addPlanComment = (newComment: CommentResponse) => {
    setPlanComments(prev => (prev ? [...prev, newComment] : [newComment]))
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

  // #1. parentId로 그룹화
  const groupedComments: GroupedComments = planComments
    ? planComments.reduce((acc, comment) => {
        const { parentId } = comment
        if (!acc[parentId]) {
          acc[parentId] = []
        }
        acc[parentId].push(comment)
        return acc
      }, {} as GroupedComments)
    : []

  console.log(groupedComments)

  // #2. 본댓글과 대댓글 분리 및 본댓글 기준 정렬
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
    .sort((a, b) => new Date(a.parentComment!.time).getTime() - new Date(b.parentComment!.time).getTime()) // 본댓글을 기준으로 시간 오름차순 정렬
  console.log(sortedComments)
  return (
    <div className={cn('relative flex flex-col items-end justify-start gap-2', className)}>
      <p className='w-full py-3 text-xl font-semibold'>댓글&nbsp;{planComments?.length}개</p>
      <PostComment
        id='parentComment'
        user={user}
        planId={planId}
        handleAddChildComment={handleAddChildComment}
        addPlanComment={addPlanComment}
      />

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
                handleAddChildComment={handleAddChildComment}
                addPlanComment={addPlanComment}
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
  handleAddChildComment: (parentId: number | undefined) => void
  addPlanComment: (newComment: CommentResponse) => void
}
const PostComment = ({
  id,
  user,
  planId,
  addCommentParentId,
  nextRefOrder,
  handleAddChildComment,
  addPlanComment,
}: PostCommentProps) => {
  const router = useRouter()
  const { modalData, handleModalStates, Modal } = useModal()
  const commentRef = useRef<HTMLTextAreaElement>(null)

  // #0. 제출
  const { mutate, isPending } = useMutation({
    mutationKey: ['plan', 'comment', planId],
    mutationFn: addComment,
    /**
     * data: mutate return value
     * variables: mutate 인자
     */
    onSuccess: (data, variables) => {
      // router.refresh()
      queryClient.invalidateQueries({ queryKey: ['plan', planId] })
      // #1. 대댓글창 닫기
      handleAddChildComment(undefined)
      // #2. 낙관적 업데이트
      const newComment: CommentResponse = {
        ...variables.newComment,
        parentId: variables.newComment.parentId === 0 ? data.commentId : variables.newComment.parentId,
        id: data.commentId,
        userId: user.userId,
        userName: user.nickname,
        userStatusMessage: user.status_message,
        userImgsrc: user.image,
      }
      addPlanComment(newComment)
      // #3. 완료창
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
    // Case1: 로그인X 상태
    if (!user) {
      handleModalStates(ClientModalData.loginRequiredError, 'open')
      return
    }
    // Case1: 댓글 안씀
    if (comment?.length === 0) {
      toast({ title: '댓글을 작성하여 주세요' })
      return
    }
    if (comment && commentRef.current) {
      const newComment: CommentRequest = {
        planId: planId,
        parentId: id === 'parentComment' ? 0 : (addCommentParentId as number),
        content: commentRef.current.value,
        time: new Date().toISOString(),
        refOrder: id === 'parentComment' ? 0 : (nextRefOrder as number), // New Comment
      }

      mutate({ newComment: newComment, accessToken: user.accessToken })
    }
  }

  return (
    <div className='flex w-full flex-col items-start justify-start gap-3'>
      <div className='flex items-center justify-start gap-2'>
        <UserAvatar imgSrc={user ? user.image : USER_DEFAULT_IMAGE} />

        <div className='flex flex-col items-start justify-start'>
          <p className='text-lg font-semibold'>{user ? user.nickname : '로그인하세요'}</p>
          <p className='text-sm text-tbGray'>{user ? user.status_message : USER_DEAFULT_STATUSMESSAGE}</p>
        </div>
      </div>
      <div className='flex w-full items-end justify-start gap-4'>
        <Textarea ref={commentRef} placeholder={'멋진 댓글을 달아주세요!'} onKeyDown={handleKeyDown} />

        {
          <Button
            variant={id === 'parentComment' ? 'tbPrimary' : 'tbSecondary'}
            onClick={handleSubmit}
            className='relative h-12 w-20'
          >
            {isPending ? <Loading /> : id === 'parentComment' ? '댓글 작성' : '답글 작성'}
          </Button>
        }
      </div>
      <Modal id='confirm' onConfirm={() => router.push(ROUTES.AUTH.LOGIN.url)} />
    </div>
  )
}

/**
 * 완성된 댓글 컴포넌트
 */
interface PlanCommentProps {
  id: 'parentComment' | 'childComment'
  comment: CommentResponse
  handleAddChildComment: (parentId: number | undefined) => void
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
          <div className='relative flex w-full items-center justify-start gap-2 text-lg font-semibold'>
            <span>{userName}</span>
            <span className='text-xs text-tbGray'>{getRelativeTimeString(new Date(time))}</span>
            <div className='absolute right-0 top-0 flex flex-row items-center justify-end gap-2'>
              {id === 'parentComment' && (
                <LucideIcon onClick={handleClick} name='MessageCircle' size={18} className='cursor-pointer' />
              )}

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
