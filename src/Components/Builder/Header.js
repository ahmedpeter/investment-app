import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import AppsIcon from "@material-ui/icons/Apps";
import LogoutIcon from "@mui/icons-material/Logout";
import GitLogo from "../../Assets/imgs/Git-logo.png";
import { useHistory } from "react-router-dom";
import "./builder.css";
// import { useStateValue } from '../../Util/StateProvider';

function Header() {
  const [user, setUser] = useState();
  const history = useHistory();
  // const user = getUserInfo();
  // const token = getToken();

  useEffect(() => {
    getUserInfo();
  }, []);

  // function getToken() {
  //   const tokenString = localStorage.getItem('accessToken');
  //   if(!tokenString) {
  //     history.push("/login");
  //   }
  //   tokenString);
  //   const userToken = JSON.parse(tokenString);
  //   tokenString);
  //   return tokenString;
  // }

  const getUserInfo = () => {
    // getToken();
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      history.push("/login");
    }
    const user = JSON.parse(userInfo);
    // user.data);
    setUser(user.data);
    // return user?.data;
    // user.data.firstname);
  };

  return (
    <div>
      <div className="header">
        <div className="header__left">
          <div className="logo-header">
            <img src={GitLogo} className="w-100" alt="Dividend Global" />
          </div>
        </div>
        <div className="header__center">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input type="text" className="" placeholder="Search anything..." />
        </div>
        <div className="header__right">
          <div className="header__option">
            <IconButton>
              <AppsIcon />
            </IconButton>
          </div>
          <div className="header__option">
            <IconButton>
              <NotificationsActiveIcon />
            </IconButton>
          </div>
          <div className="header__info">
            <Avatar />
            <h4 className="title-case">
              {" "}
              {user?.firstname} {user?.lastname} <br />
              <span className="summary__label font-9">
                {user?.role === "user" ? "Investor" : "Administrator"}
              </span>
            </h4>

            <IconButton
              onClick={() => {
                localStorage.removeItem("userInfo");
                history.push("/");
              }}>
              <LogoutIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
