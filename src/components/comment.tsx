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
import { Textarea } from '@/components/ui/textarea'

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
    // KIỂM TRA TÊN VÀ ĐẶT TÊN MẶC ĐỊNH NẾU CẦN
    const finalName = newName.trim() === '' ? 'Ẩn danh' : newName

    // Chỉ kiểm tra nội dung bình luận
    if (newComment.trim() === '') {
      setError('Vui lòng nhập nội dung bình luận.')
      return
    }
    setError('')
    setIsLoading(true)
    try {
      await addDoc(collection(db, 'comments'), {
        name: finalName,
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
        <CardTitle className='font-momo text-sm md:text-base text-[#856244] italic'>
          Tí lời ngỏ hen: Vì quá thích hình ảnh hai anh trong quân phục cũng như
          câu chuyện trong concert Sao Nhập Ngũ đã chạm tới tui. Sau đó lại còn
          nghe thêm phần song ca Còn gì đẹp hơn của Nam và Hùng, lời ca của nó
          vừa thơ, vừa đẹp, vừa đau mà kiểu không lụy, đau kiểu bi tráng á.{' '}
          <br />
          Xong cái tui có cảm hứng muốn làm một clip nhỏ lồng ghép hình ảnh của
          Nam Khánh để phù hợp với tính chất bài hát. <br />
          Mà lúc đó có mí bà hay viết đoạn ngắn trên thread nói việc Nam đi xa
          mua đồ về cho Khánh ở hậu phương á. Cái trong quá trình vừa làm vid
          vừa tự des ảnh cho phù hợp đồ, cái tui nghĩ ra cả một câu chuyện dài
          liên kết mọi thứ, nên mới viết nên truyện này nè. <br />
          Mọi thứ đều do tui tự tay làm — từ card, web, truyện cho đến video,
          thú thật des là tui mò tự học lỏm chứ không có chuyên môn gì cả ạ. Nên
          nếu có gì sơ sót, mong mọi người hoan hỉ nha. Hai nhân vật này chỉ tồn
          tại trong truyện thôi, tui không hề có ý trù ai hết nha. <br /> Cảm ơn
          mọi người đã đọc. Nếu thấy có điều gì muốn góp ý, hoặc đơn giản là một
          lời động viên, cứ comment bên dưới nha. Biết đâu sau này tui sẽ nghĩ
          thêm vài câu chuyện khác của hai người trong những hoàn cảnh khác. Ai
          có concept hay ý tưởng thì hú tui liền nha! 💖
        </CardTitle>
      </CardHeader>
      <CardContent className='px-0'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            placeholder='Tên của bạn...'
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className='border-[#c8ab84] text-[#856244] placeholder:text-[#856244] focus:ring-[#856244]'
          />
          <Textarea
            placeholder='Viết bình luận của bạn tại đây...'
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className='h-36 border-[#c8ab84] text-[#856244] placeholder:text-[#856244] focus:ring-[#856244]'
          />
          {error && <p className='text-red-400 text-sm'>{error}</p>}
          <Button
            type='submit'
            disabled={isLoading}
            className='bg-transparent border border-[#856244] text-[#856244] hover:bg-[#c8ab84] hover:text-white'>
            {isLoading ? 'Đang gửi...' : 'Gửi Bình Luận'}
          </Button>
        </form>

        <Separator className='my-8 bg-[#856244]' />

        <div className='space-y-6'>
          <h3 className='font-playfair text-2xl text-[#856244]'>
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
