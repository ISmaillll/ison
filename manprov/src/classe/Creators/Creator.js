
export function Creator({Creator,i,PhotoPath}){

    return(
    <div className="d-flex justify-content-evenly creatorcart">
        <div className="">
        <span className="clasemnetCreators">{i}</span>
        <img className="rounded imgCreator" src={PhotoPath+Creator.ProfilePhoto}/>
        </div>
        <div className="d-block m-2">
            <div className="CreatorName">{Creator.UserName}</div>
            <div><i class="fa fa-star checked"></i><span className="text-light m-2">{Creator.Rating}</span></div>
        </div>
        <hr className="hrCreator"/>
        <div className="m-2">
            <div className="postNum text-center">{Creator.Nbr_Post}</div>
            <div><small>Posts</small> </div>
        </div>
    </div>
    )
}