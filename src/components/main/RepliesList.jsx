import { Posts } from './Posts'
import { useRepliesLists } from "../../hooks/useRepliesList"

export function RepliesList({ repliesID }){
  const { users, replies } = useRepliesLists()
return (
  repliesID ?
   repliesID.map(replyProps => replies.map(reply => users.map(user => user.id === reply.user && replyProps == reply.id ?
    <Posts key={reply.id} user={user} post={reply} type='replies'/> : false))) : false
)

}