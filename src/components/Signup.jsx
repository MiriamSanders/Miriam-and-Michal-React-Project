import React from "react"

function Signup() {
    let succsessfulSignUP = false;
    return (
        <>
            {!succsessfulSignUP &&
                <div>
                    <input name="username" placeholder="userName" />
                    <input name="password" placeholder="password" />
                    <input name="verifyPassword" placeholder="password" />
                </div>}
            {
                succsessfulSignUP &&
                <div>
                    <input name="name" pattern="name" />
                    <input name="email" pattern="email" />
                    <label >address:</label>
                    <input name="city" pattern="city" />
                    <input name="suite" pattern="suite" />
                    <input name="street" pattern="street" />
                    <input name="zipcode" pattern="zipcode" />
                    <label>Geo:</label>
                    <input name="latitude" pattern="latitude" />
                    <input name="longitude" pattern="longitude" />
                    <input name="phone" pattern="phone" />
                    <input name="website" pattern="website" />
                    <label>company</label>
                    <input name="companyname" pattern="company name" />
                    <input name="catchPhrase" pattern="compcatchPhraseany" />
                    <input name="bs" pattern="bs" />

                </div>
            }
        </>
    )

}
export default Signup;