import type { Metadata } from 'next'
import { Playfair_Display, David_Libre } from 'next/font/google'
import './globals.css'

// Khởi tạo font Inter cho chữ thường
const davidLibre = David_Libre({
  subsets: ['latin'],
  variable: '--font-david-libre', // Tạo biến CSS
  weight: ['400', '700']
})
// Khởi tạo font Playfair Display cho tiêu đề và nội dung truyện
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair', // Tạo biến CSS
  weight: ['400', '700']
})
export const metadata: Metadata = {
  title: 'Nỗi đau giữa hòa bình',
  description:
    'Câu chuyện về tình yêu tuyệt đẹp giữa những con người thời chiến'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${playfair.variable} ${davidLibre.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
