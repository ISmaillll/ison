import React,{Component} from 'react';
import './Conversation.css'


export class Conversation extends Component{

     SendMessage(){
        const handleClick = () => {
        const newElement = document.getElementsByClassName('MessageSend')
        newElement.innerHTML = 'This is a new element!';
        document.body.appendChild(newElement);
      }
      return (
              <button onClick={handleClick}>Add Element</button>
      );
    }
    render(){
        return(
            <div className='bg-dark ' id='Chat1to1'>
              <div className="message-item chatFrom">
                <div className="sender">
                  <button className='btn' onClick={this.props.ExitChat}><i class="bi bi-x text-light h3"></i></button>
                  <img src="PIC/back.webp" className="img-fluid rounded-xl profile-img" style={{maxWidth: '80px'}}/>
                  John Smith
                </div>
              </div>
             <div class="chat">

                {Array.apply(null, { length: 10 }).map((e, i) => (<>
                  <div class="message sent">
                    <div class="message-text">Sure, how about 12:30?</div>
                    <div class="message-time">11:45 AM</div>
                  </div>
                  <div class="message">
                    <div class="message-text">Do you want to grab lunch later?</div>
                    <div class="message-time">11:40 AM</div>
                  </div>
                  <div class="message sent">
                    <div class="message-text">I'm doing well, thanks for asking!</div>
                    <div class="message-time">11:35 AM</div>
                  </div>
                  <div class="message">
                    <div class="message-text">Hi, how are you?</div>
                    <div class="message-time">11:30 AM</div>
                  </div>
              </>))} 
               <br/><br/><br/><br/>
            </div>
            <div class='input-message'>
              <input id='MessageSend' type ='text' class='input' placeholder='Type Your Message Here '/>         
              <button className='sendbtn' onClick={this.SendMessage}>
                  <div class="svg-wrapper-1">
                      <div class="svg-wrapper"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path></svg></div>
                          </div>
                          <span>Send</span>
                </button>
              </div>
          </div>
        )
    }
}