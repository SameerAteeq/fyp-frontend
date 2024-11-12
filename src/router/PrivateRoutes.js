import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, role }) => {
  const user = useSelector((state) => state.storeReducer.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!role.includes(user.role)) {
    return <Navigate to="/sign-in" />;
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin/" />;
  }

  return <Component />;
};

export default PrivateRoute;
