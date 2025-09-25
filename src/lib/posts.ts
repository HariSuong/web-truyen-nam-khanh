import { db } from '@/lib/firebase'
import {
  collection,
  query,
  getDocs,
  where,
  limit,
  orderBy,
  Timestamp
} from 'firebase/firestore'

// Định nghĩa kiểu dữ liệu cho một bài viết (đồng bộ với cấu trúc trên Firestore)
export interface Post {
  id: string
  title: string
  slug: string
  content: string
  desc: string // ĐÃ CẬP NHẬT TỪ excerpt -> desc
  featuredImage: string
  createdAt: Timestamp
  authorId: string
  tags: string[]
}

/**
 * Lấy tất cả bài viết từ Firestore, sắp xếp theo ngày tạo mới nhất
 * @returns {Promise<Post[]>} Một mảng các bài viết
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const postsCol = collection(db, 'posts')
    const q = query(postsCol, orderBy('createdAt', 'desc'))
    const postSnapshot = await getDocs(q)

    const postList = postSnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data()
        } as Post)
    )
    return postList
  } catch (error) {
    console.error('Error fetching all posts:', error)
    return []
  }
}

/**
 * Lấy một bài viết duy nhất dựa trên slug của nó
 * @param {string} slug - Slug của bài viết cần tìm
 * @returns {Promise<Post | null>} Dữ liệu bài viết hoặc null nếu không tìm thấy
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const postsCol = collection(db, 'posts')
    const q = query(postsCol, where('slug', '==', slug), limit(1))
    const postSnapshot = await getDocs(q)

    if (postSnapshot.empty) {
      return null
    }

    const postDoc = postSnapshot.docs[0]
    return { id: postDoc.id, ...postDoc.data() } as Post
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return null
  }
}
