import {useState} from 'react';
import Star from '../img/Star.png';
import favStar from '../img/favStar.png';
import loadingdark from '../img/loadingdark.gif';
import loadinglight from '../img/loadinglight.gif';

const HomepageResult = ({places, loading, error, selectPlace, theme}) => {

    function checkObject(obj){
        try
        {
            obj = JSON.parse(obj);
        }
        catch(e)
        {
            localStorage.removeItem('favouriteLocation');
        }

        if(obj !== null && typeof(obj) === 'object'){
            if(typeof(obj.display_name) !== 'undefined' && typeof(obj.lat) !== 'undefined' && typeof(obj.lon) !== 'undefined'){
                if(parseFloat(obj.lat) >= -90  && parseFloat(obj.lat) <= 90 && parseFloat(obj.lon) >= -180  && parseFloat(obj.lon) <= 180){
                    return obj;
                }
            }
        }
        localStorage.removeItem('favouriteLocation');
        return null;
    }

    const [favouriteLocation, setfavouriteLocation] = useState(checkObject(localStorage.getItem('favouriteLocation')));
    
    function handleFavourite(fav){
        let CurrFav = checkObject(localStorage.getItem('favouriteLocation'));
        if(CurrFav){
            if(CurrFav.display_name === fav.display_name){
                localStorage.removeItem('favouriteLocation');
                setfavouriteLocation(null);
                return;
            }
        }
        localStorage.setItem('favouriteLocation', JSON.stringify(fav));
        setfavouriteLocation(checkObject(localStorage.getItem('favouriteLocation')));
    }

    function checkFavourite(name){
        if(favouriteLocation === null) return false;
        if(name === favouriteLocation.display_name) return true;
        return false;
    }

    function getStarSrc(name){
        if(checkFavourite(name)) return favStar;
        return Star;
    }

    if(loading){
        return(
            <div className='Message'>
                <img src={theme === 'dark' ? loadingdark : loadinglight} alt="loading..."/>
            </div>
        )
    }
    if(error){
        return(
            <div className='Message'>
                {error}
            </div>
        )
    }
    if(places){
        return(
            <div className='LocationsResults'>
                {
                    places.map((place, index) => {
                        return (
                            <div className='locationResultFullWidth' key={index}>
                                <div className='locationResultBlock' key={index} style={{position : 'relative'}}>
                                    <span className="display_name">{place.display_name}</span><br/>
                                    <div style={{display : 'flex', justifyContent : 'space-around'}}>
                                        <button className="btn SelectLocation" onClick={()=>{selectPlace(index)}}>Select</button>
                                    </div>
                                    <img className='Star' src={getStarSrc(place.display_name)} alt='star' tabIndex="0" onClick={()=>{
                                        handleFavourite(place);
                                    }} title={checkFavourite(place.display_name) ? "Uncheck this location as a favourite" : "Set this location as a favourite"}/>
                                </div>
                            </div>
                        )
                    }) 
                }
            </div>
        )
    }
    if(favouriteLocation){
        return(
            <div className='locationResultFullWidth'>
                <div className='locationResultBlock' style={{position : 'relative'}}>
                    <span className="display_name">{favouriteLocation.display_name}</span><br/>
                    <div style={{display : 'flex', justifyContent : 'space-around'}}>
                        <button className="btn SelectLocation" onClick={()=>{selectPlace(favouriteLocation)}} tabIndex="0">Select</button>
                    </div>
                    <img className='Star' src={favStar} alt='star' tabIndex="0" onClick={
                        ()=>{handleFavourite(favouriteLocation);}
                    } title="Uncheck this location as a favourite" />
                </div>
            </div>
        )
    }
    return(
        <div className='Message'>
            To get accurate location you should type city name with state name or postal code
        </div>
    )
}
 
export default HomepageResult;