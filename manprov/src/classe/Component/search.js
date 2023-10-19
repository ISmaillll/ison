
export function Search({search,changesearch,Search}){
    return(<>
            <div className='inputanim'>
                <input className='w-50 text-light' onChange={changesearch} value={search} type="text" placeholder="Search..."/>
                <button className="btn3" onClick={Search}><i class="fa fa-search" aria-hidden="true"></i></button>
            </div>                   
    </>)
}