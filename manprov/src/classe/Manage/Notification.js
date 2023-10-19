import React,{Component} from 'react';
import {variables} from '../../Variables';
import {NavSettings} from './NavSettings';
import  './Notification.css';

export class Notification extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            userlog:{},
            log:0,
            usertbl:"",
            EmailNot:false,
            PushNot:true,
            SMSNot:false,

            PhotoPath:variables.PHOTO_URL
        };
    }
///////////////////edit
updatesUser=()=>{
            ///username used
            ///update
}
////////////////change
changeEmailNot=()=>{
    this.setState({EmailNot:!this.state.EmailNot})
}
changePushNot=()=>{
    this.setState({PushNot:!this.state.PushNot})
}
changeSMSNot=()=>{
    this.setState({SMSNot:!this.state.SMSNot})
}
///////////////////////////
    componentDidMount(){
        this.setState({
            userlog:this.props.userlog,
            log:this.props.log
        })
        if( Object.keys(this.props.userlog).length === 0)window.location.href = "../";
        else if(this.props.log ===2 &&  Object.keys(this.props.userlog).length ===13)window.location.href = "../Profile/"+this.props.userlog.UserName;
    }
    render(){
        const {
            userlog,
            PhotoPath,
            log,
            EmailNot,
            PushNot,
            SMSNot
        }=this.state;
        return(
            <div className="d-flex bg-light Setting m-auto mt-2">
            <NavSettings/>
        <div className="w-100">

        <div class="Notif-not notification">
            <h1 class="mb-4">Notification Settings</h1>
                <span class="Notif-item">
                    <i class="ai-bug"></i>
                    <div class="Notif-item-content">
                        <span class="Notif-item-title">Email Notification:</span>
                        <div>Enable email notifications<input type="checkbox" class="Notif-item-description m-4" checked={EmailNot} onClick={this.changeEmailNot}/></div>
                    </div>
                </span>
                <span class="Notif-item">
                    <i class="ai-bug"></i>
                    <div class="Notif-item-content">
                        <span class="Notif-item-title">push notifications:</span>
                        <div>Enable push notifications<input type="checkbox" class="Notif-item-description m-4" checked={PushNot} onClick={this.changePushNot}/></div>
                    </div>
                </span>
                <span class="Notif-item">
                    <i class="ai-bug"></i>
                    <div class="Notif-item-content">
                        <span class="Notif-item-title">SMS notifications:</span>
                        <div>Enable SMS notifications<input type="checkbox" class="Notif-item-description m-4" checked={SMSNot} onClick={this.changeSMSNot}/></div>
                    </div>
                </span>
            <button type="submit" class="btn btn-primary btn-block m-4" onClick={this.updatesUser}>Save Changes</button>
        </div>
        </div>
        </div>
        )
    }
}