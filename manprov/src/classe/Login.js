import React,{Component} from 'react';
import {variables} from '../Variables.js';
import { useNavigate  } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Login.css';

export class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            userlog:{
                UserName:"",
                PassWord:"",
                Email:""
            },
            userregister:{
                UserName:"",
                Name:"",
                Lastname:"",
                PassWord:"",
                Email:"",
                CartHolder: "",
                Criditcart: 0,
                Expiration: "",
                CVV: 0,
                range: 1
            },
            Proposedusernames:[],
            log:0,
            passwordW:"Your Password",
            usermailW:"Your Email / Username",
            usenamemsg:'',
            Emailmsg:'',
            PassWordmsg:'',
            Namemsg:'',
            isLoadingregister: false,
            registerstep:1,
            vereficationcode:"",
            ConfPassWord:"",
            cardMonth:"",
            cardYear:"",
            code :0,
            IsLogin:parseInt( window.location.pathname.split('/')[2]),
            usertbl:"User",
            PhotoPath:variables.PHOTO_URL,
            
        };
    }
///////////////////////
changeCheckedLogin=()=>{
    if(this.state.IsLogin===1)this.setState({IsLogin:0})
    else this.setState({IsLogin:1})
}
////////////////log change
    changePasswordlog = (e)=>{
        if(e.target.value!='')this.state.passwordW='';
        else this.state.passwordW="Your Password";
        let X=this.state.userlog;
        X.PassWord=e.target.value;
        this.setState({userlog:X});
    }
    changeusername_maillog = (e)=>{
        if(e.target.value!='')this.state.usermailW='';
        else this.state.usermailW="Your Email / Username";
        let X=this.state.userlog;
        X.UserName=e.target.value;
        X.Email=e.target.value;
        this.setState({userlog:X});
    }
////////////////register change
    changePasswordregister = (e)=>{
        let X=this.state.userregister;
        X.PassWord=e.target.value;
        this.setState({userregister:X});
    }
    changeusernameregister = (e)=>{
        if(/^[a-zA-Z0-9]+$/.test(e.target.value)||e.target.value==''){
            let X=this.state.userregister;
            X.UserName=e.target.value;
            this.setState({userregister:X});
        }
    }
    changeemailregister = (e)=>{
        let X=this.state.userregister;
        X.Email=e.target.value;
        this.setState({userregister:X});
    }
    changeFnameregister = (e)=>{
        if(/^[a-zA-Z ]+$/.test(e.target.value)||e.target.value==''){
        let X=this.state.userregister;
        X.Name=e.target.value;
        this.setState({userregister:X});
        }
    }
    changeLnameregister = (e)=>{
        if(/^[a-zA-Z ]+$/.test(e.target.value)||e.target.value==''){
        let X=this.state.userregister;
        X.Lastname=e.target.value;
        this.setState({userregister:X});
        }
    }
    changevereficationcode = (e)=>{
        this.setState({vereficationcode:e.target.value});
    }
    changeConfPassWord = (e)=>{
        this.setState({ConfPassWord:e.target.value});
    }
//////////////////////////////LOgin
    verfie=(e)=>{
        e.preventDefault();
        let passwordFild=document.getElementById("msg_passwordlog");
        let Matfild=document.getElementById("msg_usernamelog");
        passwordFild.innerHTML="";
        Matfild.innerHTML="user not found"
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
            if(result.exist){
                Matfild.innerHTML="";
                if(result.Password){
                    this.state.userlog=result.data[0];
                    this.setinfolog();
                }else   passwordFild.innerHTML="Password incorrect";     
            }   
        },(error)=>{alert('Failed');})
    }
    setinfolog(){
        const { UserName, PassWord } = this.state.userlog;
        const credentialsString = `${UserName}:${PassWord}`;
        const encodedCredentials = btoa(credentialsString);
        this.setCookie('credentials', encodedCredentials, 1);
        this.props.getuserInfo(UserName,PassWord)
    }
