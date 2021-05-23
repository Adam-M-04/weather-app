import location from '../img/location.svg';
import $ from 'jquery';

const GetLocationButton = ({selectPlace}) => {

    function successCallback(position){
        $("#getLocation").animate({height: '20px'}, 100);
        setTimeout(() => {
            $("#getLocation").animate({height: '40px'}, 150);
        }, 100);
        setTimeout(() => {
            $("#getLocation").animate({height: '20px'}, 200);
        }, 150);
        setTimeout(() => {
            $("#getLocation").animate({height: '40px'}, 250);
        }, 200);
        selectPlace({lat: position.coords.latitude.toFixed(6), lon: position.coords.longitude.toFixed(6), display_name: "Your current location"})
    }

    function errorCallback(){
        alert("The device location could not be obtained");
    }

    function getLocation(){
        if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        }
        else
        {
            errorCallback();
        }
    }

    return (
        <img id='getLocation' onClick={getLocation} src={location} alt="device location" tabIndex="0" tooltip="test" title='Get Your current location'/>
    );
}
 
export default GetLocationButton;