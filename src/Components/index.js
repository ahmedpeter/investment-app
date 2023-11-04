import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Reset from "./Auth/Reset";
import Header from "./Builder/Header";
import Widgets from "./widgets/Widgets";
import Dashboard from "./Dashboard/Dashboard";
import Deposits from "./Pages/Deposits";
import Landing from "./Pages/Landing";
import Profile from "./Pages/UserProfile";
import Plans from "./Pages/Plans";
// import Loans from "./Pages/Loans";
// import Accounts from "./Pages/Accounts";
import InvestorDetails from "./Pages/InvestorDetails";
// import CustomerStatement from "./Pages/CustomerStatement";
import Sidebar from "./Builder/Sidebar";
// import Investors from "./Pages/Investors";
import Investors from "./Pages/Investors";
import Administrators from "./Pages/Administrators";
import CreateAdministrator from "./Pages/CreateAdministrator";
import "react-alice-carousel/lib/alice-carousel.css";
// import { useStateValue } from "../Util/StateProvider";

// function setToken(userToken) {
//   localStorage.setItem('accessToken', JSON.stringify(userToken));
// }

function getToken() {
  const tokenString = localStorage.getItem("accessToken");

  const userToken = JSON.parse(tokenString);
  // userToken);
  return userToken?.token;
}

const getUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  return user?.user.email;
};

function Application() {
  // const [token, setToken] = useState();

  // const token = getToken();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <Router>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/account/investor/new" exact>
        <Register />
      </Route>

      <Route path="/password-reset" exact>
        <Reset />
      </Route>
      <Route path="/app/">
        <div className="container">
          <Header />
          <Sidebar />
          {/* <Widgets /> */}

          <Switch>
            <Route path="/app/dashboard" exact>
              <Dashboard />
            </Route>
            <Route path="/app/investor/deposit" exact>
              <Deposits />
            </Route>
            <Route path="/app/profile/:id" exact>
              <Profile />
            </Route>
            <Route path="/app/accounts/investors" exact>
              <Investors />
            </Route>
            <Route path="/app/accounts/admins" exact>
              <Administrators />
            </Route>
            <Route path="/app/account/:id" exact>
              <InvestorDetails />
            </Route>
            <Route path="/app/plans" exact>
              <Plans />
            </Route>
            <Route path="/app/admin/new" exact>
              <CreateAdministrator />
            </Route>
            {/* <Route path="/app/new-loan" exact>
              <NewLoan />
            </Route>
            <Route path="/app/loans" exact>
              <Loans />
            </Route>
            <Route path="/app/accounts" exact>
              <Accounts />
            </Route>
            <Route path="/app/account/:id" exact>
              <AccountDetails />
            </Route>
            <Route path="/app/account/:id/statement" exact>
              <CustomerStatement />
            </Route>
            <Route path="/app/create-admin" exact>
              <Administrator />
            </Route> */}
          </Switch>
        </div>
      </Route>
    </Router>
  );
}

export default Application;
