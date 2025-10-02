import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Typography, Button, Drawer, List, ListItem, ListItemText, InputBase } from "@mui/material";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Nav from "../TopNav/TopNav";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; // optional custom styles
import Logo from '../../assets/LOGO.png'
import SearchBar from "../SearchBar/SearchBar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = ({ width }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuLinks = [
        { label: "About Us", href: "#about-us" },
        // { label: "Our Products", href: "#products" },
        { label: "Contact Us", href: "#contact-us" },
    ];
    return (
        <header className="section-header border-bottom">

            {/* Top Info Bar */}
            <Nav />
            {/* menu bar desktop */}
            <div className="bg-white border-bottom py-2">
                <div className="container d-flex align-items-center justify-content-between">

                    {/* Left: Logo */}
                    <div className="header-logo">
                        <a href="/" aria-label="Home">
                            <img src={Logo} alt="Site Logo" width="200" />
                        </a>
                    </div>

                    {/* Center: Navigation */}
                    <nav className="d-none d-md-flex">
                        <ul className="nav">

                            {/* Dropdown for Products */}
                            <li className="nav-item dropdown">
                                <a
                                    // href="products"
                                    className="nav-link px-3 text-dark fw-bold dropdown-toggle"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ textDecoration: "none" }}
                                >
                                    Our Products
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <a className="dropdown-item" href="/Carrier-Oils-and-Base-Oils">
                                            Carrier & Base Oils
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/Essential-Oil">
                                            Essential Oils
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/Fragrance-Oil">
                                            Fragrance Oils
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/Massage-Oil">
                                            Massage Oils
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/Gym-Wipes">
                                            Wipes & Dispensers
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a href="contact" className="nav-link px-3 text-dark fw-bold">Contact Us</a>
                            </li>

                            <li className="nav-item">
                                <a href="about" className="nav-link px-3 text-dark fw-bold">About Us</a>
                            </li>
                        </ul>
                    </nav>


                    {/* Right: Search & Cart */}
                    <div className="d-flex align-items-center">
                        <a href="/cart" className="text-dark position-relative" aria-label="View cart">
                            <ShoppingBagIcon fontSize="large" />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                4
                                <span className="visually-hidden">items in cart</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            {/* <AppBar
                position="static"
                sx={{ bgcolor: "#fff", borderBottom: "1px solid #ddd", display: { xs: "flex", md: "none" } }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <IconButton
                        aria-label="Open menu"
                        onClick={toggleMobileMenu}
                        sx={{ color: "#4C348C" }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flex: 1, ml: 1 }}>
                        <SearchBar width="100%" />
                    </Box>
                </Toolbar>
            </AppBar> */}

            {/* Drawer Menu */}
            {/* <Drawer anchor="left" open={mobileOpen} onClose={toggleMobileMenu}>
                <Box sx={{ width: 250, bgcolor: "#fff", height: "100%" }} role="presentation">
                    <Box display="flex" justifyContent="flex-end" p={1}>
                        <IconButton onClick={toggleMobileMenu} sx={{ color: "#000" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <List>
                        {menuLinks.map((link) => (
                            <ListItem
                                button
                                component="a"
                                href={link.href}
                                key={link.label}
                                sx={{
                                    color: "#000",
                                    mb: 1,
                                    px: 2,
                                    py: 1.5,
                                    borderRadius: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    "&:hover": {
                                        bgcolor: "#4C348C",
                                        color: "#fff",
                                        "& .MuiSvgIcon-root": { color: "#fff" },
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={link.label}
                                    primaryTypographyProps={{
                                        fontWeight: "bold",
                                        fontSize: "1rem",
                                    }}
                                />
                                <ChevronRightIcon sx={{ mr: 2, fontSize: "1rem", color: "#4C348C" }} />
                            </ListItem>

                        ))}
                    </List>
                </Box>
            </Drawer> */}

        </header>
    );
};

export default Header;
