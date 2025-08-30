import Comments from '@/components/comment'
import Story from '@/components/story'

export default function Home() {
  return (
    <>
      <Story />

      {/* Phần video và kết luận ở đây */}
      <Comments />
    </>
  )
}
