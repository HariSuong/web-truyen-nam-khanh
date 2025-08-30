import StoryFooter from '@/components/story-footer'
import StoryHeader from '@/components/story-header'
import StoryPart from '@/components/story-part'
import { story } from '@/data/story'

export default function Story() {
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundImage: `url('/imgs/materials/paper.png')`, // Đường dẫn tới ảnh nền
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed', // Hiệu ứng parallax-like
        backgroundPosition: 'center'
      }}
      className='text-shadow-stone-800'>
      {/* Thêm một lớp phủ màu đen mờ để chữ dễ đọc hơn */}
      <div className=''>
        {/* Thẻ style để import font trực tiếp */}
        {/* <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Playfair+Display:wght@400;700&display=swap');
            .font-sans {
              font-family: 'Playfair Display', serif;
            }
          `}
        </style> */}

        <main className='container mx-auto px-4 py-12 md:py-24 max-w-4xl'>
          <StoryHeader
            title={story.title}
            description={story.description}
            coverImage={story.coverImage}
          />

          <div className='space-y-16 md:space-y-24'>
            {story.parts.map((part, index) => (
              <StoryPart
                key={part.id}
                part={part}
                isLastPart={index === story.parts.length - 1}
              />
            ))}
          </div>

          <StoryFooter videoSrc={story.videoSrc} />
        </main>
      </div>
    </div>
  )
}
