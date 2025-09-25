'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { Comment } from './comment' // Import lại kiểu dữ liệu từ file cha

interface CommentItemProps {
  comment: Comment
  postId: string // Cần postId để query đúng replies
}

export default function CommentItem({ comment, postId }: CommentItemProps) {
  const [replies, setReplies] = useState<Comment[]>([])
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyName, setReplyName] = useState('')
  const [replyText, setReplyText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Lắng nghe các câu trả lời (replies) của bình luận này
  useEffect(() => {
    if (!postId || !comment.id) return

    const repliesQuery = query(
      collection(db, 'posts', postId, 'comments', comment.id, 'replies'),
      orderBy('createdAt', 'asc')
    )
    const unsubscribe = onSnapshot(repliesQuery, snapshot => {
      const repliesData: Comment[] = []
      snapshot.forEach(doc => {
        repliesData.push({ id: doc.id, ...doc.data() } as Comment)
      })
      setReplies(repliesData)
    })
    return () => unsubscribe()
  }, [postId, comment.id])

  // Hàm xử lý khi gửi một câu trả lời
  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const finalReplyName = replyName.trim() === '' ? 'Ẩn danh' : replyName

    if (replyText.trim() === '') {
      setError('Vui lòng nhập nội dung trả lời.')
      return
    }
    setError('')
    setIsLoading(true)

    try {
      await addDoc(
        collection(db, 'posts', postId, 'comments', comment.id, 'replies'),
        {
          name: finalReplyName,
          text: replyText,
          createdAt: serverTimestamp()
        }
      )
      setReplyText('')
      setReplyName('')
      setShowReplyForm(false)
    } catch (err) {
      console.error('Error adding reply: ', err)
      setError('Gửi trả lời thất bại, vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-start space-x-4'>
      <Avatar>
        {/* Dùng màu của ShadCN */}
        <AvatarFallback>{comment.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className='flex-1'>
        <p className='font-semibold text-foreground'>{comment.name}</p>
        <p className='text-muted-foreground whitespace-pre-wrap'>
          {comment.text}
        </p>
        <div className='flex items-center space-x-4'>
          <p className='text-xs text-muted-foreground mt-1'>
            {comment.createdAt?.toDate().toLocaleDateString('vi-VN')}
          </p>
          <Button
            variant='link'
            className='text-xs p-0 h-auto'
            onClick={() => setShowReplyForm(!showReplyForm)}>
            Trả lời
          </Button>
        </div>

        {/* Form để trả lời bình luận */}
        {showReplyForm && (
          <form onSubmit={handleReplySubmit} className='mt-4 space-y-2'>
            <Input
              placeholder='Tên của bạn...'
              value={replyName}
              onChange={e => setReplyName(e.target.value)}
            />
            <Textarea
              placeholder={`Trả lời ${comment.name}...`}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
            />
            {error && <p className='text-sm text-destructive'>{error}</p>}

            <Button type='submit' size='sm' disabled={isLoading}>
              {isLoading ? 'Đang gửi...' : 'Gửi'}
            </Button>
          </form>
        )}

        {/* Hiển thị các câu trả lời */}
        <div className='mt-4 space-y-4 pl-6 border-l-2'>
          {replies.map(reply => (
            <div key={reply.id} className='flex items-start space-x-3'>
              <Avatar className='w-8 h-8'>
                <AvatarFallback className='text-xs'>
                  {reply.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <p className='font-semibold text-sm text-foreground'>
                  {reply.name}
                </p>
                <p className='text-sm text-muted-foreground whitespace-pre-wrap'>
                  {reply.text}
                </p>
                <p className='text-xs text-muted-foreground mt-1'>
                  {reply.createdAt?.toDate().toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
