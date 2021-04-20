import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./screen/Home";
import Login from "./screen/Login";
import otpPage from "./screen/otpPage";
import Register from "./screen/Register";
import Notes from "./screen/Notes";
import readNotes from "./screen/ReadNote";
import ReadNote from "./screen/ReadNote";


function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path='/' component={Home} />
        <Route exact path='/signin' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/otp' component={otpPage} />
        <Route exact path='/notes' component={Notes} />
        <Route exact path='/notes/:id' component={ReadNote} />
        <Route exact path='/read' component={readNotes} />
      </BrowserRouter>
    </>
  );
}

export default App;
