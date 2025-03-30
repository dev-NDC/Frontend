import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Component/ClientSide/BeforeLogin/Home";
import PortalHome from './Component/ClientSide/AfterLogin/PortalHome';
import AdminHome from './Component/Admin/AdminHome';

import HomeState from './Context/ClientSide/AfterLogin/Home/HomeState';

function App() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/portal" element={<HomeState><PortalHome/></HomeState>}/>
          <Route path="/admin" element={ <AdminHome/> }/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
