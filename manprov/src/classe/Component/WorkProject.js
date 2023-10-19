import { NavLink } from "react-router-dom"

export function WorkPro({project,Jobs,JobApplayers,Skills,AcceptWorker,PhotoPath}){
    
    function clculeProgress(){
        const startDate = new Date(project.Date_Start);
        const endDate = new Date(project.Duration);
        const totalTime = endDate.getTime() - startDate.getTime();
        const timeElapsed = new Date().getTime() - startDate.getTime();
        let progressPercentage = (timeElapsed / totalTime) * 100;
        if(progressPercentage>100)progressPercentage=100
        return progressPercentage;
    }
    const progressPercentage=clculeProgress()
    console.log(Jobs)
    return(<>
 <div className="" id="Project" tabIndex="-1" aria-hidden="true">
    <div className=" Projecdet p-2">    
        <div className="TopCartPro d-flex flex-column">
            <NavLink  data-bs-dismiss="modal" aria-label="Close" className="text-decoration-none text-light" to={"/Profile/"+project.Manager.UserName}>
                <div className="d-flex">     
                    <img className='Manager-img' width="50px" height="50px" src={PhotoPath+project.Manager.ProfilePhoto} alt="project manager"/>
                        <span className="text-light h6 m-2">{project.Manager.UserName}</span>
                    <p className="m-2 ms-auto text-light h6">{project.Date} </p>
                </div>
            </NavLink>
        </div>
            <div>
            <p className="titleCartPro">{project.Name}</p>
            <p className='text-dark h6'>{project.Description} </p>
            <div className="d-flex">
            <a className="titleCartPro m-2" target="_blank" href={project.LinkF}>Project Link</a>
            <a className='titleCartPro m-2' href="#"><i className="bi bi-chat-dots m-1"></i> Chat</a>
            </div>
            </div>
            <div>
            <hr className='linePro'/>
            <p className="titleCartPro"><i class="fas fa-chart-pie"></i>{'Progress'}</p>
                <progress value={progressPercentage} max="100"></progress><span className="text-dark h6 p-1">{progressPercentage.toFixed(2)}% </span>
            <p className="titleCartPro">{'State :'+project.State}</p>
            <p className="titleCartPro">Workers:</p>
                <ul className="d-grid">
                {Jobs.map((Job,i)=>(<>
                    {Job.State=='Avalble'?
                    null:<>
                        {JobApplayers.map(Appler => (<>
                            {(Appler.Job==Job.id&&Appler.State)?
                                <NavLink  data-bs-dismiss="modal" aria-label="Close" className="TopCartPro text-decoration-none text-light d-flex" to={"/Profile/"+Appler.Worker.UserName}>
                                    <div className="d-flex justify-content-between">
                                        <img className='Manager-img' width="50px" height="50px" src={PhotoPath+Appler.Worker.ProfilePhoto} alt="project manager"/>
                                        <span className="text-light h6 m-2">{Appler.Worker.UserName}</span>
                                        <span className="JObtaken">{Job.Job}</span>   
                                    </div>
                                </NavLink>
                            :null}
                        </>))}
                    </>}
                    </>))}
                </ul>
            <hr className='linePro'/>
            </div>
    </div>
    </div>
    </>)
}