import React from 'react'

export default function otpPage() {
    return (
        <>
            
            <section id="navigation_bar">
                <nav class="navbar navbar-expand-lg navbar-light main_navbar">
                    <div class="container home_container">
                        <img id="brand_icon" src="images/Notes_Outline.svg" alt="" />
                        <a class="navbar-brand main_brand" style={{color: "#fff", fontSize: "28px"}} href="/">Save Notes</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto nav_widgets">

                            </ul>

                        </div>
                    </div>
                </nav>
            </section>
            <section class="container">
                <div class="jumbotron bg-white jb_tron mx-auto">
                    <h3 class="text-muted register_brand">Save Notes</h3>
                    <form action="/successfulRegister" method="POST">
                        <div class="form-group">
                            <label for="InputEmail">Enter OTP</label>
                            <input type="number" name="userOtp" class="form-control" /><br />
                            <input type="hidden" name="username" class="form-control" value="<%=userEmail%>" />
                            <input type="hidden" name="password" class="form-control" value="<%=userPass%>" />
                            <input type="hidden" name="mainOtp" class="form-control" value="<%=otp%>" />
                            <button type="submit" class="btn btn-block btn-dark">Register</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
