import React, { useContext } from "react";
import "../styles/Home.css";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Alllisting from "../components/AllListing";


const Home = () => {


  return (
    <>
   
      <section className="home">
        <Alllisting></Alllisting>
  
      </section>
    </>
  );
};

export default Home;