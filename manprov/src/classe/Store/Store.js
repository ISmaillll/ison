import React,{Component} from 'react';
import {variables} from '../../Variables.js';
import './Store.css';
import {Slider} from '../Component/slider';
import { Browserstore } from './BrowserStore.js';
import { PostCart } from '../Component/PostCart.js';
import { PostCart2 } from '../Component/PostCart2.js';
import { Loader } from '../Component/Loader.js';

export class Store extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            posts:[],
            userlog:{},
            search:'',
            CtegorieList:[],
            TypeList:[],
            SepecialList:[],
            CategorieSelectval:"",
            Page:1,  
            NemberofPage:1,          
            isLoading:true,
            PhotoPath:variables.PHOTO_URL,
        };
        this.timer = null;
    }
    //////////////////////
    changesearch=(e)=>{
        const searchValue = e.target.value;
        this.setState({ search: searchValue });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.GetPosts();
        }, 1000); 
    }
    Ctegorieselected=(e)=>{
        if(e.target.checked){
            this.state.CtegorieList.push(e.target.value);
        }else{
            let index =this.state.CtegorieList.indexOf(e.target.value);
            if (index > -1) {
                this.state.CtegorieList.splice(index, 1);
              }
        }
        this.GetPosts();
    }
    changeCtegorie=(e)=>{
        let index =this.state.CtegorieList.indexOf(this.state.CategorieSelectval);
        if (index > -1) {
            this.state.CtegorieList.splice(index, 1);
        }
        if(e.target.value!=='')this.state.CtegorieList.push(e.target.value);
        this.setState({CategorieSelectval:e.target.value},()=>{
            this.GetPosts();
        })
    }
    Typeselected=(e)=>{
        if(e.target.checked){
            this.state.TypeList.push(e.target.value);
        }else{
            let index =this.state.TypeList.indexOf(e.target.value);
            if (index > -1) {
                this.state.TypeList.splice(index, 1);
              }
        }
        this.GetPosts();
    }
    Sepecialselected=(e)=>{
        if(e.target.checked){
            this.state.SepecialList.push(e.target.value);
        }else{
            let index =this.state.SepecialList.indexOf(e.target.value);
            if (index > -1) {
                this.state.SepecialList.splice(index, 1);
              }
        }
        this.GetPosts();
    }
    PrevPage=()=>{
        let Page = this.state.Page;
        if(Page>1){
            this.setState({Page:Page-1},()=>{
                this.GetPosts();
            });
        }
    }
    NextPage=()=>{
        let Page = this.state.Page;
        if(Page<this.state.NemberofPage){
            this.setState({Page:Page+1},()=>{
                this.GetPosts();
            });
        }
    }
    gotoPage=(Page)=>{
            this.setState({Page:Page},()=>{
                this.GetPosts();
            });
    }
    componentDidMount(){
        this.GetPosts();
        window.scroll(0,0)
    }
    GetPosts=()=>{
        this.setState({isLoading:true})
        const {search,CtegorieList,TypeList,SepecialList,CategorieSelectval,Page} = this.state ;
        fetch(variables.API_URL+'PostGET/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                search:search,
                CtegorieList:CtegorieList,
                TypeList:TypeList,
                SepecialList:SepecialList,
                Page:Page,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            this.setState({posts:result.posts,Page:result.page_number,NemberofPage:result.total_pages,isLoading: false})   
        },(error)=>{console.log('Failed');})
    }
    //////////
    closeMenu=(e)=>{
        let miniMenu = document.getElementById('miniMenuStore');
        if(miniMenu.getAttribute('close-t')==0){
            miniMenu.classList.remove('d-none')
            miniMenu.setAttribute('close-t',1)
        }else{
            miniMenu.classList.add('d-none')
            miniMenu.setAttribute('close-t',0)
        }
    } 
    render(){
        const {
            posts,
            search,
            CategorieSelectval,
            NemberofPage,
            Page,
            isLoading
        }=this.state;
        const {
            userlog,
        }=this.props;

        const pagesToDisplay = [];
        const numButtonsToShow = 5; // Adjust this number as needed
    
        for (let i = Page - 2; i <= Page + 2; i++) {
          if (i > 0 && i <= NemberofPage) {
            pagesToDisplay.push(
              <button
                className={'numpages'+(i===Page?' curentpage':'')}
                key={i}
                onClick={() => this.gotoPage(i)}
                disabled={i === Page} // Disable the current page button
              >
                {i}
              </button>
            );
          }
        }
        return(
            <div className='Store d-flex justify-content-end'>
                <Browserstore Ctegorieselected={this.Ctegorieselected}  Typeselected={this.Typeselected}  Sepecialselected={this.Sepecialselected} closeMenu={this.closeMenu}/>
                <div className='posts'>
                    <div className='inputSearch'>
                        <div className="btn text-light" id="menuStoreBTN" close-t={0} >
                            <label class="hamburger">
                            <input type="checkbox" onClick={this.closeMenu} defaultChecked />
                            <svg viewBox="0 0 32 32">
                                <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                                <path class="line" d="M7 16 27 16"></path>
                            </svg>
                            </label>
                        </div>
                        <div className='plus-select' value={CategorieSelectval} onChange={this.changeCtegorie}>
                            <select>
                                <option value=''></option>
                                <option value='Action'>Action</option>
                                <option value='Advanture'>Advanture</option>
                                <option value='cars'>cars</option>
                            </select>
                        </div>
                        <div class="inputSreachS-container">
                            <input type="text" name="text" class="inputSreachS" onChange={this.changesearch} value={search} placeholder="Search something..."/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" class="icon"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <rect fill="white" height="24" width="24"></rect> <path fill="" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                        </div>
                    </div>
                    <br/><br/><br/><br/>
                    <h1 className='text-center'>Top Apps</h1>
                    <div className='ProApps '>
                        {isLoading?
                            <Loader/>:
                        <>
                            {posts.map(P => (<PostCart Post={P}/>))}
                        </>}
                    </div>
                    <div className='PostNavigation'>
                        <button className='Prev' onClick={()=>this.PrevPage()}>Prev</button>
                        {pagesToDisplay}
                        <button className='next' onClick={()=>this.NextPage()}>Next</button>
                    </div>
                </div>
            </div>
        )
    }
}
