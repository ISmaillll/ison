
import '../WorkSpace/WorkSpace.css';
import React,{Component} from 'react';
import {variables} from '../../Variables';
import { NavWSpace } from './NavWSpace';
import { CartProject } from '../Component/CartProject';
import { MyPro } from '../Component/myProject';
import {NavLink} from 'react-router-dom';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper';

SwiperCore.use([Navigation, Pagination]);



export class MyWorkSpace extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            projects:[],
            ownedProjects:[],
            jobsProjects:[],
            selectedProject:null,
            selectedJobs:[],
            selectedSkills:[],
            SlectedJob:{
                id:0,
                Date:"",
                Description:"",
                Job:"",
                Payment:"",
                Project:0,
                State:"Avalble",
            },
            SlectedJobSkills:[],
            JobApplayers:[],
            ProjectPrv:0,
            userlog:{},
            log:this.props.log,
            search:'',
            seachList:[],
            ProjectRequiredtbl:"ProjectRequired",
            Projectstbl:'Projects',
            Jobstbl:'JobsProjectGET',
            JobApplayerstbl:'JApply_For',
            Notificationtbl:"Notification",
            NotifUsertbl:"NotifUser",

            location:window.location.pathname,
            PhotoPath:variables.PHOTO_URL,
        };
    }
    componentDidMount(){
        this.GetOwendProject()
        window.addEventListener('popstate', this.changeProjectBack);
        this.intervalId = setInterval(this.linkProject, 1000);
        window.scroll(0,0)
    }
    componentWillUnmount() {
      window.removeEventListener('popstate', this.changeProjectBack);
      clearInterval(this.intervalId);
    }
    linkProject =()=> {
       if(this.state.location!== window.location.pathname){
        this.state.location = window.location.pathname;
        this.changeProjectBack()
       }
    }
    changeProjectBack = () => {
        const pathname = window.location.pathname;
        let strpathname = pathname.split('/')
        if(strpathname.length>2){
            let key=parseInt(strpathname[2])
            let selectedProject=this.state.ownedProjects.filter(
                function(el){
                    return el.id==key;
                }
            )
            if(selectedProject.length==0){
                selectedProject=this.state.jobsProjects.filter(
                    function(el){
                        return el.id==key;
                    }
                )
            }
            this.state.selectedProject = selectedProject[0]
            this.state.selectedJobs=this.state.Jobs.filter(
                function(el){
                    return el.Project==key;
                }
            )
            if(this.state.selectedProject.Manager.id==this.props.userlog.id)this.state.ProjectPrv=1;
            this.setState({})
            window.scrollTo(0, 0);
        }
    }
    GetWorkinJobs=()=>{
        fetch(variables.API_URL+this.state.PredictJobstbl+'/'+this.props.userlog.Profession+'/',{
                method:'POST',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state.WorkerSkills)
            }) 
            .then(res=>res.json())
            .then((result)=>{
                this.state.RecJob=result;
                    this.GetProject()
        },(error)=>{alert('Failed');})
    }
    GetOwendProject=()=>{
        this.state.isLoading=true;
            fetch(variables.API_URL+this.state.Projectstbl+'/'+this.props.userlog.id)  
            .then(res=>res.json())
            .then(data=>{
                this.state.ownedProjects = data;
                let ProjectsID = []
                this.state.ownedProjects.map(P=>ProjectsID.push(P.id))
                this.GetJobsProject(ProjectsID)
            },(error)=>{alert('Failed');})
    }
    GetJobsProject=(ProjectsID)=>{
        this.state.isLoading=true;
            fetch(variables.API_URL+this.state.Projectstbl+'WorkGET/'+this.props.userlog.id)  
            .then(res=>res.json())
            .then(data=>{
                this.state.jobsProjects = data;
                this.state.jobsProjects.map(P=>ProjectsID.push(P.id))
                this.Getjobs(ProjectsID)
            },(error)=>{alert('Failed');})
    }
    Getjobs=(ProjectsID)=>{
        fetch(variables.API_URL+this.state.Jobstbl,{  
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify(ProjectsID)
        })  
        .then(res=>res.json())
        .then(data=>{
            this.state.Jobs = data;
            let JobID = []
            this.state.Jobs.map(P=>JobID.push(P.id))
            this.GetSkills(JobID)
            this.GetApplayers(JobID)
            this.setState({})
        },(error)=>{alert('Failed');})
    }
    GetSkills=(JobID)=>{
        fetch(variables.API_URL+this.state.ProjectRequiredtbl+'GET',{ 
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify(JobID)
        })
        .then(response=>response.json())
        .then(data=>{
            this.state.selectedSkills = data;
            this.changeProjectBack()
                this.setState({})
        })
    }
    GetApplayers=(JobID)=>{
        fetch(variables.API_URL+this.state.JobApplayerstbl,{ 
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify(JobID)
        })
        .then(response=>response.json())
        .then(data=>{
            this.state.JobApplayers = data;
            console.log(this.state.JobApplayers)
            this.setState({})
        })
    }
    changeProject=(project)=>{
        let key=project.id;
        let selectedProject=this.state.ownedProjects.filter(
            function(el){
                return el.id==key;
            }
        )
        if(selectedProject.length==0){
            selectedProject=this.state.jobsProjects.filter(
                function(el){
                    return el.id==key;
                }
            )
        }
        this.state.selectedProject = selectedProject[0]
        this.state.selectedJobs=this.state.Jobs.filter(
            function(el){
                return el.Project==key;
            }
        )
        this.setState({})
        window.scrollTo(0, 0);
    }
    PrvProject=()=>{
        this.state.ProjectPrv = 1;
        console.log(this.state.ProjectPrv)
        this.setState({})
    }
    NotPrvProject=()=>{
        this.state.ProjectPrv = 0;
        console.log(this.state.ProjectPrv)
        this.setState({})
    }
    AcceptWorker=(Job,Appler)=>{
        console.log(Job)
        const WorkerApplyer = Appler.Worker;
        Job.State='taken';
        Appler.State = true;
        Appler.Worker = Appler.Worker.id;
        Appler.Date_Work = this.props.GetDate()
        fetch(variables.API_URL+'Jobs',{  
            method:'PUT',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify(Job)
        })  
        .then(res=>res.json())
        .then(data=>{
            fetch(variables.API_URL+'Apply_For',{  
                method:'PUT',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify(Appler)
            })  
            .then(res=>res.json())
            .then(data=>{
                this.GetOwendProject()
                this.AddNotification(Job,Appler,WorkerApplyer)
            },(error)=>{alert('Failed');})
        },(error)=>{alert('Failed');})
    }
    AddNotification=(Job,Appler,WorkerApplyer)=>{
        console.log(WorkerApplyer)
        const dateString = this.props.GetDate();
        fetch(variables.API_URL+this.state.Notificationtbl,{
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Content: " Accept you for "+Job.Job,
                Link: "MyProjects/"+Job.Project,
                Date: dateString,
                Type: "Accept",
                By: this.props.userlog.id
            })
        }) 
        .then(res=>res.json())
        .then((result)=>{
            let notification = result;
            let NotifUser = [{UserNot:Appler.Worker,Notif:notification.id,Is_read:false}]
            fetch(variables.API_URL+this.state.NotifUsertbl,{
                method:'POST',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify(NotifUser)
            }) 
            .then(res=>res.json())
            .then((result)=>{
                console.log(result)
                this.sendEmail(Job,WorkerApplyer)
            },(error)=>{alert('Failed');})
        },(error)=>{alert('Failed');})
    }
    sendEmail(Job,Appler) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.set('Authorization', 'Basic ' + btoa('<API Key>'+":" +'<Secret Key>'));
      
        const data = JSON.stringify({
          "Messages": [{
            "From": {"Email": "ismailbelk2003@gmail.com", "Name": "ISON"},
            "To": [{"Email": Appler.Email, "Name": Appler.Username}],
            "Subject": "etat civil",
            "TextPart": "<html><h2>etat civil</h2><div>Hello Mr."+Appler.Username+" "+"<br/><p>"+this.props.userlog.Username+" Accept you for </p><a target='_blank' href='MyProjects/"+Job.Project+"'>"+Job.Job+"</a></html>"
          }]
        });
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: data,
        };
        fetch("https://api.mailjet.com/v3.1/send", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }
    setSelectedjob=(Job)=>{
        this.state.SlectedJob = Job;
        let JobID = Job.id;
        this.state.SlectedJobSkills = this.state.selectedSkills.filter(function(el){
            if (el.Job === JobID) return el
        })
        this.setState({})
    }
    render(){
        {
            const {
                ownedProjects,
                jobsProjects,
                log,
                Progress,
                PhotoPath,
                search,
                selectedProject,
                selectedJobs,
                SlectedJob,
                SlectedJobSkills,
                selectedSkills,
                JobApplayers,
                ProjectPrv
            }=this.state;
            return(<>
                <div className='ProSW'>
                        {selectedProject!=null?<MyPro  project={selectedProject} SlectedJob={SlectedJob} SlectedJobSkills={SlectedJobSkills} setSelectedjob={this.setSelectedjob} Jobs={selectedJobs} JobApplayers={JobApplayers} Skills={selectedSkills} AcceptWorker={this.AcceptWorker} PhotoPath={PhotoPath} ProjectPrv={ProjectPrv} GetProject={this.GetOwendProject} GetDate={this.props.GetDate}/>:null}
                            <br/>
                        <div className='MyProjectspace'>
                            {log===2?jobsProjects.length>0?
                            <div className='CountainSwiperProject'>
                                <h4 className='ms-5'>Work on</h4>
                                <Swiper effect={"cards"} grabCursor={true} modules={[Pagination]}className="mySwiper">
                                    {jobsProjects.map((e, i) => (
                                        <SwiperSlide><CartProject Project={e} PhotoPath={PhotoPath} InitProject={null} PrvProject={this.NotPrvProject}/></SwiperSlide> 
                                    ))}
                                    </Swiper>
                            </div>
                            :
                            <div className='WScontainer MyPEmpty CatSpace text-center'>
                                <span className='subTextWS'>We have Somme of <span style={{color:'#7E98FD'}}>the Best Job offer</span></span><br/>
                                <br/><br/><br/><br/>
                                <NavLink className="btn actionCartPro" to="/RWorkSpace">Jobs For you</NavLink>:
                            </div> 
                            :null}
                            {ownedProjects.length>0?<div className='CountainSwiperProject'>
                                <h4 className='ms-5'>My Project</h4>
                                    <Swiper effect={"cards"} grabCursor={true} modules={[Pagination]}className="mySwiper">
                                        {ownedProjects.map((e, i) => (
                                            <SwiperSlide><CartProject Project={e} PhotoPath={PhotoPath} InitProject={null} PrvProject={this.PrvProject}/></SwiperSlide> 
                                        ))}
                                    </Swiper>
                                </div>:
                                <div className='WScontainer MyPEmpty'>
                                    <span className='subTextWS'>"Great minds discuss <span style={{color:'#7E98FD'}}>ideas</span>"</span>
                                    <br/><br/><br/>
                                    <span className='h6'> Let us help you find<span className='TextWSGreen'> the perfect Team for your project</span></span>
                                    <br/>
                                    <NavLink className="btn actionCartPro" to="/NewProject">Start You first Project</NavLink>
                                </div> }
                            </div>
                        </div>
                </>)
    }
}
}