'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    // <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
    <header className='flex justify-between items-center flex-1 flex-col sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between px-4'>
        <div className='flex items-center space-x-2'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
              AI.Automate
            </span>
          </Link>
        </div>

        <div className='flex items-center space-x-4'>
          <nav className='flex items-center space-x-6'>
            <Link
              href='/posts'
              className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'>
              Blog
            </Link>
          </nav>

          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='h-9 w-9'>
            <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
