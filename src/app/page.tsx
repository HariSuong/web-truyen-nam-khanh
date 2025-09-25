import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { LatestPosts } from '@/components/latest-post'

export default function Home() {
  return (
    <>
      {/* <Story /> */}

      <div className='min-h-screen bg-background'>
        <Header />

        <main className='flex justify-between items-center flex-1 flex-col'>
          <HeroSection />
          <LatestPosts />
        </main>

        <Footer />
      </div>
    </>
  )
}
