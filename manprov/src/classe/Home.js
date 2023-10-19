import React,{Component} from 'react';
import {variables} from '../Variables';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';
import {Login} from './Login';
import {WorkerSignUp} from './signup';
import {Account} from './Manage/Account';
import { Profile } from './Manage/Profile';
import {Paiement} from './Manage/Paiement';
import {Notification} from './Manage/Notification';
import {Store} from './Store/Store';
import {WorkSpace} from './WorkSpace/WorkSpace';
import {RWorkSpace} from './WorkSpace/RWorkSpace';
import { SearchWorkSpace } from './WorkSpace/SearchJobs';
import { MyWorkSpace } from './WorkSpace/MyPorject';
import {NewProject} from './WorkSpace/NewProject'
import {NewPost} from './WorkSpace/NewPost'
import { PageNotification } from './Notification/PageNotification';  
import { Creators } from './Creators/Creators';
import { SupportPage } from './WorkSpace/Support';
import { History } from './WorkSpace/history';
import {ProfilePro}  from './Profile/ProfilePro';
import { Conversation } from './Chat/Conversation';
import { Inbox } from './Chat/Inbox';
import { NavTop } from "./Component/NavTop"
import { Footer } from './Component/Footer';
import { Loader } from './Component/Loader'; 
import { NavWSpace } from './WorkSpace/NavWSpace';
import { Post } from './Store/Post';
import 'swiper/swiper.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//https://developers.google.com/identity/sign-in/web/server-side-flow
export class Home extends Component{
    constructor(props){
        super(props);

        this.state={
            userlog:{
              UserName:"",
              PassWord:""
            },
            log:0,
            AllSkills:[],
            ProfileLinks:[],
            ProfileSkills:[],
            ProfilePosts:[],
            usertbl:"User",
            Workerstbl:"Worker",
            Linkstbl:"LinksProfile",
            Skillstbl:"WorkerMaitrise",
            AllSkillstbl:"Skill",
            Poststbl:"Post",

            PhotoPath:variables.PHOTO_URL,
            isLoading: true,

            error: null,
            location:window.location.pathname.split('/')[1],
            windowWidth:window.innerWidth
        }
    }
    changePassword = (e)=>{
        this.setState({Password:e.target.value});
    }
    changeusername = (e)=>{
        this.setState({username:e.target.value});
    }
    verfie=()=>{
      fetch(variables.API_URL+this.state.usertbl+'Vrefie',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify(this.state.userlog)
      })
      .then(res=>res.json())
      .then((result)=>{
          console.log(result);
          this.setState({isLoading: false})
          if(result.exist){
            if(result.Password){
                this.state.userlog=result.data[0];
                this.setState({log:this.state.userlog.range},
                ()=> {if(this.state.log>=2)this.initPlusInfo()});
            }else this.setState({log:0});     
        }     
      },(error)=>{alert('Failed');})
    }
    Connect = () => {
      const credentialsCookie = this.getCookie('credentials');
    
      if (credentialsCookie !== '') {
        const decodedCredentials = atob(credentialsCookie);
        const [UserName, PassWord] = decodedCredentials.split(':');
        this.state.userlog= {
            UserName: UserName,
            PassWord: PassWord,
          };
        this.verfie();
      } else {
        this.setState({ isLoading: false });
      }
    };
    disconnect=()=>{
      this.state.userlog={UserName:"",PassWord:""}
      this.setState({log:0});
    }
    getuserInfo=(UserName,PassWord)=>{
      this.state.userlog={UserName:UserName,PassWord:PassWord};
      this.setState({})
      this.verfie()
    }
    componentDidMount(){
      this.Connect();
      this.intervalId = setInterval(this.linkNotif, 100);
    }
    componentWillUnmount() {
      clearInterval(this.intervalId);
    }
    linkNotif = () => {
       if(this.state.location!== window.location.pathname.split('/')[1]){
        this.state.location = window.location.pathname.split('/')[1];
        console.log(window.location.pathname.split('/')[1])
        this.setState({})
       }
       if(this.state.windowWidth!==window.innerWidth){
        this.state.windowWidth=window.innerWidth;
        this.setState({})
       }
    }
    UpdateUser=(User,fileName)=>{
      this.setState({userlog:User}, () => {
        if (this.state.userlog.ProfilePhoto ) {
          this.state.userlog.ProfilePhoto = fileName;
        }
    })
    }
