import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Movie from './Movie';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {SpeechProvider} from "@speechly/react-client";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SpeechProvider appId="a45bc881-5b6e-4fb6-8cb3-2ea8d81bb339" language="en-US">
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route exact path="/" element={<App/>}></Route>
        <Route path="/movie/:id" element={<Movie/>}></Route>
        {/* <Route path="*" element={<Error/>}></Route> */}
      </Routes>
    </Router>
  </SpeechProvider>
);