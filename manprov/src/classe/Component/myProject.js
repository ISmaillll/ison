import { NavLink } from "react-router-dom"
import { UpdateProject } from "./UpdateProject";
import { AddJob } from "./AddJob";
import { DeleteJob } from "./DeleteJob";
import { UpdateJob } from "./Updatejob";


export function MyPro({project,SlectedJob,SlectedJobSkills,setSelectedjob,Jobs,JobApplayers,Skills,AcceptWorker,PhotoPath,ProjectPrv,GetProject,GetDate}){

    function clculeProgress(){
        const startDate = new Date(project.Date_Start);
        const endDate = new Date(project.Duration);
        const totalTime = endDate.getTime() - startDate.getTime();
        const timeElapsed = new Date().getTime() - startDate.getTime();
        let progressPercentage = (timeElapsed / totalTime) * 100;
        if(progressPercentage>100)progressPercentage=100
        if(progressPercentage<0)progressPercentage=0
        return progressPercentage;
    }
    const progressPercentage=clculeProgress()
    return(<>
    <div className="" id="Project" tabIndex="-1" aria-hidden="true">
        <div className=" Projecdet p-2">    
            <div className="TopCartPro d-flex flex-column">
                <NavLink  data-bs-dismiss="modal" aria-label="Close" className="text-decoration-none text-light" to={"/Profile/"+project.Manager.UserName}>
                    <div className="d-flex">     
                        <img className='Manager-img' width="50px" height="50px" src={PhotoPath+project.Manager.ProfilePhoto} alt="project manager"/>
                            <span className="text-light h6 m-2">{project.Manager.UserName}</span>
                        <p className="CProdate">{project.Date.split('T')[0]} </p>
                    </div>
                </NavLink>
            </div>
            <div>
            <p className="titleCartPro">{project.Name}</p>
            <p className='text-light h6'>{project.Description} </p>
            <div className="d-flex">
            <a className="linksProfile m-2" target="_blank" href={project.LinkF}>Project Link</a>
            <a className='linksProfile m-2' target="_blank" href={project.LinkChat}><i className="bi bi-chat-dots m-1"></i> Chat</a>
            </div>
            </div>
            <div>
            <hr className='linePro'/>
            {project.Date_Start!==null&&project.Duration!==null?<>
            <p className="minititleCartPro"><i class="fas fa-chart-pie"></i>{'Progress'}</p>
                <progress value={progressPercentage} max="100"></progress><span className="text-dark h6 p-1">{progressPercentage.toFixed(2)}% </span>
            <p className="minititleCartPro">{'State :'+project.State}</p></>:null}
            {ProjectPrv==1?<div className="text-end"><button className="button2 h6 m-2" data-bs-toggle="modal"data-bs-target="#Update_Proejct">Update Project</button>
            <button className="button2 h6" data-bs-toggle="modal"data-bs-target="#Add_Job"><i class="fas fa-plus-circle"></i> Add Job</button></div>:null}
            <p className="minititleCartPro">Workers:</p>
                <ul>
                {Jobs.map((Job,i)=>(<div id={"Job"+Job.id}>
                    {Job.State=='Avalble'&ProjectPrv==1?
                    <div className="JobsProject">
                        <div className="d-flex justify-content-center">
                            <h5 className="text-light m-2">{Job.Job}: {Job.Payment}</h5> 
                            <div className="text-start"><button className="button2 m-0 ms-3 p-2 bg-danger text-light" data-bs-toggle="modal"data-bs-target={"#Delete_Job"} onClick={()=>setSelectedjob(Job)}><i class="fa fa-trash" aria-hidden="true"></i></button></div>
                            <div className="text-start"><button className="button2 m-0 ms-3 p-2" data-bs-toggle="modal" data-bs-target={"#Update_Job"} onClick={()=>setSelectedjob(Job)}><i class="bi bi-pencil-fill"></i></button></div>
                        </div>
                        <h6>{Job.Description}</h6>
                        <h3 className="text-secondary">requirement</h3>
                        <div className="ListSkills">
                        {Skills.map(skill => (<>
                            {(skill.Job==Job.id)?<il className='skillsPost d-flex'>
                                    <i className={"bi bi-dice-"+skill.Skill_Rating+"-fill text-light m-1"}></i> 
                                    <span className="m-1">{skill.Skill.skill}</span>
                                </il >:null}</>))}
                        </div>
                        {JobApplayers.map(Appler => (<>
                            {(Appler.Job==Job.id)?
                            <div className="d-flex TopCartPro p-2 justify-content-between">
                                <NavLink  data-bs-dismiss="modal" aria-label="Close" className="text-decoration-none text-light d-flex" to={"/Profile/"+Appler.Worker.UserName}>
                                    <img className='Manager-img' width="50px" height="50px" src={PhotoPath+Appler.Worker.ProfilePhoto} alt="project manager"/>
                                    <span className="text-light h6 m-2">{Appler.Worker.UserName}</span>
                                </NavLink>
                                <button className="btn btn3" onClick={()=>AcceptWorker(Job,Appler)}>Accept</button>
                            </div>:null}
                        </>))}
                    </div>:<div id={"Job"+Job.id}>
                        {JobApplayers.map(Appler => (<>
                            {(Appler.Job==Job.id&&Appler.State)?
                            <div className="TopCartPro d-flex">
                                <NavLink className="text-decoration-none text-light d-flex"  data-bs-dismiss="modal" aria-label="Close"  to={"/Profile/"+Appler.Worker.UserName}>
                                    <div className="d-flex justify-content-between">
                                        <img className='Manager-img' width="50px" height="50px" src={PhotoPath+Appler.Worker.ProfilePhoto} alt="project manager"/>
                                        <span className="text-light h6 m-2">{Appler.Worker.UserName}</span>
                                        <span className="JObtaken">{Job.Job}</span>   
                                    </div>
                                </NavLink>
                                <a href={"mailto:"+Appler.Worker.Email} className="btn button2 p-2 m-1" target="_blank"><i class="bi bi-envelope"></i>Send Email</a>
                            </div>
                            :null}
                        </>))}
                    </div>}
                    </div>))}
                </ul>
            <hr className='linePro'/>
            <UpdateProject Project={project} GetProject={GetProject} GetDate={GetDate}/>
            <AddJob Project={project} GetDate={GetDate} GetProject={GetProject}/>
            <DeleteJob Job={SlectedJob} GetProject={GetProject}/>
            <UpdateJob Project={project} Job={SlectedJob} GetProject={GetProject} Skills={SlectedJobSkills}/>
            </div>
    </div>
    </div>
    </>)
}