import $ from 'jquery';
import moreDataArrow from '../img/moreDataArrow.png';

const MoreButton = ({moreData, setmoreData}) => {

    function switchState(){
        if(!moreData){
            $('.Cell').animate({
                height : "410px"
            }, 500, ()=>{
                $('#more_less').text('LESS')
                $('#more_less_img').css({transform : 'rotate(180deg)'})
            })
        }else {
            $('.Cell').animate({
                height : "320px"
            }, 500, ()=>{
                $('#more_less').text('MORE')
                $('#more_less_img').css({transform : 'rotate(0deg)'})
            })
        }
        setmoreData(!moreData);
    }

    return (
        <div onClick={switchState} id='expandArrow'>
            <span id='more_less'>MORE</span> DATA<br/>
            <img id='more_less_img' src={moreDataArrow} alt='expand icon'/>
        </div>
    );
}
 
export default MoreButton;