import React,{Component} from 'react';
import {variables} from '../../Variables';

export class DeleteJob extends Component{
    constructor(props){
        super(props);
        this.state={
            Job:this.props.Job,
            isLoadingregister:false,
            Jobtbl:"Jobs"
        };
    }

    submitJob=()=>{
        this.setState({isLoadingregister:true});
        /////////////////////Delete JOB  
        fetch(variables.API_URL+this.state.Jobtbl+"/"+this.props.Job.id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify()
            })
            .then(res=>res.json())
            .then((result)=>{
                console.log(result)
                this.setState({isLoadingregister:false});
                this.props.GetProject()
            },(error)=>{alert('Failed');})
    }
    componentDidUpdate(prevProps) {
        if (prevProps.Job !== this.props.Job) {
          this.setState({ Job: this.props.Job });
        }
    }
    render(){
        {
            const {
                isLoadingregister,
                Job
            }=this.state;
            return(
                <div className="modal fade " id={"Delete_Job"} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content formProject">
                <div className="modal-body">
                    <h4>Are you sur ?</h4>
                    <div className='d-flex'>
                        <button className='button2 m-3' data-bs-dismiss="modal" aria-label="Close" type="submit">Cancel</button>
                        <button className='button2 m-3' data-bs-dismiss="modal" aria-label="Close" type="submit" onClick={()=>this.submitJob()}>{isLoadingregister?<div className='loadersmall'style={{border: '4px solid rgb(36 29 29 / 36%)',borderLeftColor: 'transparent'}}></div>:'Delete Job'}</button>
                    </div>
                </div>
                </div> 
                </div>
                </div>
            )
    }
}
}