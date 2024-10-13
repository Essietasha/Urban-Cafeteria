import React from 'react';
import { useState, useEffect, useCallback } from 'react';

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    if(!response.ok){
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const resData = await response.json();
    return resData;
};


const useHttp = (url, config, initialData) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearDataSubm() {
        setData(initialData);
    }
    
    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true);
            try {
                const resData = await sendHttpRequest(url, {...config, body: data});
                setData(resData);
            } catch(error){
                setError(error || 'Something went wrong');
            }
            setIsLoading(false);
    }, [url, config]);
    
    useEffect(() => {
        if(config && (config.method === 'GET' || !config.method) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);


    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearDataSubm
    };
}

export default useHttp;