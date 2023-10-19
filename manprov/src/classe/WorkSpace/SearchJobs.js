import React,{Component} from 'react';
import {variables} from '../../Variables';
import { NavWSpace } from './NavWSpace';
import { CartJob } from '../Component/CartJob';
import { Project } from '../Component/Project';
import { Search } from '../Component/search';
import { Loader } from '../Component/Loader';
import './WorkSpace.css'

export class SearchWorkSpace extends Component{
    constructor(props){
        super(props);
        this.state={
            log:this.props.log,
            projects:[],
            RecProject:[],
            Jobs:[],
            RecJob:[],
            ProposedJobs:[],
            proposedJobsIds:[],
            preposeSkills:[],
            Skills:[],
            WorkerSkills:[],
            selectedProject:null,
            selectedJobs:[],
            selectedSkills:[],
            UserApply:[],
            selectedJob:0,
            selecteedProject:0,
            jobview:{},
            search:'',
            Is_searching:false,
            seachList:[],
            isLoading:true,
            isLoadingSkills:false,

            search_step:0,

            WorkerMaitrisetbl:"WorkerMaitrise",
            ProjectRequiredtbl:"ProjectRequired",
            Applytbl:'Apply_For',
            SearchJobstbl:'SearchJob',
            Skilltbl:'Skill',
            PredictJobstbl:'PredictJobs',
            Notificationtbl:"Notification",
            NotifUsertbl:"NotifUser",
            preposeJobstbl:"PreposeJobs",
            InterestedJobstbl:"InterestedJobs",
            PhotoPath:variables.PHOTO_URL,

            location:window.location.pathname
        };
    }
    GetProject=()=>{
        this.state.isLoading=true;
        if(this.state.selectedJob!=0)this.state.proposedJobsIds.push(parseInt(this.state.selectedJob))
        fetch(variables.API_URL+'JobsGET',{ 
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.proposedJobsIds)
        })  
        .then(res=>res.json(this.state.proposedJobsIds))
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
                    body:JSON.stringify(this.state.proposedJobsIds)
                })
                .then(response=>response.json())
                .then(data=>{
                        this.state.selectedSkills = data;
                        this.SelectJob()
                        this.setState({ isLoading: false})
                        window.scrollTo(0, 0);
                        this.setState({})
                })
            },(error)=>{alert('Failed');})
        },(error)=>{alert('Failed');})
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
            if(this.state.log>=1){
                fetch(variables.API_URL+this.state.InterestedJobstbl+'/'+this.props.userlog.id+'/'+this.state.selectedJob)
                .then(response=>response.json())
                .then(data=>{
                    console.log(data)
                    this.state.jobview=data;
                    this.setState({})
                })
            }
        }
    }
    GetApply=()=>{
        fetch(variables.API_URL+'W'+this.state.Applytbl+'/'+this.props.userlog.id)
        .then(response=>response.json())
        .then(data=>{
            this.state.UserApply= data;
            this.setState({})
            console.log(this.state.UserApply)
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
    RecommendProjects=(Skills,Profession,whatset)=>{
        fetch(variables.API_URL+this.state.PredictJobstbl+'/'+Profession+'/',{
                method:'POST',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify(Skills)
            }) 
            .then(res=>res.json())
            .then((result)=>{
                if(whatset===1){this.state.RecJob=result;console.log(this.state.RecJob)}
                if(whatset===2){
                    this.state.proposedJobsIds = result;
                    console.log(this.state.proposedJobsIds)
                    this.GetProject()
                }
                
        },(error)=>{alert('Failed');})
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
                this.state.proposedJobsIds=result;
                console.log(this.state.proposedJobsIds)
                this.GetProject()
        },(error)=>{alert('Failed');})
    }
    perposeJobs=()=>{
        let Workerid=0;
        if( Object.keys(this.props.userlog).length ===13) Workerid=this.props.userlog.id;
        console.log(this.props.userlog)
        fetch(variables.API_URL+this.state.preposeJobstbl+'/'+Workerid)
        .then(response=>response.json())
        .then(data=>{
            this.state.ProposedJobs=data;
            console.log(this.state.ProposedJobs)
            fetch(variables.API_URL+this.state.ProjectRequiredtbl+'GET',{ 
                method:'POST',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify([this.state.ProposedJobs[this.state.search_step].id])
            })
            .then(response=>response.json())
            .then(data=>{
                    this.state.preposeSkills = data;
                    this.RecommendProjects(this.state.preposeSkills,this.state.ProposedJobs[this.state.search_step].Profession,2)
            })
            if(this.state.log===2)this.GetApply()
        })
    }
    componentDidMount(){
        const pathname = window.location.pathname;
        let strpathname = pathname.split('/')
        if(strpathname.length>2){
            let X = strpathname[2];
            this.state.selecteedProject = parseInt( X.split('-')[0]);
            this.state.selectedJob = parseInt( X.split('-')[1]);
        }
        if(this.state.log===2){
        fetch(variables.API_URL+this.state.WorkerMaitrisetbl+'/'+this.props.userlog.id)
        .then(response=>response.json())
        .then(data=>{
            this.state.WorkerSkills=data;
            this.perposeJobs()
            this.RecommendProjects(this.state.WorkerSkills,this.props.userlog.Profession,1)
            this.GetApply()
        })
        }else{
            this.perposeJobs()
        }
        window.addEventListener('popstate', this.changeProjectBack);
        this.intervalId = setInterval(this.linkProject, 100);
    }
    componentWillUnmount() {
      window.removeEventListener('popstate', this.changeProjectBack);
      clearInterval(this.intervalId);
    }
    linkProject = () => {
       if(this.state.location!= window.location.pathname){
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
        let selectedProject=this.state.projects.filter(
            function(el){
                return el.id==key;
            }
        )
        this.state.selectedProject = selectedProject[0]
        let projectId=this.state.selectedProject.id;
        this.state.selectedJobs=this.state.Jobs.filter(
            function(el){
                return el.Project==projectId;
            }
        )
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
            console.log(result)
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
    changesearch=(e)=>{
        this.state.search = e.target.value
        this.setState({selectedProject:null,selectedJob:0})
    }
    Search=()=>{
        if(this.state.search!=''){
            this.SearchProject()
            this.AddSearch()
            this.setState({Is_searching:true})
        }
        else {
            this.perposeJobs()
            this.setState({Is_searching:false})
        }
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
            this.setState({})
        },(error)=>{alert('Failed');})
    }
    next_Jobs=()=>{
        console.log(this.state.ProposedJobs.length)

        if(this.state.ProposedJobs.length>this.state.search_step){
            this.state.search_step++;
            console.log(this.state.search_step)
            this.perposeJobs();
        }
    }
    prev_Jobs=()=>{
        if(0<this.state.search_step){
            this.state.search_step--;
            console.log(this.state.search_step)
            this.perposeJobs();
        }
    }
    refrech=()=>{
        this.state.search=''
        this.setState({Is_searching:false})
        this.perposeJobs()
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
                this.setState({});
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
                search,
                isLoadingSkills,
                isLoading,
                selectedJob,
                search_step,
                ProposedJobs,
                Is_searching,
                RecJob
            }=this.state;
            return(
                    <div className='ProSW'>
                        <div className='bareRecJob'><button className='btn3' onClick={this.refrech}><i class="fa fa-refresh" aria-hidden="true"></i></button> </div>
                        <Search search={search} changesearch={this.changesearch} Search={this.Search}/>
                        <div className='JobsSpace'>
                            {selectedProject!=null?<Project log={log} selectedJob={selectedJob} project={selectedProject} Jobs={selectedJobs} Skills={selectedSkills} UserApply={UserApply} RecJob={RecJob} Apply={this.Apply} RemoveApply={this.RemoveApply} Save={this.Save} isLoadingSkills={isLoadingSkills} PhotoPath={PhotoPath}/>:null}
                            {!isLoading?<>
                            <div className='w-100'>
                                {!Is_searching?<div className='h4 text-light m-3 text-center'>Suggestions</div>:null}
                                <div className='Jobs '>
                                    {Jobs.length>0?Jobs.map((e, i) => (<CartJob Link={'Search-Project/'} Job={e} Skills={selectedSkills}/>))
                                    :<div><h2 className='text-center'><img src="./PIC/search.png" width='60px'/></h2></div>}
                                </div>
                            </div>
                            </>:<Loader/>}
                        </div>
                        {!Is_searching?
                        <div className='d-flex'>
                            <button className={'btn btn-outline-light m-2 ' +(search_step!==0?'active':'')} onClick={this.prev_Jobs}>
                                Prev {search_step!==0?search_step-1:''}</button>
                            <button className={'btn btn-outline-light m-2 ' +(search_step!==ProposedJobs.length?'active':'')} onClick={this.next_Jobs}>
                                Next  {search_step!==ProposedJobs.length-1?search_step+1:''}</button>
                        </div>
                        :<></>}
                    </div>
            )
    }
}
}