import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Typography, Button, Drawer, List, ListItem, ListItemText, InputBase } from "@mui/material";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Nav from "../TopNav/TopNav";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; 
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
        { label: "Contact Us", href: "#contact-us" },
    ];
    return (
        <header className="section-header border-bottom">

            <Nav />
   
            <div className="bg-white border-bottom py-2">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="header-logo">
                        <a href="/eternica-beauty-web" aria-label="Home">
                            <img src={Logo} alt="Site Logo" width="200" />
                        </a>
                    </div>

                    <nav className="d-none d-md-flex">
                        <ul className="nav">

                            <li className="nav-item dropdown">
                                <a
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
                                <a href="/eternica-beauty-web/about" className="nav-link px-3 text-dark fw-bold">About Us</a>
                            </li>
                        </ul>
                    </nav>

                    <div className="d-flex align-items-center">
                        <a href="/eternica-beauty-web/cart" className="text-dark position-relative" aria-label="View cart">
                            <ShoppingBagIcon fontSize="large" />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                4
                                <span className="visually-hidden">items in cart</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;
