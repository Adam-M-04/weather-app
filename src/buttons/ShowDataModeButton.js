const ShowDataModeButton = ({showDataMode, setshowDataMode, theme}) => {

    function changeMode(newMode){
        setshowDataMode(newMode);
    }
    
    return (
        <div style={{display: 'flex', justifyContent: 'center', margin: '10px'}}>
        <div className='switchMode'>
            <div className={'switchModeBackground side_' + showDataMode}></div>
            <span className={'switchCells'} chosen={`${(showDataMode === 'cells')}`} onClick={()=>{changeMode('cells')}}>CELLS</span>
            <span className='switchGraph' chosen={`${(showDataMode === 'diagram')}`} onClick={()=>{changeMode('diagram')}}>GRAPH</span>
        </div>
        </div>
    );
}
 
export default ShowDataModeButton;