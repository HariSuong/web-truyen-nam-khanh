import Link from 'next/link'
import { format } from 'date-fns'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { getAllPosts } from '@/lib/posts'
import { BlogPagination } from '@/components/blog-pagination'

const POSTS_PER_PAGE = 6

// Trang này cũng là Server Component, nhận searchParams để biết trang hiện tại
export default async function PostsPage({
  searchParams
}: {
  searchParams?: { page?: string }
}) {
  // GỌI HÀM LẤY DỮ LIỆU THẬT TỪ FIREBASE
  const allPosts = await getAllPosts()

  // Logic phân trang
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const postsToShow = allPosts.slice(startIndex, endIndex)

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Header />
      <main className='flex-1'>
        <div className='container mx-auto max-w-5xl py-12 px-4'>
          {/* Phần giới thiệu trang blog */}
          <header className='mb-12 text-center'>
            <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
              Blog Công nghệ AI
            </h1>
            <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
              Chào mừng bạn đến với blog của tôi! Nơi chia sẻ những kiến thức,
              hướng dẫn và cập nhật mới nhất về thế giới Trí tuệ Nhân tạo và Tự
              động hóa.
            </p>
          </header>

          {/* Lưới hiển thị bài viết */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {postsToShow.map(post => (
              <Card
                key={post.id} // Dùng ID thật từ Firebase
                className='group flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10'>
                <CardHeader>
                  <CardTitle className='text-balance text-xl group-hover:text-primary'>
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className='pt-2'>
                    {post.desc} {/* <-- DÙNG DỮ LIỆU THẬT */}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-wrap gap-2'>
                    {post.tags.map(tag => (
                      <Badge key={tag} variant='secondary'>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <p className='text-sm text-muted-foreground'>
                    {/* Định dạng ngày tháng cho đẹp */}
                    {format(post.createdAt.toDate(), 'dd-MM-yyyy')}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Component Phân trang đã được tách ra */}
          <div className='mt-12'>
            <BlogPagination totalPages={totalPages} currentPage={currentPage} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
