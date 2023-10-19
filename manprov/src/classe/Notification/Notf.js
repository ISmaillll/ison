import { NavLink } from "react-router-dom"

export function Notf({Notif,PhotoPath,readNotification}){

    return(<>
        <NavLink className="nav-link text-dark" to={'/'+Notif.Notif.Link} onClick={()=>readNotification(Notif)}>
            <div className='notif'>
                <NavLink className="nav-link text-dark" to={"Profile/"+Notif.Notif.By.UserName}>
                    <img className='Manager-img' width="50px" height="50px" src={PhotoPath+Notif.Notif.By.ProfilePhoto}/>
                </NavLink>
                <div>
                    <span className='h4 m-1'>{Notif.Notif.By.UserName}</span>
                    <span className='notiftext'>{Notif.Notif.Content}</span>
                    <div><span className='m-1 h6'>{Notif.Notif.Date.split('T')[0]}</span></div>
                </div>
                {!Notif.Is_read?<><div ><i class="bi bi-eyeglasses m-1 h4 Read-Notif" ></i></div></>:null}
            </div>   
        </NavLink> 
    </>)
}