/////////////////////////////////Register
    register=(e)=>{
        e.preventDefault();
        this.setState({isLoadingregister:true});
        let UserR=this.state.userregister; 
        console.log(UserR); 
        if(UserR.Name.trim()!==""&&UserR.Lastname.trim()!=="")
        fetch(variables.API_URL+this.state.usertbl+"/",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(UserR)
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            if(result.id!==null){
                const updatedUserLog = {
                    UserName: this.state.userregister.UserName,
                    PassWord: this.state.userregister.PassWord,
                };
                this.setState(
                    {userlog: updatedUserLog,isLoadingregister: false,},
                    () => { this.setinfolog(); }
                );
            }
        },(error)=>{
            alert('Failed');
        })
        else this.setState({ isLoadingregister: false,Namemsg:"enter Name and Lastname"})
    }
    //// register steps
    NextStep=(e)=>{
        switch(this.state.registerstep){
          case 1:this.verefiecode();break;
          case 2:this.verficateusername();break;
          case 3:this.verficatePassword();break;
          default:break;
        }
        this.setState({})
    }
    PrevStep=()=>{
        this.state.registerstep--;
        this.setState({});
    }
    sendcode=()=>{
        this.state.code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        this.setState({Emailmsg:"check you E-mail"});
        console.log(this.state.code);
        /* send to mail */
    }
    verefiecode=()=>{
        var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if(this.state.userregister.Email.trim()===""||!emailRegex.test(this.state.userregister.Email.trim())){
            this.setState({Emailmsg:"E-mail error"});
        }else{
            fetch(variables.API_URL+this.state.usertbl+"Exist/"+this.state.userregister.Email.trim()+"/")
            .then(response=>response.json())
            .then(data=>{
                if(data.Exist){
                    this.setState({Emailmsg:"E-mail already used"});
                }else if(this.state.code===0){
                    this.setState({Emailmsg:"push send code button"});
                }else if(this.state.code===parseInt(this.state.vereficationcode)){
                    this.state.registerstep++;
                    this.setState({Emailmsg:""});
                }else {
                    this.setState({Emailmsg:"wrang code"});
                }
            }).catch(error => console.log(error));
        }
    }
    verficateusername=()=>{
        if(this.state.userregister.UserName.trim()===""){
            this.setState({usenamemsg:"Enter your username"});
        }else{
            fetch(variables.API_URL+this.state.usertbl+"Exist/"+this.state.userregister.UserName.trim()+"/")
            .then(response=>response.json())
            .then(data=>{
                if(data.Exist){
                    this.setState({usenamemsg:"usenamemsg already used"});
                }else {
                    this.state.registerstep++;
                    this.setState({usenamemsg:""});
                }
            }).catch(error => console.log(error));
        }
    }
    verficatePassword=()=>{
        if(this.state.userregister.PassWord.trim()===""){
            this.setState({PassWordmsg:"Enter your PassWord"});
        }else{
            if(this.PassWordcond(this.state.userregister.PassWord)){
                if(this.state.userregister.PassWord===this.state.ConfPassWord){
                    this.state.registerstep++
                    this.setState({PassWordmsg:""});
                }else{
                    this.setState({PassWordmsg:"Wrang confirmation password"});
                }
            }
        }
    }
    verficatePassword=()=>{
        if(this.state.userregister.PassWord.trim()===""){
            this.setState({PassWordmsg:"Enter your PassWord"});
        }else{
            if(this.PassWordcond(this.state.userregister.PassWord)){
                if(this.state.userregister.PassWord===this.state.ConfPassWord){
                    this.state.registerstep++
                    this.setState({PassWordmsg:""});
                }else{
                    this.setState({PassWordmsg:"Wrang confirmation password"});
                }
            }
        }
    }
    //////Propose usename !!!!!!
    generateRandomLetters=(length)=> {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
    
        for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    
        return result;
    }
    proposeUsername=()=> {
        this.state.Proposedusernames=[];
        const firstNameInitial = this.state.userregister.Name.charAt(0);
        const lastNameInitials = this.state.userregister.Lastname.split(' ').map((word) => word.charAt(0)).join('');
      
        // use more letters from the name and last name
        const firstNameLetters = this.state.userregister.Name.slice(0, 3).toLowerCase();
        const lastNameLetters = this.state.userregister.Lastname.replace(/\s/g, '').slice(0, 3).toLowerCase();
      
        const randomLetters = this.generateRandomLetters(2); // generate 2 random letters
        const username1 = `${firstNameInitial}${lastNameInitials}${firstNameLetters}${lastNameLetters}${randomLetters}`.toLowerCase();
        const username2 = `${firstNameLetters}${lastNameLetters}${firstNameInitial}${lastNameInitials}${randomLetters}`.toLowerCase(); // switch first and last name
        const username3 = `${firstNameInitial}.${lastNameInitials}${firstNameLetters}${lastNameLetters}${randomLetters}`.toLowerCase(); // add a dot between initials and name/last name letters
        const username4 = `${lastNameInitials}${firstNameInitial}${lastNameLetters}${firstNameLetters}${randomLetters}`.toLowerCase(); // switch first and last name initials and name/last name letters
        const username5 = `${firstNameLetters}.${lastNameLetters}${firstNameInitial}${lastNameInitials}${randomLetters}`.toLowerCase(); // add a dot between name and last name letters
      
        this.state.Proposedusernames=[username1, username2, username3, username4, username5];
        console.log(this.state.Proposedusernames)
    } 
