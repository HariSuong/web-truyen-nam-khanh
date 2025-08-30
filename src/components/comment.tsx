// components/Comments.tsx
'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase' // Sửa đường dẫn import
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import CommentItem from '@/components/comment-item'

// Định nghĩa kiểu dữ liệu cho một bình luận
interface Comment {
  id: string
  name: string
  text: string
  createdAt: Timestamp
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [newName, setNewName] = useState('')
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Lắng nghe sự thay đổi trong collection 'comments' (chỉ các bình luận gốc)
  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const commentsData: Comment[] = []
      querySnapshot.forEach(doc => {
        commentsData.push({ id: doc.id, ...doc.data() } as Comment)
      })
      setComments(commentsData)
    })

    return () => unsubscribe()
  }, [])

  // Hàm xử lý khi người dùng gửi bình luận GỐC
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim() === '' || newName.trim() === '') {
      setError('Vui lòng nhập tên và nội dung bình luận.')
      return
    }
    setError('')
    setIsLoading(true)
    try {
      await addDoc(collection(db, 'comments'), {
        name: newName,
        text: newComment,
        createdAt: serverTimestamp()
      })
      setNewComment('')
      setNewName('')
    } catch (err) {
      setError('Đã có lỗi xảy ra, vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='mt-16 md:mt-24 pt-6 bg-transparent border-none shadow-none'>
      <CardHeader className='px-0'>
        <CardTitle className='font-playfair text-3xl text-gray-200'>
          Để Lại Lời Nhắn
        </CardTitle>
      </CardHeader>
      <CardContent className='px-0'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            placeholder='Tên của bạn...'
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className='bg-black/20 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:ring-gray-500'
          />
          <Input
            placeholder='Viết bình luận của bạn tại đây...'
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className='bg-black/20 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:ring-gray-500'
          />
          {error && <p className='text-red-400 text-sm'>{error}</p>}
          <Button
            type='submit'
            disabled={isLoading}
            className='bg-gray-200 text-black hover:bg-white'>
            {isLoading ? 'Đang gửi...' : 'Gửi Bình Luận'}
          </Button>
        </form>

        <Separator className='my-8 bg-gray-700/50' />

        <div className='space-y-6'>
          <h3 className='font-playfair text-2xl text-gray-200'>
            {comments.length} Bình Luận
          </h3>
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
