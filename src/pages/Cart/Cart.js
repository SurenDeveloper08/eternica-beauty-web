import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DeleteIcon from '@mui/icons-material/Delete';
import Oil from '../../assets/oil.png'
import wipes from '../../assets/black.png'
const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "White Ginger Lily Oil",
            price: 25,
            image: Oil,
        },
        {
            id: 2,
            name: "Biodegradable Gym Wipes",
            price: 15,
            image: wipes,
        },
    ]);

    const handleRemove = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="container py-5">
            <h2 className="fw-bold mb-4 text-center">Your Cart</h2>

            {/* Cart Items */}
            <AnimatePresence>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="d-flex flex-column flex-md-row align-items-center justify-content-between p-3 mb-3 border rounded bg-white"
                        >
                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="rounded mb-2 mb-md-0"
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                            />

                            {/* Name + Price */}
                            <div className="text-center text-md-start flex-fill px-md-3">
                                <h6 className="fw-semibold">{item.name}</h6>
                                {/* <p className="text-muted mb-0">${item.price.toFixed(2)}</p> */}
                            </div>

                            {/* Remove */}
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleRemove(item.id)}
                            >
                                <DeleteIcon fontSize="small" />
                            </button>
                        </motion.div>
                    ))
                ) : (
                    <motion.p
                        className="text-center text-muted"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Your cart is empty.
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Cart Total */}
            {cartItems.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="d-flex flex-column align-items-end mt-4"
                >
                    {/* <h5 className="fw-bold">Total: ${total.toFixed(2)}</h5> */}
                    <button className="btn btn-lg mt-3 px-4 text-white" style={{ background: "#4C348C",borderRadius:"0.325rem" }} onClick={() => navigate("/checkout")}>
                        Proceed to Checkout
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default Cart;
