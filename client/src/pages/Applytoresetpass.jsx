import React, { useState } from 'react'

const Applytoresetpass = () => {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState(false);

    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault();

        if (email === "") {
            alert("email is required!")
        } else if (!email.includes("@")) {
            alert("includes @ in your email!");
        } else {
            const res = await fetch("http://localhost:8080/sendpasswordlink", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (data.status === 201) {
                setEmail("");
                setMessage(true)
            } else {
               alert("Invalid User")
            }
        }
    }

    return (
        <>
            <section>
                <div >
                    <div >
                        <h1>Enter Your Email</h1>
                    </div>

                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}
                    <form onSubmit={sendLink} >
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>

                        <button type='submit'>Send</button>
                    </form>
                
                </div>
            </section>
        </>
    )
}

export default Applytoresetpass