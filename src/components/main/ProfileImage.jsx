import { Link } from "react-router-dom"

export function ProfileImage({to, src}){
  return <div><Link className="relative z-10" to={`/user/${to}`}><img src={src} className='w-12 rounded-full inline'></img></Link></div>
}