import {useState, useEffect} from 'react';

const useFetch = (fetchURL) => {
    
    const [DataToReturn, setDataToReturn] = useState(null);
    const [error, seterror] = useState(null);
    const [loading, setloading] = useState(true);
    
    useEffect(()=>{
        if(fetchURL===null)
        {
            setloading(false);
            return;
        }
        if(fetchURL==='VoidInput')
        {
            setloading(false);
            seterror('Type any character to get result');
            return;
        }
        const abortFetch = new AbortController();
        
        fetch(fetchURL, {signal: abortFetch.signal}).then(res => {
            if(!res.ok)
            {
                throw Error('Could not get the data from the server');
            }
            return res.json();
        }).then(data => {
            setDataToReturn(data);
            setloading(false);
            seterror(null);
        }).catch(err => {
            if(err.name !== 'AbortError')
            {
                seterror(err.message);
                setloading(false);
            }
        });
        return ()=> abortFetch.abort();
    }, [fetchURL])
    return { DataToReturn, loading, error };
}

export default useFetch;