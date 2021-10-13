import React, {useState, useEffect} from 'react';

export default function Homepage(){
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        console.log(email)
    },[email])
    const submitHandler = async (e) =>{
        e.preventDefault();
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(regexEmail.test(email)){
            console.log("Okay! Now do API email prompt");
            // const body = fs.readFileSync('../templates/welcome.html', 'utf8');
            const recipients = new Array(email);
            const subject = "Welcome To Our NewsLetter!";
            const bodyData = {
                "recipients" : recipients,
                "subject" : subject,
            }
            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(bodyData)
            };
            console.log(fetchOptions)
            const result = await fetch("http://localhost:3000/api/send-mail", fetchOptions);
            const data = await result.json();
            console.log(data);
        } else{
           alert("Error: Please enter a proper email")
        }
    }
    return (
        <>
        <h1>Welcome to Next.js and Express App</h1>
        <footer>
            <header>
                <h3>Want to Stay up to Date?</h3>
                <sub>
                    Add your email to the contact list!
                </sub>
                <form onSubmit={submitHandler}>
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="email" />
                    <button type='submit'>Join Newsletter</button>
                </form>
            </header>
        </footer>
        </>

        
    );
    

}
