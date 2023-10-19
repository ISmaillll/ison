import { NavLink } from "react-router-dom"
import { IsonLogo } from "./IsonLogo"
import React, { useEffect } from 'react';

export function Footer({log}){
    useEffect(() => {
        let resizeTimeout;
        const closeDetailsElements = () => {
          const detailsElements = document.getElementsByClassName('detailsFooter');
          const windowWidth = window.innerWidth;
          for (let i = 0; i < detailsElements.length; i++) {
            const detailsElement = detailsElements[i];
            if (windowWidth < 500) {
              detailsElement.open = false;
            }else{
                detailsElement.open = true;
            }
          }
        }
        const handleResize = () => {
          if (resizeTimeout) {
            clearTimeout(resizeTimeout);
          }
          resizeTimeout = setTimeout(() => {
            closeDetailsElements();
          }, 200);
        }
        closeDetailsElements();
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
          clearTimeout(resizeTimeout);
        };
      }, []);
    return(<>
        <footer className="Footer m-auto">
            <div className="container d-flex flex-column justify-content-around">
                <div className="InFooter p-2 ps-4">
                    <div className="RightFooter">
                    <NavLink className="linkFooter" to="/"><h3 className="d-flex" ><IsonLogo W={50} Color={"#fff"}/><span className="text-light m-3">ISON</span></h3></NavLink>
                        <p className="text-lg text-gray-500">From here your journey begins</p>
                        <div className="d-flex">
                            {log===0?<NavLink className="btn actionCartPro" to="/Login/0">SignUp</NavLink>:null}
                            {log===1?<ul className="navbar-nav">
                            <li className="navbar-nav nav-item h5"><NavLink className="btn Workbtn" to="/StartWork">Start Working</NavLink></li>
                        </ul>:null}
                        {log===0?<ul className="navbar-nav">
                            <li className="navbar-nav nav-item h5"><NavLink className="btn Workbtn" to="/LoginWork/1">Start Working</NavLink></li>
                        </ul>:null}
                        </div>
                    </div>
                    <div className="FooterLinks">
                        <div>
                        
                        <details className="list-unstyled detailsFooter" open><summary><h5 className="text-light">Home</h5></summary>
                            {log===2?<li className='mt-4 '><NavLink className="linkFooter" to="/RProject"><i className="bi bi-eyeglasses m-1 h5"></i>Jobs For you</NavLink></li>:null}
                            {log===2?<li className='mt-4 '><NavLink className="linkFooter" to="/MyProjects"><i className="bi bi-folder-check m-1"></i>My Projects</NavLink></li>:null}
                            {log===2&false?<li className='mt-4 '><NavLink className="linkFooter" to="/NewPost"><i className="bi bi-plus-square m-1"></i>New Post</NavLink></li>:null}
                            {log>=1?<li className='mt-4 '><NavLink className="linkFooter" to="/NewProject"><i className="bi bi-folder-plus m-1"></i>New Project</NavLink></li>:null}
                            {log>=1?<li className='mt-4 '><NavLink className="linkFooter" to="/History"><i className="bi bi-clock-history m-1"></i>History</NavLink></li>:null}
                            <li className='mt-4 '><NavLink className="linkFooter" to="/#OurOffers"><i class="fa fa-stack-exchange" aria-hidden="true"></i> Offers</NavLink></li>{/* Fix scroll */}
                            <li className='mt-4 '><NavLink className="linkFooter" to="/Support"><i className="bi bi-question-circle m-1 h5"></i>Support</NavLink></li>
                        </details>
                        </div>
                        <div>
                        <details className="list-unstyled detailsFooter" open><summary><h5 className="text-light">Products</h5></summary>
                        <li className=' mt-4 Menuitem'><NavLink className="linkFooter" to="/Search-Project"><i className="fa fa-search m-1" ></i><span>Jobs</span></NavLink></li>
                    <li className=' mt-4 Menuitem'><NavLink className="linkFooter" to="/Creators"><i className="bi bi-people m-1"></i><span>Creators</span></NavLink></li>   
                        </details>
                        </div>
                        <div>
                        <details className="list-unstyled detailsFooter" open><summary><h5 className="text-light">Resources</h5></summary>
                            <li className='mt-4 Menuitem'><NavLink className="linkFooter" to="#">Developers</NavLink></li>
                            <li className='mt-4 Menuitem'><NavLink className="linkFooter" to="#">Blog</NavLink></li>
                            <li className='mt-4 Menuitem'><NavLink className="linkFooter" to="#">Solutions</NavLink></li>
                            <li className='mt-4 Menuitem'><NavLink className="linkFooter" to="#">convince your manager</NavLink></li>
                        </details>
                        </div>
                        <div>
                        <details className="list-unstyled detailsFooter" open><summary><h5 className="text-light">Legal</h5></summary>
                            <li className='mt-4 Menuitem'><NavLink className="linkFooter" to="#">Privacy Policy</NavLink></li>
                            <li className='mt-4 Menuitem'><NavLink className="linkFooter" to="#">Terms of service</NavLink></li>
                            <li className='mt-4 Menuitem'><NavLink className="linkFooter" to="#">Security</NavLink></li>
                        </details>
                        </div>
                        <div>
                        <details className="list-unstyled detailsFooter" open><summary><h5 className="text-light">Company</h5></summary>
                            <li className='mt-4 Menuitem'><NavLink className="linkFooter" to="#">About Us</NavLink></li>
                            <li className='mt-4 Menuitem'><NavLink className="linkFooter" to="#">Why Us</NavLink></li>
                            <li className='mt-4 Menuitem'><NavLink className="linkFooter" to="#">Customers</NavLink></li>
                            <li className='mt-4 Menuitem'><NavLink className="linkFooter" to="#">Careers</NavLink></li>
                            <li className='mt-4 Menuitem'><NavLink className="linkFooter" to="#">Media Kit</NavLink></li>
                        </details>
                        </div>
                    </div>
                </div>
                <div>
                    <hr className="m-6"/>
                    <div className="BootFooter">
                        <div>&copy; 2023 ISON. All rights reserved.</div>
                        <div className="IconsFotter">
                        <a href="https://www.youtube.com/supersidehq" target="_blank" className="IconFooter"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                        <a href="https://www.youtube.com/supersidehq" target="_blank" className="IconFooter"><i className="fab fa-facebook "></i></a>
                        <a href="https://www.youtube.com/supersidehq" target="_blank" className="IconFooter"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                        <a href="https://www.youtube.com/supersidehq" target="_blank" className="IconFooter"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                        <a href="https://www.youtube.com/supersidehq" target="_blank" className="IconFooter"><i className="fa fa-youtube" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>)
}