import React,{Component} from 'react';
import {variables} from '../../Variables';
import { NavWSpace } from './NavWSpace';
import { CartJob } from '../Component/CartJob';
import { Project } from '../Component/Project';
import { NavLink } from 'react-router-dom';
import './WorkSpace.css'

export class RWorkSpace extends Component{
    constructor(props){
        super(props);
        this.state={
            log:this.props.log,
            RecJob:[],
            RecProject:[],
            projects:[],
            Jobs:[],
            selectedProject:null,
            selectedJobs:[],
            ProfileSkills:this.props.ProfileSkills,
            selectedSkills:[],
            UserApply:[],
            selectedJob:0,
            selecteedProject:0,
            jobview:{},

            WorkerMaitrisetbl:"WorkerMaitrise",
            ProjectRequiredtbl:"ProjectRequired",
            Applytbl:'Apply_For',
            SearchJobstbl:'SearchJob',
            PredictJobstbl:'PredictJobs',
            Notificationtbl:"Notification",
            NotifUsertbl:"NotifUser",
            InterestedJobstbl:"InterestedJobs",
            PhotoPath:variables.PHOTO_URL,

            location:window.location.pathname
        };
    }
    SelectJob=()=>{
        if(this.state.selectedJob!=0){
            let LinkedProjectID = this.state.selecteedProject;
                let selectedProject=this.state.projects.filter(
                    function(el){
                        return el.id==LinkedProjectID;
                    }
                );
                this.state.selectedProject =selectedProject[0]
                let projectId=this.state.selectedProject.id;
                this.state.selectedJobs=this.state.Jobs.filter(
                    function(el){
                        return el.Project==projectId;
                    }
                )
            fetch(variables.API_URL+this.state.InterestedJobstbl+'/'+this.props.userlog.id+'/'+this.state.selectedJob)
            .then(response=>response.json())
            .then(data=>{
                console.log(data)
                this.state.jobview=data;
                this.setState({})
            })
        }
    }
    GetApply=()=>{
        fetch(variables.API_URL+'W'+this.state.Applytbl+'/'+this.props.userlog.id)
        .then(response=>response.json())
        .then(data=>{
            this.state.UserApply= data;
            this.setState({})
        })
    }
    Apply=(e,Job,project)=>{
        e.preventDefault();
        let Date = this.props.GetDate()
        let IDJob=Job.id;
        fetch(variables.API_URL+this.state.Applytbl,{
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Date_Apply: Date,
                Date_Work: null,
                State: false,
                Worker: this.props.userlog.id,
                Job: IDJob
            })
        }) 
        .then(res=>res.json())
        .then((result)=>{
            fetch(variables.API_URL+this.state.InterestedJobstbl+'/'+this.props.userlog.id+'/'+Job.id)
            .then(response=>response.json())
            .then(data=>{
                console.log(data)
                this.state.jobview=data;
                if(!this.state.jobview.Apply){
                    this.state.jobview.Apply = true;
                    this.state.jobview.Viewcount += 20;
                    this.updateJobView();
                }
                this.setState({})
            })
            this.GetApply()
            this.AddNotification(Job,project)
        },(error)=>{alert('Failed');})
    }
    RemoveApply=(Job)=>{
        let IDJob=Job.id;
        console.log(IDJob)
        fetch(variables.API_URL+this.state.Applytbl+'/'+this.props.userlog.id+'/'+IDJob,{
            method:'DELETE',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify()
        }) 
        .then(res=>res.json())
        .then((result)=>{
            this.GetApply()
        },(error)=>{})
    }
    componentDidMount(){
        const pathname = window.location.pathname;
        let strpathname = pathname.split('/')
        if(strpathname.length>2){
            let X = strpathname[2];
            this.state.selecteedProject = parseInt( X.split('-')[0]);
            this.state.selectedJob = parseInt( X.split('-')[1]);
        }
        this.RecommendProjects()
        this.GetApply()
        window.addEventListener('popstate', this.changeProjectBack);
        this.intervalId = setInterval(this.linkProject, 100);
    }
    componentWillUnmount() {
      window.removeEventListener('popstate', this.changeProjectBack);
      clearInterval(this.intervalId);
    }
    linkProject = () => {
       if(this.state.location!== window.location.pathname){
        this.state.location = window.location.pathname;
        this.changeProjectBack()
       }
    }
    changeProjectBack = (event) => {
        const pathname = window.location.pathname;
        let strpathname = pathname.split('/')
        if(strpathname.length>2){
            let X = strpathname[2];
            let key = this.state.selecteedProject = parseInt( X.split('-')[0]);
            this.state.selectedJob = parseInt( X.split('-')[1]);
        this.SelectJob()
        this.setState({})
        window.scrollTo(0, 100);
        }
    }
    changeProject=(Job)=>{
        let key = this.state.selecteedProject = Job.Project;
        this.state.selectedJob = Job.id;
        this.SelectJob()
        this.setState({})
        window.scrollTo(0, 100);
    }
    AddNotification=(Job,project)=>{
        const now = new Date();
        const dateString = now.toISOString();
        fetch(variables.API_URL+this.state.Notificationtbl,{
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Content:" Applyed for "+Job.Job+" in your Project"+project.Name,
                Link: "MyProjects/"+project.id+'-'+Job.id+"#Job"+Job.id,
                Date: dateString,
                Type: "Applye",
                By: this.props.userlog.id
            })
        }) 
        .then(res=>res.json())
        .then((result)=>{
            let notification = result;
            let NotifUser = [{UserNot:project.Manager.id,Notif:notification.id,Is_read:false}]
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
                this.sendEmail(Job,project)
            },(error)=>{alert('Failed');})
        },(error)=>{alert('Failed');})
    }
    sendEmail(Job,project) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.set('Authorization', 'Basic ' + btoa('<API Key>'+":" +'<Secret Key>'));
      
        const data = JSON.stringify({
          "Messages": [{
            "From": {"Email": "<YOUR EMAIL>", "Name": "<YOUR NAME>"},
            "To": [{"Email": project.Manager.Email, "Name": project.Manager.Username}],
            "Subject": "etat civil",
            "TextPart": "<html><h2>etat civil</h2><div>Hello Mr."+project.Manager.Username+" "+"<br/><p>"+this.props.userlog.Username+" Applyed for "+Job.Job+" in your Project"+project.Name+"</p><a target='_blank' href='MyProjects/"+project.id+"#Job"+Job.id+"'>"+Job.Job+"</a></html>"
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
    refrech=()=>{
        this.state.selectedProject=null;
        this.state.selectedJob=0;
        this.RecommendProjects()
        this.setState({})
    }
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
            this.state.RecProject=[];
            this.state.Jobs.map(job=>{this.state.RecProject.push(job.Project)});
        })
        .then(o=>{
            fetch(variables.API_URL+'ProjectsGET',{
                method:'POST', 
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state.RecProject)
            })  
            .then(res=>res.json(this.state.RecProject))
            .then(data=>{
                this.setState({projects:data})
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
                        this.changeProjectBack()
                        this.setState({ isLoading: false})
                        window.scrollTo(0, 0);
                        this.setState({})
                })
            },(error)=>{alert('Failed');})
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
                this.state.RecJob=result;
                if(result!='ALL')this.GetProject()
        },(error)=>{alert('Failed');})
    }
    updateJobView=()=>{
        fetch(variables.API_URL+this.state.InterestedJobstbl,{ 
            method:'PUT',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.jobview)
        })
        .then(response=>response.json())
        .then(data=>{
                this.state.jobview = data;
                this.state.selectedJob = this.state.jobview.Job;
                this.setState({})
        })
    }
    Save=(Job)=>{
        fetch(variables.API_URL+this.state.InterestedJobstbl+'/'+this.props.userlog.id+'/'+Job.id)
        .then(response=>response.json())
        .then(data=>{
            this.state.jobview=data;
            this.state.jobview.Is_saved=!this.state.jobview.Is_saved;
            if(!this.state.jobview.Save){
                this.state.jobview.Save = true;
                this.state.jobview.Viewcount += 10;
            }
            if(this.state.jobview.Is_saved)alert('Job saved')
            else alert('Job unsaved')
            this.updateJobView();
            this.setState({})
        })
    }
    render(){
        {
            const {
                Jobs,
                selectedProject,
                selectedJobs,
                selectedSkills,
                UserApply,
                log,
                PhotoPath,
                isLoadingSkills,
                isLoading,
                selectedJob,
                RecJob
            }=this.state;
            return(
                    <div className='ProSW JobWS'>
                        <div className='bareRecJob'>
                            <NavLink className='btn3' onClick={this.refrech} to={'/RProject'}><i className="fa fa-refresh" aria-hidden="true"></i></NavLink>
                            <span className='m-2 h5'>{Jobs.length+' Jobs'}</span>
                        </div>
                        <br/><br/><br/><br/>
                        <div className='JobsSpace'>
                            {selectedProject!=null?<Project log={log} selectedJob={selectedJob} project={selectedProject} Jobs={selectedJobs} Skills={selectedSkills} UserApply={UserApply} RecJob={RecJob} Apply={this.Apply} RemoveApply={this.RemoveApply} Save={this.Save} isLoadingSkills={isLoadingSkills} PhotoPath={PhotoPath}/>:null}
                            {!isLoading?<>
                            <div className='w-100'>
                                <div className='Jobs '>
                                    {Jobs.length>0?Jobs.map((e, i) => (<CartJob Link={'RProject/'} Job={e} Skills={selectedSkills}/>))
                                    :<div className='card CartPro m-auto text-center'>
                                    <img src='../PIC/Updatecaracter.svg'/>
                                    <span className='Stattext'>Update Your Profile Skills so we can requemend jobs for you</span>
                                    <NavLink className='btn actionCartPro m-3 h6' to="/Settings/Profile">Account</NavLink>
                                </div>}
                                </div>
                            </div>
                            </>:<div className='loadersmall m-auto'></div>}
                        </div>
                    </div>
            )
    }
}
}