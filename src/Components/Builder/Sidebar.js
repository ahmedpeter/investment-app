import React, { useState, useEffect } from "react";
import SidebarRow from './SidebarRow';
// import AppsIcon from '@material-ui/icons/Apps';
import EmailIcon from '@material-ui/icons/Email';
import {Avatar, IconButton} from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SpeedIcon from '@material-ui/icons/Speed';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import './builder.css'
import { useHistory } from "react-router-dom";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function Sidebar() {
    const [user, setUser] = useState('');
    const history = useHistory();


    useEffect(() => {
        getUserInfo();
        return () => {
          setUser('');
        };
      }, []);



    const getUserInfo =()=>{
        const userInfo = localStorage.getItem('userInfo');
        const user = JSON.parse(userInfo);
        const base64Url = user.data.accessToken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        JSON.parse(window.atob(base64)))
        setUser(JSON.parse(window.atob(base64)))
      }

      
    return (
        <div className="sidebar">
                <SidebarRow path="/app/dashboard" Icon={SpeedIcon} title="Dashboard"/>
                {/* <SidebarRow path="/app/loans" Icon={AccountBalanceWalletIcon} title="Deposits"/> */}
            {user?.role === 'admin' &&
              <>
                <SidebarRow path="/app/investor/deposit" Icon={CreditScoreIcon} title="Deposits"/>
                <SidebarRow path="/app/accounts/investors" Icon={GroupIcon} title="Investors"/>
                <SidebarRow path="/app/accounts/admins" Icon={GroupIcon} title="Admins"/>
                <SidebarRow path="/app/admin/new" Icon={AdminPanelSettingsIcon} title="New Admin"/>
                <SidebarRow path="/app/messaging" Icon={EmailIcon} title="Messaging"/>
            </>
            }
                <SidebarRow path="/app/plans" Icon={LocalLibraryIcon} title="Plans" />
                <SidebarRow path="/app/profile/${user.id}" Icon={AccountCircleIcon} title="My Profile"/>
                <SidebarRow Icon={LogoutIcon} onClick={()=>{
                        localStorage.removeItem("userInfo");
                        history.push("/");
                    }} title="LogOut"/>





            
        </div>
    )
}

export default Sidebar
