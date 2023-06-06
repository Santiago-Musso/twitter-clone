import { NewReply } from "./NewReply"

export function CommentModal({post, type, active, onClose}){
  return (
    active === true ? 
    <div className="fixed inset-0 z-50 bg-black/25 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col w-full max-w-xl">
        <button onClick={() => onClose()} className='text-xl place-self-end'>X</button>
        <NewReply postID={post.id} type={type}/>
      </div>
    </div>
    : false
  )
}