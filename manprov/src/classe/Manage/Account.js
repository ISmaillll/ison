import React,{Component} from 'react';
import {variables} from '../../Variables.js';
import {NavSettings} from './NavSettings';

export class Account extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            userlog:this.props.userlog,
            curentpassword:"",
            newpassword:"",
            Confirmpassword:"",
            newEmail:"",
            ConfirmationCode:"",
            Codemailed:61981649146,
            set:0,

            Workerstbl:"Worker",
            Usertbl:"User",

            PhotoPath:variables.PHOTO_URL
        };
    }
///////////////////edit
    UpdateUser=()=>{
        console.log(this.state.userlog)
        let ProfilePhoto = this.state.userlog.ProfilePhoto;
        delete this.state.userlog.ProfilePhoto;
        
        const formData = new FormData();

        for (const key in this.state.userlog) {
            formData.append(key, this.state.userlog[key]);
        }
        let Url = this.state.Usertbl;
        if(this.state.userlog.range>1) Url = this.state.Workerstbl

        fetch(variables.API_URL+Url+'/'+this.state.userlog.id+'/',{
            method:'PUT',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.props.UpdateUser(result,ProfilePhoto)
        },(error)=>{console.error('Error:', error);})
    }
    updateUserPassword=()=>{
        if(this.state.curentpassword===this.state.userlog.PassWord){
            if(this.state.newpassword.length>=8&&
                (this.containsSymbol(this.state.newpassword)||this.containsNumbers(this.state.newpassword))&&
                this.containsLetter(this.state.newpassword)&&
                (!this.state.newpassword.includes(this.state.userlog.username))&&this.state.newpassword===this.state.Confirmpassword){
                    this.state.userlog.PassWord = this.state.newpassword ;
                    this.UpdateUser()
            }else{
                document.getElementById("msg_password").innerHTML="check conditions"
            }
        }else{
            document.getElementById("msg_password").innerHTML="Current Password is wrong"
        }
    }
    sendconfirmatiocode=()=>{
        this.state.Codemailed=Math.floor(Math.random() * 100000000);
        console.log(this.state.Codemailed);
        document.getElementById('codemsg').innerHTML='Check your mail';
        document.getElementById('btncode').innerHTML='resend';
        ////////////send email
    }
    Confirmechangeemail=()=>{
        if(this.state.ConfirmationCode==this.state.Codemailed){
            fetch(variables.API_URL+this.state.Usertbl+'Get',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({UserName:this.state.newEmail})
            })
            .then(res=>res.json())
            .then((result)=>{
                if(result.found){
                    this.setState({ConfirmationCode:'',Codemailed:61981649146});
                    document.getElementById('codemsg').innerHTML='Your Email is changed';
                    document.getElementById('btncode').innerHTML='Send';
                    document.getElementById('CloseChangemail').innerHTML='Close';
                    this.state.userlog.Email = this.state.newEmail;
                    this.UpdateUser();
                }else{
                    document.getElementById('codemsg').innerHTML='Email already used';
                }
            },(error)=>{alert('Failed');})
        }else{
            document.getElementById('codemsg').innerHTML='Wrong code';
        }
    }
