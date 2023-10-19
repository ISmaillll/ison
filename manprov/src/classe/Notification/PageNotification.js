import { Notifications } from './Notifications';
import './Notifications.css'

export function PageNotification({log,closeMenu,userlog}) {
            return(
                    <div className='ProSW'>
                    <div className='Notifcationspace'>
                        <br/><br/>
                        <Notifications ismenu={0} userlog={userlog}/>
                    </div> 
                    </div>
            )
}