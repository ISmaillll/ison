import { NavLink } from "react-router-dom";
import { variables } from "../../Variables";

export function PostCart({Post}){
    return(
        <>
        <NavLink to={"/Browse/"+Post.id} className="cardPro">
            <div className="content">
                <div className="front">
                <div className="img">
                    <img alt='image' src={variables.PHOTO_URL+Post.Logo} className='imgpro'/>
                </div>
                <div className="front-content">
                    <div className="description">
                        <div className="title">
                            <p className="title"><strong>{Post.Title}</strong></p>
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