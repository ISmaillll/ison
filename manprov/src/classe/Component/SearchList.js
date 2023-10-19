import { NavLink } from "react-router-dom"
import { variables } from "../../Variables"

export function SearchList({Creators,Jobs,emptysearch,isLoadingSearch}){
    const PhotoPath=variables.PHOTO_URL
    return(
    <div className="SearchList">
        <button className="btn btn-close p-2 text-light" onClick={emptysearch}></button>
        {!isLoadingSearch?<>
        {Creators.length>0?<>
        <h4 className="text-center">Creators</h4>
        {Creators.map((Worker, i) => (
        <NavLink className="text-decoration-none text-light" to={"/Profile"+"/"+Worker.UserName}>
        <div className="d-flex justify-content-evenly creatorcart m-auto h5">
            <div className="">
            <img className="rounded imgCreator" src={PhotoPath+Worker.ProfilePhoto}/>
            </div>
            <div className="d-block m-2">
                <div className="CreatorName">{Worker.UserName}</div>
                <div><i class="fa fa-star checked"></i><span className="text-light m-2">{Worker.Rating}</span></div>
            </div>
            <hr className="hrCreator"/>
            <div className="m-2">
                <div className="postNum text-center">{Worker.Nbr_Post}</div>
                <div><small>Posts</small> </div>
            </div>
        </div>
        </NavLink>))}</>:null}
        {Jobs.length>0?<>
        <h4 className="text-center">Jobs</h4>
        {Jobs.map((Job, i) => (
        <NavLink className="text-decoration-none text-light" to={'/Search-Project/'+Job.Project+'-'+Job.id+"#Job"+Job.id}>
            <div className="creatorcart w-100 m-auto h5">
                <div className="w-75 m-auto">
                    <div className="d-flex align-items-center justify-content-start m-2">
                        <div className="CreatorName m-2">{Job.Job}</div><hr className="hrCreator"/>
                        <div className="text-center p-1">{Job.Payment}</div>
                    </div>
                    <div className=" m-2">
                        <div><span className="text-light m-2">{Job.Description.substring(0, 80)+'...'}</span></div>
                    </div>
                </div>
            </div>
        </NavLink>))}
        </>:null}
        {Creators.length==0&&Jobs.length==0?<div className="h2 text-center"><img src="/static/PIC/search.png" width='60px'/></div>:null}
        </>:<div className='loadersmall'><svg viewBox="25 25 50 50"><circle r="20" cy="50" cx="50"></circle></svg></div>}
    </div>
    )
}

