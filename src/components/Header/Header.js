import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Nav from "../TopNav/TopNav";
import SearchBar from "../SearchBar/SearchBar";
import {
    Box,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Logo from '../../assets/LOGO.png';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { getActiveCategoriesWithSubcategories } from "../../redux/actions/categoryActions"

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [openParent, setOpenParent] = useState(null);
    const dispatch = useDispatch();
    const { categories = [], loading = true, error } = useSelector(state => state.categoriesState);
    const { cartItems } = useSelector((state) => state.cartState);
    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleParentClick = (index) => {
        setOpenParent(openParent === index ? null : index);
    };

    useEffect(() => {
        dispatch(getActiveCategoriesWithSubcategories())
    }, [dispatch, error]);

    return (
        <header className="section-header border-bottom">
            <Nav />
            <div className="bg-white border-bottom py-2">
                <div className="container d-flex align-items-center justify-content-between">
                    {/* Mobile Menu Icon */}
                    <div className="d-md-none">
                        <IconButton onClick={toggleDrawer(true)}>
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </div>
                    <div className="header-logo">
                        <Link to="/">
                            <img src={Logo} alt="Site Logo" width="200" />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="d-none d-md-flex">
                        <ul className="nav">
                            {categories.map((category, catIndex) => {
                                const hasSub = category.subcategories && category.subcategories.length > 0;
                                return (
                                    <li
                                        key={catIndex}
                                        className={`nav-item ${hasSub ? "dropdown" : ""}`}
                                        onMouseEnter={() => hasSub && setActiveDropdown(catIndex)}
                                        onMouseLeave={() => hasSub && setActiveDropdown(null)}
                                    >
                                        <Link
                                            className={`nav-link px-3 text-dark fw-bold ${hasSub ? "dropdown-toggle" : ""}`}
                                            to={`/${category.slug}`}
                                            id={`navbarDropdown${catIndex}`}
                                            role="button"
                                            aria-expanded={hasSub && activeDropdown === catIndex ? "true" : "false"}
                                            style={{ textDecoration: "none" }}
                                        >
                                            {category.name}
                                        </Link>

                                        {hasSub && (
                                            <ul
                                                className={`dropdown-menu ${activeDropdown === catIndex ? "show" : ""}`}
                                                aria-labelledby={`navbarDropdown${catIndex}`}
                                            >
                                                {category.subcategories.map((sub, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            className="dropdown-item"
                                                            to={`/${category.slug}/${sub.slug}`}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}


                            <li className="nav-item">
                                <Link to='/contact' className="nav-link px-3 text-dark fw-bold">Contact Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/about' className="nav-link px-3 text-dark fw-bold">About Us</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="d-flex align-items-center">
                        <Link to="/cart" className="text-dark position-relative" aria-label="View cart">
                            <ShoppingBagIcon fontSize="large" />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartItems?.length}
                                <span className="visually-hidden">items in cart</span>
                            </span>
                        </Link>
                    </div>

                </div>
            </div>
            <div className="container d-md-none py-2">
                <SearchBar />
            </div>
            {/* Mobile Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 260 }} role="presentation">
                    <IconButton onClick={toggleDrawer(false)} sx={{ m: 1 }}>
                        <CloseIcon />
                    </IconButton>

                    <List>
                        {categories.map((category, catIndex) => (
                            <React.Fragment key={category._id || catIndex}>
                                <ListItemButton onClick={() => handleParentClick(catIndex)}>
                                    <ListItemText
                                        primary={category.name}
                                        primaryTypographyProps={{ fontWeight: "bold" }}
                                    />
                                    {category.subcategories?.length > 0 &&
                                        (openParent === catIndex ? <ExpandLess /> : <ExpandMore />)}
                                </ListItemButton>

                                {/* Submenu collapse */}
                                <Collapse in={openParent === catIndex} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {category.subcategories?.map((sub, subIndex) => (
                                            <ListItemButton
                                                key={subIndex}
                                                component={Link}
                                                to={`/${category.slug}/${sub.slug}`}
                                                sx={{ pl: 4 }}
                                                onClick={toggleDrawer(false)}
                                            >
                                                <ListItemText primary={sub.name} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        ))}

                        {/* Static Links */}
                        <ListItemButton component={Link} to="/contact" onClick={toggleDrawer(false)}>
                            <ListItemText primary="Contact Us" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/about" onClick={toggleDrawer(false)}>
                            <ListItemText primary="About Us" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
        </header>
    );
};

export default Header;
