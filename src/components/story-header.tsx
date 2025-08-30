// components/StoryHeader.tsx

interface StoryHeaderProps {
  title: string
  description: string
  coverImage: string
}

export default function StoryHeader({
  title,
  description,
  coverImage
}: StoryHeaderProps) {
  return (
    <>
      <header className='text-center mb-16 md:mb-24'>
        <h1 className='font-sans text-4xl md:text-6xl font-bold text-[#856244] mb-4 tracking-tight'>
          {title}
        </h1>
        <p className='text-lg font-sans italic text-[#6a5124]'>{description}</p>
      </header>
      {/* <div className='mb-16 md:mb-24 rounded-lg overflow-hidden shadow-2xl'>
        <img
          src={coverImage}
          alt='Hình ảnh nghệ thuật của Nam và Khánh'
          className='w-full h-auto object-cover'
        />
      </div> */}
    </>
  )
}
