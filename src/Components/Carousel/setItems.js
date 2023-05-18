import comingsoon from "../../Pages/Why/res/comingsoon_thumb.png"
import { Link } from 'react-router-dom';
import  './Carousel3.scss'


function getData(props){
let item = props.images
let items = []

for(let x in item){
  item[x][0]==='essay' && item[x][4]===true && item[x][3].toLowerCase() === 'coming soon' ?
  items.push(
  <div key={item[x][1]} className='thumb_with_title'>
    <img src={item[x][2]} alt="" key={item[x][1]} />
    <h3 className="thumb_with_title_h3"></h3>
  </div>):
  
 item[x][0]==='essay' && item[x][4]===true?
  items.push(
  <div key={item[x][1]} className='thumb_with_title'>
      <Link to={`essay?id=${item[x][1]}`}>
        <img src={item[x][2]} alt="" key={item[x][1]} />
        <h3 className="thumb_with_title_h3">{item[x][3]}</h3>
      </Link>
  </div>):

  item[x][0]==='default' && item[x][4]=== true?
  items.push(  
    <div className="parent">
      <a className="defaultItems" href={item[x][5]}
      target="_blank" rel="noopener noreferrer"><img src={item[x][2]} alt=""/>
    </a>
    </div>
    
  ):console.log('')
}
return items
}
export default getData