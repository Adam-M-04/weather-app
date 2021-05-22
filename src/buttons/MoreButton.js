import $ from 'jquery';
import moreDataArrow from '../img/moreDataArrow.png';
import {useEffect} from 'react';

const MoreButton = ({moreData, setmoreData}) => {

    function switchState(){
        if(!moreData){
            setmoreData(!moreData);
            $('.Cell').animate({
                height : "410px"
            }, 450)
        }else {
            $('.Cell').animate({
                height : "320px"
            }, 450, ()=>{
                setmoreData(!moreData);
            })
        }
    }

    useEffect(() => {
        if(moreData)
        {
            setTimeout(() => {
                $('#more_less').text('LESS')
                $('#more_less_img').css({transform : 'rotate(180deg)'})
            }, 450);
            
        }
        else
        {
            $('#more_less').text('MORE')
            $('#more_less_img').css({transform : 'rotate(0deg)'})
        }
    }, [moreData])

    return (
        <div id='expandArrow'>
            <span id='more_less'>MORE</span><br/>
            <img onClick={switchState} id='more_less_img' src={moreDataArrow} alt='expand icon' tabIndex="0" 
                title={`Show ${moreData ? "less" : "more" } weather details`}/>
        </div>
    );
}
 
export default MoreButton;