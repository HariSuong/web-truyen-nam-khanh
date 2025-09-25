import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const posts = [
  {
    id: 1,
    title: 'The Rise of Autonomous AI Agents',
    description:
      'Exploring how AI agents are revolutionizing business processes and decision-making across industries.',
    tags: ['AI', 'Automation', 'Business'],
    slug: 'autonomous-ai-agents'
  },
  {
    id: 2,
    title: 'Machine Learning in Healthcare: A New Era',
    description:
      'How ML algorithms are transforming patient care, diagnosis, and treatment planning in modern medicine.',
    tags: ['AI', 'Healthcare', 'Innovation'],
    slug: 'ml-healthcare-era'
  },
  {
    id: 3,
    title: 'Natural Language Processing Breakthroughs',
    description:
      'Latest advances in NLP technology and their impact on human-computer interaction and communication.',
    tags: ['NLP', 'AI', 'Technology'],
    slug: 'nlp-breakthroughs'
  },
  {
    id: 4,
    title: 'AI Ethics and Responsible Development',
    description:
      'Addressing the critical importance of ethical considerations in AI development and deployment.',
    tags: ['Ethics', 'AI', 'Society'],
    slug: 'ai-ethics-development'
  },
  {
    id: 5,
    title: 'Computer Vision: Seeing the Future',
    description:
      'How computer vision technology is reshaping industries from automotive to retail and beyond.',
    tags: ['Computer Vision', 'AI', 'Innovation'],
    slug: 'computer-vision-future'
  },
  {
    id: 6,
    title: 'The Quantum-AI Convergence',
    description:
      'Exploring the intersection of quantum computing and artificial intelligence for unprecedented capabilities.',
    tags: ['Quantum', 'AI', 'Computing'],
    slug: 'quantum-ai-convergence'
  }
]

export function LatestPosts() {
  return (
    <section className='py-16 md:py-24'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-4 text-center mb-12'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
            Latest Posts
          </h2>
          <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
            Stay updated with the latest insights, trends, and breakthroughs in
            artificial intelligence and automation.
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {posts.map(post => (
            <Card
              key={post.id}
              className='group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1'>
              <CardHeader>
                <CardTitle className='text-balance group-hover:text-primary transition-colors'>
                  {post.title}
                </CardTitle>
                <CardDescription className='text-pretty'>
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {post.tags.map(tag => (
                    <Badge key={tag} variant='secondary' className='text-xs'>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/blog/${post.slug}`}
                  className='inline-flex items-center text-sm font-medium text-primary hover:text-secondary transition-colors group/link'>
                  Read More
                  <ArrowRight className='ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1' />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
