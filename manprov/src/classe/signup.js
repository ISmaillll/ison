import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { variables } from '../Variables';

export class WorkerSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Workers:[],
          Skills:[],
          FilterSkills:[],
          step: 0,
          WorkerID:this.props.userlog.id,
          Worker:{
            UserName:this.props.userlog.UserName,
            Name:this.props.userlog.Name,
            Lastname:this.props.userlog.Lastname,
            PassWord:this.props.userlog.PassWord,
            Email:this.props.userlog.Email,
            ProfilePhoto:this.props.userlog.ProfilePhoto,
            CartHolder:this.props.userlog.CartHolder,
            Criditcart: this.props.userlog.Criditcart,
            Expiration: this.props.userlog.Expiration,
            CVV: this.props.userlog.CVV,
            Is_Worker: true,
            Profession: "",
            Education_Level: "",
            Bio: "",
            Nbr_Rating: 0,
            Rating: 0.0,
            Nbr_Post:0,
            Avalble:true
            },
          Links:[{To:'Email',URL:''},
                 {To:'Phone',URL:''},
                 {To:'Facebook',URL:''},
                 {To:'linkedin',URL:''},
                 {To:'GitHub',URL:''}],
          searchSkill:"",
          workerskills:"",
          workerskill:[],
          CheckedSkills:[],
          isLoadingregister: false,
          isLoadinSkill:true,
          usertbl:"User",
          Workertbl:"Worker",
          LinksProfiletbl:'LinksProfile',
          WorkerMaitrisetbl:"WorkerMaitrise",
          Skilltbl:'Skill',

        };
      }
        NextStep=(e)=>{
            switch(this.state.step){
              case 1:if(this.state.Worker.Profession!='')this.state.step++;break;
              case 2:if(this.state.Worker.Education_Level!='')this.state.step++;break;
              case 5:if(this.state.Worker.Bio!='')this.state.step++;break;
              default:this.state.step++;
            }
            this.setState({})
        }
        PrevStep=()=>{
            this.state.step--;
            this.setState({});
        }
