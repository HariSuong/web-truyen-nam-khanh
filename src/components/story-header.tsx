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
      <header className='text-center mb-10 md:mb-16'>
        <h1 className='font-sans text-4xl md:text-6xl font-bold text-[#856244] mb-4 tracking-tight'>
          {title}
        </h1>
        <p className='text-lg font-sans mb-4 italic text-[#6a5124]'>
          {description}
        </p>
        <p className='text-sm font-sans italic text-[#6a5124]'>
          Note xíu nhaa: Truyện này chỉ là hư cấu thôi, mình lấy cảm hứng từ
          concert Sao Nhập Ngũ, hình ảnh hai anh mặc quân phục và ca khúc
          &quot;Còn gì đẹp hơn&quot; mà mình cực kỳ ấn tượng. Câu chuyện hoàn
          toàn tưởng tượng, không liên quan đến người thật đâu nha, nên mọi
          người đọc với tâm thế thoải mái nghen 🫶
        </p>
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
