import React,{Component} from 'react';
import {variables} from '../../Variables';
import {NavSettings} from './NavSettings';
import './Paiement.css';

export class Paiement extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            userlog:{},
            log:0,
            usertbl:"",

            currentCardBackground:'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +  Math.floor(Math.random()* 25 + 1) + '.jpeg', // just for fun :D
            cardType:"",
            cardName: "",
            cardNumber: "",
            cardMonth: "",
            cardYear: "",
            cardCvv: "",
            minCardYear: new Date().getFullYear(),
            amexCardMask: "#### ###### #####",
            otherCardMask: "#### #### #### ####",
            Mask:"#### #### #### ####",
            cardNumberTemp: "#### #### #### ####",
            isCardFlipped: false,
            focusElementStyle: null,
            isInputFocused: false,
            n:0,
            index:0,

            Workerstbl:"Worker",
            Usertbl:"User",

            PhotoPath:variables.PHOTO_URL
        };
    }
    mounted() {
        this.cardNumberTemp = this.otherCardMask;
        document.getElementById("cardNumber").focus();
    }
    getCardType =()=> {
        let number = this.state.cardNumber;
        if (/^4/.test(number)) return "visa";
        if (/^(34|37)/.test(number)) return "amex";
        if (/^5[1-5]/.test(number)) return  "mastercard";
        if (/^6011/.test(number)) return  "discover";
        if (/^9792/.test(number)) return  "troy";
        return "visa";
    }
    getcardLink=()=>{
        let link='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' ;
        return (link+this.getCardType()+".png")
    }
    generateCardNumberMask =()=> {
                return this.getCardType() === ("amex") ? this.state.amexCardMask : this.state.otherCardMask;
    }
    focusInput =(e)=> {
    this.isInputFocused = true;
    let targetRef = e.target.dataset.ref;
    let target = this.$refs[targetRef];
    this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
    }
    }
    blurInput=() =>{
    let vm = this;
    setTimeout(() => {
        if (!vm.isInputFocused) {
        vm.focusElementStyle = null;
        }
    }, 300);
    vm.isInputFocused = false;
    }
    back=()=>{
    document.getElementById('back').classList.add('Top')
    document.getElementById('back').classList.remove('Bot')
    document.getElementById('front').classList.remove('Top')
    document.getElementById('front').classList.add('Bot')
    }
    front=()=>{
    document.getElementById('front').classList.add('Top')
    document.getElementById('front').classList.remove('Bot')
    document.getElementById('back').classList.remove('Top')
    document.getElementById('back').classList.add('Bot')
    }