////////////////change
    changePassword = (e)=>{
        this.setState({curentpassword:e.target.value});
    }
    changenewPassword = (e)=>{
        this.setState({newpassword:e.target.value},()=>{
            if(this.state.newpassword===this.state.Confirmpassword){
                document.getElementById('checkP5').classList.add("fa-square-check");
                document.getElementById('checkP5').classList.remove("fa-square-xmark");
            }else{
                document.getElementById('checkP5').classList.remove("fa-square-check");
                document.getElementById('checkP5').classList.add("fa-square-xmark");
            }
        });
        if(e.target.value.length>=8){
            document.getElementById('checkP1').classList.add("fa-square-check");
            document.getElementById('checkP1').classList.remove("fa-square-xmark");
        }else{
            document.getElementById('checkP1').classList.remove("fa-square-check");
            document.getElementById('checkP1').classList.add("fa-square-xmark");
        }
        if(this.containsSymbol(e.target.value)||this.containsNumbers(e.target.value)){
            document.getElementById('checkP2').classList.add("fa-square-check");
            document.getElementById('checkP2').classList.remove("fa-square-xmark");
        }else{
            document.getElementById('checkP2').classList.remove("fa-square-check");
            document.getElementById('checkP2').classList.add("fa-square-xmark");
        }
        if(this.containsLetter(e.target.value)){
            document.getElementById('checkP3').classList.add("fa-square-check");
            document.getElementById('checkP3').classList.remove("fa-square-xmark");
        }else{
            document.getElementById('checkP3').classList.remove("fa-square-check");
            document.getElementById('checkP3').classList.add("fa-square-xmark");
        }
        if(!e.target.value.includes(this.state.userlog.username)){
            document.getElementById('checkP4').classList.add("fa-square-check");
            document.getElementById('checkP4').classList.remove("fa-square-xmark");
        }else{
            document.getElementById('checkP4').classList.remove("fa-square-check");
            document.getElementById('checkP4').classList.add("fa-square-xmark");
        }
    }
    changeConfirmPassword = (e)=>{
        this.setState({Confirmpassword:e.target.value},()=>{
            if(this.state.newpassword===this.state.Confirmpassword){
                document.getElementById('checkP5').classList.add("fa-square-check");
                document.getElementById('checkP5').classList.remove("fa-square-xmark");
            }else{
                document.getElementById('checkP5').classList.remove("fa-square-check");
                document.getElementById('checkP5').classList.add("fa-square-xmark");
            }
        });
    }
    changeConfimemail = (e)=>{
        this.setState({ConfirmationCode:e.target.value});
    }
    changeemail = (e)=>{
        this.setState({newEmail:e.target.value});
    }
    ////////////////////////////  
    Passwodvision=(e)=>{
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
    containsNumbers(str) {
    return /\d/.test(str);
    }
    containsSymbol(str) {
    return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
    }
    containsLetter(str) {
    return /[A-Za-z]/.test(str);
    }
    componentDidMount(){
        this.state.set=this.props.set;
        if( Object.keys(this.props.userlog).length === 0)window.location.href = "../";
        else if(this.props.log ===2 &&  Object.keys(this.props.userlog).length ===13)window.location.href = "../Profile/"+this.props.userlog.UserName;
    }
    render(){
        const {
            userlog,
            curentpassword,
            newpassword,
            Confirmpassword,
            newEmail,
            ConfirmationCode
        }=this.state;
        return(
            <div className="d-flex bg-light Setting m-auto mt-2">
                <NavSettings/>
                <div className="w-100">
                <h4 className='text-secondary m-4' >Account</h4>
                <h5 className='text-secondary m-4'>Email settings</h5>
                    <div className='w-75 m-auto'>
                        <label >E-mail</label>
                        <div className='w-100'>
                            <input className='form-style' type='text' value={userlog.Email} onChange={null}/>
                            <button type="button" className="btn btn-outline-info m-2" data-bs-toggle="modal"data-bs-target="#emailChange">change email</button>
                        </div>
                    </div>
                    <h5 className='text-secondary m-4'>Change your password</h5>
                    <div className='w-75 m-auto'>
                        <label >Current password</label>
                        <i className="bi bi-eye-slash-fill m-2" eye1="logpass2" onClick={this.Passwodvision}></i>
                        <input className='form-style w-100' type='password' id='logpass2' value={curentpassword} onChange={this.changePassword}/>
                    </div>
                    <div className='w-75 m-auto'>
                        <label >New password</label>
                        <input className='form-style w-100' type='password' id='logpass3' value={newpassword} onChange={this.changenewPassword}/>
                    </div>
                    <div className='w-75 mt-4 mb-4 m-auto'>
                        <div><i className="fa-solid fa-square-xmark m-2" id='checkP1' style={{color:'#0095ff'}}></i>At least 8 characters</div> 
                        <div><i className="fa-solid fa-square-xmark m-2" id='checkP2' style={{color:'#0095ff'}}></i>At least one number or symbol</div> 
                        <div><i className="fa-solid fa-square-xmark m-2" id='checkP3' style={{color:'#0095ff'}}></i>At least one letter</div> 
                        <div><i className="fa-solid fa-square-xmark m-2" id='checkP4' style={{color:'#0095ff'}}></i>Does not contain username</div> 
                        <div><i className="fa-solid fa-square-xmark m-2" id='checkP5' style={{color:'#0095ff'}}></i>Confirme password</div> 
                    </div>
                    <div className='w-75 m-auto'>
                        <label >Confirm  password</label>
                        <input className='form-style w-100' type='password' id='logpass4' value={Confirmpassword} onChange={this.changeConfirmPassword}/>
                    </div>
                    <div>
                        <div id='msg_password'className='text-danger m-2'></div>
                        <button className='btn btn-outline-info m-3' onClick={this.updateUserPassword}>Save</button>
                    </div>
                </div>
                <div className="modal fade " id="emailChange" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content cahngeEmail">
                <div className="modal-body ">
                    <h3 className='text-center mb-4' style={{color:'#6290c3'}}>Change your email</h3>
                    <div className='w-75 m-auto d-grid'>
                        <label className='m-3'>New email</label>
                        <input className='form-style w-75' type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={newEmail} onChange={this.changeemail}/>
                    </div>
                    <h6 className='text-center text-info m-1'>Enter the new email address you wish to use.</h6>    
                    <div className='w-75 m-auto d-grid'>
                        <label className='m-1'>confirmation code</label>
                        <div className=''>
                            <input className='form-style w-50' type='text'  maxLength="8" value={ConfirmationCode} onChange={this.changeConfimemail}/>
                            <button className='btn btn-outline-secondary m-3' id='btncode' onClick={this.sendconfirmatiocode}>send</button>
                            <h6 className='text-center text-info' id='codemsg'></h6>
                        </div>
                        <div>
                            <button className='btn btn-outline-info m-3'onClick={this.Confirmechangeemail}>Confirme</button>
                            <button id="CloseChangemail" type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
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