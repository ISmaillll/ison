import React,{Component} from 'react';
import {variables} from '../../Variables';
import { NavWSpace } from './NavWSpace';
import './WorkSpace.css'

export class NewProject extends Component{
    constructor(props){
        super(props);
        this.state={
            newProject:{
                Name:"",
                Type:"",
                State:"Search",
                Date:"",
                Date_Start:"",
                Duration:"",
                Budget:'0',
                LinkF:"",
                LinkChat:"",
                Description:"",
                Manager:this.props.userlog.id
            },
            Project:[],
            Jobs:[],
            JobSkills:[],
            jobsSkillList:[],
            CheckedSkills:[],
            userlog:{},
            log:this.props.log,
            searchSkill:"",
            Projecttbl:"Projects",
            Jobtbl:"Jobs",
            ProjectRequired:"ProjectRequired",
            isLoadingregister: false,
          
          FilterSkills:[],
          isLoadingregister: false,
          isLoadinSkill:true,
          usertbl:"User",
          Workertbl:"Worker",
          LinksProfiletbl:'LinksProfile',
          WorkerMaitrisetbl:"WorkerMaitrise",
          PredictWorkertbl:"PredictWorkers",
          Notificationtbl:"Notification",
          NotifUsertbl:"NotifUser",
          WorkerMailtbl:"UserMailGet",
          Skilltbl:'Skill',
          isChecked:false,
          

            PhotoPath:variables.PHOTO_URL,
        };
    }
////////////////change
changeskillRating=(e)=>{
    let JobIndex = parseInt(e.target.getAttribute('key-j'));
    let SkillIndex = parseInt(e.target.getAttribute('key-s'));
    let RatingIndex = parseInt(e.target.getAttribute('key-rt'));
    let Checked = this.state.CheckedSkills[JobIndex].includes(SkillIndex)
    if(Checked){
        if(/^(?:[1-4](?:\.\d+)?|5(?:\.0+)?)$/.test(e.target.value)){
            this.state.JobSkills[JobIndex][RatingIndex].skillrating=parseInt(e.target.value);
        }
        this.updateJobskills(JobIndex)
    }
}
changeskills=(e)=>{
    let JobIndex = parseInt(e.target.getAttribute('key-j'));
    let SkillIndex = parseInt(e.target.getAttribute('key-s'));
    let SkillV = e.target.getAttribute('value-s');
    let SkillRating = document.getElementById('inputRating'+SkillIndex+""+JobIndex);
    let Checked = this.state.CheckedSkills[JobIndex].includes(SkillIndex);
    let CheckedSkills = this.state.CheckedSkills[JobIndex];
    if(SkillV!=null)
    if(!Checked){
        this.state.JobSkills[JobIndex].push({skill:SkillV,Skillid:SkillIndex,skillrating:1});
        SkillRating.setAttribute('key-rt',this.state.JobSkills[JobIndex].length-1);
        CheckedSkills.push(SkillIndex);
    }
    else{
        let index = this.state.JobSkills[JobIndex].findIndex((obj) => obj.Skillid === SkillIndex);
        if (index > -1) {this.state.JobSkills[JobIndex].splice(index, 1);}
        index = CheckedSkills.findIndex((obj) => obj === SkillIndex);
        if (index > -1) {CheckedSkills.splice(index, 1);}
    }
    console.log(this.state.JobSkills)
    this.setState({})
    this.updateJobskills(JobIndex)
}
updateJobskills = (JobIndex) => {
    this.state.jobsSkillList[JobIndex] = '';
    for (let i = 0; i < this.state.JobSkills[JobIndex].length; i++) {
        this.state.jobsSkillList[JobIndex] += (this.state.JobSkills[JobIndex][i].skill + ' ' + this.state.JobSkills[JobIndex][i].skillrating + ',');
    }
    this.setState({});
}
    changeName=(e)=>{
        let X=this.state.newProject;
        if(/^[a-zA-Z ]+$/.test(e.target.value)||e.target.value=='')X.Name=e.target.value;
        this.setState({newProject:X})
    }
    changeType=(e)=>{
        let X=this.state.newProject;
        if(/^[a-zA-Z ]+$/.test(e.target.value)||e.target.value=='')X.Type=e.target.value;
        this.setState({newProject:X})
    }
    changeStart_date=(e)=>{
        let X=this.state.newProject;
        X.Date_Start=e.target.value;
        this.setState({newProject:X})
    }
    changeEnd_date=(e)=>{
        let X=this.state.newProject;
        X.Duration=e.target.value;
        this.setState({newProject:X})
    }
    changeBudget=(e)=>{
        let X=this.state.newProject;
        if(/^-?\d+(?:[.,]\d*?)?$/.test(e.target.value)||e.target.value=='')X.Budget=e.target.value;
        this.setState({newProject:X})
    }
    changeLink=(e)=>{
        let X=this.state.newProject;
        X.LinkF=e.target.value;
        this.setState({newProject:X})
    }
    changeLinkChat=(e)=>{
        let X=this.state.newProject;
        X.LinkChat=e.target.value;
        this.setState({newProject:X})
    }
    changeDescription=(e)=>{
        let X=this.state.newProject;
        X.Description=e.target.value;
        this.setState({newProject:X})
    }
    incjobnum=()=>{
        this.state.Jobs.push({Job:"",Project:0,Payment:"",State:"Avalble",Description:"",Date:this.props.GetDate()})
        this.state.JobSkills.push([]);
        this.state.CheckedSkills.push([]);
        this.state.jobsSkillList.push("");
        this.setState({})
    }
    decjobnum=()=>{
        this.state.Jobs.splice(this.state.Jobs.length-1, 1);
        this.state.JobSkills.splice(this.state.Jobs.length-1, 1);
        this.state.CheckedSkills.splice(this.state.Jobs.length-1, 1);
        this.state.jobsSkillList.splice(this.state.Jobs.length-1, 1);
        this.setState({})
    }
    changeWorkerjob=(e)=>{
        let key=e.target.getAttribute('key-w');
        this.state.Jobs[key].Job=e.target.value;
        this.setState({})
    }
    changeWorkerrequired=(e)=>{
        let key=e.target.getAttribute('key-w');
        this.state.Jobs[key].required=e.target.value;
        this.setState({})
    }
    changeWorkerPayment=(e)=>{
        let key=e.target.getAttribute('key-w');
        this.state.Jobs[key].Payment=e.target.value;
        this.setState({})
    }
    changeWorkerDescription=(e)=>{
        let key=e.target.getAttribute('key-w');
        this.state.Jobs[key].Description=e.target.value;
        this.setState({})
    }
    changesearchSkill=(e)=>{
        this.state.searchSkill=e.target.value;
        this.setState({})
        this.FilterSkills()
    } 
    FilterSkills=()=>{
        var searchSkill = this.state.searchSkill;
      
        var filteredData=this.state.Skills.filter(
            function(el){
                return el.skill.toString().toLowerCase().includes(
                  searchSkill.toString().trim().toLowerCase()
                )
            }
        );
        console.log(filteredData)
        this.state.FilterSkills=filteredData;
        this.setState({});
    }
    submitProject=(e)=>{
        if(this.state.newProject.Date_Start==="")this.state.newProject.Date_Start=null;
        if(this.state.newProject.Duration==="")this.state.newProject.Duration=null;
        if(this.state.newProject.LinkChat==="")this.state.newProject.LinkChat="\\";
        if(this.state.newProject.LinkF==="")this.state.newProject.LinkF="\\";
        this.state.newProject.Description.substring(0, 499);


        e.preventDefault();
        this.setState({isLoadingregister:true});
        this.state.newProject.Date = this.props.GetDate()
            /////////////////////////// ADD PROJECT
              fetch(variables.API_URL+this.state.Projecttbl,{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(this.state.newProject)
                })
                .then(res=>res.json())
                .then((result)=>{
                    let ProjectID = result.id; 
                        /////////////////////ADD JOBS  
                        this.state.Jobs.map((Job,i)=>{
                        Job.Project = ProjectID;
                        fetch(variables.API_URL+this.state.Jobtbl,{
                              method:'POST',
                              headers:{
                                  'Accept':'application/json',
                                  'Content-Type':'application/json'
                              },
                              body:JSON.stringify(Job)
                          })
                          .then(res=>res.json())
                          .then((result)=>{
                              ////////////////////////////////// ADD Skills
                                let jobskills = [];
                                let Job_ID = result.id;
                                this.state.JobSkills[i].map((Skill,i)=>{ 
                                    jobskills.push({
                                        Skill_Rating: Skill.skillrating,
                                        Skill: parseInt(Skill.Skillid),
                                        Job: Job_ID,
                                     }
                                      )
                                    })  
                                      fetch(variables.API_URL+this.state.ProjectRequired,{
                                          method:'POST',
                                          headers:{
                                            'Accept':'application/json',
                                            'Content-Type':'application/json'
                                          },
                                            body:JSON.stringify(
                                            jobskills
                                          )
                                      })
                                    console.log('notif')
                                    this.NotifieWorker(Job,Job_ID,jobskills)
                          },(error)=>{alert('Failed');})
                        })
                        this.initProject();
                        this.setState({isLoadingregister:false});
                },(error)=>{alert('Failed');})
    }
    initProject=()=>{
        this.setState({
            newProject:{
                Name:"",
                Type:"",
                State:"Search",
                Date:"",
                Date_Start:"",
                Duration:"",
                Budget:0,
                LinkF:"",
                Description:"",
                Manager:this.props.userlog.id
            },
        })
    }
    NotifieWorker=(Job,Job_ID,jobskills)=>{
        fetch(variables.API_URL+this.state.PredictWorkertbl+'/'+Job.Job+'/',{
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify(jobskills)
        }) 
        .then(res=>res.json())
        .then((result)=>{
            console.log(result)
            let WorkerNot = result;
            let index = WorkerNot.findIndex((obj) => obj.id===this.props.userlog.id);
            if (index > -1) {WorkerNot.splice(index, 1);}
            this.AddNotification(Job,Job_ID,WorkerNot);
            let IdWorker = []
            WorkerNot.map(worker=>IdWorker.push(worker.id))
            fetch(variables.API_URL+this.state.WorkerMailtbl,{
                    method:'POST',
                    headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                    },
                    body:JSON.stringify(IdWorker)
                }) 
                .then(res=>res.json())
                .then((result)=>{
                    let Workers = result;
                    Workers.map(worker=>{this.sendEmail(Job,Job_ID,worker)})
            },(error)=>{alert('Failed');})
    },(error)=>{alert('Failed');})
    }
    AddNotification=(Job,Job_ID,WorkerNot)=>{
        const now = new Date();
        const dateString = now.toISOString();
        fetch(variables.API_URL+this.state.Notificationtbl,{
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Content: "i get a job for you",
                Link: "Search-Project/"+Job.Project+"-"+Job_ID+"#Job"+Job_ID,
                Date: dateString,
                Type: "Job",
                By: this.props.userlog.id
            })
        }) 
        .then(res=>res.json())
        .then((result)=>{
            console.log(result)
            let notification = result;
            let NotifUser = []
            WorkerNot.map(worker=>NotifUser.push({UserNot:worker.id,Notif:notification.id,Is_read:false}))
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
            },(error)=>{alert('Failed');})
        },(error)=>{alert('Failed');})
    }
    sendEmail(Job,Job_ID,worker) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.set('Authorization', 'Basic ' + btoa('<API Key>'+":" +'<Secret Key>'));
      
        const data = JSON.stringify({
          "Messages": [{
            "From": {"Email": "<YOUR EMAIL>", "Name": "<YOUR NAME>"},
            "To": [{"Email": worker.Email, "Name": worker.Username}],
            "Subject": "etat civil",
            "TextPart": "<html><h2>etat civil</h2><div>Hello Mr."+worker.Username+" "+"<br/><p>You get new job offer </p><a target='_blank' href='RProject/"+Job_ID+"'>"+Job.Job+"</a>"+Job.Payment+"</html>"
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
    componentDidMount(){
    fetch(variables.API_URL+this.state.Skilltbl)
    .then(response=>response.json())
    .then(data=>{
        this.state.Skills=data;
        this.setState({ isLoadinSkill: false,Skills:data,FilterSkills:data})
        console.log(this.state.Skills)
      }).catch(error => this.setState({ isLoadinSkill: false}));
    }
    render(){
        {
            const {
                userlog,
                log,
                PhotoPath,
                newProject,
                JobSkills,
                jobsSkillList,
                Jobs,
                FilterSkills,searchSkill,Links,isLoadingregister,CheckedSkills
                
            }=this.state;
            return(
                    <div className='ProSW'>
                    <div className='NewProContairer'>
                        <br/><br/>
                    <form onSubmit={this.submitProject} className='formNewProject'>
                    <div className='TopNewProject'>
                        <h2 className='TitleNewProject text-center'>New Project</h2>
                    <div className='grouPNinput'>
                        <div className="inputNew">
                            <input type="text"  value={newProject.Name} onChange={this.changeName} required/>
                            <label htmlFor="app-name-input">Project Name</label>
                        </div>
                        <div class="inputNew">
                            <input type="text" placeholder='ex:mobile App,Website' value={newProject.Type} onChange={this.changeType} required/>
                            <label>Type.... </label>
                        </div>
                    </div>
                    <div className='grouPNinput'>
                        <div className="inputNew">
                            <input type="date"  value={newProject.Date_Start} onChange={this.changeStart_date}/>
                            <label htmlFor="app-name-input">Start  Date</label>
                        </div>
                        <div class="inputNew">
                            <input type="date" value={newProject.Duration} onChange={this.changeEnd_date}/>
                            <label>End date</label>
                        </div>
                    </div>
                    <div className='grouPNinput'>
                        <div class="inputNew">
                            <input type="text" value={newProject.Budget} onChange={this.changeBudget}/>
                            <label>Budget Planning</label>
                        </div>
                    </div>
                    <div className='grouPNinput'>
                        <div class="inputNew tallInput">
                            <input type="url" value={newProject.LinkF} onChange={this.changeLink}/>
                            <label>Project Link</label>
                        </div>
                    </div>
                    <div className='grouPNinput'>
                        <div class="inputNew tallInput">
                            <input type="url" value={newProject.LinkChat} onChange={this.changeLinkChat}/>
                            <label>Project Chat</label>
                        </div>
                    </div>
                    <div class="inputNew">
                        <textarea type="text" value={newProject.Description} onChange={this.changeDescription} required/>
                        <label>Description</label>
                    </div>
                    <div className='d-flex'>
                        <h4 className='text-dark text-center ms-3 p-1'>Jobs</h4>
                        <span className=' text-light h6 p-2 ms-1 rounded w-fit-content' style={{background:'#65615b'}}>{Jobs.length}</span>
                        <i class="fa fa-plus text-dark h6 p-2 ms-1 rounded bg-light " aria-hidden="true" onClick={this.incjobnum}></i>
                        <i class="fa fa-minus text-dark h6 p-2 ms-1 rounded bg-light " aria-hidden="true" onClick={this.decjobnum}></i>
                    </div>
                    </div>
                    { Jobs.map((e, j) => (<div className='NewProjectJob'>
                        <div className='grouPNinput'>
                            <div class="inputNew">
                                <input type="text" key-w={j} value={e.job} onChange={this.changeWorkerjob} required/>
                                <label>Worker {j+1}</label>
                            </div>
                            <div class="inputNew">
                                <input type="text" key-w={j} value={e.Payment} onChange={this.changeWorkerPayment} required/>
                                <label>Payment</label>
                            </div>
                        </div>
                        <div className='grouPNinput'>
                            <div class="inputNew w-75">
                                <textarea type="text" key-w={j} value={e.Description} onChange={this.changeWorkerDescription} required/>
                                <label>Description</label>
                            </div>
                        </div>
                          <div className="w-100 m-1">
                        <div className="inputanim m-1">
                                    <i class="fa fa-list mt-3" aria-hidden="true"></i>
                                    <input className='form-style w-75' value={jobsSkillList[j]} onChange={null}/>
                                </div>
                                <div className='Skilllist'>
                                    <div className="inputanim m-1">
                                        <div className='mt-3'><i class="fas fa-search"></i></div>
                                        <input className="w-75"placeholder='Search...' value={searchSkill} onChange={this.changesearchSkill}/>
                                    </div>
                                    {FilterSkills.map((skill, i) => (
                                        <div className='w-75 m-auto d-flex'>
                                        <div className='text-start'>
                                            <span className='btn btn-light p-1 m-1' style={{color:'#6290c3'}} onClick={this.changeskills}>{CheckedSkills[j].includes(skill.id)?
                                                <i className="bi bi-dash-circle h5" key-s={skill.id} key-j={j} value-s={skill.skill} ></i>:
                                                <i className="bi bi-plus-circle h5" key-s={skill.id} key-j={j} value-s={skill.skill} ></i>}
                                            </span>
                                            <span className=' ms-2'>{skill.skill}</span>
                                        </div>
                                        <input className='ms-auto p-0 m-1 text-center' type="text" key-s={skill.id} key-j={j} key-rt={null} id={'inputRating'+skill.id+""+j} style={CheckedSkills[j].includes(skill.id)?{width:'60px'}:{width:'60px',display:'none'}} title='Rating between 1 and 5...' placeholder='1 to 5' onChange={this.changeskillRating}/>
                                        </div>
                                    ))}
                                </div>
                        </div>
                            <hr/>
                        </div>))}
                    <button className='btn actionCartPro m-3' type="submit">{isLoadingregister?<div className='loadersmall'style={{border: '4px solid rgb(36 29 29 / 36%)',borderLeftColor: 'transparent'}}></div>:'Create Project'}</button>
                    </form>
                    </div>
                    </div>
            )
    }
}
}