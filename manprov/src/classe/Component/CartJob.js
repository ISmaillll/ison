import { NavLink } from "react-router-dom";

export function CartJob({Link,Job,Skills}){

    const miniDescription=Job.Description.substring(0, 100)+'...';
    return(<>
    <NavLink className="card CartJob" to={'/'+Link+Job.Project+'-'+Job.id+"#Job"+Job.id}>
        <div className="p-2" >
            <div>
                <span className="JobCartJob">{Job.Job}
                </span>
                <p className="ContantCartJob">{miniDescription}</p>
            </div>
            <div className="PaymentCartJob">
                <i class="fa fa-money m-2" aria-hidden="true"></i>{Job.Payment}
            </div>
            <span className="text-secondary h5">Requirement</span>
            {Skills.map(skill => (<>
            {(skill.Job==Job.id)?<span className="m-1 skillsJobCart">{skill.Skill.skill}</span>:null}</>))}            
        
                <div className="d-flex m-1 justify-content-between">
                    <small className="DatejobCrat">Posted {Job.Date.split('T')[0]}</small>
                    <small className="text-secondary">More...</small>
                </div>
        </div>
        <div className="CartProSkills ListSkills m-0"></div>
    </NavLink>
    </>)
}