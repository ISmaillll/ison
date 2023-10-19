import {NavLink} from 'react-router-dom';
import { variables } from '../../Variables';

export function MenuProfile({userlog,disconnect}){
    const PhotoPath=variables.PHOTO_URL;
    return(<>
            <div className="bg-light p-1 rounded shadow-sm Pmenu" style={{}}>
                <div className="p-2 bd-highlight">
                    <div className="d-flex m-2" align="center"> 
                    <NavLink className="" to={"/Profile/"+userlog.UserName}><img className='imgMenuProfile imgProfileTopNav' width="70px" height="70px" src={PhotoPath+userlog.ProfilePhoto}/></NavLink>
                        <div className='w-75'>
                            <h5 className='text-dark textmenuProfile'>{userlog.Name+" "+userlog.Lastname}</h5>
                            <h6 className='textmenuProfile'>{userlog.Email}</h6>
                        </div>
                    </div>
                    <div className='d-flex flex-column'>
                        <NavLink className="btn Btn4 m-1" to="/Settings/Profile"><i class="bi bi-gear-fill">Manage your account</i></NavLink>
                        <button type="button" className="btn Btn4 m-1 float-start"onClick={disconnect}><i className="fa-solid fa-right-from-bracket"></i>disconnects</button>
                    </div>
                </div>
            </div>
    </>)
}