import React from "react";
import Transactions from "../Transactions/transactions";
import NavBar from "../Navbar/navbar";
import { Route, Switch } from "react-router-dom";
import WithdrawDeposit from "../WithdrawDeposit/WithdrawDeposit";
import MyProfile from "../Profile/MyProfile";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
const Dashboard = () => {
  const { isLoggedIn } = useSelector((state) => state.UserReducer);
  if (!isLoggedIn) return <Redirect to="/login" />;
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/dashboard/withdrawDeposit" component={WithdrawDeposit} />
        <Route path="/dashboard/myProfile" component={MyProfile} />

        <Transactions />
      </Switch>
    </React.Fragment>
  );
};

export default Dashboard;
