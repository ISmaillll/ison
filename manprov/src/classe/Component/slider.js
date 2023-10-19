
export function Slider({Hist,select}){
    const TAGS = ['HTML', 'CSS', 'JavaScript', 'Typescript', 'Tailwind', 'React', 'Next.js', 'Gatsby', 'UI/UX', 'SVG', 'animation', 'webdev','HTML', 'CSS', 'JavaScript', 'Typescript', 'Tailwind', 'React', 'Next.js', 'Gatsby', 'UI/UX', 'SVG', 'animation', 'webdev'];/// change default search
    const DURATION = 30000;
    const ROWS = 1;
    const TAGS_PER_ROW = 12;
    let HistList = [];
    if(Hist.length<=24) HistList = Hist.concat(TAGS.slice(0,TAGS_PER_ROW*ROWS-Hist.length))
    else HistList = Hist.slice(0,24)
      return (
                <div className='tag-list'>
                    {
                       [...new Array(ROWS)].map((_, i) => <>
                            <div className= "loop-slider" style= {{'--duration': `${DURATION}ms`,'--direction':  i % 2 ? 'reverse' : 'normal' } }>
                                <div className='inner'>
                                    {(HistList)
                                    .slice(i*TAGS_PER_ROW, TAGS_PER_ROW+i*TAGS_PER_ROW).map((tag)=><>
                                        <div className='Search'>
                                            <button className='btn' key-s="N" onClick={()=>select(tag)} value-s={tag}>
                                                #{tag}
                                            </button>
                                        </div>
                                    </>)}
                                </div>
                            </div> 
                       </>) 
                    }
                    <div className='fade'></div>
                </div>
        );

} 