import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "./redux/actions/userActions";

const useTokenExpiryCheck = () => {
  const { user } = useSelector(state => state.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (user?.token) {
        const decoded = jwtDecode(user.token);
        if (decoded.exp * 1000 < Date.now()) {
          dispatch(logout());
          window.location.href = "/login";
        }
      }
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [user, dispatch]);
};

export default useTokenExpiryCheck;
