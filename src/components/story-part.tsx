// components/StoryPart.tsx

interface StoryPartProps {
  part: {
    id: number
    title: string
    image: {
      src: string
      alt: string
    }
    content: string
  }
  isLastPart: boolean
}

export default function StoryPart({ part, isLastPart }: StoryPartProps) {
  return (
    <section key={part.id} className='flex flex-col gap-4'>
      {/* <div className='text-center'>
        <h2 className='font-sans text-3xl md:text-4xl font-bold text-shadow-stone-800 border-b-2 border-gray-700 inline-block pb-2'>
          {part.title}
        </h2>
      </div> */}
      <div className='overflow-hidden shadow-xl'>
        <img
          src={part.image.src}
          alt={part.image.alt}
          className='w-full h-auto object-cover'
        />
      </div>
      <div className='font-mono text-lg font-bold md:text-xl text-[#856244] leading-relaxed md:leading-loose whitespace-pre-line prose prose-invert prose-p:my-6'>
        <p>{part.content}</p>
      </div>
      {/* {!isLastPart && (
        <div className='w-24 h-px bg-gray-700 mx-auto mt-8'></div>
      )} */}
      {!isLastPart && (
        <div className='flex justify-center mt-2 mb-4'>
          {' '}
          {/* Dùng flex để căn giữa */}
          <img
            src='/line/3.svg' // Đường dẫn chính xác tới file SVG trong thư mục public
            alt='Dấu ngăn cách trang trí'
            className='w-96 h-auto' // Điều chỉnh kích thước của SVG nếu cần
          />
        </div>
      )}
    </section>
  )
}
