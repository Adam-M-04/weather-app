import left_arrow from '../img/left_arrow.png';
import right_arrow from '../img/right_arrow.png';

const NavButton = ({currMinCell, setcurrMinCell, val}) => {
    let icon = null;
    let className = null;
    if(val === 1){icon = right_arrow; className = "rightNavButton"}
    else {icon = left_arrow; className = "leftNavButton"}

    if(!val){
        return (
            <div className={`navButton ${className}`} style={{cursor : 'default'}}></div>
        )
    }

    function moveCells(){
        let arrow = document.querySelector('.'+className);
        arrow.style.left = (val * 10) + 'px';
        setTimeout(() => {
            arrow.style.left = '0px';
        }, 80);
        setcurrMinCell(currMinCell+val);
    }

    return (
        <div className={`navButton ${className}`} onClick={moveCells}> <img src={icon} alt='navigation arrow'/> </div>
    );
}
 
export default NavButton;