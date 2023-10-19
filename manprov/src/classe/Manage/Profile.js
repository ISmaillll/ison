import React,{Component} from 'react';
import {variables} from '../../Variables';
import {NavSettings} from './NavSettings';

export class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            userlog:this.props.userlog,
            OldUserName:this.props.userlog.UserName,
            Workerstbl:"Worker",
            Usertbl:"User",
            LinksProfiletbl:'LinksProfile',
            WorkerMaitrisetbl:"WorkerMaitrise",
            workerskills:"",
            workerskill:[],
            ExWorkerSkills:[],
            CheckedSkills:[],
            Links:[
            {To:'Email',URL:''},
            {To:'Phone',URL:''},
            {To:'Facebook',URL:''},
            {To:'linkedin',URL:''},
            {To:'GitHub',URL:''}
            ],
            DeleteSkills:[],
            DeleteLinks:[],
            SavedImage:null,
            log:this.props.log,
            Skills:this.props.Skills,
            FilterSkills:this.props.Skills,
            AddSkills:[],
            ProfileLinks:this.props.ProfileLinks,
            PhotoPath:variables.PHOTO_URL
        };
    }
    ///////////////////edit
    UpdateUser=()=>{
        const formData = new FormData();
        console.log(this.state.userlog)
        
        if(this.state.SavedImage!=null){
            this.state.userlog.ProfilePhoto = this.state.SavedImage;
        }else{
            delete this.state.userlog.ProfilePhoto;
        }
        for (const key in this.state.userlog) {
            formData.append(key, this.state.userlog[key]);
        }
        let Url = this.state.Usertbl;
        if(this.state.log>1) Url = this.state.Workerstbl
        fetch(variables.API_URL+Url+'/'+this.state.userlog.id+'/',{
            method:'PUT',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            const urlParts = result.ProfilePhoto.split('/');
            const fileName = '/'+ urlParts[urlParts.length - 2]+'/'+urlParts[urlParts.length - 1];
            this.setState({userlog:result}, () => {
                if (this.state.userlog.ProfilePhoto) {
                  this.state.userlog.ProfilePhoto = fileName;
                }
                this.setState({})
            })
            if(this.state.log>1)
                if(this.state.DeleteLinks.length!=0||this.state.DeleteSkills.length!=0)this.delete()
            this.props.UpdateUser(result,fileName)
        },(error)=>{console.error('Error:', error);})
    }
    condUpdateUser=(e)=>{
        e.preventDefault();
        document.getElementById('msg_UserName').innerHTML='';
        if(this.state.userlog.UserName!==this.state.OldUserName){
            fetch(variables.API_URL+this.state.Usertbl+'Get',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({UserName:this.state.userlog.UserName})
            })
            .then(res=>res.json())
            .then((result)=>{
                console.log(result)
                if(!result.found){
                    this.UpdateUser()
                }else{
                    document.getElementById('msg_UserName').innerHTML='Username already used';
                }
            },(error)=>{alert('Failed');})
        }else{
            this.UpdateUser()
        }
    }
    AddSkill=(e)=>{
        e.preventDefault();
        let Wskills=[];
        this.state.workerskill.map((Skill,i)=>{Wskills.push({Skill_Rating: Skill.skillrating,Skill: parseInt(Skill.Skillid),Worker: this.props.userlog.id})})
        console.log(Wskills)                                   
          fetch(variables.API_URL+this.state.WorkerMaitrisetbl,{
              method:'POST',
              headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
              },
                body:JSON.stringify(Wskills)
          })
          .then(res=>res.json())
          .then((result)=>{
                console.log('ADD Skills'+result); 
                window.location.href = "../Profile/"+this.state.userlog.UserName;
                this.setState({});
            },(error)=>{alert('Failed');})
    }
    AddLinks=(e)=>{
        e.preventDefault();
        this.state.Links.map(Link=>{Link.Worker=this.props.userlog.id; })
        fetch(variables.API_URL+this.state.LinksProfiletbl,{
              method:'POST',
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              },
              body:JSON.stringify(this.state.Links)
          })
          .then(res=>res.json())
          .then((result)=>{
              console.log('ADD Link'+result);
              window.location.href = "../Profile/"+this.state.userlog.UserName;
              this.setState({});
        },(error)=>{alert('Failed');})
    }
    delete=()=>{
        fetch(variables.API_URL+this.state.LinksProfiletbl,{
              method:'DELETE',
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              },
              body:JSON.stringify(this.state.DeleteLinks)
          })
          .then(res=>res.json())
          .then((result)=>{
                fetch(variables.API_URL+this.state.WorkerMaitrisetbl,{
                    method:'DELETE',
                    headers:{
                      'Accept':'application/json',
                      'Content-Type':'application/json'
                    },
                      body:JSON.stringify(this.state.DeleteSkills)
                })
                .then(res=>res.json())
                .then((result)=>{
                },(error)=>{alert('Failed');})
        },(error)=>{alert('Failed');})
    }
    ReInitUser=()=>{
        window.location.href = "../Profile/"+this.state.userlog.UserName;
    }
    ////////////////change
    changeusername = (e)=>{
        let X=this.state.userlog;
        X.UserName=e.target.value;
        this.setState({userlog:X});
    }
    changeFname = (e)=>{
        let X=this.state.userlog;
        X.Name=e.target.value;
        this.setState({userlog:X});
    }
    changeLname = (e)=>{
        let X=this.state.userlog;
        X.Lastname=e.target.value;
        this.setState({userlog:X});
    }
    changeBio=(e)=>{
        let X=this.state.userlog;
        if(e.target.value.length<=200)X.Bio=e.target.value;
        this.setState({userlog:X});
    }
    changeProfession = (e)=>{
        let X=this.state.userlog;
        X.Profession=e.target.value;
        this.setState({userlog:X});
    }
    changeEducation_Level = (e)=>{
        let X=this.state.userlog;
        X.Education_Level=e.target.value;
        this.setState({userlog:X});
    }
    changeskillRating=(e)=>{
        let Checked = this.state.CheckedSkills.includes(parseInt(e.target.getAttribute('key-s')))
        if(Checked){
            if(/^(?:[1-4](?:\.\d+)?|5(?:\.0+)?)$/.test(e.target.value)){
                this.state.workerskill[e.target.getAttribute('key-rt')-1].skillrating=parseInt(e.target.value);
            }
            this.updateWorkerskills()
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
            this.state.workerskill.push({skill:SkillV,Skillid:SkillIndex,skillrating:1});
            SkillRating.setAttribute('key-rt',this.state.workerskill.length);
            CheckedSkills.push(SkillIndex);
        }
        else{
            let index = this.state.workerskill.findIndex((obj) => obj.Skillid === SkillIndex);
            if (index > -1) {this.state.workerskill.splice(index, 1);}
            index = CheckedSkills.findIndex((obj) => obj === SkillIndex);
            if (index > -1) {CheckedSkills.splice(index, 1);}
        }
        this.setState({CheckedSkills})
        this.updateWorkerskills()
    }
    updateWorkerskills = () => {
        let workerskills = '';
        for (let i = 0; i < this.state.workerskill.length; i++) {
          workerskills += (this.state.workerskill[i].skill + ' ' + this.state.workerskill[i].skillrating + ',');
        }
        this.setState({workerskills});
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
        this.state.FilterSkills=filteredData;
        this.setState({});
    }
    changeWorkerAbout=(e)=>{
        let key=e.target.getAttribute('key-w');
        this.state.Links[key].To=e.target.value;
        this.setState({})
    }
    changeWorkerURL=(e)=>{
        let key=e.target.getAttribute('key-w');
        this.state.Links[key].URL=e.target.value;
        this.setState({})
    }
    incLinks=()=>{
        this.state.Links.push({To:'',URL:''})
        this.setState({})
    }
    decProfileLinks=(e,Link)=>{
        let key=e.target.getAttribute('key-w');
        this.state.ProfileLinks.splice(key, 1);
        this.state.DeleteLinks.push(Link.id)
        console.log(this.state.DeleteLinks)
        this.setState({})
    }
    decLinks=(e)=>{
        let key=e.target.getAttribute('key-w');
        this.state.Links.splice(key, 1);
        this.setState({})
    }
    DeletSkill=(e,skill)=>{
        let SkillIndex = e.target.getAttribute('key-s');
        this.state.ExWorkerSkills.splice(SkillIndex, 1);
        this.state.DeleteSkills.push(skill.id)
        let ExSkillsIds = [];
        this.state.ExWorkerSkills.map(Skill=>{
            ExSkillsIds.push(Skill.Skill.id)
        })
        this.state.FilterSkills=this.state.AddSkills=this.state.Skills.filter(function(el){
            if(!ExSkillsIds.includes(el.id))return el;
        })
        this.setState({})
    }
    selectImage=(e)=>{
        const selectedImage = e.target.files[0];
        this.setState({ SavedImage: selectedImage }, () => {
            this.readURL(e);
        });
    }
    readURL=(e)=>{
        if (e.target.files && e.target.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            document.getElementById(('ImageProfile')).setAttribute('src', e.target.result)
          };
          reader.readAsDataURL(e.target.files[0]);
        }
    }
    ///////////////////////////
    componentDidMount(){
        console.log(this.props.userlog)
        console.log(this.props.Skills)
        let ExSkillsIds = [];
        this.state.ExWorkerSkills.map(Skill=>{
            ExSkillsIds.push(Skill.Skill.id)
        })
        this.state.ExWorkerSkills=this.props.ProfileSkills;
        this.state.FilterSkills=this.state.AddSkills=this.state.Skills.filter(function(el){
            if(!ExSkillsIds.includes(el.id))return el;
        })
        this.setState({})
        console.log(this.state.CheckedSkills)
        if( Object.keys(this.props.userlog).length === 0)window.location.href = "../";
        else if(this.state.log ===2 &&  Object.keys(this.props.userlog).length ===13)window.location.href = "../Profile/"+this.state.userlog.UserName;
    }
    render(){
        const {
            userlog,
            PhotoPath,
            log,
            workerskills,
            Skills,
            FilterSkills,
            searchSkill,
            ProfileLinks,
            Links,
            ExWorkerSkills,
            CheckedSkills
        }=this.state;
        return(
            <div className="d-flex bg-light Setting m-auto mt-2">
                <NavSettings/>
                <div className="w-100 overflow-scroll">
                <form onSubmit={this.condUpdateUser}>
                    <div className='d-flex justify-content-between m-2'>
                    <h4 className='text-secondary m-4' >Profile</h4>
                    <div className='d-flex flex-column m-2'>
                        <img src={PhotoPath+userlog.ProfilePhoto} id="ImageProfile" alt="Profile" width='150px'></img>
                        <label class="custom-file-upload">
                            <input type="file" onChange={this.selectImage}/>
                            change your photo
                        </label>
                    </div>
                    </div>
                    <div className='w-75 m-auto'>
                        <label >First Name*</label>
                        <input className='form-style w-100' type='text' value={userlog.Name} onChange={this.changeFname} required/>
                    </div>
                    <div className='w-75 m-auto'>
                        <label >Last Name*</label>
                        <input className='form-style w-100' type='text' value={userlog.Lastname} onChange={this.changeLname} required/>
                    </div>
                    <div className='w-75 m-auto'>
                        <label >Username</label>
                        <input className='form-style w-100' type='text' value={userlog.UserName} onChange={this.changeusername} required/>
                    </div>
                    <div id='msg_UserName'className='text-danger m-2 text-center'></div>
                {log==2?<>
                    {userlog.Bio!=null?<div className='w-75 m-auto'>
                        <div className='d-flex justify-content-between'><label >Bio</label><label>{200-userlog.Bio.length} left</label></div>
                        <textarea className='form-style w-100' style={{minHeight:"100px"}} value={userlog.Bio} onChange={this.changeBio} required/>
                    </div>:null}
                    <div className='w-75 m-auto'>
                        <label >Profession</label>
                        <input className='form-style w-100' type='text' value={userlog.Profession} onChange={this.changeProfession} required/>
                    </div>
                    <div className='w-75 m-auto'>
                        <label >Education_Level</label>
                        <input className='form-style w-100' type='text' value={userlog.Education_Level} onChange={this.changeEducation_Level} required/>
                    </div>
                    </>:null}
                <div className='d-flex'>
                    <button className='btn btn-outline-info m-3'>Save</button>
                    <span className='btn btn-outline-info m-3' onClick={this.ReInitUser}>Cancel</span>
                </div>
                </form>
                {log==2?<>
                    <h3>Skills</h3>
                    <div className='ListSkills'>
                    {ExWorkerSkills.map((skill,i) => (<>
                            <il className='skillsPost d-flex p-1'>
                               <i className={"bi bi-dice-"+skill.Skill_Rating+"-fill text-light m-1"}></i> 
                                <span>{skill.Skill.skill}</span>
                                <button className='btn p-0 bg-danger text-light deletSkillbtn' onClick={(e)=>this.DeletSkill(e,skill)}><i class="bi bi-x"key-s={i}></i></button>
                            </il >
                    </>))}
                    </div>
                    <button className='button2 m-2 p-1'data-bs-toggle="modal"data-bs-target={"#AddSkills"}><h5>Add Skills...</h5></button>
                    <div className="modal fade " id={"AddSkills"} tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content RateSpace">
                    <button className='btn-close m-3' data-bs-dismiss="modal" aria-label="Close" type="submit"></button>
                        <form className="modal-body d-flex flex-column" onSubmit={this.AddSkill}>
                            <h3>Add Skills</h3>
                            <div className="inputanim m-1">
                                <i class="fa fa-list mt-3" aria-hidden="true"></i>
                                <input className='form-style w-75' value={workerskills} onChange={null}/>
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
                            <button className='btn btn-outline-info m-2 w-50'>Add</button>
                        </form>
                    </div> 
                    </div>
                    </div>
                    <h2>Links</h2>
                    <div className='w-75 m-auto mt-2 rounded p-1'style={{background:'#151a2a'}}>
                         {ProfileLinks.map((link, i) => (<>
                         <div className="inputanim LinkInput m-0">
                            <input type="text" key-w={i} value={link.To} onChange={null} className="form-style aboutlink" placeholder="About"/>
                            <div className='d-flex'>
                              <input type="text" key-w={i} value={link.URL}   onChange={null}  className="form-style " placeholder="URL"/>
                              <i class="bi bi-trash-fill text-dark h6 p-2 m-1 rounded bg-light " key-w={i} aria-hidden="true" onClick={(e)=>this.decProfileLinks(e,link)}></i>
                            </div>
                          </div></>))}
                            </div>
                         <button className='button2 m-2 p-1'data-bs-toggle="modal"data-bs-target={"#AddLinks"}><h5>Add Links...</h5></button>
                            <div className="modal fade " id={"AddLinks"} tabIndex="-1" aria-hidden="true">
                            <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content RateSpace">
                            <button className='btn-close m-3' data-bs-dismiss="modal" aria-label="Close" type="submit"></button>
                            <form className="modal-body d-flex flex-column" onSubmit={this.AddLinks}>
                                    <h3>Add Links</h3>
                                    <div className='d-flex justify-content-center'>
                                    <span className=' text-light h6 p-2 rounded w-fit-content'>{Links.length}</span>
                                    <i class="fa fa-plus text-dark h6 p-2 rounded bg-light " aria-hidden="true" onClick={this.incLinks}></i>
                                    </div>
                                    {Links.map((link, i) => (<>
                                    <div className="inputanim LinkInput m-0">
                                        <input type="text" key-w={i} value={link.To} onChange={this.changeWorkerAbout} className="form-style aboutlink" placeholder="About" required/>
                                        <div className='d-flex'>
                                        <input type="text" key-w={i} value={link.URL}   onChange={this.changeWorkerURL}  className="form-style " placeholder="URL" required/>
                                        <i class="bi bi-trash-fill text-dark h6 p-2 m-1 rounded bg-light " key-w={i} aria-hidden="true" onClick={(e)=>this.decLinks(e)}></i>
                                        </div>
                                    </div></>))}
                                    <button className='btn btn-outline-info m-2 w-50'>Add</button>
                            </form>
                            </div> 
                            </div>
                            </div>
                    </>:null}
                </div>
        </div>
        )
    }
}