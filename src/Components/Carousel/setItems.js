import comingsoon from "../../Pages/Why/res/comingsoon_thumb.png"
import { Link } from 'react-router-dom';

function getData(props){
let item = props.images
console.log('line 10', item)
let items = []

for(let x in item){
 item[x][0]==='essay' && item[x][4]===true?
  items.push(
  <div key={item[x][1]} className='thumb_with_title'>
      <Link to={`essay?id=${item[x][1]}`}>
        <img src={item[x][2]} alt="" key={item[x][1]} />
        <h3 className="thumb_with_title_h3">{item[x][3]}</h3>
      </Link>
  </div>):

  item[x][0]==='essay' && item[x][4]===false?
  items.push(
  <div key={item[x][1]} className='thumb_with_title'>
    <img src={comingsoon} alt="" key={comingsoon} />
    <h3 className="thumb_with_title_h3">Coming Soon</h3>
  </div>):
  
  item[x][0]==='default'?
  items.push(  
    <a href={item[x][5]}
      target="_blank" rel="noopener noreferrer"><img src={item[x][2]} alt=""/>
    </a>
    // <Link to={item[x][1]}>
    //   <img src={item[x][2]} alt="" key={item[x][1]}/>
    // </Link>
  ):
  items.push(
    <h1>No Images Found</h1>
  )
}
return items
}
export default getData