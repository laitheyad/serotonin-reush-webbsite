import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import Login from "components/Login.js";
let logval = localStorage.getItem("isLoggedIn");
let dashboardRoutes = [];
if (logval !== null) {
  console.log("inside");
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
      name: "𝘔𝘦𝘢𝘭𝘴 𝘚𝘦𝘵𝘵𝘪𝘯𝘨",
      icon: "nc-icon nc-paper-2",
      component: Typography,
      layout: "/admin",
    },
    {
      path: "/icons",
      name: "Icons",
      icon: "nc-icon nc-atom",
      component: Icons,
      layout: "/admin",
    },

    {
      path: "/notifications",
      name: "Notifications",
      icon: "nc-icon nc-bell-55",
      component: Notifications,
      layout: "/admin",
    },
  ];
} else {
  dashboardRoutes = [
    {
      path: "/login",
      name: "Login",
      icon: "nc-bank nc-circle-09",
      component: Login,
      layout: "/admin",
    },
  ];
}

export default dashboardRoutes;
