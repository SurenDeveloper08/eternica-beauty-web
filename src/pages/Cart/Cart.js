import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import DeleteIcon from '@mui/icons-material/Delete';
import Meta from "../../utils/Meta";
import { removeFromCart } from "../../redux/slices/cartSlice";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cartState);
    // const [cartItems, setCartItems] = useState([
    //     {
    //         id: 1,
    //         name: "White Ginger Lily Oil",
    //         price: 25,
    //         image: Oil,
    //     },
    //     {
    //         id: 2,
    //         name: "Biodegradable Gym Wipes",
    //         price: 15,
    //         image: wipes,
    //     },
    // ]);

    const handleRemove = (id) => {
     dispatch(removeFromCart(id));
    };

    return (
        <>
            <Meta
                title={"Cart - Eternica Beauty"}
                description={"Buy your required products from Eternica Beauty. Review your products and proceed to a secure checkout for delivery across the UAE and Middle East."}
                keywords={"skincare, beauty, oils, wipes, dispensers"}
                canonical="https://eternicabeauty.com/contact"
            />
            <div className="container py-5" >
                <h2 className="fw-bold mb-4 text-center">Your Cart</h2>

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
                                <img
                                    src={item.image}
                                    alt={item.productName}
                                    className="rounded mb-2 mb-md-0"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                />

                                <div className="text-center text-md-start flex-fill px-md-3">
                                    <h6 className="fw-semibold">{item.productName}</h6>
                                </div>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleRemove(item._id)}
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
                {cartItems.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="d-flex flex-column align-items-end mt-4"
                    >
                        <button className="btn btn-lg mt-3 px-4 text-white" style={{ background: "#4C348C", borderRadius: "0.325rem" }} onClick={() => navigate("/checkout")}>
                            Proceed to Checkout
                        </button>
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default Cart;
