import { NavLink } from "react-router-dom";
import {MenuProfile} from '../Component/menuProfile'
import { Notifications } from '../Notification/Notifications';
import { variables } from "../../Variables";
import React, { Component } from "react";
import {IsonLogo} from "../Component/IsonLogo"

export class NavTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UnreadNotif: 0,
    };
  }

  PhotoPath = variables.PHOTO_URL;

  GetUnread = (Unread) => {
    if (Unread < 100) this.setState({ UnreadNotif: Unread });
    else this.setState({ UnreadNotif: "99+" });
  };
  componentDidUpdate(prevProps) {
    if (this.props.userlog !== prevProps.userlog) {
        this.setState({})
    }

  }
  render() {
    const { userlog, log, closeMenu, CloseMenuProfile, ClosemenuNotif, disconnect ,location,windowWidth } = this.props;
    const { UnreadNotif} = this.state;
    return (
      <nav className="navapp navbar navbar-dark py-3">
        <div className="container">
          {((location!=='Settings'&&location!=='Browse')&&windowWidth>775)&&log!==0?<>
          <button className="btn text-light" id="menuBTN" close-t={1} onClick={closeMenu}>
            <i className="bi bi-list h4"></i>
          </button></>:null}
          <NavLink className="nav-link d-flex justify-content-center" to="/">
            <img src="/static/PIC/Textlogo2.svg" height="40px" width="100px"/>
          </NavLink>
            
          <div className="d-flex mx-auto">
            <div className="NavTopHome">
              <li className="navbar-nav nav-item h5 mx-3 menuTop"><NavLink className="nav-link d-flex justify-content-center" to="/">Home</NavLink></li>
              {(location==='Settings'||location==='Browse')&&log>=1?<div className="NavTopHomeLinks">
              <div className="d-flex flex-column p-3">
                    <NavLink className="linksS" to="/RProject"><i class="bi bi-eyeglasses m-1 h5"></i><span>Jobs For you</span></NavLink>
                    <NavLink className="linksS" to="/Search-Project"><i class="fa fa-search m-1" ></i><span>Search Jobs</span></NavLink>
                    <NavLink className="linksS" to="/MyProjects"><i class="bi bi-folder-check m-1"></i><span>My Projects</span></NavLink>
                    <NavLink className="linksS" to="/NewPost"><i class="bi bi-plus-square m-1"></i><span>New Post</span></NavLink>
                    <NavLink className="linksS" to="/NewProject"><i className="bi bi-folder-plus m-1"></i><span>New Project</span></NavLink>
                    <NavLink className="linksS" to="/History"><i class="bi bi-clock-history m-1"></i><span>History</span></NavLink>
                    <NavLink className="linksS" to="/Support"><i class="bi bi-question-circle m-1 h5"></i><span>Support</span></NavLink>
                  </div>
                  <NavLink to="/" className="NavTopHomeLinksBot"><i class="fa fa-arrow-right text-light m-2" aria-hidden="true"></i></NavLink>
              </div>:null}
            </div>
            <li className="navbar-nav nav-item h5 mx-3 menuTop"><NavLink className="nav-link d-flex justify-content-center" to="/Browse">Browse</NavLink></li>
            <li className="navbar-nav nav-item h5 mx-3 menuTop"><NavLink className="nav-link d-flex justify-content-center" to="/Creators">Creators</NavLink></li>
            <li className="navbar-nav nav-item h5 mx-3 menuTop"><NavLink className="nav-link d-flex justify-content-center" to="/OurOffers">Offers</NavLink></li>
            <li className="navbar-nav nav-item h5 mx-3 menuTop"><NavLink className="nav-link d-flex justify-content-center" to="/Ideas">Ideas</NavLink></li>
            {/*<li className="navbar-nav nav-item h5 mx-3 menuTop"><NavLink className="nav-link d-flex justify-content-center" to="/Companies">Companies</NavLink></li>*/}
          </div>
          {log === 0 ? <>
            {(windowWidth>775)?<>
            <li className="navbar-nav nav-item h5">
              <NavLink className="btn btn6 p-2" to="/Login/1">Login</NavLink>
            </li>
            <li className="navbar-nav nav-item h5">
              <NavLink className="btn btn5 ms-2 p-2" to="/Login/0">Sign up</NavLink>
            </li></>:null}
          </> : 
            <div className="d-flex ms-auto">
              <li className="navbar-nav nav-item h5 m-2">
                <details id="NotifMenu">
                  <summary onClick={CloseMenuProfile}>
                    <i className="bi bi-bell m-1"></i>
                    <span className="UnreadNotif">{UnreadNotif}</span>
                  </summary>
                  <div className="menuNotif">
                    <Notifications ismenu={1} userlog={userlog} GetUnread={this.GetUnread} />
                  </div>
                  <NavLink className="NotMore" to="/Notification" onClick={ClosemenuNotif}>
                    See more
                  </NavLink>
                </details>
              </li>
              <details className="m-2" id="Pofilemenu">
                <summary className="d-flex justify-content-end" onClick={ClosemenuNotif}>
                  <img className="imgProfileTopNav" height="30px" weight="30px" src={this.PhotoPath + userlog.ProfilePhoto} alt="" />
                </summary>
                <div>
                  <MenuProfile userlog={userlog} disconnect={disconnect} />
                </div>
              </details>
            </div>}
            {(windowWidth<775)?<>
          <button className="btn text-light" id="menuBTN" close-t={1} onClick={closeMenu}>
            <i className="bi bi-list h4"></i>
          </button></>:null}
     </div>  
    </nav>
    )
    }
}