///////////////////edit
UpdateUser=(e)=>{
    e.preventDefault();
    this.state.userlog.Criditcart=this.state.cardNumber;
    this.state.userlog.CartHolder=this.state.cardName;
    this.state.userlog.CVV=this.state.cardCvv;
    this.state.userlog.cardYear=this.state.cardYear;
    this.state.userlog.cardMonth=this.state.cardMonth;
    let ProfilePhoto = this.state.userlog.ProfilePhoto;
    delete this.state.userlog.ProfilePhoto;
    
    const formData = new FormData();

    for (const key in this.state.userlog) {
        formData.append(key, this.state.userlog[key]);
    }
    let Url = this.state.Usertbl;
    if(this.state.userlog.range>1) Url = this.state.Workerstbl

    fetch(variables.API_URL+Url+'/'+this.state.userlog.id+'/',{
        method:'PUT',
        body:formData
    })
    .then(res=>res.json())
    .then((result)=>{
        this.props.UpdateUser(result,ProfilePhoto)
    },(error)=>{console.error('Error:', error);})
}
////////////////////////change
cahngecardNumber=(e)=>{
    this.setState({});
    if(/^\d+$/.test(e.target.value)||e.target.value==''){
    this.state.cardNumber=e.target.value;
    this.state.cardType=this.getcardLink();
    this.state.Mask=this.generateCardNumberMask();
    let j=0;
    this.state.cardNumberTemp='';
    for (let i = 0; i < this.state.Mask.length; i++) {
      if (this.state.Mask[i] === '#'&&j<e.target.value.length) {
        this.state.cardNumberTemp += e.target.value[j];
        j++;
      } else {
        this.state.cardNumberTemp += this.state.Mask[i];
      }
    }
    }
}
changecardName=(e)=>{
    if(/^[a-zA-Z ]+$/.test(e.target.value)||e.target.value==''){
    this.setState({
        cardName:e.target.value
    });
    }
}
changeMounth=(e)=>{
        this.setState({
            cardMonth:e.target.value
        });
}
changeYear=(e)=>{
    this.setState({
        cardYear:e.target.value
    });
}
changecardCvv=(e)=>{
    if(/^\d+$/.test(e.target.value)||e.target.value==''){
    this.setState({
        cardCvv:e.target.value
    });
}
}
///////////////////////////
componentDidMount(){
    console.log(this.props.userlog)
    this.setState({
        userlog:this.props.userlog,
        log:this.props.log,
        cardType:this.getcardLink(),
        cardNumber:this.props.userlog.Criditcart,
        cardNumberTemp:this.props.userlog.Criditcart,
        cardName:this.props.userlog.CartHolder,
        cardCvv:this.props.userlog.CVV,
        cardYear:this.props.userlog.cardYear,
        cardMonth:this.props.userlog.cardMonth
    })
    if( Object.keys(this.props.userlog).length === 0)window.location.href = "../";
    else if(this.props.log ===2 &&  Object.keys(this.props.userlog).length ===13)window.location.href = "../Profile/"+this.props.userlog.UserName;
}
    render(){
        const {
            userlog,
            PhotoPath,
            log,
            currentCardBackground,
            cardName,
            cardNumber,
            cardType,
            Mask,
            cardMonth,
            cardYear,
            cardCvv,
            minCardYear,
            cardNumberTemp,
            isCardFlipped,
            focusElementStyle,
            isInputFocused,
        }=this.state;
        return(
        <div className="d-flex bg-light Setting m-auto mt-2">
                <NavSettings/>
            <div className="w-100">
            <form className="wrapper" id="app" onSubmit={this.UpdateUser}>
                <h3 className='text-secondary text-center m-4'>default Cart</h3>
                    <div className="card-form">
                    <div className="card-list">
                        <div  className="card-item">
                        <div className="card-item__side -front Top" id='front'>
                            <div  className="card-item" style={focusElementStyle} ref="sfocusElement"></div>
                            <div className="card-item__cover">
                            <img src={currentCardBackground} className="card-item__bg"/>
                            </div>
                            <div className="card-item__wrapper">
                            <div className="card-item__top">
                                <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" className="card-item__chip"/>
                                <div className="card-item__type">
                                    <img src={cardType}  key="getCardType" alt="" className="card-item__typeImg"/>
                                </div>
                            </div>
                            <label for="cardNumber" className="card-item__number" ref="cardNumber">{cardNumberTemp}</label>
                            <div className="card-item__content">
                                <label for="cardName" className="card-item__info" ref="cardName">
                                <div className="card-item__holder">Card Holder</div>
                                    <div className="card-item__name">
                                        {cardName!=''?<span className="card-item__nameItem">{cardName}</span>
                                        :<span className="card-item__nameItem">Full Name</span>}
                                    </div>
                                </label>
                                <div className="card-item__date" ref="cardDate">
                                <label for="cardMonth" className="card-item__dateTitle">Expires</label>
                                <label for="cardMonth" className="card-item__dateItem">
                                    {cardMonth!=''?<span v-if="cardMonth" key="cardMonth">{cardMonth}</span>
                                    :<span>MM</span>}
                                </label>
                                /
                                <label for="cardYear" className="card-item__dateItem">
                                    <transition name="slide-fade-up">
                                    {cardYear!=''?<span v-if="cardYear" key="cardYear">{String(cardYear).slice(2,4)}</span>
                                    :<span>YY</span>}
                                    </transition>
                                </label>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="card-item__side -back Bot" id='back'>
                            <div className="card-item__cover">
                            <img src={currentCardBackground} className="card-item__bg"/>
                            </div>
                            <div className="card-item__band"></div>
                            <div className="card-item__cvv">
                                <div className="card-item__cvvTitle">CVV</div>
                                <div className="card-item__cvvBand">
                                <span >{cardCvv}</span>
                            </div>
                                <div className="card-item__type">
                                    <img src={cardType} v-if="getCardType" className="card-item__typeImg"/>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="card-form__inner">
                        <div className="card-input">
                        <label for="cardNumber" className="card-input__label">Card Number</label>
                        <input type="text" id="cardNumber" className="card-input__input"  onFocus={this.front}  maxLength={Mask.length - (this.getCardType() === ("amex") ? 2 : 3)} value={cardNumber} onChange={this.cahngecardNumber}/>
                        </div>
                        <div className="card-input">
                        <label for="cardName" className="card-input__label">Card Holders</label>
                        <input type="text" id="cardName" className="card-input__input" value={cardName} onFocus={this.front} onChange={this.changecardName}/>
                        </div>
                        <div className="card-form__row">
                        <div className="card-form__col">
                            <div className="card-form__group">
                            <label for="cardMonth" className="card-input__label">Expiration Date</label>
                            <select className="card-input__input -select" value={cardMonth} onFocus={this.front} onChange={this.changeMounth}>
                                <option value="" disabled>Month</option>
                                {Array.apply(null, { length: 12 }).map((e, i) => (<option >{i<9?'0':null}{i+1}</option>))}
                            </select>
                            <select className="card-input__input -select" value={cardYear} id={cardYear} onFocus={this.front} onChange={this.changeYear}>
                                <option value="" disabled>Year</option>
                                {Array.apply(null, { length: 12 }).map((e, i) => (<option >{i+minCardYear}</option>))}
                            </select>
                            </div>
                        </div>
                        <div className="card-form__col -cvv">
                            <div className="card-input">
                            <label for="cardCvv" className="card-input__label">CVV</label>
                            <input type="text" className="card-input__input" value={cardCvv} onChange={this.changecardCvv} onFocus={this.back} maxLength="4"/>
                            </div>
                        </div>
                        </div>
                        <button type='submit' className="card-form__button">Save</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}