export function HeroSection() {
  return (
    <section className='relative w-full flex justify-center py-24 md:py-32 lg:py-40'>
      <div className='absolute inset-0 bg-gradient-to-br from-blue-950/50 via-background to-background'>
        <div className='absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]' />
      </div>

      <div className='container relative z-10 px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-8 text-center'>
          <h1 className='text-4xl font-bold tracking-tighter text-balance sm:text-5xl md:text-6xl lg:text-7xl'>
            <span className='bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent'>
              The Future of AI is Here
            </span>
          </h1>

          <div className='w-full max-w-2xl h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg bg-card/50'>
            <div className='text-center space-y-2'>
              <div className='text-6xl'>🤖</div>
              <p className='text-muted-foreground text-sm'>
                {'<CustomAIGraphic />'}
              </p>
              <p className='text-xs text-muted-foreground/70'>
                Placeholder for your custom AI graphic
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
