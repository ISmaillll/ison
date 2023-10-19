import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Link, Element } from 'react-scroll';
import { variables } from '../../Variables';
import { Loader } from '../Component/Loader';
import SwiperCore, { Autoplay, Navigation, Pagination, Scrollbar,A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PostCart2 } from '../Component/PostCart2';
export class Post extends Component {
    constructor(props){
        super(props);
        this.state={
            Post:{},
            discription:"",
            ///get offer
            User_Offer:{
                Message:"",
                Num_Tel:"",
                State:"",
                date:"",
                offers:0,
                User:0
            },
            AgreeOnTurmes:false,
            ///
            SeeMore:false,
            ImagePost:[],
            LinksPost:[],
            Comments:[],
            History:[],
            Numrate:[],
            Tags:[],
            offers:[],
            /// review
            doRate:false,
            comment:"",
            Rate:'?',
            UserReview:null,
            Allreviwes:true,
            isLoadingReview:false,
            ///
            isLoading:false,
            similar_posts:[],
            Msgerror:"",
            location:window.location.pathname,
            PhotoPath:variables.PHOTO_URL,
        };
        this.timer = null;
    }
    //////////////// History
    changecomment=(e)=>{
        if(e.target.value.length<=500)this.setState({comment:e.target.value})
    }
    changeAgree=(e)=>{
        this.setState({AgreeOnTurmes:e.target.checked})
    }
    RatePost=()=>{
        if(this.state.doRate){
            this.setState({isLoadingReview:true})
            fetch(variables.API_URL+'HistPostApi/',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    Post:this.state.Post.id,
                    Save:0,
                    Rate:parseFloat(this.state.Rate),
                    User:this.props.userlog.id,
                    date:this.props.GetDate(),
                    Content:this.state.comment
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                console.log(result)
                this.setState({Rate:result.UserRate.Rating
                            , Post:result.post
                            , Numrate:result.rating_counts
                            , Comments:result.reviews
                            ,isLoadingReview:false})
                document.getElementById('msg_RatePro').innerHTML='Thanks For Your Opinion, It Is Important For Us';
            },(error)=>{alert('Failed');})
            this.setState({})
        }
    }
    savepost=()=>{
        fetch(variables.API_URL+'HistPostApi/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Post:this.state.Post.id,
                Save:1,
                Rate:0,
                User:this.props.userlog.id,
                Content:"",
                date:""
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(result)
            document.getElementById('msg_SavePost').innerHTML='Post saved';
            document.getElementById('msg_SavePost').setAttribute("style","dispaly:block;");
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.removeSavemsg();
            }, 1000); 
            this.setState({})
        },(error)=>{alert('Failed');})
        this.setState({})
    }
    removeSavemsg=()=>{
        document.getElementById('msg_SavePost').innerHTML='';
        document.getElementById('msg_SavePost').setAttribute("style","dispaly:none;");
    }
    viewpost=(id)=>{
        fetch(variables.API_URL+'HistPostApi/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Post:id,
                Save:0,
                Rate:0,
                User:this.props.userlog.id,
                Content:"",
                date:""
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(result)
            let UserRate = result.UserRate;
            if (UserRate) {
                if(UserRate.Rating>0)this.setState({ Rate: UserRate.Rating });
                else this.setState({Rate:"?"})
                this.setState({ UserReview: UserRate,comment:UserRate.Content });
            }
            if(result.User_offer.length>0){
                this.setState({User_Offer:result.User_offer[0]})
            }
            this.setState({})
        },(error)=>{alert('Failed');})
        this.setState({})
    }
    ///////////////// Get Offer
    changeofferMessage=(e)=>{
        let X=this.state.User_Offer;
        if(e.target.value.length<=500)X.Message=e.target.value;
        this.setState({User_Offer:X})
    }
    changeOfferNumTel=(e)=>{
        let X=this.state.User_Offer;
        if(e.target.value.length<=20)X.Num_Tel=e.target.value;
        this.setState({User_Offer:X})
    }
    GetOffer=()=>{
        if(this.state.AgreeOnTurmes){
            this.state.User_Offer.date = this.props.GetDate();
            this.state.User_Offer.offers = this.state.offers[0].id;
            this.state.User_Offer.User = this.props.userlog.id;
            this.state.User_Offer.State = 'Send';

            fetch(variables.API_URL+'User_Offer/',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state.User_Offer)
            })
            .then(res=>res.json())
            .then((result)=>{
                console.log(result)
                document.getElementById('msg_GetOfferPro').innerHTML='We will contact you with the details as soon as possible';
            },(error)=>{alert('Failed');})
            this.setState({})
        }
    }
    ////////////////
    SelectRate=(e)=>{
        this.setState({Rate:e.target.getAttribute('value-s'),doRate:true},()=>{
            document.getElementById('btnRate').classList.add('RateActv')
            document.getElementById('RateStar').setAttribute('style','scale:'+(1+this.state.Rate/5))
            document.getElementById('RateNum').setAttribute('style','scale:'+(1+this.state.Rate/5))
        })
    }
    componentDidMount=()=>{
        this.initPage()
    }
    initPage=()=>{
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.setState({isLoading: true}) 
          const pathname = window.location.pathname; 
          const id  = pathname.split('/')[2]
          this.GetPost(id);
          if(this.props.log>0)this.viewpost(id);
        }, 300); 
        window.scroll(0,0)
    }
    seeDiscription=()=>{
        console.log(this.state.discription.length)
        if(this.state.discription.length===203){
            this.setState({discription:this.state.Post.Description,SeeMore:true})
        }else{
            this.setState({discription:this.state.Post.Description.slice(0,200)+'...',SeeMore:false})
        }
    }
    GetPost=(id)=>{
        fetch(variables.API_URL+'PostGET/'+id)
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            if(result.found){
                this.setState({
                    Post:result.data,
                    ImagePost:result.Images,
                    LinksPost:result.LinksPost,
                    Tags:result.Tags,
                    Numrate:result.rating_counts,
                    Comments:result.reviews,
                    similar_posts:result.similar_posts,
                    offers:result.offers
                },()=>{
                    this.setState({discription:this.state.Post.Description.slice(0,200)+'...'});
                });
            }else{
                this.setState({Msgerror:result.message});
            }
            this.setState({isLoading:false});
        }).catch(error => this.setState({ isLoading: false, error }));
    }
    GetAllreviews=()=>{
        let All = 0
        if(this.state.Allreviwes)All = 1
        fetch(variables.API_URL+'Allreviews/'+this.state.Post.id+'/'+All)
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            if(result.found){
                this.setState({
                    Comments:result.reviews,
                    Allreviwes:!this.state.Allreviwes
                });
            }else{
                this.setState({Msgerror:result.message});
            }
            this.setState({isLoading:false});
        }).catch(error => this.setState({ isLoading: false, error }));
    }
    ////////
    seeImages=()=>{ 
        document.getElementById('SeeImagesP').setAttribute('style','display:block;position: fixed;');
        this.setState({});
    }
    hideImages=()=>{ 
        document.getElementById('SeeImagesP').setAttribute('style','display:none;position: unset;');
        this.setState({});
    }
    CloseModel(Modelid){
        const modal = document.getElementById(Modelid);
        modal.style.display = 'none';
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.remove();
        }
        document.body.classList.remove('modal-open');
        document.body.removeAttribute('style');
    }
    render(){
        const {
            isLoading,
            Msgerror,
            Post,
            ImagePost,
            discription,
            SeeMore,
            LinksPost,
            Tags,
            History,
            Numrate,
            Rate,
            Comments,
            comment,
            isLoadingReview,
            UserReview,
            Allreviwes,
            similar_posts,
            offers,
            User_Offer,
            AgreeOnTurmes
        }=this.state;
        const {
            log
        }=this.props;
        return(
            <div className='Post-page'>
                {!isLoading?<>
                    {Msgerror===""?<>
                        <section className='Top-section'>
                            <div className='Post-Info'>
                                <button class="Viewimages" onClick={()=>this.seeImages()}>
                                    <div class="text">see images</div>
                                    <div class="sign">
                                        <i class="fa fa-eye" aria-hidden="true"></i>
                                    </div>
                                </button>
                                <div className='float-info'>
                                    <div className='Right-f-info'>
                                        <img alt='image' src={variables.PHOTO_URL+Post.Logo} className='Logo-post'/>
                                        <section>
                                            <div>
                                                {log==0?<><NavLink className='Float-button Rate-Post' to='/Login/1'>
                                                    <i class="fa fa-star" aria-hidden="true"></i> Rate
                                                </NavLink></>:<>
                                                <button className='Float-button Rate-Post' data-bs-toggle="modal"data-bs-target={"#RateWorker"}>
                                                    <i class="fa fa-star" aria-hidden="true"></i> Rate
                                                </button></>}
                                                {log==0?<><NavLink className='Float-button' to='/Login/1'>
                                                    <i class="fa fa-comment" aria-hidden="true"></i> Review
                                                </NavLink></>:<>
                                                <button className='Float-button' data-bs-toggle="modal"data-bs-target={"#RateWorker"}>
                                                    <i class="fa fa-comment" aria-hidden="true"></i> Review
                                                </button></>}
                                            </div>
                                        </section>
                                        {Post.Forseal?
                                        <button class="download-btn">
                                            <span>download</span>
                                            <i class="fa fa-download" aria-hidden="true"></i>
                                        </button>:null}
                                    </div>
                                    <div className="Info">
                                        <div className="title">
                                            <p className="title"><strong>{Post.Title}</strong></p>
                                        </div>
                                        {Post.By!=null?
                                        <NavLink className="Owner-info" to={"/Profile"+"/"+Post.By.UserName}>
                                            <img src={variables.PHOTO_URL+Post.By.ProfilePhoto} className='small-image'/>
                                            {Post.By.UserName}
                                        </NavLink>:<></>}
                                        <span className='Team-Post'>{Post.TeamName}</span>
                                        <div className='contain-RateSave'>
                                            <div className='Rating-Post'>
                                                <div>
                                                    <div>
                                                        <i className='bi bi-star-fill checked p-1'></i>
                                                        <span className="p-1">{Post.Rating}</span>
                                                    </div>
                                                    <div className='review-rate'>
                                                        <span className="p-1">{Post.Nbr_Rating}</span>
                                                        <span>reviews</span>
                                                    </div>
                                                </div>
                                                <hr/>
                                                {Post.AgeAuto && Post.AgeAuto!==""?
                                                <div>
                                                    <div className='AgeAllowed'>
                                                        <span className="p-1">{Post.AgeAuto}</span>
                                                    </div>
                                                    <div className='review-rate'>
                                                        <span>rated for {Post.AgeAuto}</span>
                                                    </div>
                                                </div>:null}
                                            </div>
                                            <div className='savebtn'>
                                            {log==0?<><NavLink className='Float-button p-2' title='save post' to='/Login/1'>
                                                <i class="bi bi-bookmark"></i>
                                            </NavLink></>:<>
                                                <button className='Float-button p-1' onClick={()=>this.savepost()} title='save post'><i class="bi bi-bookmark"></i></button>
                                            </>}
                                            </div>
                                        </div>
                                        <div className='description-float'>
                                            <div className='desc-title'>
                                                <h4>About this app</h4>
                                                <button className='btn btnMore' onClick={()=>this.seeDiscription()}>
                                                   {!SeeMore?<>see more</>:<>see less</>} 
                                                </button>
                                            </div>
                                            <div>
                                                {discription}
                                            </div>
                                            {SeeMore?<div>
                                                {Post.Version && Post.Version!==null?
                                                <div className='More-InfoP'>
                                                    <span>Version :</span>
                                                    <span>{Post.Version}</span>
                                                </div>:null}
                                                {Post.AgeAuto && Post.AgeAuto!==null?
                                                <div className='More-InfoP'>
                                                    <span>Rated for :</span>
                                                    <span>{Post.AgeAuto}</span>
                                                </div>:null}
                                                {Post.DateUpdate && Post.DateUpdate!==null?
                                                <div className='More-InfoP'>
                                                    <span>Update on :</span>
                                                    <span>{Post.DateUpdate}</span>
                                                </div>:null}
                                                {Post.DateRelease && Post.DateRelease!==null?
                                                <div className='More-InfoP'>
                                                    <span>Released on :</span>
                                                    <span>{Post.DateRelease}</span>
                                                </div>:null}
                                                <div className='More-InfoP'>
                                                    <span>Post on :</span>
                                                    <span>{Post && Post.date ? Post.date.split('T')[0] : ""}</span>
                                                </div>
                                            </div>:null}
                                        </div>
                                        <div className='type-float'>
                                            <div className='TCS-info'>{Post.Type}</div>
                                            <div className='TCS-info'>{Post && Post.Categorie ? Post.Categorie.replace("/", " ") : ""}</div>
                                            <div className='TCS-info'>{Post.Special}</div>
                                        </div>
                                        {LinksPost.length>0?
                                        <div className='Links-post'>
                                            <h4>Links</h4>
                                            <ul>
                                                {LinksPost.map(L=>(
                                                    <li><a href={L.URL} target='_blank'>{L.To}</a></li>
                                                ))}
                                            </ul>
                                        </div>:null}
                                    </div>
                                </div>
                                {Tags.length>0?
                                <div className='Tags-Post'>
                                    <hr/>
                                    {Tags.map(T=>(<>
                                    <NavLink to={"/Profile"+"/"+T.User.UserName}>
                                        <img src={variables.PHOTO_URL+T.User.ProfilePhoto} className='small-image'/>
                                        {T.User.UserName}
                                    </NavLink>
                                    <hr/>  
                                    </>))}
                                </div>:null}
                                {offers.length>0?
                                <section className='mid-Post'>
                                    <div className='offer'>
                                        <h4>Offer</h4>
                                        <p>
                                            {offers[0].contenu}
                                        </p>
                                        <p className='PlusCnt'>
                                            {offers[0].PlusCnt}
                                        </p>
                                        <div className='d-flex'>
                                            {log==0?<><NavLink className='Float-button Rate-Post m-2' to='/Login/1'>
                                                Get offer
                                            </NavLink></>:<>
                                            <button className='Float-button Rate-Post m-2' data-bs-toggle="modal"data-bs-target={"#GetOffer"}>Get offer</button></>}
                                            {log==0?<><NavLink className='Float-button m-2' to='/Login/1'>
                                            Contact us
                                            </NavLink></>:<>
                                            <button className='Float-button m-2' data-bs-toggle="modal"data-bs-target={"#GetOffer"}>Contact us</button></>}
                                        </div>
                                    </div>
                                </section>:null}
                                {!isLoadingReview?<>
                                <section className='bot-Post'>
                                    {Post.Nbr_Rating>0?<>
                                    <h4>Ratings and reviews</h4>
                                    <p>Rating are verified from people who use this app</p>
                                    </>:null}
                                        <div className='Comments-contain'>
                                        {UserReview!==null&&UserReview.Content!==""?<>
                                            <h5>Your review</h5>
                                            <section>
                                                <div>
                                                    <p className='user-comment'>             
                                                    <NavLink to={"/Profile"+"/"+UserReview.User.UserName}>
                                                        <img src={variables.PHOTO_URL+UserReview.User.ProfilePhoto} className='small-image'/>
                                                        {UserReview.User.UserName}
                                                    </NavLink>
                                                    </p>
                                                    <p className='date-comment'>{UserReview.date.split('T')[0]}</p>
                                                </div>
                                                <p className='Rating-comment'>
                                                {Array(5).fill().map((_, index) => (
                                                    <i className={"fa fa-star "+(index < UserReview.Rating?"checked":"")} aria-hidden="true"></i>
                                                ))}
                                                </p>
                                                <p className='contenet-comment'>{UserReview.Content}</p>
      
                                                <button className='btn text-light m-2' data-bs-toggle="modal"data-bs-target={"#RateWorker"}>
                                                    <i class="fa fa-star" aria-hidden="true"></i> Edir your review
                                                </button>
                                            </section>
                                        </>:null} 
                                        </div>
                                        {Post.Nbr_Rating>0?
                                        <div className='Rating-More'>
                                            <h5>Percentage</h5>
                                            <div className='ratingDp'>
                                                <div className='right-rating'>
                                                    <p className='RateNum'>{Post.Rating}</p>
                                                    <p>
                                                    {Array(5).fill().map((_, index) => (
                                                        <i className={"fa fa-star "+(index < Post.Rating?"checked":"")} aria-hidden="true"></i>
                                                    ))}
                                                    </p>
                                                    <p className='NbrRateNum'>{Post.Nbr_Rating}</p>
                                                </div>
                                                {Numrate.length>0?<>
                                                <div className='persontage'>
                                                    {Array(5).fill().map((_, index) => (
                                                    <p>
                                                        <span>{(index+1)}</span>
                                                        <PercentageBar value={Post.Nbr_Rating!==0?(Numrate[index]/Post.Nbr_Rating*100):0} />
                                                    </p>
                                                    ))}
                                                </div></>:null}
                                            </div>
                                        </div>:null}
                                        {Comments.length>0?
                                        <div className='AllReviews-titel'>
                                            <h5>Other reviews</h5>
                                            <button className='btn' onClick={()=>this.GetAllreviews()}>
                                                {Allreviwes?<>See all</>:<>See less</>}
                                            </button>
                                        </div>:null}
                                        <div className='Comments-contain'> 
                                            {Comments.map(C=>(
                                                <section>
                                                    <div>
                                                        <p className='user-comment'>             
                                                        <NavLink to={"/Profile"+"/"+C.User.UserName}>
                                                            <img src={variables.PHOTO_URL+C.User.ProfilePhoto} className='small-image'/>
                                                            {C.User.UserName}
                                                        </NavLink>
                                                        </p>
                                                        <p className='date-comment'>{C.date.split('T')[0]}</p>
                                                    </div>
                                                    <p className='Rating-comment'>
                                                    {Array(5).fill().map((_, index) => (
                                                        <i className={"fa fa-star "+(index < C.Rating?"checked":"")} aria-hidden="true"></i>
                                                    ))}
                                                    </p>
                                                    <p className='contenet-comment'>{C.Content}</p>
                                                </section>
                                            ))}
                                        </div>
                                </section>
                                </>:<Loader/>}
                                <div className='Plus-Post'>
                                    <h4>Similar apps</h4>
                                    <section className='similar_posts_container'>
                                        <section className='similar_posts'>
                                            {similar_posts.map(P => (<PostCart2 Post={P}  initPage={()=>this.initPage()}/>))}
                                        </section>
                                    </section>
                                </div>
                            </div>
                            <div>
                            <Swiper        
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{
                                delay: 2500,
                                disableOnInteraction: true,
                                }}
                                modules={[Autoplay, Pagination, Navigation]}
                                className='Images-post'
                                >
                                {ImagePost.map((img, i) => (
                                <SwiperSlide style ={{ width: '100%',  marginRight: '30px' }}>
                                    <img alt='image' src={variables.PHOTO_URL+img.URL}/>
                                </SwiperSlide>))}
                            </Swiper>
                            </div>
                        </section>
                    </>:
                    <>
                        <img src='/static/PIC/balon404.svg'/>
                    </>}
                    <div className="modal fade " id={"RateWorker"} tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content RateSpace">
                    <button className='btn-close m-3' data-bs-dismiss="modal" aria-label="Close" type="submit"></button>
                    <div className="modal-body d-flex flex-column">
                        <span><i class="fa fa-star "id='RateStar'></i></span>
                        <span id='RateNum'>{Rate}</span>
                        <h6 className='checked'>Rate this App</h6>
                        <h4>{Post.Title}</h4>
                        <div class="rating">
                        {Array.apply(null, { length: 5 }).map((v, i) => (<>
                        <input type="radio" id={'star-'+(5-i)} value-s={5-i} onClick={(e)=>this.SelectRate(e)} name="star-radio" value={"star-"+(5-i)}/>
                        <label for={"star-"+(5-i)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path  value-s={i+1} onClick={(e)=>this.SelectRate(e)} pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                        </label></>))}
                        </div>
                        <div className='CommentsP'>
                            <input placeholder='Describe your experience...' value={comment} onChange={this.changecomment}/>
                            <p>{comment.length}/500</p>
                        </div>
                        <button className='btn RateButton' id='btnRate'onClick={this.RatePost}>Rate</button>
                        <div id='msg_RatePro' className='text-info'></div>
                    </div>
                    </div> 
                    </div>
                    </div>
                    {offers.length>0?
                    <div className="modal fade " id={"GetOffer"} tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content offerSpace">
                    <button className='btn-close m-3' data-bs-dismiss="modal" aria-label="Close" type="submit"></button>
                    <div className="modal-body d-flex flex-column">
                        <h4>The Offer</h4>
                        <p>{offers[0].contenu}</p>
                        <p className='PlusCnt'>{offers[0].PlusCnt}</p>
                        <p>
                           Get the Offer for <span className='offer-prix'>{offers[0].Prix}</span>
                        </p>
                        <p>
                            <li>
                                <a className='offer-Contact' href={offers[0].Contact}>Contact us frome here</a>
                            </li>
                        </p>
                        <div className='offer-by'>
                            <h5>Offer by</h5>
                            {Post.By!=null?
                            <NavLink className="Owner-info" to={"/Profile"+"/"+Post.By.UserName}>
                                <img src={variables.PHOTO_URL+Post.By.ProfilePhoto} className='small-image'/>
                                {Post.By.UserName}
                            </NavLink>:<></>}
                            <p><a href={'mailto:'+offers[0].Email} target='_blank' className='Float-button Rate-Post'>send mail</a></p>
                        </div>
                        <hr/>
                        {User_Offer.State===""?<>
                        <div className=''>
                            <h5>Information</h5>
                            <div class="inputNew tallInput">
                                <input type="tel" value={User_Offer.Num_Tel} onChange={this.changeOfferNumTel}/>
                                <label>Phone number</label>
                            </div>
                            <div class="inputNew ">
                                <input type="text" placeholder='(Optional)' value={User_Offer.Message} onChange={this.changeofferMessage}/>
                                <label>Message</label>
                                <p>{User_Offer.Message.length}/500</p>
                            </div>
                        </div>
                        <ul className='Term-msg'><li>you need to agree on the companie polasie</li></ul>
                        <div className='termes'>
                            <div class="checkBoxScont">
                                <label class="checkBoxstore">
                                    <input type="checkbox" onClick={this.changeAgree} checked={AgreeOnTurmes}/>
                                    <div class="transition"></div>
                                </label>
                                <label className="p-1">agree on terms</label>
                            </div>
                            <div>
                                <NavLink to="terms" className='Float-button' onClick={()=>this.CloseModel("GetOffer")}>reed terms</NavLink>
                            </div>  
                        </div>
                        <div>
                            <button className='btn7' onClick={()=>this.GetOffer()}>
                                <span className='top-key'></span>
                                <span className='bottom-key-1'></span>
                                <span className='bottom-key-2'></span>
                                <span className='text'>Get offer</span>
                            </button>
                        </div>
                        <div id='msg_GetOfferPro'></div>
                        </>:<>
                            <div id='msg_GetOfferPro'>Your request is on process</div>
                        </>}
                    </div>
                    </div> 
                    </div>
                    </div>
                    :null}
                    <Swiper        
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        id='SeeImagesP'
                        >
                        <button class="Viewimages hideimges" onClick={()=>this.hideImages()}>
                            <div class="text">close</div>
                            <div class="sign">
                            <i class="bi bi-x-lg"></i>
                            </div>
                        </button>
                        {ImagePost.map((img, i) => (
                        <SwiperSlide>
                            <p>
                                <img alt='image' src={variables.PHOTO_URL+img.URL}/>
                            </p>
                        </SwiperSlide>))}
                    </Swiper>
                    <div id="msg_SavePost"></div>
                </>:<Loader/>}
            </div>
        )
    }
} 
function PercentageBar(props) {
    const percentage = props.value; 
  
    return (
      <div className="percentage-bar">
        <div
          className="percentage-fill"
          style={{ width: `${percentage}%` }}
        ></div>
        <span className="percentage-label"></span>
      </div>
    );
}