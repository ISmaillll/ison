import React,{Component} from 'react';
import {variables} from '../../Variables';
import './WorkSpace.css'
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination,Scrollbar,A11y} from 'swiper';

export class NewPost extends Component{
    constructor(props){
        super(props);
        this.state={
            newPost:{
                Logo:"",
                Title:"",
                Logo:"",
                Description:"",
                Type:"",
                Categorie:"",
                Special:"",
                By:this.props.userlog.id,
                Nbr_Rating:0,
                Rating:0,
                date:this.props.GetDate(),
                Prix:"",
                Version:"",
                DateRelease:"",
                DateUpdate:"",
                TeamName:"",
                Finiched:true,
                Forseal:false,
                AgeAuto:"",
            },
            Offer:null,
            Links:[],
            Tags:[],
            Images:[],
            NumLinks:0,
            NumTags:0,
            NumImg:0,
            errmsg:"",
            userlog:{},
            log:this.props.log,

            PhotoPath:variables.PHOTO_URL,
        };
    }
////////////////change
    changeTitle=(e)=>{
        let X=this.state.newPost;
        if((/^[a-zA-Z ]+$/.test(e.target.value)||e.target.value=='')&&e.target.value.length<100)X.Title=e.target.value;
        this.setState({newPost:X})
    }
    changeDescription=(e)=>{
        let X=this.state.newPost;
        if(e.target.value.length<1000)X.Description=e.target.value;
        this.setState({newPost:X})
    }
    changeType = (e) => {
        const { newPost } = this.state;
        const { value } = e.target;
        const selectedOption = e.target.querySelector(`option[value="${value}"]`);

        if (newPost.Type.includes(value)) {
          const updatedType = newPost.Type.split(' ').filter(item => item !== value).join(' ');
          selectedOption.classList.remove('optionselected');
          this.setState({ newPost: { ...newPost, Type: updatedType } });
        } else {
          const updatedType = `${newPost.Type} ${value}`;
          selectedOption.classList.add('optionselected');
          if(updatedType.length<200)this.setState({ newPost: { ...newPost, Type: updatedType } });
        }
    }
    changeCategorie=(e)=>{
        const { newPost } = this.state;
        const { value } = e.target;
        const selectedOption = e.target.querySelector(`option[value="${value}"]`);

        if (newPost.Categorie.includes(value)) {
          const updatedCategorie = newPost.Categorie.split('/').filter(item => item !== value).join('/');
          selectedOption.classList.remove('optionselected');
          this.setState({ newPost: { ...newPost, Categorie: updatedCategorie } });
        } else {
          const updatedCategorie = `${newPost.Categorie}/${value}`;
          selectedOption.classList.add('optionselected');
          if(updatedCategorie.length<50)this.setState({ newPost: { ...newPost, Categorie: updatedCategorie } });
        }
    }
    changeSpecial=(e)=>{
        const { newPost } = this.state;
        const { value } = e.target;
        const selectedOption = e.target.querySelector(`option[value="${value}"]`);

        if (newPost.Special.includes(value)) {
          const updatedSpecial = newPost.Special.split(' ').filter(item => item !== value).join(' ');
          selectedOption.classList.remove('optionselected');
          this.setState({ newPost: { ...newPost, Special: updatedSpecial } });
        } else {
          const updatedSpecial = `${newPost.Special} ${value}`;
          selectedOption.classList.add('optionselected');
          if(updatedSpecial.length<50)this.setState({ newPost: { ...newPost, Special: updatedSpecial } });
        }
    }
    changePrix=(e)=>{
        let X=this.state.newPost;
        if((/^[0-9 & DAda ]+$/.test(e.target.value)||e.target.value=='')&&e.target.value.length<50)X.Prix=e.target.value;
        this.setState({newPost:X})
    }
    changeVersion=(e)=>{
        let X=this.state.newPost;
        if((/^[0-9\. ]+$/.test(e.target.value)||e.target.value=='')&&e.target.value.length<20)X.Version=e.target.value;
        this.setState({newPost:X})
    }
    changeDateRelease=(e)=>{
        let X=this.state.newPost;
        X.DateRelease=e.target.value;
        this.setState({newPost:X})
    }
    changeDateUpdate=(e)=>{
        let X=this.state.newPost;
        X.DateUpdate=e.target.value;
        this.setState({newPost:X})
    }
    changeTeamName=(e)=>{
        let X=this.state.newPost;
        if(e.target.value.length<100)X.TeamName=e.target.value;
        this.setState({newPost:X})
    }
    changeFiniched=(e)=>{
        let X=this.state.newPost;
        X.Finiched = e.target.value === "true";
        this.setState({newPost:X})
    }
    changeForseal=(e)=>{
        let X=this.state.newPost;
        X.Forseal = e.target.value === "true";
        if(!e.target.value)X.Prix="";
        this.setState({newPost:X})
    }
    changeAgeAuto=(e)=>{
        let X=this.state.newPost;
        if((/^[0-9\+\- ]+$/.test(e.target.value)||e.target.value=='')&&e.target.value.length<100)X.AgeAuto=e.target.value;
        this.setState({newPost:X})
    }
    changeLinksURL=(e)=>{
        let L = e.target.getAttribute('key-L');
        if(e.target.value.length<150)this.state.Links[L].URL=e.target.value;
        this.setState({})
    }
    changeLinksTo=(e)=>{
        let L = e.target.getAttribute('key-L');
        if(e.target.value.length<50)this.state.Links[L].To=e.target.value;
        this.setState({})
    }
    incNumLinks=()=>{
        let X=this.state.NumLinks;
        X++;
        this.state.Links.push({To:"",URL:"",Post:0})
        console.log(this.state.Links)
        this.setState({NumLinks:X})
    }
    decNumLinks=(i)=>{
        let X=this.state.NumLinks;
        if(X>0)X--;
        this.state.Links.splice(i, 1);
        this.setState({NumLinks:X})
    }
    changeTag=(e)=>{
        let T = e.target.getAttribute('key-T');
        console.log(T)
        this.state.Tags[T]=e.target.value;
        this.setState({})
    }
    incNumTags=()=>{
        let X=this.state.NumTags;
        X++;
        this.state.Tags.push('')
        this.setState({NumTags:X})
    }
    decNumTags=(i)=>{
        let X=this.state.NumTags;
        if(X>0)X--;
        this.state.Tags.splice(i, 1);
        this.setState({NumTags:X})
    }
    incNumImg=()=>{
        let X=this.state.NumImg;
        X++;
        this.state.Images.push('')
        this.setState({NumImg:X})
    }
    decNumImg=(i)=>{
        let X=this.state.NumImg;
        if(X>0)X--;
        this.state.Images.splice(i, 1);
        this.setState({NumImg:X})
    }
    readURL=(e)=>{
        let key=parseInt(e.target.getAttribute('key-img'));
        this.state.Images[key-1]=e.target.files[0];
        this.setState({});
        if (e.target.files && e.target.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            document.getElementById(('ImagePost'+key)).setAttribute('src', e.target.result)
          };
          reader.readAsDataURL(e.target.files[0]);
        }
    }
    readURLLogo=(e)=>{
        let X=this.state.newPost;
        X.Logo=e.target.files[0];
        this.setState({newPost:X})

        if (e.target.files && e.target.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            document.getElementById(('ImagePostl')).setAttribute('src', e.target.result)
          };
          reader.readAsDataURL(e.target.files[0]);
        }
    }
    AddOffer=()=>{
        if(this.state.Offer===null){
            this.setState({
                Offer:{
                    contenu:"",
                    PlusCnt:"",
                    Email:"",
                    Contact:"",
                    Prix:"",
                    Post:0,
                }
            });        
        }else{
            this.setState({Offer:null});
        }
    }
    changeOffercontenu=(e)=>{
        let X=this.state.Offer;
        if(e.target.value.length<500)X.contenu=e.target.value;
        this.setState({Offer:X})
    }
    changeOfferPlusCnt=(e)=>{
        let X=this.state.Offer;
        if(e.target.value.length<100)X.PlusCnt=e.target.value;
        this.setState({Offer:X})
    }
    changeOfferEmail=(e)=>{
        let X=this.state.Offer;
        if(e.target.value.length<200)X.Email=e.target.value;
        this.setState({Offer:X})
    }
    changeOfferContact=(e)=>{
        let X=this.state.Offer;
        if(e.target.value.length<200)X.Contact=e.target.value;
        this.setState({Offer:X})
    }
    changeOfferPrix=(e)=>{
        let X=this.state.Offer;
        if(e.target.value.length<100)X.Prix=e.target.value;
        this.setState({Offer:X})
    }
    AddPostOffer=()=>{
        fetch(variables.API_URL+'Offer/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.Offer)
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(result)
            document.getElementById('msg_GetOfferPro').innerHTML='We will contact you with the details as soon as possible';
        },(error)=>{alert('Failed');})
        this.setState({})
    }
    componentDidMount(){
    }
    //// 
    Submit=(e)=>{
        e.preventDefault();
        if(this.state.newPost.Type!==""&&this.state.newPost.Categorie!==""&&this.state.newPost.Special!==""){
            this.setState({errmsg:""},()=>{
                this.AddPost()
            })
        }else{
            window.scrollTo(0, 200);
            this.setState({errmsg:"fill all filds"})
        }
    }
    AddPost(){
        const formData = new FormData();

        for (const key in this.state.newPost) {
            formData.append(key, this.state.newPost[key]);
        }

        fetch(variables.API_URL+"Post/",{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            this.AddLinks(result.id);
            this.Incrworkerpost();
        },(error)=>{console.error('Error:', error);})
    }
    Incrworkerpost(){
        fetch(variables.API_URL+"Incrworkerpost/"+this.props.userlog.id)
        .then(res=>res.json())
        .then((result)=>{
            console.log(result)
        },(error)=>{console.error('Error:', error);})
    }
    AddLinks(Postid){  
        this.state.Links.map(L=>L.Post=Postid);
        fetch(variables.API_URL+'LinksPost',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.Links)
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(result)
            this.AddTags(Postid)
        },(error)=>{console.error('Error:', error);})
    }
    AddTags(Postid){
        const Tags = [];
        this.state.Tags.map(T=>Tags.push({User:T,Post:Postid}));
        fetch(variables.API_URL+'Tags',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(Tags)
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(result)
            this.AddImages(Postid)
        },(error)=>{console.error('Error:', error);})
    }
    AddImages(Postid){
        this.state.Images.map(I=>{
            const formData = new FormData();

            formData.append('URL', I);
            formData.append('Post', Postid);

            fetch(variables.API_URL+"Image/",{
                method:'POST',
                body:formData
            })
            .then(res=>res.json())
            .then((result)=>{
                console.log(result)
            },(error)=>{console.error('Error:', error);}) 
        })
    }
    render(){
        {
            const {
                newPost,
                NumLinks,
                NumTags,
                NumImg,
                Links,
                Tags,
                errmsg,
                Offer
            }=this.state;
            return(
                    <div className='ProSW'>
                    <div className='NewProContairer'>
                    <form onSubmit={(e)=>this.Submit(e)} className='formNewProject'>
                        <h2 className='TitelNewP'>New application Post</h2>
                        <h5 className='subtitleP'>Post your work for everyone to see</h5>
                        <div className='seletePNgrp'>
                        <div className='grouPNinput'>
                        <div className="inputNew titleinput">
                            <input type="text"  value={newPost.Title} onChange={this.changeTitle} required/>
                            <label htmlFor="app-name-input">Title</label>
                        </div>
                        <div className='m-auto'>
                            <div id={'PostImgl'} className='PostLogo'> 
                                <img className="d-block text-center m-auto" id={'ImagePostl'} src='' alt={""} width='200px' height='200px'/>
                                <label className="custom-logo-upload text-center">
                                    <input type="file"  onChange={(e)=>this.readURLLogo(e)}/>
                                    Logo
                                </label>
                            </div>
                        </div>
                    </div>
                        <div className='h4 TitelNewP'>help people find you application</div>
                        <div className='grouPNinput '>
                            <div className="inputNew">
                                <select type="text"  value={""} onChange={this.changeType}>
                                    <option value=''></option>
                                    <option value='Disktop'>Disktop</option>
                                    <option value='Mobile'>Mobile</option>
                                    <option value='Website'>Website</option>
                                </select>
                                <label htmlFor="app-name-input">Type</label>
                                <div className='selectvalue'>{newPost.Type}</div>
                            </div>
                            <div className="inputNew">
                                <select type="text"  value={""} onChange={this.changeCategorie}>
                                    <option value=''></option>
                                    <option value='Art & Design'>Art & Design</option>
                                    <option value='Auto & Vehicles'>Auto & Vehicles</option>
                                    <option value='Books & Reference'>Books & Reference</option>
                                    <option value='Watch apps'>Watch apps</option>
                                    <option value='Beauty'>Beauty</option>
                                    <option value='Business'>Business</option>
                                    <option value='Comics'>Comics</option>
                                    <option value='Games'>Games</option>
                                    <option value='Communication'>Communication</option>
                                    <option value='Education'>Education</option>
                                    <option value='Entertainment'>Entertainment</option>
                                    <option value='Events'>Events</option>
                                    <option value='Finance'>Finance</option>
                                    <option value='Food & Drink'>Food & Drink</option>
                                    <option value='Health & Fitness'>Health & Fitness</option>
                                    <option value='House & Home'>House & Home</option>
                                    <option value='Libraries & Demo'>Libraries & Demo</option>
                                    <option value='Lifestyle'>Lifestyle</option>
                                    <option value='Maps & Navigation'>Maps & Navigation</option>
                                    <option value='Medical'>Medical</option>
                                    <option value='Music & Audio'>Music & Audio</option>
                                    <option value='News & Magazines'>News & Magazines</option>
                                    <option value='Parenting'>Parenting</option>
                                    <option value='Personalisation'>Personalisation</option>
                                    <option value='Photography'>Photography</option>
                                    <option value='Productivity'>Productivity</option>
                                    <option value='Shopping'>Shopping</option>
                                    <option value='Social'>Social</option>
                                    <option value='Sports'>Sports</option>
                                    <option value='Tools'>Tools</option>
                                    <option value='Travel & Local'>Travel & Local</option>
                                    <option value='Video & Editors'>Video & Editors</option>
                                    <option value='Weather'>Weather</option>
                                </select>
                                <label htmlFor="app-name-input">Categorie</label>
                                <div className='selectvalue'>{newPost.Categorie}</div>
                            </div>
                            <div className="inputNew">
                                <select type="text"  value={""} onChange={this.changeSpecial}>
                                    <option value=''></option>
                                    <option value='AI'>AI</option>
                                    <option value='useful'>useful</option>
                                    <option value='Presonalise'>Presonalise</option>
                                    <option value='free'>free</option>
                                    <option value='offes'>offes</option>
                                    <option value='paid'>paid</option>
                                </select>
                                <label htmlFor="app-name-input">Special</label>
                                <div className='selectvalue'>{newPost.Special}</div>
                            </div>
                        </div>
                    <div className='h4 TitelNewP'>describe your app</div>
                   <div className="inputNew">
                        <textarea type="text" value={newPost.Description} onChange={this.changeDescription} required/>
                        <label>Description</label>
                    </div>
                    <div className='h4 TitelNewP'>Aditionale Info</div>
                    <div className='grouPNinput '>
                        <div className="inputNew">
                            <input type="text" value={newPost.Version} onChange={this.changeVersion} required/>
                            <label>Version</label>
                        </div>
                        <div className="inputNew">
                            <input type="text" placeholder='+3' value={newPost.AgeAuto} onChange={this.changeAgeAuto} required/>
                            <label>age authentication</label>
                        </div>
                        <div className="inputNew">
                            <input type="text" value={newPost.TeamName} onChange={this.changeTeamName} required/>
                            <label>Team Name</label>
                        </div>
                    </div>
                    <div className='grouPNinput '>
                        <div className="inputNew">
                            <input type="date" value={newPost.DateRelease} onChange={this.changeDateRelease} required/>
                            <label>Release Date</label>
                        </div>
                        <div className="inputNew">
                            <input type="date" value={newPost.DateUpdate} onChange={this.changeDateUpdate} required/>
                            <label>Last Update</label>
                        </div>
                    </div>
                    <div className='grouPNinput '>
                        <div className="inputNew">
                            <select type="text"  value={newPost.Finiched} onChange={this.changeFiniched}>
                                <option value={true}>Released</option>
                                <option value={false}>Under development</option>
                            </select>
                            <label>State</label>
                        </div>
                        <div className="inputNew">
                            <select type="text"  value={newPost.Forseal} onChange={this.changeForseal}>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                            <label>Forseal</label>
                        </div>
                    </div>
                    {newPost.Forseal?<>
                    <div className="inputNew">
                        <input type="text" value={newPost.Prix} onChange={this.changePrix} required/>
                        <label>Prix</label>
                    </div></>:null}
                    <div className='d-flex'>
                        <h4 className='TitelElNewP'>Offer</h4>
                        <i className={(!Offer?"fa fa-plus":"fa fa-minus")+" buttoneff"} aria-hidden="true" onClick={this.AddOffer}></i>
                    </div>
                    {Offer?<>
                    <div className="inputNew">
                        <textarea value={Offer.contenu} onChange={this.changeOffercontenu} required/>
                        <label>content</label>
                        <span>{Offer.contenu.length}/500</span>
                    </div>
                    <div className="inputNew">
                        <input type="text" value={Offer.PlusCnt} onChange={this.changeOfferPlusCnt} required/>
                        <label>Additionel info</label>
                    </div>
                    <div className='grouPNinput '>
                        <div className="inputNew">
                            <input type="text" value={Offer.Email} onChange={this.changeOfferEmail} required/>
                            <label>Email</label>
                        </div>
                        <div className="inputNew">
                            <input type="url" value={Offer.Contact} onChange={this.changeOfferContact} required/>
                            <label>Contact</label>
                        </div>  
                    </div>
                    <div className="inputNew">
                        <input type="text" value={Offer.Prix} onChange={this.changeOfferPrix} required/>
                        <label>Prix</label>
                    </div>  
                    </>:null}
                    <div className='d-flex'>
                        <h4 className='TitelElNewP'>Links</h4>
                        <span className='NuminfoP'>{NumLinks}</span>
                        <i className="fa fa-plus buttoneff " aria-hidden="true" onClick={this.incNumLinks}></i>
                    </div>
                    {Array.apply(null, { length: NumLinks }).map((e, i) => (<>
                        <div className='grouPNinput'>
                            <div className="inputNew tallInput w-25">
                                <input type="text" key-L={i} value={Links[i].To} onChange={this.changeLinksTo} required/>
                                <label>Link To {i+1}</label>
                            </div>
                            <div className="inputNew tallInput">
                                <input type="url" key-L={i} value={Links[i].URL} onChange={this.changeLinksURL} required/>
                                <label>Link Url {i+1}</label>
                            </div>
                            <div className=''><i className="fa fa-trash buttoneff Linksdeletebtn" aria-hidden="true" onClick={()=>this.decNumLinks(i)}></i></div>
                        </div>
                        </>))}
                        <div className='h6 commentinfoP'>Link you app you code , contact ...</div>
                        <div className='d-flex'>
                        <h4 className='TitelElNewP'>Tags</h4>
                        <span className='NuminfoP'>{NumTags}</span>
                        <i className="fa fa-plus buttoneff" aria-hidden="true" onClick={this.incNumTags}></i>
                    </div>
                    <div className='Taginput'>
                    {Array.apply(null, { length: NumTags }).map((e, i) => (<>
                            <div className="inputNew" style={{width:'140px'}}>
                                <input type="text" placeholder='' key-T={i} value={Tags[i]} onChange={this.changeTag} required/>
                                <label>Tag {i+1}</label>
                                <i className="fa fa-trash buttoneff tagsdeletebtn" aria-hidden="true" onClick={()=>this.decNumTags(i)}></i>
                            </div>
                        </>))}
                    </div>
                    <div className='h6 commentinfoP'>tag people how work with you</div>
                    <div className='h4 TitelNewP'>cover Images </div>
                    <div className='d-flex'>
                        <h4 className='TitelElNewP'>Images</h4>
                        <span className='NuminfoP'>{NumImg}</span>
                        <i className="fa fa-plus buttoneff " aria-hidden="true" onClick={this.incNumImg}></i>
                    </div>
                    <div className="carousel slide w-75 m-auto" style={{background:'#335588'}} data-ride="carousel" >
                        <div className="carousel-inner " id='postcount'>
                        {Array.apply(null, { length: NumImg }).map((e, i) => (<>

                        </>))}
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={10}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            >
                            {Array.apply(null, { length: NumImg }).map((e, i) => (<SwiperSlide>
                            <div id={'PostImg'+(i+1)} key-img={i+1} className='PostImg'> 
                                <img className="d-block text-center m-auto" id={'ImagePost'+(i+1)} src='' alt={'Image '+(i+1)} height='300px'/>
                                <label className="custom-file-upload text-center">
                                    <input type="file" key-img={i+1}  onChange={(e)=>this.readURL(e)}/>
                                    choose image
                                </label>
                                <i className="fa fa-trash buttoneff imgdeletebtn" aria-hidden="true" onClick={()=>this.decNumImg(i)}></i>
                            </div>
                            </SwiperSlide>))}
                            </Swiper>
                        </div>
                        </div>
                        </div>
                        <div className='h4 text-danger text-center'>{errmsg}</div>
                    <button className='Workbtn m-3' type="submit">Create Project</button>
                    </form>
                    </div>
                    </div>
            )
    }
}
}