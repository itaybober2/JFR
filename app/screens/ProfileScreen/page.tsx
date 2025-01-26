"use client";
import "@/app/screens/ProfileScreen/Profile.css";
import { useState } from "react";
import Navbar from "@/lib/components/Navbar";
import Footer from "@/lib/components/FooterNavbar";


export default function ProfileScreen() {
    const [toMountScoupe, setToMountScoupe] = useState(true); 
    

  return (
    <main className="profilePage">
        <Navbar toMountScoupe={toMountScoupe} setToMountScoupe={setToMountScoupe} />
        <div className="profile">
            <div className="userNameCircle"></div>
            <div className="userInfo">
                <div className="userName">שם משתמש</div>
                <div className="email">userName@gmail.com</div>
            </div>
        </div>

        <div className="menu">
            <button className="menuItem">שינוי היעדים שלי</button>
            <button className="menuItem">צפייה בנקודות שלי</button>
            <button className="menuItem">הגדרות פרטיות</button>
      </div>
      <Footer/>
    </main>
  );
}