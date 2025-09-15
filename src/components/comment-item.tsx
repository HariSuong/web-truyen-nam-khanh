// components/CommentItem.tsx
'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

// Định nghĩa kiểu dữ liệu cho bình luận và trả lời
interface CommentData {
  id: string
  name: string
  text: string
  createdAt: Timestamp
}

interface CommentItemProps {
  comment: CommentData
}

export default function CommentItem({ comment }: CommentItemProps) {
  const [replies, setReplies] = useState<CommentData[]>([])
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyName, setReplyName] = useState('')
  const [replyText, setReplyText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Lắng nghe các câu trả lời (replies) của bình luận này
  useEffect(() => {
    const repliesQuery = query(
      collection(db, 'comments', comment.id, 'replies'),
      orderBy('createdAt', 'asc') // Sắp xếp trả lời từ cũ đến mới
    )
    const unsubscribe = onSnapshot(repliesQuery, snapshot => {
      const repliesData: CommentData[] = []
      snapshot.forEach(doc => {
        repliesData.push({ id: doc.id, ...doc.data() } as CommentData)
      })
      setReplies(repliesData)
    })
    return () => unsubscribe()
  }, [comment.id])

  // Hàm xử lý khi gửi một câu trả lời
  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // KIỂM TRA TÊN VÀ ĐẶT TÊN MẶC ĐỊNH NẾU CẦN
    const finalReplyName = replyName.trim() === '' ? 'Ẩn danh' : replyName

    // Chỉ kiểm tra nội dung bình luận
    if (replyText.trim() === '') {
      setError('Vui lòng nhập nội dung bình luận.')
      return
    }
    setError('')
    setIsLoading(true)

    try {
      await addDoc(collection(db, 'comments', comment.id, 'replies'), {
        name: finalReplyName,
        text: replyText,
        createdAt: serverTimestamp()
      })
      setReplyText('')
      setReplyName('')
      setShowReplyForm(false)
    } catch (err) {
      setError('Gửi trả lời thất bại, vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-start space-x-4'>
      <Avatar>
        <AvatarFallback className='bg-[#c8ab84] text-[#856244]'>
          {comment.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className='flex-1'>
        <p className='font-bold text-[#c19671]'>{comment.name}</p>
        <p className='text-[#684d36] whitespace-pre-wrap'>{comment.text}</p>
        <div className='flex items-center space-x-4'>
          <p className='text-xs text-[#58412d] mt-1'>
            {comment.createdAt?.toDate().toLocaleDateString('vi-VN')}
          </p>
          <Button
            variant='link'
            className='text-xs p-0 h-auto text-[#6b4f36]'
            onClick={() => setShowReplyForm(!showReplyForm)}>
            Trả lời
          </Button>
        </div>

        {/* Hiển thị các câu trả lời */}
        <div className='mt-4 space-y-4 pl-6 border-l-2 border-[#604731]'>
          {replies.map(reply => (
            <div key={reply.id} className='flex items-start space-x-3'>
              <Avatar className='w-8 h-8'>
                <AvatarFallback className='bg-[#c8ab84] text-[#856244] text-xs'>
                  {reply.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <p className='font-bold text-sm text-[#684d36]'>{reply.name}</p>
                <p className='text-[#684d36] text-sm whitespace-pre-wrap'>
                  {reply.text}
                </p>
                <p className='text-xs text-[#58412d] mt-1'>
                  {reply.createdAt?.toDate().toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Form để trả lời bình luận */}
        {showReplyForm && (
          <form onSubmit={handleReplySubmit} className='mt-4 pl-6 space-y-2'>
            <Input
              placeholder='Tên của bạn...'
              value={replyName}
              onChange={e => setReplyName(e.target.value)}
              className='border-[#c8ab84] text-[#856244] placeholder:text-[#856244] focus:ring-[#856244]'
            />
            <Textarea
              placeholder={`Trả lời ${comment.name}...`}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              className='border-[#c8ab84] text-[#856244] placeholder:text-[#856244] focus:ring-[#856244]'
            />
            {error && <p className='text-red-400 text-sm'>{error}</p>}

            <Button type='submit' size='sm' disabled={isLoading}>
              {isLoading ? 'Đang gửi...' : 'Gửi'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