///////////////////cahnge
changeProfession=(e)=>{
  let X=this.state.Worker;
  if(/^[a-zA-Z0-9 ]+$/.test(e.target.value)||e.target.value=='')X.Profession=e.target.value;
  this.setState({Worker:X})
}
changeeducationlvl=(e)=>{
  let X=this.state.Worker;
  if(/^[a-zA-Z0-9 ]+$/.test(e.target.value)||e.target.value=='')X.Education_Level=e.target.value;
  this.setState({Worker:X})
}
////Skils
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
changeBio=(e)=>{
  let X=this.state.Worker;
  if(e.target.value.length<=200)X.Bio=e.target.value;
  this.setState({Worker:X})
}
/// Links
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
decLinks=(e)=>{
  let key=e.target.getAttribute('key-w');
  this.state.Links.splice(key, 1);
  this.setState({})
}
/// submit
register=(e)=>{
  e.preventDefault();
  if(this.state.Worker.Bio!==''){
  this.setState({isLoadingregister:true});
  let Worker=this.state.Worker;
  let WorkerID=this.state.WorkerID;
  this.state.step++;
  this.setState({})

        fetch(variables.API_URL+'UserToWorker'+'/'+WorkerID,{
              method:'POST',
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              },
              body:JSON.stringify(Worker)
          })
          .then(res=>res.json())
          .then((result)=>{
              let WorkerId = result.id;
              console.log(result)
              this.setState({}) 
              /////////////////////ADD Links  
              this.state.Links.map(Link=>{Link.Worker=WorkerId; })
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
                    ////////////////////////////////// ADD Skills
                    let Wskills=[];
                    this.state.workerskill.map((Skill,i)=>{Wskills.push({Skill_Rating: Skill.skillrating,Skill: parseInt(Skill.Skillid),Worker: WorkerId})})
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
                            this.setState({isLoadingregister:false});                                      
                          },(error)=>{alert('Failed');})
              },(error)=>{alert('Failed');})
          },(error)=>{alert('Failed');})
        }
}
  ///////////////////////// Cookies
  setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  setinfolog=()=>{
    this.setCookie("username",this.state.Worker.UserName,1); //////set cookies
    this.setCookie("PassWord",this.state.Worker.PassWord,1);
    this.props.getuserInfo(this.state.Worker.UserName,this.state.Worker.PassWord)
  }
  componentDidMount=()=>{
    fetch(variables.API_URL+this.state.Skilltbl)
    .then(response=>response.json())
    .then(data=>{
        this.state.Skills=data;
        this.setState({ isLoadinSkill: false,Skills:data,FilterSkills:data})
        console.log(this.state.Skills)
      }).catch(error => this.setState({ isLoadinSkill: false}));
  }
      render() {
        const { step, Worker,workerskills,Skills,FilterSkills,searchSkill,Links,isLoadingregister,isLoadinSkill,CheckedSkills} = this.state;
        return (<div className='fontSignup'>
         <br/><br/><br/>
          <div className="sightupWorker">
            <div className="w-100 text-center">
              {step === 0 && (<div className='StepSigne'>
                <h1 className="text-center mb-5">Welcome</h1>
                <h3 className="text-center mb-5">To Start working we need more information about you</h3>
                <div className='d-flex justify-content-end'>
                <button type="button" className="button2 signbtn" onClick={this.NextStep}>Start</button>
                </div>
              </div>)}
                <form onSubmit={this.register}>
                  {step === 1 && (
                    <div className='StepSigne'>
                        <h1 className="text-center mb-5">What is your Profession?</h1>
                        <div className="inputanim">
                        <i class="bi bi-cpu"></i>
                         <input type="text" value={Worker.Profession} onChange={this.changeProfession}  className="form-style w-75" placeholder="Your Profession" required/>
                        </div>
                      <div className='d-flex justify-content-end'>
                      <button type="button" className="button2 signbtn" onClick={this.NextStep}>Next <i class="fa fa-arrow-circle-right m-2"></i></button>
                        </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className='StepSigne'>
                         <h1 className="text-center mb-5">What is your highest level of education completed?</h1>
                         <div className="inputanim">
                            <i class="fa fa-list-alt" aria-hidden="true"></i>
                            <input type="text" value={Worker.Education_Level} onChange={this.changeeducationlvl}  className="form-style w-75" placeholder="Your education level" required/>
                        </div>
                        <details><summary>Ex:...</summary>
                            <span>Bachelor's degree in Computer Science from the University of California, Los Angeles</span>
                        </details>
                        <div className='d-flex justify-content-around'>
                            <button type="button" className="button2 signbtn" onClick={this.PrevStep}><i class="fa fa-arrow-circle-left m-2"></i> Previous</button>
                            <button type="button" className="button2 signbtn" onClick={this.NextStep}>Next<i class="fa fa-arrow-circle-right m-2"></i></button>
                        </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className='StepSigne'>
                         <h1 className="text-center mb-5"> What skills do you possess ?</h1>
                        {isLoadinSkill?<div className='loadersmall'></div>
                        :<>
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
                          </>
                        }
                        <div className='d-flex justify-content-around'>
                            <button type="button" className="button2 signbtn" onClick={this.PrevStep}><i class="fa fa-arrow-circle-left m-2"></i> Previous</button>
                            <button type="button" className="button2 signbtn" onClick={this.NextStep}>Next<i class="fa fa-arrow-circle-right m-2"></i></button>
                        </div>
                    </div>
                  )}
                  {step === 4 && (
                    <div className='StepSigne'>
                         <h1 className="text-center">Add Your Contact info Your Project Links</h1>
                         <h4 className="text-center">with that people can know you better</h4>
                         <div className='d-flex justify-content-center'>
                          <span className=' text-light h6 p-2 rounded bg-dark w-fit-content'>{Links.length}</span>
                          <i class="fa fa-plus text-dark h6 p-2 rounded bg-light " aria-hidden="true" onClick={this.incLinks}></i>
                        </div>
                         {Links.map((link, i) => (<>
                         <div className="inputanim LinkInput m-0">
                            <input type="text" key-w={i} value={link.To} onChange={this.changeWorkerAbout} className="form-style aboutlink" placeholder="About"/>
                            <div className='d-flex'>
                              <input type="text" key-w={i} value={link.URL}   onChange={this.changeWorkerURL}  className="form-style " placeholder="URL"/>
                              <i class="bi bi-trash-fill text-dark h6 p-2 m-1 rounded bg-light " key-w={i} aria-hidden="true" onClick={this.decLinks}></i>
                            </div>
                          </div></>))}
                        <div className='d-flex justify-content-around'>
                            <button type="button" className="button2 signbtn" onClick={this.PrevStep}><i class="fa fa-arrow-circle-left m-2"></i> Previous</button>
                            <button type="button" className="button2 signbtn" onClick={this.NextStep}>Next<i class="fa fa-arrow-circle-right m-2"></i></button>
                        </div>
                    </div>
                  )}
                  {step === 5 && (
                    <div className='StepSigne'>
                      <div className="">
                        <h4 htmlFor="bio">If there is more information you want to chear write it in the Bio:</h4>
                        <span>{200-Worker.Bio.length} left</span>
                        <textarea name="bio" className="form-control Bioinput" value={Worker.Bio} onChange={this.changeBio} />
                      </div>
                      <div className='d-flex justify-content-around'>
                        <button type="button" className="button2 signbtn" onClick={this.PrevStep}><i class="fa fa-arrow-circle-left m-2"></i>Previous</button>
                        <button type="submit" className="button2 signbtn">{isLoadingregister?<div className='loadersmall'style={{border: '4px solid rgb(36 29 29 / 36%)',borderLeftColor: 'transparent'}}></div>:'Register'}</button>
                      </div>
                    </div>
                  )}                  
                  {step === 6 && (<>
                      <h2>BIGIN</h2>
                    {!isLoadingregister?
                    <div className='StepSigne h2'>
                      <li className="navbar-nav nav-item h6 mx-3" onClick={this.setinfolog}><NavLink className="nav-link btn btn-outline-info h6" to="/"><i class="fas fa-home"></i> Back Home</NavLink></li>
                    </div>:<div className='loadersmall'style={{border: '4px solid rgb(36 29 29 / 36%)',borderLeftColor: 'transparent'}}></div>}
                  </>)}
                        <div className='d-flex justify-content-center m-3'>
                          {Array.apply(null, { length: step }).map((e, i) => (<><i class="bi bi-caret-up-fill"></i></>))}
                          {Array.apply(null, { length: 6-step }).map((e, i) => (<><i class="bi bi-caret-up"></i></>))}
                        </div>
                        {step !== 6?<div className='d-flex'>
                          <li className="navbar-nav nav-item h6  mx-3"><NavLink className="nav-link d-flex justify-content-center text-light" to="/"><i class="fas fa-home"></i> Back Home</NavLink></li>
                        </div>:null}
                </form>
            </div>
          </div>
        </div>);
      }
}
