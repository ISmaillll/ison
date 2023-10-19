import React,{Component} from 'react';
import { PostCart } from '../Component/PostCart';
import './Profile.css'
import { NavLink } from 'react-router-dom';
import { variables } from '../../Variables';
import { Loader } from '../Component/Loader';

export class ProfilePro extends Component {
    constructor(props){
        super(props);
        this.state={
            users:[],
            Workers:[],
            Links:[],
            Skills:[],
            AllSkills:[],
            Posts:[],
            ProfileUser:{},
            Is_userlogProfile:false,
            log:this.props.log,
            RateProfile:'?',
            UserRating:[],
            isLoadPosts: false,
            ProfileLinks:[],
            ProfileSkills:[],
            ProfilePosts:[],
            usertbl:"User",
            Workerstbl:"Worker",
            Linkstbl:"LinksProfile",
            Skillstbl:"WorkerMaitrise",
            AllSkillstbl:"Skill",
            Poststbl:"Post",
            slidesPerView:0,

            location:window.location.pathname,
            PhotoPath:variables.PHOTO_URL,
        };
    }
    SelectRate=(e)=>{
        this.state.RateProfile = e.target.getAttribute('value-s');
        document.getElementById('btnRate').classList.add('RateActv')
        document.getElementById('RateStar').setAttribute('style','scale:'+(1+this.state.RateProfile/5))
        document.getElementById('RateNum').setAttribute('style','scale:'+(1+this.state.RateProfile/5))
        this.setState({})
    }
    RateProfile=()=>{
        if(this.state.RateProfile!=='?'){
            fetch(variables.API_URL+'WorkerRateUser'+'/'+this.props.userlog.id+'/'+this.state.ProfileUser.id+'/'+this.state.RateProfile,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state.ProfileUser)
            })
            .then(res=>res.json())
            .then((result)=>{
                console.log(result)
                this.state.UserRating = result.new_Rate;
                if(result.new_Rate.length>0)this.state.RateProfile = result.new_Rate[0].Rating;
                this.state.ProfileUser.Rating = result.UserRate;
                document.getElementById('msg_RatePro').innerHTML='Thanks For Your Opinion, It Is Important For Us';
                this.setState({})
            },(error)=>{alert('Failed');})
            this.setState({})
        }
    }
    componentDidMount=()=>{
      this.initUser();
      this.intervalId = setInterval((this.checkProfile), 100);
      window.scroll(0,0)
    }
    componentWillUnmount() {
      clearInterval(this.intervalId);
    }
    checkProfile = () => {
       if(this.state.location!== window.location.pathname){
        this.state.location = window.location.pathname;
        this.initUser()
       }
    }
    initUser=()=>{
        this.setState({isLoading: true}) 
        ///////////// GET Profile User
        const pathname = window.location.pathname; 
        const Username  = pathname.split('/')[2]
        fetch(variables.API_URL+this.state.usertbl+'Get',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({UserName:Username})
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            if(result.found){
                this.state.ProfileUser=result.User[0];
                this.setState({})
                if(this.props.userlog!=null)if(this.state.ProfileUser.UserName==this.props.userlog.UserName)this.state.Is_userlogProfile=true;
                if(this.state.ProfileUser.range===2){
                    this.state.ProfileSkills=result.Skills;
                    this.state.ProfileLinks=result.Links;
                    this.state.ProfilePosts=result.posts;
                    this.setState({})
                }
                if(this.state.log>0)
                    fetch(variables.API_URL+'WorkerRateUser'+'/'+this.props.userlog.id+'/'+this.state.ProfileUser.id)
                    .then(response=>response.json())
                    .then(data=>{
                            this.state.UserRating = data;
                            if(data.length>0)this.state.RateProfile = data[0].Rating;
                            this.setState({})
                    })
                this.setState({isLoading: false}) 
            }
        }).catch(error => this.setState({ isLoading: false, error }));
    }

    render(){
        const {
            ProfileUser,
            ProfileLinks,
            ProfileSkills,
            ProfilePosts,
            PhotoPath,
            Is_userlogProfile,
            RateProfile,
            log,
            isLoading,
            slidesPerView
        }=this.state;
        return(
            <div className='Profile-back'>
                {!isLoading?<>
                <br/>
                <br/>
                        <div class="profile-header">
                            <div className='Topprofile'>
                                <div className='profile_pic'>
                                    <div>
                                        <img src={PhotoPath+ProfileUser.ProfilePhoto} alt="Profile picture" class="profile-img"/>
                                    </div>
                                    {!Is_userlogProfile?<>
                                        {log==0?<><NavLink className='btn btn3 m-1' to='/Login/1'>Rate</NavLink></>:<>
                                        <button className='btn btn3 m-1' data-bs-toggle="modal"data-bs-target={"#RateWorker"}><i class="fa fa-star" aria-hidden="true"></i> Rate</button>
                                        <div className="modal fade " id={"RateWorker"} tabIndex="-1" aria-hidden="true">
                                        <div className="modal-dialog modal-lg modal-dialog-centered">
                                        <div className="modal-content RateSpace">
                                        <button className='btn-close m-3' data-bs-dismiss="modal" aria-label="Close" type="submit"></button>
                                        <div className="modal-body d-flex flex-column">
                                            <span><i class="fa fa-star "id='RateStar'></i></span>
                                            <span id='RateNum'>{RateProfile}</span>
                                            <h6 className='checked'>Rate this Worker</h6>
                                            <h4>{ProfileUser.UserName}</h4>
                                            <div class="rating">
                                            {Array.apply(null, { length: 5 }).map((v, i) => (<>
                                            <input type="radio" id={'star-'+(5-i)} value-s={5-i} onClick={(e)=>this.SelectRate(e)} name="star-radio" value={"star-"+(5-i)}/>
                                            <label for={"star-"+(5-i)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path  value-s={i+1} onClick={(e)=>this.SelectRate(e)} pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                                            </label></>))}
                                            </div>                                            
                                            <button className='btn RateButton' id='btnRate'onClick={this.RateProfile}>Rate</button>
                                            <div id='msg_RatePro' className='text-info'></div>
                                        </div>
                                        </div> 
                                        </div>
                                        </div></>}</>
                                    :<div className='text-center'><NavLink className="btn btn3 m-1" to="/Settings/Profile"><i class="bi bi-gear-fill">Account</i></NavLink></div>}
                                </div>
                                <div className="profile-info ms-2">
                                    <h2>{ProfileUser.Name} {ProfileUser.Lastname}</h2>
                                    <h3>{ProfileUser.UserName}</h3>
                                    {ProfileUser.range>=2?<>
                                    <div className='h6'>{ProfileUser.Profession} <img src='/static/PIC/brain.png' width='30px'/></div>
                                    <div>{ProfileUser.Education_Level} </div>
                                    <div className='SliderProfile'>
                                    <div className='m-2 d-flex'>
                                        {ProfileLinks.map((Link, i) => ( <a className='linksProfile' href={Link.URL} target='_blank'><i class="bi bi-link-45deg"></i>{Link.To}</a>))}
                                    </div>
                                    </div>
                                    <div className='SliderProfile'>
                                    <div className='m-2 d-flex'>
                                    {ProfileSkills.map(skill => (<>
                                            <il className='skillsPost d-flex'>
                                                <i className={"bi bi-dice-"+skill.Skill_Rating+"-fill m-1"}></i> 
                                                <span className='m-1'>{skill.Skill.skill}</span>
                                            </il >
                                    </>))}                                        
                                    </div>
                                    </div>
                                    </>:null}
                                <div className='text-light h6'>{ProfileUser.Bio}</div>
                                <div className="profile-stats">
                                {ProfileUser.range>=2?<>
                                    <div class="stat">
                                        <h3>{ProfilePosts.length}</h3>
                                        <p>Posts</p>
                                    </div>
                                    
                                    <div className="stat">
                                        <div className='d-flex'>
                                            <div className='m-1'>
                                                <h3 className='text-center'><i className={'bi bi-star-fill  checked'}></i>{ProfileUser.Rating}</h3>
                                                <p>Total Rating</p>
                                            </div>
                                            <hr className='hrCreator'/>
                                            <div className='m-1'>
                                                <h3 className='text-center'>{ProfileUser.Nbr_Rating}</h3>
                                                <p>Ratings</p>
                                            </div>
                                        </div>
                                    </div>
                                    </>:null}
                            </div>
                        </div>
                    </div>
                    {ProfileUser.range>=2?<><h2 className='m-3'>Posts</h2></>:null}
                    </div>
                    {/*{ProfileUser.Is_Worker?<>
                   <div className='projects'>
                        {Array.apply(null, { length: 12 }).map((e, i) => (<PostCart/>))}
                    </div>
                    <Post nprevtPIC={this.props.nprevtPIC} nextPIC={this.props.nextPIC} RatePost={this.props.RatePost}/>
                    </>:<div style={{height:'300px'}}></div>}*/}
            </>:<Loader/>}
        </div>
        )
    }
} 
