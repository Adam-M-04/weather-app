class EventListenerComp extends React.Component {
    constructor(){}
    componentDidMount(){
        window.addEventListener('resize', ()=>{
            setwidth(Math.min(window.innerWidth, 1920));
        })
    }
}

export default EventListenerComp;