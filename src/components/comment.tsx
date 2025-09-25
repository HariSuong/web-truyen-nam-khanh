'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase' // Đảm bảo đường dẫn này đúng
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
import { Textarea } from '@/components/ui/textarea'
import CommentItem from '@/components/comment-item' // Component con

// Định nghĩa kiểu dữ liệu cho một bình luận
export interface Comment {
  id: string
  name: string
  text: string
  createdAt: Timestamp
}

// Component sẽ nhận postId để biết bình luận thuộc bài viết nào
interface CommentsProps {
  postId: string
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newName, setNewName] = useState('')
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Lắng nghe sự thay đổi trong subcollection 'comments' của bài viết này
  useEffect(() => {
    if (!postId) return

    const q = query(
      collection(db, 'posts', postId, 'comments'),
      orderBy('createdAt', 'desc')
    )
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const commentsData: Comment[] = []
      querySnapshot.forEach(doc => {
        commentsData.push({ id: doc.id, ...doc.data() } as Comment)
      })
      setComments(commentsData)
    })

    return () => unsubscribe()
  }, [postId]) // Chạy lại khi postId thay đổi

  // Hàm xử lý khi người dùng gửi bình luận GỐC
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const finalName = newName.trim() === '' ? 'Ẩn danh' : newName

    if (newComment.trim() === '') {
      setError('Vui lòng nhập nội dung bình luận.')
      return
    }
    setError('')
    setIsLoading(true)
    try {
      // Thêm comment vào subcollection của bài viết hiện tại
      await addDoc(collection(db, 'posts', postId, 'comments'), {
        name: finalName,
        text: newComment,
        createdAt: serverTimestamp()
      })
      setNewComment('')
      setNewName('')
    } catch (err) {
      console.error('Error adding comment: ', err)
      setError('Đã có lỗi xảy ra, vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='mt-16 bg-transparent border-none shadow-none'>
      <CardHeader className='px-0'>
        <CardTitle className='text-2xl font-bold'>
          Để lại một bình luận
        </CardTitle>
      </CardHeader>
      <CardContent className='px-0'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            placeholder='Tên của bạn (mặc định là "Ẩn danh")'
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <Textarea
            placeholder='Viết bình luận của bạn tại đây...'
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className='h-36'
          />
          {error && <p className='text-sm text-destructive'>{error}</p>}
          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Đang gửi...' : 'Gửi Bình Luận'}
          </Button>
        </form>

        <Separator className='my-8' />

        <div className='space-y-6'>
          <h3 className='text-xl font-bold'>{comments.length} Bình Luận</h3>
          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId} // Truyền postId xuống cho component con
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
