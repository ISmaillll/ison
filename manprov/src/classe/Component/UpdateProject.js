import React,{Component} from 'react';
import {variables} from '../../Variables';

export class UpdateProject extends Component{
    constructor(props){
        super(props);
        this.state={
            newProject:this.props.Project,
            Project:[],
            userlog:{},
            log:this.props.log,
            Projecttbl:"Projects",
            isLoadingregister: false,
            isChecked:false,

            PhotoPath:variables.PHOTO_URL,
        };
    }
////////////////change

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
    submitProject=(e)=>{
        if(this.state.newProject.Date_Start==="")this.state.newProject.Date_Start=null;
        if(this.state.newProject.Duration==="")this.state.newProject.Duration=null;
        if(this.state.newProject.LinkChat==="")this.state.newProject.LinkChat="\\";
        if(this.state.newProject.LinkF==="")this.state.newProject.LinkF="\\";
        this.state.newProject.Description.substring(0, 499);
        e.preventDefault();
        this.setState({isLoadingregister:true});
        const Project = this.state.newProject
        this.state.newProject.Manager = this.state.newProject.Manager.id;
            /////////////////////////// ADD PROJECT
              fetch(variables.API_URL+this.state.Projecttbl,{
                    method:'PUT',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(Project)
                })
                .then(res=>res.json())
                .then((result)=>{
                        console.log(result)
                        this.setState({isLoadingregister:false});
                        this.props.GetProject()
                },(error)=>{alert('Failed');})
    }
    componentDidMount=()=>{
        this.setState({})
        console.log(this.state.newProject.Duration); 
    }
    componentDidUpdate=(prevProps)=>{
        if(prevProps.Project!=this.props.Project){
            this.state.newProject=this.props.Project;
            console.log(this.state.newProject.Duration); 
            this.setState({})
        }
    }
    render(){
        {
            const {
                newProject,
                isLoadingregister,
            }=this.state;
            return(
                <div className="modal fade " id="Update_Proejct" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content formProject">
                <div className="modal-body ">
                <div className='text-start'><button type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                    <h3 className='text-center mb-4 text-light'>Update Project</h3>
                    <form onSubmit={this.submitProject} className=''>
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
                            <input type="date" value={newProject.Date_Start!==null?newProject.Date_Start.split('T')[0]:''} onChange={this.changeStart_date}/>
                            <label htmlFor="app-name-input">Start  Date</label>
                        </div>
                        <div class="inputNew">
                            <input type="date" value={newProject.Duration!==null?newProject.Duration.split('T')[0]:''} onChange={this.changeEnd_date}/>
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
                    <button className='btn actionCartPro m-3' data-bs-dismiss="modal" aria-label="Close" type="submit">{isLoadingregister?<div className='loadersmall'style={{border: '4px solid rgb(36 29 29 / 36%)',borderLeftColor: 'transparent'}}></div>:'Update Project'}</button>
                    </form>
                </div>
                </div> 
                </div>
                </div>
            )
    }
}
}