import React,{Component} from 'react';
import {variables} from '../../Variables';
import { NavWSpace } from './NavWSpace';
import { Search } from '../Component/search';
import {Slider} from '../Component/slider';
import { CartJob } from '../Component/CartJob';
import './WorkSpace.css'
import { NavLink } from 'react-router-dom';
import { SearchList } from '../Component/SearchList';
import { CartProject } from '../Component/CartProject';
import { Creator } from '../Creators/Creator';
import { IsonLogo } from '../Component/IsonLogo';

import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination,Scrollbar,A11y} from 'swiper';
import { Loader } from '../Component/Loader';

SwiperCore.use([Autoplay,Navigation, Pagination]);

export class WorkSpace extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            ProfileSkills:this.props.ProfileSkills,
            log:this.props.log,
            search:'',

            RecJob:[],
            Jobs:[],
            SaerchJobs:[],
            searchCreators:[],
            IsSearching:false,
            isLoadingSearch:false,
            selectedSkills:[],

            ownedProjects:[],
            jobsProjects:[],
            Creators:[],
            isLoadingCreators:true,
            isLoadingProjects:true,
            isLoadingJobs:true,

            Searchs:[],

            slidesPerView:0,
            slidesPerViewHist:12,
            ScreenWidth:0,

            Stat:[],

            PredictJobstbl:'PredictJobs',
            ProjectRequiredtbl:"ProjectRequired",
            theseWorkers:'GettheseWorker',
            SearchJobstbl:'SearchJob',
            searchCreatorstbl:"SearchWorker",
            Projectstbl:'Projects',
            Workerstbl:"Worker",
            Statstbl:"Stat",

            PhotoPath:variables.PHOTO_URL,
        };
    }
    componentDidMount(){
        if(this.state.log ===2 && this.state.ProfileSkills.length>0)this.RecommendProjects()
        else this.setState({isLoadingJobs:false})
        if(this.state.log >=1)this.GetYourProjects()
        this.getCerators()
        this.getSearch()
        this.setslidesPerView()
        this.getStat()
        this.setState({})
        this.intervalId = setInterval(this.setslidesPerView, 100);
    }
    componentWillUnmount() {
      clearInterval(this.intervalId);
    }
    setslidesPerView = () => {
       if(this.state.ScreenWidth!=window.innerWidth){
            this.state.ScreenWidth=window.innerWidth;
            if(window.innerWidth>1350)this.state.slidesPerView=3;
            else if(window.innerWidth>930)this.state.slidesPerView=2;
            else this.state.slidesPerView=1;
            if(window.innerWidth>1200)this.state.slidesPerViewHist=10;
            else if(window.innerWidth>900)this.state.slidesPerViewHist=8;
            else if(window.innerWidth>600)this.state.slidesPerViewHist=6;
            else if(window.innerWidth>400)this.state.slidesPerViewHist=4;
            else if(window.innerWidth<=400)this.state.slidesPerViewHist=3;
            else this.state.slidesPerViewHist=10;
            this.setState({})
       }
    }
    componentDidUpdate(prevProps){
        if(prevProps.ProfileSkills!=this.props.ProfileSkills){
            this.state.ProfileSkills = this.props.ProfileSkills
            if(this.state.ProfileSkills.length>0)this.RecommendProjects()
        }
    }
    //////Rec Jobs
    GetProject=()=>{
        this.state.isLoading=true;
        console.log(this.state.RecJob)
        fetch(variables.API_URL+'JobsGET',{ 
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.RecJob)
        })  
        .then(res=>res.json(this.state.RecJob))
        .then(data=>{
            this.state.Jobs=data;
        })
        .then(o=>{
            fetch(variables.API_URL+this.state.ProjectRequiredtbl+'GET',{ 
                method:'POST',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state.RecJob)
            })
            .then(response=>response.json())
            .then(data=>{
                    this.state.selectedSkills = data;
                    this.setState({ isLoadingJobs: false})
                    window.scrollTo(0, 0);
                    this.setState({})
            })
        },(error)=>{alert('Failed');})
    }
    RecommendProjects=()=>{
        fetch(variables.API_URL+this.state.PredictJobstbl+'/'+this.props.userlog.Profession+'/',{
                method:'POST',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state.ProfileSkills)
            }) 
            .then(res=>res.json())
            .then((result)=>{
                if(result!='ALL')this.state.RecJob=result;
                if(this.state.RecJob.length>0)this.GetProject()
                else this.setState({isLoadingJobs:false})
        },(error)=>{alert('Failed');})
    }
    ///// Project
    GetYourProjects=()=>{
        this.state.isLoadingProjects=true;
            fetch(variables.API_URL+this.state.Projectstbl+'/'+this.props.userlog.id)  
            .then(res=>res.json())
            .then(data=>{
                this.state.ownedProjects = data;
                    fetch(variables.API_URL+this.state.Projectstbl+'/'+this.props.userlog.id)  
                    .then(res=>res.json())
                    .then(data=>{
                        this.state.ownedProjects=data;
                        if(this.props.log===2)this.GetJobsProject()
                        this.setState({isLoadingProjects:false})
                        console.log(this.state.ownedProjects)
                    },(error)=>{alert('Failed');})
            },(error)=>{alert('Failed');})
    }
    GetJobsProject=()=>{
            fetch(variables.API_URL+this.state.Projectstbl+'WorkGET/'+this.props.userlog.id)  
            .then(res=>res.json())
            .then(data=>{
                this.state.jobsProjects = data;
                console.log(this.state.jobsProjects)
                this.setState({isLoadingProjects:false})
            },(error)=>{alert('Failed');})
    }
    ///// Search 
    changesearch=(e)=>{
        this.state.search = e.target.value;
        this.state.SaerchJobs = []; 
        this.state.searchCreators = []; 
        this.state.IsSearching = false;
        this.setState({})

    }
    Search=()=>{
        if(this.state.search!=''){
            this.setState({isLoadingSearch:true})
            this.SearchProject();
            this.AddSearch()
            this.state.IsSearching= true;
            this.setState({})
        }
        else {
            this.state.SaerchJobs = []; 
            this.state.searchCreators = []; 
            this.state.IsSearching = false;
            this.setState({})
        }
    }
    SearchProject=()=>{
        fetch(variables.API_URL+this.state.SearchJobstbl,{
                method:'POST',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state.search)
            }) 
            .then(res=>res.json())
            .then((result)=>{
                this.state.SaerchJobs=result;
                this.GetSearchProject()
        },(error)=>{alert('Failed');})
    }
    GetSearchProject=()=>{
        this.state.isLoading=true;
        console.log(this.state.SaerchJobs)
        fetch(variables.API_URL+'JobsGET',{
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.SaerchJobs)
        })  
        .then(res=>res.json(this.state.SaerchJobs))
        .then(data=>{
            this.state.SaerchJobs=data;
            this.FilterCreators();
            console.log(this.state.SaerchJobs)
        })
    }
    FilterCreators=()=>{
        var search = this.state.search;
        fetch(variables.API_URL+this.state.searchCreatorstbl,{
                method:'POST',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify(search)
            }) 
            .then(res=>res.json())
            .then((result)=>{
                this.state.searchCreators=result;
                console.log(result)
                this.GettheseWorkers()
        },(error)=>{alert('Failed');})
    }
    GettheseWorkers=()=>{
        fetch(variables.API_URL+this.state.theseWorkers,{ 
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.searchCreators)
        })  
        .then(res=>res.json(this.state.searchCreators))
        .then(data=>{
            this.state.searchCreators=data;
            this.setState({isLoadingSearch:false})
        }).catch(error => this.setState({isLoadingSearch:false}));
    }
    ///////////
    SelectSearch=(tag)=>{
        if(this.state.search=="")this.state.search += tag;
        else this.state.search += " "+tag;
        this.setState({});
    }
    emptysearch=()=>{
        this.state.search = "";
        this.state.SaerchJobs = []; 
        this.state.searchCreators = []; 
        this.state.IsSearching = false;
        console.log('d')
        this.setState({})
    }
    getSearch=()=>{
        fetch(variables.API_URL+'Search/'+this.props.userlog.id)
        .then(response=>response.json())
        .then(data=>{ 
            this.state.Searchs = data;
            console.log(data)
        })
    }
    AddSearch=()=>{
        fetch(variables.API_URL+'Search',{
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                user:this.props.userlog.id,
                content:this.state.search,
                Time:this.props.GetDate(),
                count:1
            })
        }) 
        .then(res=>res.json())
        .then((result)=>{
            console.log(result)
            if(!this.state.Searchs.includes(this.state.search))this.state.Searchs.push(this.state.search);
            this.setState({})
        },(error)=>{alert('Failed');})
    }
    //////////// best Workers
    getCerators=()=>{
        fetch(variables.API_URL+this.state.Workerstbl+"/?inf=0&sup=10")
            .then(response=>response.json())
            .then(data=>{
                this.state.Creators = data;
                this.setState({ isLoadingCreators: false})
        }).catch(error => this.setState({ isLoading: false, error }));
    }
    /////////// Get Stat
    getStat=()=>{
        fetch(variables.API_URL+this.state.Statstbl)
            .then(response=>response.json())
            .then(data=>{
                this.state.Stat = data;
                console.log(this.state.Stat)
                this.setState({})
        })
    }
    render(){
        {
            const {
                search,
                Jobs,
                IsSearching,
                isLoadingSearch,
                isLoadingProjects,
                isLoadingJobs,
                selectedSkills,
                SaerchJobs,
                searchCreators,
                Searchs,
                ownedProjects,
                jobsProjects,
                Creators,
                Stat,
                isLoadingCreators,
                slidesPerView,
                slidesPerViewHist,
                ScreenWidth,
                PhotoPath
            }=this.state;
            const userlog = this.props.userlog
            const log = this.props.log
            const TAGS = ['HTML', 'CSS', 'JavaScript', 'Software Engineer', 'Developer', 'React', 'Python', 'Vue.js', 'Django', 'SVG', 'IT', 'Data Modeling'];/// change default search
            const ROWS = 1;
            const TAGS_PER_ROW = 12;
            let HistList = [];
            if(Searchs.length<=12) HistList = Searchs.concat(TAGS.slice(0,TAGS_PER_ROW*ROWS-Searchs.length))
            else HistList = Searchs.slice(0,12)
            return(
                <div className='ProSW'>
                    <div className='TopHome'>
                    <br/><br/><br/><br/>
                    <div className='InTopHome'>
                    <h1 className='WSsay'>{Object.keys(userlog).length >2?<>Hi , <span style={{color:'#7E98FD'}}>{ userlog.UserName}</span></>:null}</h1>
                    <h1 className='WSsay'>Here you can find the right Job for you 
                        <span className='subTextWS'> or the right Worker for your Project</span>  
                        </h1>
                        <div className='inputanim '>
                            <input className='SearchHome' onChange={this.changesearch} value={search} type="text" placeholder="Search for any service..."/>
                            <button className="btn3 ms-1" onClick={this.Search}><i class="fa fa-search" aria-hidden="true"></i></button>
                        </div>
                        {IsSearching?<SearchList Creators={searchCreators} Jobs={SaerchJobs} emptysearch={this.emptysearch} isLoadingSearch={isLoadingSearch}/>:null} 
                        {ScreenWidth>300?<span className='h5 text-light'>Suggestions:</span>:null}
                    </div>
                    </div>
                    {ScreenWidth>300?<div className='histSearchs'>
                        <Swiper modules={[Navigation, A11y]} spaceBetween={0} slidesPerView={slidesPerViewHist} navigation >
                            {HistList.map((tag, i) => (<SwiperSlide>
                                <div className='d-flex     justify-content-center'><button className='btn SearchSelectbtn' key-s="N" onClick={()=>this.SelectSearch(tag)} value-s={tag}>{tag}</button></div>
                                </SwiperSlide>))}
                        </Swiper>
                    </div>:null}
                {log>=1?<>
                    {log===2?<><>{Jobs.length>0?
                    <div className='m-5 text-center h4 text-light'>
                        <span>You can apply for these Jobs</span>
                        <NavLink className='btn3 m-3 h6' to="/RProject">See More</NavLink>
                    </div>:
                    <div className='m-5 text-center h4 text-light'>
                        <span>Search for Jobs</span>
                        <NavLink className='btn3 m-3 h6' to="/Search-Project">Browse</NavLink>
                    </div>}</>
                        <div className={isLoadingJobs?'Scroll-WS':''}>
                            {isLoadingJobs?<Loader/>:<>
                            {Jobs.length>0?
                                <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={10}
                                slidesPerView={slidesPerView}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                >
                                    {Jobs.map((e, i) => (<SwiperSlide><CartJob Link={'RProject/'} Job={e} Skills={selectedSkills}/></SwiperSlide>))}
                                </Swiper>
                                    :<div className='card CartPro m-auto text-center'>
                                        <img src='../PIC/Updatecaracter.svg'/>
                                        <span className='Stattext'>Update Your Profile Skills so we can requemend jobs for you</span>
                                        <NavLink className='btn actionCartPro m-3 h6' to="/settings/Profile">Account</NavLink>
                                    </div>}
                            </>}
                        </div></>:null}
                    <div className='ProjectWS'>
                        <div className='YProjectWS'>
                            <div>
                            <div className='m-5 text-center h4 text-light'>
                                <span>These are your project</span>
                                <NavLink className='btn3 m-3 h6' to="/MyProjects">See All</NavLink>
                            </div>
                                {isLoadingProjects?<Loader/>:<>
                                    <div className='MyProjectHome'>
                                    {log===2?<><div className='CountainSwiperProject'>
                                            {jobsProjects.length===0?<div>
                                            <div className='WScontainer CatSpace text-center'>
                                                <span className='subTextWS'>We have Somme of <span style={{color:'#7E98FD'}}>the Best Job offer</span></span><br/>
                                                <br/><br/><br/><br/>
                                                {Jobs.length>0?<NavLink className="btn actionCartPro" to="/RWorkSpace">Jobs For you</NavLink>:
                                                <NavLink className="btn actionCartPro" to="/Search-Project">Browse for Jobs</NavLink>}
                                            </div>
                                            </div>:<>
                                                <h4 className='ms-5'>Work on</h4>
                                                <Swiper pagination={{ clickable: true }} grabCursor={true} modules={[Navigation]}className="mySwiper">
                                                    {jobsProjects.map((e, i) => (
                                                        <SwiperSlide><CartProject Project={e} i={i} PhotoPath={PhotoPath} InitProject={null} PrvProject={this.PrvProject}/></SwiperSlide> 
                                                    ))}
                                                </Swiper></>}
                                        </div></>:null}
                                        <div className='CountainSwiperProject'>
                                            {ownedProjects.length===0?<>
                                                <div className='WScontainer'>
                                                    <span className='subTextWS'>"Great minds discuss <span style={{color:'#7E98FD'}}>ideas</span>"</span>
                                                    <br/><br/><br/>
                                                    <span className='h6'> Let us help you find<span className='TextWSGreen'> the perfect Team for your project</span></span>
                                                    <br/>
                                                    <NavLink className="btn actionCartPro" to="/NewProject">Start You first Project</NavLink>
                                                </div>
                                            </>:<>
                                            <h4 className='ms-5'>My Project</h4>
                                            <Swiper pagination={{ clickable: true }} grabCursor={true} modules={[Navigation]}className="mySwiper">
                                                {ownedProjects.map((e, i) => (
                                                    <SwiperSlide><CartProject Project={e} i={i} PhotoPath={PhotoPath} InitProject={null} PrvProject={this.PrvProject}/></SwiperSlide> 
                                                ))}
                                                </Swiper></>}
                                        </div>
                                    </div></>}
                                </div>
                            </div>
                        </div>
                </>:null}
                {log<=1?<div className='OffersWS'>
                    <h1 id='OurOffers'>Our Offers</h1>
                    <Swiper modules={[Autoplay,Navigation, Pagination]} spaceBetween={10} slidesPerView={1}
                            loop={true} autoplay={{delay: 5000,disableOnInteraction: true,}} navigation
                            pagination={{ clickable: true }}>
                        {log===0?
                        <SwiperSlide>
                            <div className='WScontainer'>
                                <span className='subTextWS'>"Great minds discuss <span style={{color:'#7E98FD'}}>ideas</span>"</span>
                                <h3> Start Working on your idea today </h3>
                                <span className='h6'> Let us help you find<span className='TextWSGreen'> the perfect Team for your project</span></span>
                                <br/>
                                <NavLink className="btn actionCartPro" to="/Login/0">SignUp Now</NavLink>
                            </div>
                        </SwiperSlide>:null}
                        <SwiperSlide>
                            <div className='WScontainer CatSpace'>
                                <span className='subTextWS'>Whatever Skills you have People will <span style={{color:'#7E98FD'}}>need you</span></span>
                                <br/>
                                <h3> Start Working</h3>
                                <span className='h6'>and Join <span className='TextWSGreen'>{"+"+Stat.Creators} Creator</span> that are using our services today</span>
                                {log===1?<ul className="navbar-nav">
                                    <NavLink className="btn actionCartPro" to="/StartWork">Start Working</NavLink>
                                </ul>:null}
                                {log===0?<ul className="navbar-nav">
                                    <NavLink className="btn actionCartPro" to="/LoginWork/0">Start Working</NavLink>
                                </ul>:null}
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>:null}
                {isLoadingCreators?<><Loader/></>:<>
                    <div className='StatWS'>
                            <section className='StatCountainer'>
                                <div className='StatTitle'>Creators </div>
                                <div className='StatNum'>+{Stat.Creators}</div>
                                <div className='Stattext'> with defrent skill </div>
                                <hr className='lineStat'/>
                            </section>
                            <section className='StatCountainer'>
                                <div className='StatTitle'>Projects </div>
                                <div className='StatNum'>+{Stat.Projects}</div>
                                <div className='Stattext'> Created with our help</div>
                                <hr className='lineStat'/>
                            </section>
                            <section className='StatCountainer'>
                                <div className='StatTitle'>Jobs </div>
                                <div className='StatNum'> +{Stat.jobs}</div>
                                <div className='Stattext'> Offered by various Companies</div>
                                <hr className='lineStat'/>
                            </section>
                    </div></>}
                {isLoadingCreators?<><Loader/></>:<>
                    <div className='m-5 text-center h4 text-light'>
                        <span className='text-center m-3 h4'>We have somme of the best Creators</span>
                        <NavLink className='btn3 m-3 h6' to="/Creators">See More</NavLink>
                    </div>
                        <div className='Creators p-1 '>
                            {Creators.length>0?<>{Creators.map((Worker, i) => (
                                <NavLink className="text-decoration-none text-light" to={"/Profile"+"/"+Worker.UserName}>
                                    <Creator Creator={Worker} i={i+1} PhotoPath={PhotoPath}/>
                                </NavLink>))}</>:<div className='h1 m-5 text-center'>No result</div>}
                        </div>
                        </>}
                </div>
            )
    }
}
}