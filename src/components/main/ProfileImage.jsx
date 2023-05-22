import { Link } from "react-router-dom"

export function ProfileImage(props){
  return <div><Link className="relative z-10" to={`/profile/${props.to}`}><img src={props.src} className='w-12 rounded-full inline'></img></Link></div>
}