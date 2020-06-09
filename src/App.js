import React, {useState} from 'react';
import './App.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
export const  App = () => {

  const TIMEOUT = 4000

  // Init Axios
  const axiosInstance = axios.create({
    baseURL: 'https://www.mocky.io/'
  })
  // Add interceptors
  axiosInstance.interceptors.request.use(
    request => requestHandler(request)
  )
  
  axiosInstance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
  )
  const [handlerEnable, setHandlerEnable] = useState(true);
    const [disable, setDisable] = useState(true);

  

  const isHandlerEnabled = (config={}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? 
      false : true
  }
  
  const requestHandler = (request) => {
    if (isHandlerEnabled(request)) {
      request.headers['X-CodePen'] = 'https://codepen.io/teroauralinna/full/vPvKWe'
      toast(`Sending request to: ${request.url}`, {
        position: "top-right",
        autoClose: TIMEOUT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        });
      
    }
    return request
  }
  
  const errorHandler = (error) => {
    if (isHandlerEnabled(error.config)) {
      toast( `Request failed: ${error.response.status}`, {
        position: "top-right",
        autoClose: TIMEOUT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        });
    
    }
    return Promise.reject({ ...error })
  }
  
  const successHandler = (response) => {
    if (isHandlerEnabled(response.config)) {
      toast( `Request done successfully: ${response.config.url}`, {
        position: "top-right",
        autoClose: TIMEOUT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        });
    
    }
    return response
  }
  
  const makeSuccessCall = async (handlerEnabled) => {
    try {
      await axiosInstance.get('/v2/5c94c4423600001818941c8b?mocky-delay=300ms', {
        handlerEnabled
      })
    } catch (error) {
      console.error(error)
    }
  }
  
  const makeFailureCall = async (handlerEnabled) => {
    try {
      await axiosInstance.get('/v2/5c94c4793600001818941c8f?mocky-delay=300ms', {
        handlerEnabled
      })
    } catch (error) {
      console.error(error)
    }
  }
  
  const toggleButtons = (enabled) => {
    toast( `Handlers ${!handlerEnable ? 'enabled' : 'disabled'}`, {
      position: "top-right",
      autoClose: TIMEOUT,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      });
    setHandlerEnable(!handlerEnable);
    setDisable(!disable);
    
   
  }
  
  
  
  

  

  return (
    <div className="App">
     <div className="container">

          <h1>Global HTTP request and response handling with the Axios interceptors</h1>

          <p>This Pen is an example of how to globally catch requests, responses and errors by <a href="https://github.com/axios/axios#interceptors" target="_blank" rel="noopener noreferrer">Axios interceptor</a>.</p>

          <button onClick={() => makeSuccessCall(handlerEnable)} className="btn btn--success js-call-success" >Call success</button>
          <button onClick={() => makeFailureCall(handlerEnable)} className="btn btn--warning js-call-failure">Call failure</button>
          <hr />
          <button onClick={() => toggleButtons(handlerEnable)} className="btn btn--small btn--disabled js-enable-handler" disabled = {disable}>Enable handlers</button>
          <button onClick={() => toggleButtons(handlerEnable)} className="btn btn--small js-disable-handler" disabled = {!disable}>Disable handlers</button>
      <p>Read more: <a href="https://auralinna.blog/post/2019/global-http-request-and-response-handling-with-the-axios-interceptor" target="_blank">Global HTTP request and response handling with the Axios interceptor</a></p>
</div>
<ToastContainer />
    </div>
  );
}

export default App;
