import { NavLink } from "react-router-dom";

export function CartProject({Project,PhotoPath,PrvProject}){
    const miniDescription=Project.Description.substring(0, 120)+'...';
    return(<>
    <div className="card CartPro">
        <NavLink className="text-decoration-none text-light " to={"/Profile/"+Project.Manager.UserName}>
            <div className="TopCartPro">
            <div className="d-flex">    
                <img className='Manager-img' width="50px" height="50px" src={PhotoPath+Project.Manager.ProfilePhoto} alt="Project manager"/>
                <span className="text-light mt-3 h6">{Project.Manager.UserName}</span>
            </div>
            <div className="CProdate">{Project.Date.split('T')[0]}</div>
            </div>
        </NavLink>
            <div className="infoCartPro">
            <p className="titleCartPro">{Project.Name}</p>
            <hr/>
            <p className="h5 text-light text-start m-2">{Project.Type}</p>
            <p>{miniDescription}</p>
            </div>
            <div className="footerCartPro">
                <NavLink className="btn actionCartPro" to={'/MyProjects/'+Project.id} onClick={PrvProject}>more details</NavLink>
            </div>
    </div>
    </>)
}