import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Comments from '@/components/comment'
import { Badge } from '@/components/ui/badge'
import { getPostBySlug } from '@/lib/posts' // <-- IMPORT HÀM THẬT
import { format } from 'date-fns'

export default async function PostPage({
  params
}: {
  params: { slug: string }
}) {
  // GỌI HÀM LẤY DỮ LIỆU THẬT TỪ FIREBASE
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Header />
      <main className='flex-1'>
        <article className='container relative mx-auto max-w-3xl py-12 px-4'>
          <header className='mb-8 text-center'>
            <div className='mb-4 flex flex-wrap justify-center gap-2'>
              {post.tags.map(tag => (
                <Badge key={tag} variant='secondary'>
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
              {post.title}
            </h1>
            <p className='mt-4 text-muted-foreground'>
              {post.desc}
              {/* Đăng bởi {post.authorId} vào ngày{' '}
              {format(post.createdAt.toDate(), 'dd-MM-yyyy')} */}
            </p>
          </header>

          <div className='relative mb-8 h-auto w-full overflow-hidden rounded-lg'>
            <img
              src={post.featuredImage}
              alt={post.title}
              width={1200}
              height={600}
              className='h-full w-full object-cover'
            />
          </div>

          <div
            className='prose prose-invert mx-auto max-w-none prose-p:text-lg prose-headings:text-foreground prose-a:text-primary'
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* <section className='mt-16'>
            <Comments postId={post.id} />
          </section> */}
        </article>
      </main>
      <Footer />
    </div>
  )
}
