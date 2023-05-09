import { Link } from "react-router-dom"

export function ProfileImage(props){
  return <div><Link to={'/profile/24'}><img src={props.src} className='w-12 rounded-full inline'></img></Link></div>
}