import React, { useState, useEffect } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { Visibility, VisibilityOff, Lock, Email } from "@mui/icons-material";
import "./AdminLogin.css";

const AdminLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated, user } = useSelector(state => state.authState)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        }

        if (error) {
            toast.dismiss();
            toast.error(error, { id: 'auth-error' });
            dispatch(clearAuthError);
        }
    }, [error, isAuthenticated, dispatch, navigate])

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <section className="admin-login">

            <Container className="d-flex justify-content-center align-items-center vh-100">
                <motion.div
                    className="login-card p-5 rounded-4 shadow-lg bg-white text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h2
                        className="fw-bold mb-2"
                        style={{ color: "#4C348C" }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Admin Dashboard
                    </motion.h2>
                    <p className="text-muted mb-4">Login to manage your system</p>

                    <Form onSubmit={handleSubmit}>
                        {/* Email */}
                        <Form.Group className="mb-4 text-start">
                            <Form.Label className="fw-semibold">Email</Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-light border-0">
                                    <Email style={{ color: "#4C348C" }} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    placeholder="admin@example.com"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* Password */}
                        <Form.Group className="mb-4 text-start">
                            <Form.Label className="fw-semibold">Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-light border-0">
                                    <Lock style={{ color: "#4C348C" }} />
                                </InputGroup.Text>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <InputGroup.Text
                                    className="bg-light border-0"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <VisibilityOff style={{ color: "#4C348C" }} />
                                    ) : (
                                        <Visibility style={{ color: "#4C348C" }} />
                                    )}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        {/* Login Button */}
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                type="submit"
                                className="w-100 py-2 fw-semibold rounded-pill border-0"
                                style={{
                                    backgroundColor: "#4C348C",
                                    color: "#fff",
                                    fontSize: "1.1rem",
                                }}
                                disabled={loading}
                            >
                                Login
                            </Button>
                        </motion.div>
                    </Form>
                </motion.div>
            </Container>
        </section>
    );
};

export default AdminLogin;
