// components/StoryFooter.tsx

interface StoryFooterProps {
  videoSrc: string
}

export default function StoryFooter({ videoSrc }: StoryFooterProps) {
  return (
    <footer className='mt-16 md:mt-24'>
      <div className='flex justify-center mt-2 mb-4'>
        {' '}
        {/* Dùng flex để căn giữa */}
        <img
          src='/line/2.svg' // Đường dẫn chính xác tới file SVG trong thư mục public
          alt='Dấu ngăn cách trang trí'
          className='w-full h-auto' // Điều chỉnh kích thước của SVG nếu cần
        />
      </div>
      <div className='font-sans text-center text-xl font-bold text-amber-800 mb-8 italic'>
        &quot;Hòa bình rồi, Khánh à. Em phải sống thật vui nhé. Vui cho cả phần
        của anh nữa.&quot;
      </div>
      <div className='w-full rounded-lg flex items-center justify-center shadow-2xl'>
        <video
          src={videoSrc}
          controls
          loop
          className='w-full lg:max-w-xl h-full'>
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>
    </footer>
  )
}
