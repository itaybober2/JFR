"use client";
import React from "react";
import { useState } from "react";
import HomeScreen from "@/app/screens/HomeScreen/HomeScreen";
import Navbar from "@/lib/components/Navbar";
import Footer from "@/lib/components/FooterNavbar";


const Page = () => {
  const [toMountScoupe, setToMountScoupe] = useState(true); 

  return (
    <div>
      <Navbar toMountScoupe={toMountScoupe} setToMountScoupe={setToMountScoupe} />
      <HomeScreen toMountScoupe={toMountScoupe} />;
      <Footer selected={'home'}/>
    </div>
  )
};

export default Page;
