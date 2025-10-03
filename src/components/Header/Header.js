import React, { useState } from "react";
import { Link } from 'react-router-dom';
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
                                        <Link className="dropdown-item" to="/Carrier-Base-Oils">
                                            Carrier & Base Oils
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/Essential-Oils">
                                            Essential Oils
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/Fragrance-Oils">
                                            Fragrance Oils
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/Massage-Oils">
                                            Massage Oils
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/Wipes-Dispensers">
                                            Wipes & Dispensers
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                 <Link to="/contact" className="nav-link px-3 text-dark fw-bold">Contact Us</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/about" className="nav-link px-3 text-dark fw-bold">About Us</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="d-flex align-items-center">
                       <Link to="/cart" className="text-dark position-relative" aria-label="View cart">
                            <ShoppingBagIcon fontSize="large" />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                4
                                <span className="visually-hidden">items in cart</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;
