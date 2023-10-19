import { NavLink } from "react-router-dom"

export function Project({log,selectedJob,project,Jobs,Skills,UserApply,RecJob,Apply,RemoveApply,Save,isLoadingSkills,PhotoPath}){

    return(<>
    <div className="" id="Project" tabIndex="-1" aria-hidden="true">
                <div className=" Projecdet p-2">    
                    <div className="TopCartPro d-flex flex-column">
                        <NavLink  data-bs-dismiss="modal" aria-label="Close" className="text-decoration-none text-light" to={"/Profile/"+project.Manager.UserName}>
                            <div className="d-flex">     
                                <img className='Manager-img' width="50px" height="50px" src={PhotoPath+project.Manager.ProfilePhoto} alt="project manager"/>
                                    <span className="text-light h6 m-2">{project.Manager.UserName}</span>
                                <p className="m-2 ms-auto text-light h6">{project.Date.split('T')[0]} </p>
                            </div>
                        </NavLink>
                    </div>
                        <div>
                        <p className="titleCartPro">{project.Name}</p>
                        <p className=' h6'>{project.Description} </p>
                        </div>
                        <div>
                        <hr className='linePro'/>
                        <p className="minititleCartPro"><i class="bi bi-eyeglasses m-1 h4"></i>{'jobs available'}</p>
                        <ul className="d-flex flex-column">
                            {Jobs.map((Job,i)=>(<div id={"Job"+Job.id} className={selectedJob==Job.id?"SelectedJob":''}>
                            <div>
                                <div className="d-flex justify-content-center">
                                    <h5 className="text-light m-2 m-75">{Job.Job}:<i className="fa fa-money m-2" aria-hidden="true"></i> {Job.Payment}</h5>
                                    {log===2?<button className="btn btn-outline-light" onClick={()=>Save(Job)}><i class="bi bi-bookmark"></i></button>:null}
                                </div>
                                <h className=" m-2">{Job.Description}</h> 
                                <h3 className="text-secondary">requirement</h3>
                                {!isLoadingSkills?<>
                                <div className="ListSkills">
                                {Skills.map(skill => (<>
                                    {(skill.Job==Job.id)?<il className='skillsPost d-flex'>
                                        <i className={"bi bi-dice-"+skill.Skill_Rating+"-fill text-light m-1"}></i> 
                                        <span className="m-1">{skill.Skill.skill}</span></il >:null}
                                </>))}
                                </div>
                                </>:<div className="loadersmall"></div>}
                            </div>
                            <div className="text-start">
                            {log===2?<>
                            {RecJob.includes(Job.id)?<>
                            {(UserApply.includes(Job.id))?<div className="d-flex">
                            <div className="modal fade " id={"RemoveApply_Job"+Job.id} tabIndex="-1" aria-hidden="true">
                                    <div className="modal-dialog modal-lg modal-dialog-centered">
                                    <div className="modal-content formProject">
                                    <div className="modal-body">
                                        <h4 className="text-light text-center">Are you sure you want to remove your Apply for the job?</h4>
                                        <div className='d-felx '>
                                            <button className='button2 w-50 m-3' data-bs-dismiss="modal" aria-label="Close" type="submit" onClick={()=>RemoveApply(Job,project)}>Yes</button>
                                            <button className='button2  m-3' data-bs-dismiss="modal" aria-label="Close" type="submit">No</button>
                                        </div>
                                    </div>
                                    </div> 
                                    </div>
                                    </div>
                                    <span className="AlredyApply m-2"><i class="fa fa-check m-1"></i>alredy Apply</span>
                                    <button className="btn bg-danger m-1 "data-bs-toggle="modal"data-bs-target={"#RemoveApply_Job"+Job.id}><i class="fa fa-trash"></i></button>
                                </div>:
                                <>
                                    <div className="modal fade " id={"Apply_Job"+Job.id} tabIndex="-1" aria-hidden="true">
                                    <div className="modal-dialog modal-lg modal-dialog-centered">
                                    <div className="modal-content formProject">
                                    <div className="modal-body ">
                                        <div className='d-block '>
                                            <button className='btn-close m-3' data-bs-dismiss="modal" aria-label="Close" type="submit"></button>
                                            <form className="text-center d-flex flex-column" onSubmit={(e)=>Apply(e,Job,project)}>
                                                <h4 className="text-light">Applay for a <span className="text-info">{Job.Job}</span></h4>
                                                <h5>Rules and Duties of a New Worker</h5>
                                                <ul className="text-start text-light h6">
                                                    <li>Be on time</li>
                                                    <li>Dress appropriately</li>
                                                    <li>Learn and follow the company policies and procedures</li>
                                                    <li>Be proactive</li>
                                                    <li>Be respectful</li>
                                                    <li>Prioritize communication</li>
                                                    <li>Be accountable</li>
                                                    <li>Maintain a positive attitude</li>
                                                    <span className="p-2 text-light"><input className="form-check-input m-1" type="checkbox" required/>I agre to the rules</span>
                                                </ul>
                                                <button className='button2 w-50 m-3'data-bs-dismiss="modal" aria-label="Close" type="submit">Apply for the job</button>
                                            </form>
                                        </div>
                                    </div>
                                    </div> 
                                    </div>
                                    </div>
                                    <button className="btn actionCartPro p-2 m-2"data-bs-toggle="modal"data-bs-target={"#Apply_Job"+Job.id} >Apply for the job</button>
                                </>}</>:null}</>:<>
                                {log===1?<ul className="navbar-nav">
                                    <li className="navbar-nav nav-item h5"><NavLink className="btn actionCartPro p-2 m-2" to="/StartWork">Apply for the job</NavLink></li>
                                </ul>:null}
                                {log===0?<ul className="navbar-nav">
                                    <li className="navbar-nav nav-item h5"><NavLink className="btn actionCartPro p-2 m-2" to="/LoginWork/1">Apply for the job</NavLink></li>
                                </ul>:null}</>}
                            </div>
                            </div>))}
                        </ul>
                        <hr className='linePro'/>
                        </div>
                </div>
                </div> 
    </>)
}