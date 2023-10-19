import {NavLink} from 'react-router-dom';

export function NavSettings(){

    return(
            <div className='NavSett'>
                <ul className='navbar-nav m-2'>
                    <li><h4 className='text-secondary m-3'>Settings</h4></li>
                    <li><NavLink className="btn btn-outline-info w-100 mt-3" to="/Settings/Profile">Profile</NavLink></li>
                    <li><NavLink className="btn btn-outline-info w-100 mt-3" to="/Settings/Account">Account</NavLink></li>
                    <li><NavLink className="btn btn-outline-info w-100 mt-3" to="/Settings/Notification">Notification</NavLink></li>
                    <li><NavLink className="btn btn-outline-info w-100 mt-3" to="/Settings/Paiement">Paiement</NavLink></li>
                </ul>
            </div>
    )
} 
