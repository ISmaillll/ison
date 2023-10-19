import React,{Component} from 'react';
import {variables} from '../../Variables';
import { Creator } from './Creator';
import { NavLink } from 'react-router-dom';
import { Search } from '../Component/search';
import { Loader } from '../Component/Loader';
import './Creators.css'

export class Creators extends Component{
    constructor(props){
        super(props);
        this.state={
            Creators:[],
            Workerstbl:"Worker",
            theseWorkers:'GettheseWorker',
            Userstbl:"User",
            PhotoPath:variables.PHOTO_URL,
            isLoading: true,
            TopCreators:true,
            search:"",
            searchtbl:"SearchWorker",
            
            error: null,
        };
    }
    changesearch=(e)=>{
        this.state.search=e.target.value;
        this.setState({})
    }
    Search=()=>{
        if(this.state.search==""){
            this.state.TopCreators=true;
            this.setState({})
            this.getWorkers();
        }
        else {
            this.state.TopCreators=false;
            this.setState({})
            this.FilterCreators();
            if( Object.keys(this.props.userlog).length>4)this.AddSearch()
        }
        console.log(this.state.TopCreators)
    }
    AddSearch=()=>{
        fetch(variables.API_URL+'Search',{
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                user:this.props.userlog.id,
                content:this.state.search,
                Time:this.props.GetDate(),
                count:1
            })
        }) 
        .then(res=>res.json())
        .then((result)=>{
            console.log(result)
            this.setState({})
        },(error)=>{alert('Failed');})
    }
    FilterCreators=()=>{
        var search = this.state.search;
        fetch(variables.API_URL+this.state.searchtbl,{
                method:'POST',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify(search)
            }) 
            .then(res=>res.json())
            .then((result)=>{
                this.state.Creators=result;
                console.log(result)
                this.GettheseWorkers()
        },(error)=>{alert('Failed');})
    }
    sortCreators(){
        this.state.Creators=this.state.Creators.sort(function(a,b){
                return (a['Rating']<b['Rating'])?1:((a['Rating']>b['Rating'])?-1:0);
        });
        this.setState({})
    }
    componentDidMount(){
        this.getWorkers()
        window.scroll(0,0)
    }
    getWorkers=()=>{
        fetch(variables.API_URL+this.state.Workerstbl+'/?inf=0&sup=50')
            .then(response=>response.json())
            .then(data=>{
                this.state.Creators = data;
                this.setState({ isLoading: false})
        }).catch(error => this.setState({ isLoading: false, error }));
    }
    GettheseWorkers=()=>{
        fetch(variables.API_URL+this.state.theseWorkers,{ 
            method:'POST',
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.Creators)
        })  
        .then(res=>res.json(this.state.Creators))
        .then(data=>{
            this.state.Creators=data;
            console.log(data)
            this.setState({ isLoading: false})
        }).catch(error => this.setState({ isLoading: false, error }));
    }
    render(){
        {
            const {
                Creators,
                isLoading,
                TopCreators,
                error,
                search,
                PhotoPath
            }=this.state;

            return(

                    <div className='ProSW'>
                    <div className='NewProContairer'>
                        <br/><br/>
                        {error?<div className='h1 m-5 text-center'>Oooops!</div>:
                        <>
                        <Search search={search} changesearch={this.changesearch} Search={this.Search}/>

                        {isLoading?<><Loader/></>:<>
                        {TopCreators?<h2 className='text-center m-3'>Top Creators</h2>:null}
                        <div className='Creators'>
                            {Creators.length>0?<>{Creators.map((Worker, i) => (
                                <NavLink className="text-decoration-none text-light" to={"/Profile"+"/"+Worker.UserName}>
                                    <Creator Creator={Worker} i={i+1} PhotoPath={PhotoPath}/>
                                </NavLink>))}</>:<div className='h1 m-5 text-center'><img src="./PIC/search.png" width='60px'/></div>}
                        </div>
                        </>}</>
                        }
                    </div>
                    </div>
            )
    }
}
}