import { NavLink } from "react-router-dom"

export function Browserstore({Ctegorieselected,Typeselected,Sepecialselected,closeMenu}){

    return(
        <div className='NavStore'id='miniMenuStore' close-t={1}>  
                    <details open>
                        <summary><h5 className="sumMenu">Type of app</h5></summary>
                        <ul className="typlist">
                            <li>
                            <div class="checkBoxScont">
                                <label class="checkBoxstore">
                                    <input type="checkbox" onClick={Typeselected} value='Disktop'/>
                                    <div class="transition"></div>
                                </label>
                                <span className="p-1"><i class="fa-solid fa-laptop"></i>Disktop</span>
                            </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Typeselected} value='Mobile'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1"><i class="fa-solid fa-mobile"></i>Mobile</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                    <input type="checkbox" className='btn typs' onClick={Typeselected} value='Website'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1"><i class="fa-solid fa-globe"></i>Website</span>
                                </div>
                            </li>
                        </ul>
                    </details>
                    <details open>
                        <summary><h5 className="sumMenu">Special</h5></summary>
                        <ul className="typlist">
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                    <input type="checkbox" className='btn typs' onClick={Sepecialselected} value='AI'/>                                        <div class="transition"></div>
                                    <div class="transition"></div>
                                    </label>
                                    <span className="p-1"><i class="fa-solid fa-microchip-ai"></i>AI</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                    <input type="checkbox" className='btn typs' onClick={Sepecialselected} value='useful'/>                                        <div class="transition"></div>
                                    <div class="transition"></div>
                                    </label>
                                    <span className="p-1"><i class="fa-solid fa-hand-holding"></i>useful</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                    <input type="checkbox" className='btn typs' onClick={Sepecialselected} value='Presonalise'/>                                        <div class="transition"></div>
                                    <div class="transition"></div>
                                    </label>
                                    <span className="p-1"><i class="fa-solid fa-person"></i>Presonalise</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                    <input type="checkbox" className='btn typs' onClick={Sepecialselected} value='Top free'/>
                                    <div class="transition"></div>
                                    </label>
                                    <span className="p-1">free</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                    <input type="checkbox" className='btn typs' onClick={Sepecialselected} value='Top offes'/>
                                    <div class="transition"></div>
                                    </label>
                                    <span className="p-1"><i class="fa-solid fa-layer-group"></i>offes</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                    <input type="checkbox" className='btn typs' onClick={Sepecialselected} value='Top paid'/>
                                    <div class="transition"></div>
                                    </label>
                                    <span className="p-1"><i class="fa-solid fa-money-bill"></i>paid</span>
                                </div>
                            </li>
                        </ul>
                    </details>
                    <details open>
                        <summary><h5 className="sumMenu">Categorie</h5></summary>
                        <ul className="typlist">
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Art & Design'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Art & Design</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Auto & Vehicles'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Auto & Vehicles</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Books & Reference'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Books & Reference</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Watch apps'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Watch apps</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Beauty'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Beauty</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Business'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Business</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Comics'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Comics</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Games'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Games</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Communication'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Communication</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Education'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Education</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Entertainment'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Entertainment</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Events'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Events</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Finance'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Finance</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Food & Drink'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Food & Drink</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Health & Fitness'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Health & Fitness</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='House & Home'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">House & Home</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Libraries & Demo'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Libraries & Demo</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Lifestyle'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Lifestyle</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Maps & Navigation'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Maps & Navigation</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Medical'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Medical</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Music & Audio'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Music & Audio</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='News & Magazines'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">News & Magazines</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Parenting'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Parenting</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Personalisation'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Personalisation</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Photography'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Photography</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Productivity'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Productivity</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Shopping'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Shopping</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Social'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Social</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Sports'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Sports</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Tools'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Tools</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Travel & Local'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Travel & Local</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Video & Editors'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Video & Editors</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Weather'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Weather</span>
                                </div>
                            </li>
                        </ul>
                    </details>
        </div>
    )

}
{/*
                        <ul className="typlist">
                            <span><i class="bi bi-pen-fill m-1"></i>Productivity</span>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={Ctegorieselected} value='Note-taking'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Note-taking</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Task managers'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Task managers</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Calendar'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Calendar</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Project management'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Project management</span>
                                </div>
                            </li>
                            <span><i class="bi bi-wifi m-1"></i>Social networking</span>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Social media'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Social media</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Messaging'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Messaging</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Video conferencing'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Video conferencing</span>
                                </div>
                            </li>
                            <span><i class="bi bi-controller m-1"></i>Games</span>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Adventure'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Adventure</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Action'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Action</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Massively Multiplayer'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Massively Multiplayer</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Racing'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Racing</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='RPG'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">RPG</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Simulation'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Simulation</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Sports'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Sports</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Strategy'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Strategy</span>
                                </div>
                            </li>
                            <li>
                            <span><i class="fa-solid fa-play m-1"></i>Streaming</span>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='movies'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Movies</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='musique'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Musique</span>
                                </div>
                            </li>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='E-reader'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">E-reader</span>
                                </div>
                            </li>
                            <span><i class="fa-solid fa-pen-fancy m-1"></i>Education</span>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='language-learning'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Language Learning</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Online course'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Online Course</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Educational games'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Educational Games</span>
                                </div>
                            </li>
                            <span><i class="fa-solid fa-heart-pulse m-1"></i>Health and fitness</span>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Fitness trackers'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Fitness trackers</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Meditation'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Meditation</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Calorie counters'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Calorie counters</span>
                                </div>
                            </li>
                            <span><i class="fa-solid fa-money-check m-1"></i>Finance</span>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Mobile banking'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Mobile banking</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Investment'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Investment</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Budgeting'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Budgeting</span>
                                </div>
                            </li>
                            <span><i class="fa-sharp fa-solid fa-compass m-1"></i>Travel</span>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Booking'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Booking</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Navigation'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Navigation</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Travel guides'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Travel guides</span>
                                </div>
                            </li>
                            <span><i class="fa-regular fa-newspaper m-1"></i>News and information</span>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='news'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">News</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='weather'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Weather</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkBoxScont">
                                    <label class="checkBoxstore">
                                        <input type="checkbox" className='btn typs' onClick={selected} value='Encyclopedia'/>
                                        <div class="transition"></div>
                                    </label>
                                    <span className="p-1">Encyclopedia</span>
                                </div>
                            </li>
                        </ul>
*/}