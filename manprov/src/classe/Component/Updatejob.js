import React,{Component} from 'react';
import {variables} from '../../Variables';

export class UpdateJob extends Component{
    constructor(props){
        super(props);
        this.state={
            Job:this.props.Job,
            JobSkills:[],
            ExJobSkills:[],
            CheckedSkills:[],
            deletedSkills:[],
            jobsSkillList:"",
            userlog:{},
            log:this.props.log,
            searchSkill:"",
            Jobtbl:"Jobs",
            ProjectRequired:"ProjectRequired",
            isLoadingregister: false,
          
            FilterSkills:[],
            AddSkills:[],
            isLoadingregister: false,
            isLoadinSkill:true,
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
    let Checked = this.state.CheckedSkills.includes(parseInt(e.target.getAttribute('key-s')))
    if(Checked){
        console.log(e.target.getAttribute('key-rt'))
        if(/^(?:[1-4](?:\.\d+)?|5(?:\.0+)?)$/.test(e.target.value)){
            this.state.JobSkills[e.target.getAttribute('key-rt')-1].skillrating=parseInt(e.target.value);
        }
        this.updateJobskills()
    }
}
changeskills=(e)=>{
    let SkillIndex = parseInt(e.target.getAttribute('key-s'));
    let SkillV = e.target.getAttribute('value-s');
    let SkillRating = document.getElementById('inputRatingUpdate'+SkillIndex);
    let Checked = this.state.CheckedSkills.includes(SkillIndex);
    let CheckedSkills = this.state.CheckedSkills;
    if(SkillV!=null)
    if(!Checked){
        this.state.JobSkills.push({skill:SkillV,Skillid:SkillIndex,skillrating:1});
        SkillRating.setAttribute('key-rt',this.state.JobSkills.length);
        CheckedSkills.push(SkillIndex);
    }
    else{
        let index = this.state.JobSkills.findIndex((obj) => obj.Skillid === SkillIndex);
        if (index > -1) {this.state.JobSkills.splice(index, 1);}
        index = CheckedSkills.findIndex((obj) => obj === SkillIndex);
        if (index > -1) {CheckedSkills.splice(index, 1);}
    }
    this.setState({CheckedSkills})
    this.updateJobskills()
}
updateJobskills = () => {
    let jobsSkillList = '';
    for (let i = 0; i < this.state.JobSkills.length; i++) {
        jobsSkillList += (this.state.JobSkills[i].skill + ' ' + this.state.JobSkills[i].skillrating + ',');
    }
    this.setState({jobsSkillList});
}
    changeWorkerjob=(e)=>{
        this.state.Job.Job=e.target.value;
        this.setState({})
    }
    changeWorkerrequired=(e)=>{
        this.state.Job.required=e.target.value;
        this.setState({})
    }
    changeWorkerPayment=(e)=>{
        this.state.Job.Payment=e.target.value;
        this.setState({})
    }
    changeWorkerDescription=(e)=>{
        this.state.Job.Description=e.target.value;
        this.setState({})
    }
    changesearchSkill=(e)=>{
        this.state.searchSkill=e.target.value;
        this.setState({})
        this.FilterSkills()
    } 
    FilterSkills=()=>{
        var searchSkill = this.state.searchSkill;
        var filteredData=this.state.AddSkills.filter(
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
    submitJob=(e)=>{
        e.preventDefault();
        this.setState({isLoadingregister:true});
        /////////////////////Update JOB  
        fetch(variables.API_URL+this.state.Jobtbl,{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state.Job)
            })
            .then(res=>res.json())
            .then((result)=>{
                ////////////////////////////////// ADD Skills
                console.log(result)
                let jobskills = [];
                let Job_ID = this.state.Job.id;
                this.state.JobSkills.map((Skill)=>{ 
                    jobskills.push({
                        Skill_Rating: Skill.skillrating,
                        Skill: parseInt(Skill.Skillid),
                        Job: Job_ID,
                        })
                    })
                    if(result=='Updated Successfully'){
                        fetch(variables.API_URL+this.state.ProjectRequired,{
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
                            if(this.state.deletedSkills.length>0){
                            fetch(variables.API_URL+this.state.ProjectRequired,{
                                method:'DELETE',
                                headers:{
                                'Accept':'application/json',
                                'Content-Type':'application/json'
                                },
                                body:JSON.stringify(this.state.deletedSkills)
                            })
                            .then(res=>res.json())
                            .then((result)=>{
                                this.state.ExJobSkills.map((Skill)=>{ 
                                    jobskills.push({
                                        Skill_Rating: Skill.Skill_Rating,
                                        Skill: parseInt(Skill.Skill.id),
                                        Job: Job_ID,
                                        })
                                    })
                                console.log(result)
                                this.props.GetProject()
                            },(error)=>{alert('Failed');})
                            }
                            if(jobskills.length>0)this.NotifieWorker(this.state.Job,Job_ID,jobskills)
                                this.setState({isLoadingregister:false});
                        },(error)=>{alert('Failed');})
                    } else {
                        this.setState({isLoadingregister:false});
                    }
            },(error)=>{alert('Failed');})
    }
    initJob=()=>{
        this.setState({Job:{
            Date:"",
            Description:"",
            Job:"",
            Payment:"",
            Project:this.props.Project.id,
            State:"Avalble",
        }})
    }
    DeletSkill=(skill)=>{
        this.state.deletedSkills.push(skill.id)
        const index = this.state.ExJobSkills.findIndex((obj) => obj.id === skill.id);    
        if (index > -1) {
            this.state.ExJobSkills.splice(index, 1);
        }
        let ExSkillsIds = [];
        this.state.ExJobSkills.map(Skill=>{
            ExSkillsIds.push(Skill.Skill.id)
        })
        this.state.FilterSkills=this.state.AddSkills=this.state.Skills.filter(function(el){
            if(!ExSkillsIds.includes(el.id))return el;
        })
        this.setState({})
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
            let WorkerNot = result;
            console.log(WorkerNot)
            let index = WorkerNot.findIndex((obj) => obj.id===this.props.Project.Manager.id);
            if (index > -1) {WorkerNot.splice(index, 1);}
            this.AddNotification(Job_ID,WorkerNot);
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
    AddNotification=(Job_ID,WorkerNot)=>{
        const now = new Date();
        const dateString = now.toISOString();
        fetch(variables.API_URL+this.state.Notificationtbl,{
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Content: "Updated a job",
                Link: "Search-Project/"+this.state.Job.Project+"-"+Job_ID+"#Job"+Job_ID,
                Date: dateString,
                Type: "Job",
                By: this.props.Project.Manager.id
            })
        }) 
        .then(res=>res.json())
        .then((result)=>{
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
        }).catch(error => this.setState({ isLoadinSkill: false}));
        this.state.ExJobSkills = this.props.Skills;
    }
    componentDidUpdate(prevProps) {
        if (prevProps.Job !== this.props.Job) {
            this.state.Job = this.props.Job;
            this.state.ExJobSkills = this.props.Skills;
            this.setState({});
            let ExSkillsIds = [];
            this.state.ExJobSkills.map(Skill=>{
                ExSkillsIds.push(Skill.Skill.id)
            })
            this.state.FilterSkills=this.state.AddSkills=this.state.Skills.filter(function(el){
                if(!ExSkillsIds.includes(el.id))return el;
            })
            this.state.jobsSkillList = "";
        }
    }
    render(){
        {
            const {
                jobsSkillList,
                Job,
                FilterSkills,
                searchSkill,
                isLoadingregister,
                ExJobSkills,
                CheckedSkills
            }=this.state;
            return(
                <div className="modal fade " id={"Update_Job"} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content formProject">
                <div className="modal-body ">
                <div className='text-start'><button type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                    <h2 className='text-light text-center'>Update Job</h2>
                    <div className='grouPNinput'>
                        <div class="inputNew">
                            <input type="text" value={Job.Job} onChange={this.changeWorkerjob} required/>
                            <label>Worker</label>
                        </div>
                        <div class="inputNew">
                            <input type="text" value={Job.Payment} onChange={this.changeWorkerPayment} required/>
                            <label>Payment</label>
                        </div>
                    </div>
                    <div className='grouPNinput'>
                        <div class="inputNew w-75">
                            <textarea type="text" value={Job.Description} onChange={this.changeWorkerDescription} required/>
                            <label>Description</label>
                        </div>
                    </div>
                    <h3 className='text-secondary'>Job Skills</h3>
                    <div className='ListSkills'>
                    {ExJobSkills.map((skill,i) => (<>
                            <il className='skillsPost d-flex p-1'>
                               <i className={"bi bi-dice-"+skill.Skill_Rating+"-fill text-light m-1"}></i> 
                                <span>{skill.Skill.skill}</span>
                                <button className='btn p-0 bg-danger text-light deletSkillbtn' onClick={()=>this.DeletSkill(skill)}><i class="bi bi-x"key-s={i}></i></button>
                            </il >
                    </>))}
                    </div>
                    <details className='text-start'><summary className='button2 m-2 p-1'><h5>Add Skills...</h5></summary>
                    <div className="w-100 m-1">
                    <div className="inputanim m-1">
                                <i class="fa fa-list mt-3" aria-hidden="true"></i>
                                <input className='form-style w-75' value={jobsSkillList} onChange={null}/>
                            </div>
                            <div className='Skilllist'>
                                <div className="inputanim m-1">
                                    <div className='mt-3'><i class="fas fa-search"></i></div>
                                    <input className="w-75"placeholder='Search...' value={searchSkill} onChange={this.changesearchSkill}/>
                                </div>
                                {FilterSkills.map((skill, i) => (
                                    <div className='w-75 m-auto d-flex'>
                                    <div className='text-start'>
                                        <span className='btn btn-light p-1 m-1' style={{color:'#6290c3'}} onClick={this.changeskills}>{CheckedSkills.includes(skill.id)?
                                            <i className="bi bi-dash-circle h5" key-s={skill.id} value-s={skill.skill} ></i>:
                                            <i className="bi bi-plus-circle h5" key-s={skill.id} value-s={skill.skill} ></i>}
                                        </span>
                                        <span className=' ms-2'>{skill.skill}</span>
                                    </div>
                                    <input className='ms-auto p-0 m-1 text-center' type="text" key-s={skill.id} key-rt={null} id={'inputRatingUpdate'+skill.id} style={CheckedSkills.includes(skill.id)?{width:'60px'}:{width:'60px',display:'none'}} title='Rating between 1 and 5...' placeholder='1 to 5' onChange={this.changeskillRating}/>
                                    </div>
                                ))}
                            </div>
                    </div>
                    </details>
                    <hr/>
                    <button className='btn actionCartPro m-3' data-bs-dismiss="modal" aria-label="Close" type="submit" onClick={this.submitJob}>{isLoadingregister?<div className='loadersmall'style={{border: '4px solid rgb(36 29 29 / 36%)',borderLeftColor: 'transparent'}}></div>:'Update Job'}</button>
                </div>
                </div> 
                </div>
                </div>
            )
    }
}
}