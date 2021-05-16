import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import Login from "components/Login.js";
import Register from "components/Register";
import Approval from "views/Approve.js";
import Suggettions from "views/suggestions.js";

let logval = localStorage.getItem("isLoggedIn");
let dashboardRoutes = [];
if (logval !== null) {
  let status = localStorage.getItem("isCustomer");
  dashboardRoutes = [
    {
      path: "/dashboard",
      name: "𝘏𝘰𝘮𝘦",
      icon: "nc-icon nc-bank",
      component: Dashboard,
      layout: "/admin",
    },
    {
      path: "/user",
      name: " 𝘜𝘴𝘦𝘳 𝘗𝘳𝘰𝘧𝘪𝘭𝘦",
      icon: "nc-icon nc-circle-09",
      component: UserProfile,
      layout: "/admin",
    },
    {
      path: "/table",
      name: " 𝘔𝘦𝘢𝘭𝘴 𝘔𝘦𝘯𝘶",
      icon: "nc-icon nc-notes",
      component: TableList,
      layout: "/admin",
    },
    {
      path: "/typography",
      name: "Common",
      icon: "nc-icon nc-paper-2",
      component: Typography,
      layout: "/admin",
    },
    {
      path: "/suggettions",
      name: "Suggettions",
      icon: "nc-icon nc-zoom-split",
      component: Suggettions,
      layout: "/admin",
    },
    // {
    //   path: "/icons",
    //   name: "Icons",
    //   icon: "nc-icon nc-atom",
    //   component: Icons,
    //   layout: "/admin",
    // },

    // {
    //   path: "/notifications",
    //   name: "Notifications",
    //   icon: "nc-icon nc-bell-55",
    //   component: Notifications,
    //   layout: "/admin",
    // },
  ];
  if (status !== "Customer")
    dashboardRoutes.push({
      path: "/Approval",
      name: "Approve",
      icon: "nc-icon nc-check-2",
      component: Approval,
      layout: "/admin",
    });
} else {
  dashboardRoutes = [
    {
      path: "/login",
      name: "Login",
      icon: "nc-bank nc-circle-09",
      component: Login,
      layout: "/admin",
    },
    {
      path: "/register",
      name: "Register",
      icon: "nc-bank nc-circle-09",
      component: Register,
      layout: "/admin",
    },
  ];
}

export default dashboardRoutes;
