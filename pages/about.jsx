import React, {useState} from 'react';
function AboutPage(){
    const [data, setData] = useState({});
    const getData = async () => {
        const fetchOptions = {
            "method": "GET"
        }
        const response = await fetch('http://localhost:3000/api/random');
        const result = await response.json();
        console.log(result);
        setData(result);
        
    }
    return(
        <>
        <h1>About Me:</h1>
        <button onClick={getData}>Get some Data</button>
        <div>{data ? data.about : "Loading..."}</div>
        </>
    );
}

export default AboutPage;