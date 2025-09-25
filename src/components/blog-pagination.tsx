import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface BlogPaginationProps {
  totalPages: number
  currentPage: number
}

export function BlogPagination({
  totalPages,
  currentPage
}: BlogPaginationProps) {
  const renderPaginationLinks = () => {
    const pages = []
    // Logic để hiển thị các số trang (có thể phức tạp hơn với dấu '...')
    // Tạm thời hiển thị tất cả các trang nếu ít
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={`/posts?page=${i}`}
              isActive={i === currentPage}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      // Logic phức tạp hơn cho nhiều trang (ví dụ: 1, 2, ..., 5, ..., 9, 10)
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink href={`/posts?page=1`} isActive={1 === currentPage}>
            1
          </PaginationLink>
        </PaginationItem>
      )
      if (currentPage > 2) {
        pages.push(<PaginationEllipsis key='start-ellipsis' />)
      }
      if (currentPage > 1 && currentPage < totalPages) {
        pages.push(
          <PaginationItem key={currentPage}>
            <PaginationLink href={`/posts?page=${currentPage}`} isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )
      }
      if (currentPage < totalPages - 1) {
        pages.push(<PaginationEllipsis key='end-ellipsis' />)
      }
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href={`/posts?page=${totalPages}`}
            isActive={totalPages === currentPage}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }
    return pages
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? `/posts?page=${currentPage - 1}` : '#'}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {renderPaginationLinks()}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages ? `/posts?page=${currentPage + 1}` : '#'
            }
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
