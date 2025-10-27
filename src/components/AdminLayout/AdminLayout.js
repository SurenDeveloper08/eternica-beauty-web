import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout, clearAuthError } from "../../redux/actions/userActions";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import Logo from '../../assets/white-logo.png';
import toast, { Toaster } from "react-hot-toast";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  ViewCarousel as ViewCarouselIcon,
  Hub as HubIcon,
  Stars as StarsIcon,
  Mode as ModeIcon,
  Info as InfoIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import "./AdminLayout.css";
const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { loading, error, isAuthenticated, user } = useSelector(state => state.authState)

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    dispatch(logout);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (error) {
      toast.dismiss();
      toast.error(error, { id: 'auth-error' });
      dispatch(clearAuthError);
    }
  }, [error, isAuthenticated, dispatch, navigate])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-wrapper")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="sidebar"
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sidebar-header">
              {/* <h3>Eternica Beauty</h3> */}
              <img src={Logo} alt="logo" style={{ width: "80%", height: "auto", marginRight: "10px" }} />
              <CloseIcon className="close-icon d-md-none" onClick={toggleSidebar} />
            </div>

            <ul className="menu-list">
              <li>
                <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
                  <DashboardIcon fontSize="small" /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "active" : ""}>
                  <ShoppingCartIcon fontSize="small" /> Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/products" className={({ isActive }) => isActive ? "active" : ""}>
                  <InventoryIcon fontSize="small" /> Products</NavLink>
              </li>
              <li>
                <NavLink to="/admin/categories" className={({ isActive }) => isActive ? "active" : ""}>
                  <CategoryIcon fontSize="small" /> Categories</NavLink>
              </li>
              <li>
                <NavLink to="/admin/slider" className={({ isActive }) => isActive ? "active" : ""}>
                  <ViewCarouselIcon fontSize="small" /> Slider</NavLink>
              </li>
              <li>
                <NavLink to="/admin/topcat" className={({ isActive }) => isActive ? "active" : ""}>
                  <HubIcon fontSize="small" /> Top Category</NavLink>
              </li>
              <li>
                <NavLink to="/admin/highlights" className={({ isActive }) => isActive ? "active" : ""}>
                  <StarsIcon fontSize="small" /> Highlights </NavLink>
              </li>
              <li>
                <NavLink to="/admin/blogs" className={({ isActive }) => isActive ? "active" : ""}>
                  <ModeIcon fontSize="small" /> Blog </NavLink>
              </li>
              <li>
                <NavLink to="/admin/page/about" className={({ isActive }) => isActive ? "active" : ""}>
                  <InfoIcon fontSize="small" /> About </NavLink>
              </li>
              <li>
                <NavLink to="/admin/home" className={({ isActive }) => isActive ? "active" : ""}>
                  <HomeIcon fontSize="small" /> Home </NavLink>
              </li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Section */}
      <div className="main-section">
        <div className="top-navbar">
          <div className="d-flex align-items-center">
            <MenuIcon className="menu-icon d-md-none" onClick={toggleSidebar} />
            <h4 className="mb-0 ms-2">Admin Dashboard</h4>
          </div>
          <div className="profile-wrapper" onClick={toggleDropdown}>
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                  className="logout-btn"
                >
                  <LogoutIcon fontSize="small" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <motion.main
          className="content p-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;