///////////////////////// Cookies
getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
/////////////////////
closeMenu=(e)=>{
  let SWLT= document.getElementsByClassName('linkTextWS');
  let miniMenu = document.getElementById('miniMenu');
  if(miniMenu.getAttribute('close-t')==0){
      miniMenu.classList.add('CloseminiMenu')
      miniMenu.classList.remove('OpenminiMenu')
      miniMenu.setAttribute('close-t',1)
  }else{
      miniMenu.classList.add('OpenminiMenu')
      miniMenu.classList.remove('CloseminiMenu')
      miniMenu.setAttribute('close-t',0)
  }
}
CloseMenuProfile=()=>{
  document.getElementById('Pofilemenu').removeAttribute('open')
}
ClosemenuNotif=()=>{
  document.getElementById('NotifMenu').removeAttribute('open')
}
///////////////////////////Post
initPlusInfo=()=>{
          ///////////////////Get Worker Info
        fetch(variables.API_URL+this.state.usertbl+'Getprv',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({UserName:this.state.userlog.UserName})
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            if(result.found){
                this.state.userlog=result.User[0];
                this.setState({})
                if(this.state.userlog.range===2){
                    this.state.ProfileSkills=result.Skills;
                    this.state.ProfileLinks=result.Links;
                    this.state.ProfilePosts=result.posts;
                    this.setState({})
                    this.setState({isLoading: false}) 
                }
              this.GetAllSkills();
            }
        }).catch(error => this.setState({ isLoading: false, error }));
}
GetAllSkills=()=>{
  ///////////////////Get Worker Info
    fetch(variables.API_URL+this.state.AllSkillstbl+'/')
    .then(res=>res.json())
    .then((result)=>{
        console.log(result);
        this.setState({AllSkills:result})
    }).catch(error => this.setState({ isLoading: false, error }));
}
//////////////////////GETS
GetDate=()=>{
  const now = new Date();
  const dateString = now.toISOString();
  return dateString;
}
    render(){
        const {
            userlog,
            username,
            Password,
            users,
            log,
            PhotoPath,
            isLoading,
            error,
            isLoadingVRF,
            ProfilePosts,
            ProfileSkills,
            ProfileLinks,
            AllSkills,
            location,
            windowWidth,
            projects,
            Jobs,
            selectedSkills,
        }=this.state;
        if (isLoading) {
          return <Loader />;
        }
        if (error) {
          return <div className='h1 m-5 text-center'>Oooops!</div>;
        }
        return(
<div className="Main">
<BrowserRouter> 
<div className='RouterSpace'>
    <NavTop userlog={userlog} log={log} location={location} windowWidth={windowWidth} closeMenu={this.closeMenu} CloseMenuProfile={this.CloseMenuProfile} ClosemenuNotif={this.ClosemenuNotif} disconnect={this.disconnect}/>
    <br/><br/>
    {((location!=='Settings')||windowWidth<775)&&((location!=='Browse')||windowWidth<775)&&(log>=1||windowWidth<775)?<NavWSpace log={log} windowWidth={windowWidth} closeMenu={this.props.closeMenu}/>:null}
     <br/>
      <Routes>
       <Route path='/' element={<WorkSpace log={log} userlog={userlog} closeMenu={this.closeMenu} ProfileSkills={ProfileSkills} GetDate={this.GetDate}/>}/>
       <Route path='/Browse' element={<Store closeMenu={this.closeMenu} windowWidth={windowWidth}/>}/>
       <Route path='/Browse/:Post' element={<Post log={log} userlog={userlog} GetDate={this.GetDate} closeMenu={this.closeMenu} windowWidth={windowWidth}/>}/>
       <Route path='/Creators' element={<Creators userlog={userlog} closeMenu={this.closeMenu} GetDate={this.GetDate}/>}/>
       <Route path='/Support' element={<SupportPage log={log} closeMenu={this.closeMenu}/>}/>
       <Route path='/history' element={<History log={log}  userlog={userlog} closeMenu={this.closeMenu} />}/>
          <Route path='/settings/Profile' element={<Profile Skills={AllSkills} log={log} userlog={userlog} ProfileLinks={ProfileLinks} ProfileSkills={ProfileSkills} UpdateUser={this.UpdateUser}/>}/>
          <Route path='/settings/Account' element={<Account userlog={userlog} log={log} UpdateUser={this.UpdateUser}/>}/>
          <Route path='/settings/Paiement' element={<Paiement userlog={userlog} log={log} UpdateUser={this.UpdateUser}/>}/>
          <Route path='/settings/Notification' element={<Notification userlog={userlog} log={log} UpdateUser={this.UpdateUser}/>}/>
        <Route path='/Search-Project/:Project' element={<SearchWorkSpace log={log} userlog={userlog} closeMenu={this.closeMenu} GetDate={this.GetDate}/>}/>
        <Route path='/Search-Project' element={<SearchWorkSpace log={log} userlog={userlog} closeMenu={this.closeMenu} GetDate={this.GetDate}/>}/>

        {log>=1?<>
                  <Route path='/MyProjects/:Project' element={<MyWorkSpace log={log} userlog={userlog} closeMenu={this.closeMenu} GetDate={this.GetDate}/>}/>
                  <Route path='/MyProjects' element={<MyWorkSpace log={log} userlog={userlog} closeMenu={this.closeMenu} GetDate={this.GetDate}/>}/>
        {log===2?<><Route path='/RProject/:Project' element={<RWorkSpace log={log} userlog={userlog} closeMenu={this.closeMenu} GetDate={this.GetDate} ProfileSkills={ProfileSkills}/>}/>
                  <Route path='/RProject' element={<RWorkSpace log={log} userlog={userlog} closeMenu={this.closeMenu} GetDate={this.GetDate} ProfileSkills={ProfileSkills}/>}/>

                  <Route path='/NewPost' element={<NewPost log={log} userlog={userlog} closeMenu={this.closeMenu} GetDate={this.GetDate}/>}/></>:null}
                  <Route path='/NewProject' element={<NewProject log={log} userlog={userlog} closeMenu={this.closeMenu} GetDate={this.GetDate}/>}/>
                  <Route path='/Chat' element={<Inbox log={log} userlog={userlog} closeMenu={this.closeMenu}/>}/>
                  <Route path='/Chat/Conversation' element={<Conversation log={log} userlog={userlog} closeMenu={this.closeMenu}/>}/>
                  <Route path='/Notification' element={<PageNotification log={log} userlog={userlog} closeMenu={this.closeMenu}/>}/>
                  <Route path='/Profile/:Username' element={<ProfilePro log={log} userlog={userlog} ProfileLinks={ProfileLinks} ProfileSkills={ProfileSkills} ProfilePosts={ProfilePosts} closeMenu={this.closeMenu}  RatePost={this.RatePost}/>}/>
        </>:<></>}
        <Route path='/Profile/:Username' element={<ProfilePro log={log} closeMenu={this.closeMenu}  RatePost={this.RatePost}/>}/>
        {log===0?<Route path='/Login/:Login' element={<Login getuserInfo={this.getuserInfo}/>}/>:<Route path='/Login/:Login' element={<WorkSpace log={log} userlog={userlog} closeMenu={this.closeMenu} ProfileSkills={ProfileSkills} GetDate={this.GetDate}/>}/>}
        {log===0?<Route path='/LoginWork/:Login' element={<Login getuserInfo={this.getuserInfo}/>}/>:<>
          {log===1?<Route path='/LoginWork' element={<WorkerSignUp userlog={userlog} getuserInfo={this.getuserInfo}/>}/>:
                  <Route path='/LoginWork' element={<WorkSpace log={log} userlog={userlog} closeMenu={this.closeMenu} ProfileSkills={ProfileSkills} GetDate={this.GetDate}/>}/>}
        </>}
        {log===1?<Route path='/StartWork' element={<WorkerSignUp userlog={userlog} getuserInfo={this.getuserInfo}/>}/>:<Route path='/StartWork' element={<WorkSpace log={log} userlog={userlog} closeMenu={this.closeMenu} ProfileSkills={ProfileSkills} GetDate={this.GetDate}/>}/>}
      </Routes>
    </div>  
    <Footer log={log}/>
    </BrowserRouter>
  </div>
        )
    }
}