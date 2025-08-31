'use client'

import { QRCodeCanvas } from 'qrcode.react'

export default function QRCodeGenerator() {
  const url = 'https://web-truyen-nam-khanh.vercel.app/'
  const downloadQR = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    const downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = 'qr-code.png'
    downloadLink.click()
  }
  return (
    <div className='flex flex-col items-center space-y-4'>
      <QRCodeCanvas value={url} size={200} />
      <p className='text-sm text-gray-600'>Quét mã để truy cập website</p>
      <button
        onClick={downloadQR}
        className='px-4 py-2 bg-blue-500 text-white rounded-lg'>
        Tải QR về máy
      </button>
    </div>
  )
}
