import { Posts } from './Posts'
import { usePostsLists } from "../../hooks/usePostsList"

export function PostsList(){
  const { mainPosts, users } = usePostsLists()  
  return mainPosts.map(post => users.map(user => user.id === post.user ? <Posts key={post.id} user={user} post={post} type='post'></Posts> : false) )
}