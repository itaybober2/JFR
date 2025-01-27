"use client";
import "@/app/screens/ProfileScreen/Profile.css";


export default function ProfileScreen() {

  return (
    <main className="profilePage">
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
    </main>
  );
}