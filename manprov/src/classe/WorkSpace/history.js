import React,{Component} from 'react';
import {variables} from '../../Variables';
import { NavWSpace } from './NavWSpace';
import { CartJob } from '../Component/CartJob';

export class History extends Component{
    constructor(props){
        super(props);
        this.state={
            HistJob:[],
            Jobs:[],
            selectedSkills:[],
            log:this.props.log,
            isLoading:true,
            HistJobstbl:"HistJobs",
            ProjectRequiredtbl:"ProjectRequired",

            PhotoPath:variables.PHOTO_URL,
        };
    }
    componentDidMount(){
        this.GetHistJob()
    }
    GetProject=()=>{
        this.state.isLoading=true;
        this.state.HistJob=[];
        this.state.Jobs.map(job=> this.state.HistJob.push(job.id))
        console.log(this.state.HistJob)
        fetch(variables.API_URL+this.state.ProjectRequiredtbl+'GET',{ 
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.HistJob)
        })
        .then(response=>response.json())
        .then(data=>{
                this.state.selectedSkills = data;
                this.setState({ isLoading: false})
                window.scrollTo(0, 0);
                this.setState({})
        })
    }
    GetHistJob=()=>{
        fetch(variables.API_URL+this.state.HistJobstbl+'/'+this.props.userlog.id) 
            .then(res=>res.json())
            .then((result)=>{
                this.state.Jobs=result;
                console.log(result)
                this.GetProject()
        },(error)=>{alert('Failed');})
    }
    render(){
        {
            const {
                userlog,
                log,
                Jobs,
                selectedSkills,
                isLoading
            }=this.state;
            return(
                    <div className='ProSW'>
                    <div className='NewProContairer'>
                        <br/><br/>
                        <div className="history">
                        <h2 className='m-3'>Saved</h2>
                        {!isLoading?<>
                            <div className='w-100'>
                                <div className='Jobs '>
                                    {Jobs.length>0?Jobs.map((e, i) => (<CartJob Link={'Search-Project/'} Job={e} Skills={selectedSkills}/>))
                                    :<div><h2 className='text-center'>No Job Saved...</h2></div>}
                                </div>
                            </div>
                            </>:<div className='loadersmall m-auto'></div>}
                    </div>
                    </div>
                    </div>
            )
    }
}
}