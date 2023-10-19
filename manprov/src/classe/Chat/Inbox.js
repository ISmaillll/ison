import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import { NavWSpace } from '../WorkSpace/NavWSpace';
import { variables } from '../../Variables';
import { Conversation } from './Conversation';
import './Conversation.css'


export class Inbox extends Component{
    constructor(props){
        super(props);
        this.state={
            log:this.props.log,
            conversationOpen:1,
            
            PhotoPath:variables.PHOTO_URL,
        };
    }
    ToChat=()=>{
        document.getElementById('Chat1to1').classList.add('openChat')
        document.getElementById('Chat1to1').classList.remove('closeChat')
        //this.setState({conversationOpen:1})
    }
    ExitChat=()=>{
        document.getElementById('Chat1to1').classList.add('closeChat')
        document.getElementById('Chat1to1').classList.remove('openChat')
       // this.setState({conversationOpen:0})
    }
    render(){
        const {
            log,
            conversationOpen,
            PhotoPath
        }=this.state;
        return (
            <div className='WSpace'>
            <NavWSpace log={log} closeMenu={this.props.closeMenu}/>
            <br/>
            <div className='ProSW'>
                <br/>
            <div>
            <div className='ChatInbox'>
            <div className="message-list">
                <h4>Inbox Messages</h4>
                {Array.apply(null, { length: 10 }).map((e, i) => (
                    <div className="message-item" id='ListConv' onClick={this.ToChat}>
                        <div className="sender">
                        <img src="PIC/back.webp" className="img-fluid rounded-xl profile-img" style={{maxWidth: '80px'}}/>
                            John Smith
                    </div>
                        <div className="subject">Meeting tomorrow</div>
                        <div className="date">March 4, 2023</div>
                        <div className="preview">Hey, just wanted to remind you that we have a meeting tomorrow at 2pm in the conference room. See you then!</div>
                    </div>
                    ))}
                </div>
                {conversationOpen===1?<Conversation ExitChat={this.ExitChat}/>:null}
            </div>
            </div>
            </div>
            </div>
        )
    }
}