import {useState, useEffect} from 'react';

const useFetch = (fetchURL) => {
    
    const [DataToReturn, setDataToReturn] = useState(null)
    
    useEffect(()=>{
        if(fetchURL===null) return null;
        const abortFetch = new AbortController();
        
        fetch(fetchURL, {signal: abortFetch.signal}).then(res => {
            if(!res.ok)
            {
                throw Error('Could not get the data from the server');
            }
            return res.json();
        }).then(data => {
            setDataToReturn(data);
        }).catch(err => {
            if(err.name === 'AbortError') return null;
            console.log(err.message);
            setDataToReturn(err.message);
        });
        return ()=> abortFetch.abort();
    }, [fetchURL])
    return DataToReturn;
}

export default useFetch;