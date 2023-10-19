import { variables } from "../../Variables";
import { NavLink } from "react-router-dom";

export function PostCart2({Post,initPage}){
    return(
        <>
        <NavLink to={"/Browse/"+Post.id} onClick={()=>initPage()} className="cardPro">
            <div className="content">
                <div className="front d-flex">
                    <div className="img">
                        <img alt='image' src={variables.PHOTO_URL+Post.Logo} className='imgpro2'/>
                    </div>
                    <div className="front-content">
                        <div className="description">
                            <div className="title">
                                <p className="titleCart"><strong>{Post.Title}</strong></p>
                            </div>
                            <p className="cardPro-footer">{Post.Type} | {Post && Post.Categorie ? Post.Categorie.replace("/", " ") : ""}</p>
                            <div className='d-flex' id='PostComments'>
                                <span className="p-1">{Post.Rating}</span>
                                <i className='bi bi-star-fill checked p-1'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
        </>
    )
}