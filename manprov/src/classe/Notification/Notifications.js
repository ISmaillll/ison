import React,{Component} from 'react';
import {variables} from '../../Variables';
import { Notf } from './Notf';
import './Notifications.css'

export class Notifications extends Component{
    constructor(props){
        super(props);
        this.state={
            Notifications:[],
            UnreadNotifications:[],
            FilterNotifications:[],
            todayNotifications : [],
            thisWeekNotifications : [],
            thisMonthNotifications : [],
            earlierNotifications : [],
            userlog:{},
            log:this.props.log,
            Notiftbl:"NotifUser",
            filterRead:"All",
            filterType:"All",
            ismenu:this.props.ismenu,
            isLoadingNotifications:true,

            PhotoPath:variables.PHOTO_URL,
        };
    }
    selectedNotfR=(e)=>{
        document.getElementsByClassName('selectedNotfR')[0].classList.remove('selectedNotfR');
        e.target.classList.add('selectedNotfR');
        this.setState({filterRead:e.target.value});
    }
    componentDidMount(){
        this.GetNotifications()
    }
    GetNotifications=()=>{
        fetch(variables.API_URL+this.state.Notiftbl+'/'+this.props.userlog.id)
        .then(response=>response.json())
        .then(data=>{
            this.state.Notifications = data;
            this.state.FilterNotifications = data;
            this.filterNotificationsByDate();
            this.state.UnreadNotifications = this.state.Notifications.filter(
                function(el){
                    if (!el.Is_read) return el;
                }
            )
            this.props.GetUnread(this.state.UnreadNotifications.length)
            this.setState({isLoadingNotifications:false})
        })
    }
    filterNotificationsByDate() {
        const today = new Date();
        const thisWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

        this.state.todayNotifications = this.state.FilterNotifications.filter(
            function(el){
                const notificationDate = new Date(el.Notif.Date);
                if(notificationDate.getTime() >= today.setHours(0, 0, 0, 0) && notificationDate.getTime() <= today.setHours(23, 59, 59, 999)) return el;
            }
        )
        this.state.thisWeekNotifications = this.state.FilterNotifications.filter(
            function(el){
                const notificationDate = new Date(el.Notif.Date);
                if(notificationDate >= thisWeekStart && !(notificationDate.getTime() >= today.setHours(0, 0, 0, 0) && notificationDate.getTime() <= today.setHours(23, 59, 59, 999))) return el;
            }
        )
        this.state.thisMonthNotifications = this.state.FilterNotifications.filter(
            function(el){
                const notificationDate = new Date(el.Notif.Date);
                if(notificationDate >= thisMonthStart && notificationDate < thisWeekStart) return el;
            }
        )
        this.state.earlierNotifications = this.state.FilterNotifications.filter(
            function(el){
                const notificationDate = new Date(el.Notif.Date);
                if(notificationDate < thisMonthStart) return el;
            }
        )
        this.setState({})
    }
    filterUnRead=()=>{
        this.state.FilterNotifications = this.state.UnreadNotifications;
        this.filterNotificationsByDate()
        this.setState({})
    }
    filterAll=()=>{
        this.state.FilterNotifications = this.state.Notifications;
        this.filterNotificationsByDate()
        this.setState({})
    }
    readNotification=(Notif)=>{
        if(!Notif.Is_read){
            Notif.Is_read = true;
            Notif.Notif = Notif.Notif.id;
            fetch(variables.API_URL+this.state.Notiftbl,{
                method:'PUT',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify(Notif)
            }) 
            .then(res=>res.json())
            .then((result)=>{
                this.GetNotifications()
            },(error)=>{alert('Failed');})
        }
    }
    refrech_totifications=()=>{
        this.state.isLoadingNotifications=true;
        this.setState({})
        this.state.Notifications = [];
        this.state.FilterNotifications = [];
        this.GetNotifications()
    }
    render(){
        {
            const {
                userlog,
                log,
                PhotoPath,
                todayNotifications,
                thisWeekNotifications,
                thisMonthNotifications,
                earlierNotifications,
                ismenu,
                isLoadingNotifications
            }=this.state;
            return(
                <div >  
                        <div className='d-flex'>
                            <button className='btn btn5 m-1 p-2' onClick={()=>this.refrech_totifications()}><i class="fa fa-refresh" aria-hidden="true"></i></button>
                            <h2 className='NotifTitle'>Notification</h2>
                        </div>
                        <div className={ismenu===1?'NotifSCont menuNotifdown':'NotifSCont'}>
                        <div class=" SelectNotif">
                            <button className='btn btnNotifselct selectedNotfR' onClick={(e)=>{this.selectedNotfR(e) ; this.filterAll();}} value="All" selected>ALL</button>
                            <button className='btn btnNotifselct' onClick={(e)=>{this.selectedNotfR(e) ; this.filterUnRead();}} value="unread">Unread</button>
                        </div>
                        </div>
                        {!isLoadingNotifications?<>
                        <div class={ismenu===1?'NotifList menuNotifdown':'NotifList'}>
                            {todayNotifications.length>0?<div className='mx-auto'>
                            <h4 className='NotifTitle'>Today</h4>
                            <div className='d-flex flex-column-reverse'>
                            {todayNotifications.map((e, i) => (<> <Notf Notif={e} PhotoPath={PhotoPath} readNotification = {this.readNotification}/></>))}
                            </div></div>:null}
                            {thisWeekNotifications.length>0?<div className='mx-auto'>
                            <h4 className='NotifTitle'>This Week</h4>
                            <div className='d-flex flex-column-reverse'>
                            {thisWeekNotifications.map((e, i) => (<> <Notf Notif={e} PhotoPath={PhotoPath} readNotification = {this.readNotification}/></>))}
                            </div></div>:null}
                        </div>
                        <div class={ismenu===1?'NotifList menuNotifdown':'NotifList'}>
                            {thisMonthNotifications.length>0?<div className='mx-auto'>
                            <h4 className='NotifTitle'>This Mounth</h4>
                            <div className='d-flex flex-column-reverse'> 
                            {thisMonthNotifications.map((e, i) => (<> <Notf Notif={e} PhotoPath={PhotoPath} readNotification = {this.readNotification}/></>))}
                            </div></div>:null}
                            {earlierNotifications.length>0?<div className='mx-auto'>
                            <h4 className='NotifTitle'>Earier</h4>
                            <div className='d-flex flex-column-reverse'>
                            {earlierNotifications.map((e, i) => (<> <Notf Notif={e} PhotoPath={PhotoPath} readNotification = {this.readNotification}/></>))}
                            </div></div>:null}
                    </div></>:<div className='loadersmall'><svg viewBox="25 25 50 50"><circle r="20" cy="50" cx="50"></circle></svg></div>}
                </div>
            )
    }
}
}