///////////// 
    PassWordcond=(PassWord)=>{
        this.state.PassWordmsg='Password shoud ';
        if(PassWord.length<=8){
            this.state.PassWordmsg+='At least 8 characters,'
        }
        if(!(this.containsSymbol(PassWord)||this.containsNumbers(PassWord))){
            this.state.PassWordmsg+='At least one number or symbol,'
        }
        if(!this.containsLetter(PassWord)){
            this.state.PassWordmsg+='At least one letter,'
        }
        if(PassWord.includes(this.state.userregister.UserName)){
            this.state.PassWordmsg+='not contain username,'
        }
        if(this.state.PassWordmsg=='Password shoud ') this.state.PassWordmsg='';
         this.setState({});
        return (this.state.PassWordmsg=='')
    }
    containsNumbers(str) {
        return /\d/.test(str);
    }
    containsSymbol(str) {
    return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
    }
    containsLetter(str) {
    return /[A-Za-z]/.test(str);
    }
    ///////////////////////// Cookies
    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    ////////////////////////////  
    Passwodvision=(e)=>{
        console.log(e.target.getAttribute('eye1'))
        let password= document.getElementById(e.target.getAttribute('eye1'));
        if(password.type==='text'){password.type = 'password';
            e.target.classList.remove("bi-eye-fill");
            e.target.classList.add("bi-eye-slash-fill");
        }
        else{ password.type = 'text';
            e.target.classList.add("bi-eye-fill");
            e.target.classList.remove("bi-eye-slash-fill");
        }
    }
    componentDidMount=()=>{
        console.log(this.state.IsLogin)
    }
    render(){
        const {
            userlog,
            userregister,
            passwordW,
            usermailW,
            usenamemsg,
            Emailmsg,
            PassWordmsg,
            Namemsg,
            isLoadingregister,
            registerstep,
            vereficationcode,
            ConfPassWord,
            IsLogin
        }=this.state;
        return(
            <div className="fontSignup">
            <div className="container scrollLogin">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className='d-flex'>
                          <li className="navbar-nav nav-item h6  m-3"><NavLink className="nav-link d-flex justify-content-center text-light" to="/"><i class="fas fa-home    "></i> Back Home</NavLink></li>
                        </div>
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" onClick={this.changeCheckedLogin} checked={IsLogin===0}/>
                              <label for="reg-log"></label>
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <form onSubmit={this.verfie} className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4">Log In</h4>
                                                <div class="inputanim">
                                                    <i class="bi bi-person-fill logI"></i>
                                                    <input type="text" name="logemail1"className="form-style loginput" value={userlog.UserName} onChange={this.changeusername_maillog}  id="logemail1" required/>
                                                    <label>
                                                        {[...usermailW].map((e, i) => (<span style={{transitionDelay:i*40+'ms'}}>{e}</span>))}
                                                    </label>
                                                </div>
                                                <div id='msg_usernamelog'className='text-danger'></div>                                                
                                                <div className="inputanim">
                                                <i className="bi bi-eye-slash-fill logI"eye1="logpass1" onClick={this.Passwodvision}></i>
                                                    <input type="password" name="logpass1" className="form-style loginput"  value={userlog.PassWord} onChange={this.changePasswordlog} id="logpass1" required/>
                                                    <label>
                                                        {[...passwordW].map((e, i) => (<span style={{transitionDelay:i*50+'ms'}}>{e}</span>))}
                                                    </label>
                                                </div>
                                                <div id='msg_passwordlog'className='text-danger m-2'></div>
                                                <input type="submit" className="btn buttn mt-4" value={"Login"}/>
                                                <div className="text-center mt-2">
                                                <hr/>
                                                <p>or sign up with:</p>
                                                <button type="button" className="btn btn-outline-light btn-floating mx-1">
                                                    <i className="fab fa-facebook-f"></i>
                                                </button>
                                                <button type="button" className="btn btn-outline-light btn-floating mx-1">
                                                    <i className="fab fa-google"></i>
                                                </button>
                                                <button type="button" className="btn btn-outline-light btn-floating mx-1">
                                                    <i className="fab fa-twitter"></i>
                                                </button>
                                                <button type="button" className="btn btn-outline-light btn-floating mx-1">
                                                    <i className="fab fa-github"></i>
                                                </button>
                                                </div>
                                                <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
                                              </div>
                                          </div>
                                    </form>
                                    <form onSubmit={this.register} className="card-back">
                                        <div className="center-wrap">
                                            <div className="registercont text-center">
                                                <h4 className="mb-4 pb-3">Sign Up</h4>
                                                {registerstep===1?<div id='Emailregister'>
                                                    <div className="inputanim">
                                                        <i class="bi bi-envelope-fill m-2"></i>
                                                        <input type="email" name="logemail" value={userregister.Email} onChange={this.changeemailregister}  className="form-style w-75" placeholder="Your Email" id="logemail"required/>
                                                    </div>
                                                    <div className="inputanim codevrf">
                                                        <input type="vereficationcode"value={vereficationcode} onChange={this.changevereficationcode}  className="form-style" placeholder="verification code" required/>
                                                    </div>
                                                    <button type='button' class="btn7" onClick={()=>this.sendcode()}>
                                                        <span class="top-key"></span>
                                                        <span class="text">send code</span>
                                                        <span class="bottom-key-1"></span>
                                                        <span class="bottom-key-2"></span>
                                                    </button>
                                                    <div className='text-danger m-2'>{Emailmsg}</div>
                                                </div>:null}
                                                {registerstep===2?<div id='UserNameregister'>
                                                    <div className="inputanim">
                                                        <i class="bi bi-person-fill m-2"></i>
                                                        <input type="text" name="logusername" value={userregister.UserName} onChange={this.changeusernameregister} onFocus={null}  className="form-style w-75" placeholder="chose user name" id="logusername"required/>
                                                    </div>	
                                                    <div className='text-danger m-2'>{usenamemsg}</div>
                                                </div>:null}
                                                {registerstep===3?<div id='PassWordregister'>
                                                    <div className="inputanim">
                                                        <input type="password" name="logpass2" value={userregister.PassWord} onChange={this.changePasswordregister}  className="form-style w-75" placeholder="Your Password" id="logpass2"required/>
                                                    </div>
                                                    <br></br>
                                                    <div className="inputanim">
                                                        <input type="password" value={ConfPassWord} onChange={this.changeConfPassWord}  className="form-style w-75" placeholder="Confirm Your Password" id="logpass3" required/>
                                                    </div>
                                                    <div className='text-danger m-2'>{PassWordmsg}</div>
                                                </div>:null}
                                                {registerstep===4?<div id='Nameregister'>
                                                    <div className="inputanim">
                                                        <input type="text" name="logFname" value={userregister.Name} onChange={this.changeFnameregister} className="form-style nameFilde" placeholder="Your First Name" id="logFname"required/>
                                                    </div>
                                                    <br></br>
                                                    <div className="inputanim">
                                                        <input type="text" name="logLname" value={userregister.Lastname} onChange={this.changeLnameregister}  className="form-style nameFilde" placeholder="Your Last Name" id="logLname"required/>
                                                    </div>
                                                    <div className='text-danger m-2'>{Namemsg}</div>
                                                </div>:null}
                                                <div className="text-center mt-2">
                                                {registerstep!==4?<div className='d-flex justify-content-around'>
                                                    {registerstep!==1?<button type='button' className="btn buttn mt-2" onClick={()=>this.PrevStep()}>Back</button>:null}
                                                    <button type='button' className="btn buttn mt-2" onClick={()=>this.NextStep()}>Next</button>
                                                </div>:
                                                <button type='submit' className="btn buttn mt-2">{isLoadingregister?<div className='loadersmall'></div>:'Register'}</button>}
                                                <div className='d-flex justify-content-center m-3'>
                                                    {Array.apply(null, { length: registerstep }).map((e, i) => (<><i class="bi bi-caret-up-fill"></i></>))}
                                                    {Array.apply(null, { length: 4-registerstep }).map((e, i) => (<><i class="bi bi-caret-up"></i></>))}
                                                </div>
                                                <hr/>
                                                <p>or sign up with:</p>
                                                <div>
                                                    <button type="button" className="btn btn-outline-light btn-floating mx-1">
                                                        <i className="fab fa-facebook-f"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-outline-light btn-floating mx-1">
                                                        <i className="fab fa-google"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-outline-light btn-floating mx-1">
                                                        <i className="fab fa-twitter"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-outline-light btn-floating mx-1">
                                                        <i className="fab fa-github"></i>
                                                    </button>
                                                </div>
                                                </div>
                                              </div>
                                          </div>
                                      </form>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
            </div>
        </div>
        )
    }
}