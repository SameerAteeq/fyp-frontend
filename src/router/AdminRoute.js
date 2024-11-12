// import { Routes, Route } from "react-router-dom";

// import Home from "../adminPanel/pages/Home";
// import AboutDashboard from "../adminPanel/pages/AboutDashboard";
// import Settings from "../adminPanel/pages/Settings";
// import Account from "../adminPanel/pages/Account";
// import UserFeedback from "../adminPanel/pages/UserFeedback";

// const AdminRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/home" element={<Home />} />
//       <Route path="/donors" element={<AboutDashboard />} />
//       <Route path="/recipients" element={<Settings />} />
//       <Route path="/account" element={<Account />} />
//       <Route path="/feedback" element={<UserFeedback />} />
//     </Routes>
//   );
// };

// export default AdminRoutes;

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLayout from "../adminPanel/AdminLayout";

const AdminRoute = ({ component: Component }) => {
  const user = useSelector((state) => state.storeReducer.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
};

export default AdminRoute;
