import {NavLink} from 'react-router-dom';

export function NavWSpace({log,closeMenu,windowWidth}){
    
    return(<>
            <div className='NavWSpace CloseminiMenu'id='miniMenu'>
                <ul className='Navlist'>
                    {(windowWidth<775)?<>
                    <li className=' mt-5 Menuitem'><NavLink className="linkWS" to="/"><i class="fa fa-home m-1"></i><span className='linkTextWS closeMenuSW'>Home</span></NavLink></li>
                    <li className=' mt-4 Menuitem'><NavLink className="linkWS" to="/Browse"><i class="fa fa-search m-1" ></i><span className='linkTextWS closeMenuSW'>Browse</span></NavLink></li>
                    <li className=' mt-4 Menuitem'><NavLink className="linkWS" to="/Creators"><i class="bi bi-people m-1"></i><span className='linkTextWS closeMenuSW'>Creators</span></NavLink></li>   
                    </>:null}
                    <hr/>
                    {log===2?<li className='mt-4 Menuitem'><NavLink className="linkWS" to="/RProject"><i class="bi bi-eyeglasses m-1 h5"></i><span className='linkTextWS closeMenuSW'>Jobs For you</span></NavLink></li>:null}
                    {log===2?<li className='mt-4 Menuitem'><NavLink className="linkWS" to="/Search-Project"><i class="fa fa-search m-1" ></i><span className='linkTextWS closeMenuSW'>Search Jobs</span></NavLink></li>:null}
                    {log>=1?<li className='mt-4 Menuitem'><NavLink className="linkWS" to="/MyProjects"><i class="bi bi-folder-check m-1"></i><span className='linkTextWS closeMenuSW'>My Projects</span></NavLink></li>:null}
                    {log===2?<li className='mt-4 Menuitem'><NavLink className="linkWS" to="/NewPost"><i class="bi bi-plus-square m-1"></i><span className='linkTextWS closeMenuSW'>New Post</span></NavLink></li>:null}
                    {log>=1?<li className='mt-4 Menuitem'><NavLink className="linkWS" to="/NewProject"><i className="bi bi-folder-plus m-1"></i><span className='linkTextWS closeMenuSW'>New Project</span></NavLink></li>:null}
                    {log>=1?<li className='mt-4 Menuitem'><NavLink className="linkWS" to="/History"><i class="bi bi-clock-history m-1"></i><span className='linkTextWS closeMenuSW'>History</span></NavLink></li>:null}
                    {log>=1?<li className='mt-4 Menuitem'><NavLink className="linkWS" to="/Support"><i class="bi bi-question-circle m-1 h5"></i><span className='linkTextWS closeMenuSW'>Support</span></NavLink></li>:null}
                </ul>
                {(windowWidth<775&&log===0)?
                <div className='NavWSLog'>
                    <li className="navbar-nav nav-item h5">
                    <NavLink className="btn btn6 p-2" to="/Login/1">Login</NavLink>
                    </li>
                    <li className="navbar-nav nav-item h5">
                    <NavLink className="btn btn5 p-2" to="/Login/0">Sign up</NavLink>
                    </li>
                </div>:null}
            </div>
    </>)
}