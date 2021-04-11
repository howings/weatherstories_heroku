import { useStae, useEffect } from "react";
import React from 'react';

function UseFetch(uri) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() =>{
        if(!uri) return;
        fetch(uri)
        .then((data) => data.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch(setError);
    }, [uri]);

    return { loading, data, error };
}

export default UseFetch
