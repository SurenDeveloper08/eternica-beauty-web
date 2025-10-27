import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Button, Row, Col, Form as BootstrapForm } from "react-bootstrap";
import { Add, Delete, CloudUpload } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import SEOFields from "../SEOForm/SEOForm";
import { createNewProduct, updateProduct, getAdminProduct } from "../../../../redux/actions/productActions";
import { getAdminActiveCategories, getAdminActiveSubCategories } from "../../../../redux/actions/categoryActions";
import { clearError, clearProductCreated, clearProductUpdated } from "../../../../redux/slices/productSlice";
const ProductForm = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const { subCategories = [], categories = [] } = useSelector(state => state.categoriesState);
    const { isProductCreated, isProductUpdated, product, error } = useSelector(state => state.productState);
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(null);
    const [removedGallery, setRemovedGallery] = useState([]);
    const [galleryPreviews, setGalleryPreviews] = useState([]);

    useEffect(() => {
        dispatch(getAdminActiveCategories());
    }, [dispatch, error]);

    useEffect(() => {
        if (productId) {
            dispatch(getAdminProduct(productId))
        }
    }, [productId])

    const handleCategoryChange = async (categoryId, setFieldValue) => {
        setFieldValue("category", categoryId);
        setFieldValue("subCategory", "");
        dispatch(getAdminActiveSubCategories(categoryId));
    };

    const [initialValues, setInitialValues] = useState({
        productName: "",
        category: "",
        subCategory: null,
        description: "",
        price: "",
        oldPrice: "",
        deliveryDays: "",
        stock: "",
        image: null,
        images: [],
        specifications: [{ key: "", value: "" }],
        features: [""],
        whyChoose: [""],
        instructions: [""],
        seo: { metaTitle: "", metaDescription: "", metaKeywords: "", canonicalUrl: "" },
    });

    useEffect(() => {

        if (productId && product?.slug === productId) {
            setInitialValues({
                ...initialValues,
                ...product,
                image: null,
                images: [],
                specifications: product.specifications || [{ key: "", value: "" }],

                // FIX: Convert any objects in these arrays into strings
                features: product.features
                    ? product.features.map((f) =>
                        typeof f === "object" ? `${f.key || f.value || ""}` : f
                    )
                    : [""],

                whyChoose: product.whyChoose
                    ? product.whyChoose.map((w) =>
                        typeof w === "object" ? `${w.key || w.value || ""}` : w
                    )
                    : [""],

                instructions: product.instructions
                    ? product.instructions.map((i) =>
                        typeof i === "object" ? `${i.key || i.value || ""}` : i
                    )
                    : [""],
            });
            const imageFiles = (product.images || []).map(img => img.image);
            setImagePreview(product.image);
            setGalleryPreviews(imageFiles);

            if (product.category) handleCategoryChange(product.category, () => { });
        }
    }, [product]);

    useEffect(() => {
        if (isProductCreated) {
            dispatch(clearProductCreated());
            clearForm();
            toast.success("added successfully!");
            navigatePage();
        }

        if (isProductUpdated) {
            dispatch(clearProductUpdated());
            clearForm();
            toast.success("updated successfully!");
            navigatePage();
        }

        if (error) {
            dispatch(clearError());
            toast.error(`${error}`);
        }

    }, [isProductCreated, isProductUpdated, error, navigate, dispatch]);

    const clearForm = () => {
        setInitialValues({
            productName: "",
            category: "",
            subCategory: "",
            description: "",
            price: "",
            oldPrice: "",
            deliveryDays: "",
            stock: 10,
            image: null,
            images: [],
            specifications: [{ key: "", value: "" }],
            features: [""],
            whyChoose: [""],
            instructions: [""],
            seo: { metaTitle: "", metaDescription: "", metaKeywords: "", canonicalUrl: "" },
        });
        setImagePreview(null);
        setGalleryPreviews([]);
        setRemovedGallery([]);
    };

    const navigatePage = () => {
        setTimeout(() => {
            navigate("/admin/products");
        }, 2500);
    }

    const handleImageChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setFieldValue("image", file);
        }
    };

    const handleGalleryChange = (e, setFieldValue, values) => {
        const newFiles = Array.from(e.target.files || []);
        const existingFiles = values.images || [];
        const updatedFiles = [...existingFiles, ...newFiles];
        setFieldValue("images", updatedFiles);
        setGalleryPreviews((prev) => [
            ...prev,
            ...newFiles.map((file) => URL.createObjectURL(file)),
        ]);
    };

    const validationSchema = Yup.object().shape({
        productName: Yup.string().required("Required"),
        category: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        image: productId && imagePreview
            ? Yup.mixed().nullable()
            : Yup.mixed().required("Image is required"),
        images: productId && galleryPreviews && galleryPreviews.length > 0
            ? Yup.mixed().nullable()
            : Yup.array()
                .of(Yup.mixed().required("Image file is required"))
                .min(1, "At least one gallery image is required"),
        specifications: Yup.array().of(
            Yup.object().shape({
                key: Yup.string().required("key required"),
                value: Yup.string().required("Value required"),
            })
        ),
        features: Yup.array()
            .of(Yup.string().required("Feature cannot be empty"))
            .min(1, "At least one feature is required"),

        whyChoose: Yup.array()
            .of(Yup.string().required("Reason cannot be empty"))
            .min(1, "At least one reason is required"),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const formData = new FormData();
            if (values.image) formData.append("image", values.image);
            values.images.forEach((file) => formData.append("images", file));
            removedGallery.forEach((imgUrl) => {
                formData.append("removedImages", JSON.stringify(imgUrl))
            });
            Object.keys(values).forEach((key) => {
                if (!["image", "images", "seo"].includes(key)) {
                    formData.append(key, JSON.stringify(values[key]));
                } else if (key === "seo") {
                    Object.keys(values.seo).forEach((seoKey) =>
                        formData.append(`seo[${seoKey}]`, values.seo[seoKey])
                    );
                }
            });

            if (productId) {
                dispatch(updateProduct(productId, formData));
            } else {
                dispatch(createNewProduct(formData));
            }
        } catch (error) {
            console.error(error);
            toast.error("❌ Failed to save product.");
        }
    };

    return (
        <motion.div
            className="container py-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h4 className="fw-bold mb-4 text-center">{productId ? "Edit Product" : "Add New Product"}</h4>

            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <Row className="g-4">
                            {/* Product Name */}
                            <Col md={12}>
                                <BootstrapForm.Label>Product Name *</BootstrapForm.Label>
                                <Field name="productName" className="form-control" placeholder="Enter product name" value={values.productName} />
                                <ErrorMessage name="productName" component="div" className="text-danger small" />
                            </Col>

                            {/* Category */}
                            <Col md={6}>
                                <BootstrapForm.Label>Category *</BootstrapForm.Label>
                                <Field
                                    as="select"
                                    name="category"
                                    className="form-select"
                                    onChange={(e) => handleCategoryChange(e.target.value, setFieldValue)}
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat.slug}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="category" component="div" className="text-danger small" />
                            </Col>

                            {/* Subcategory */}
                            <Col md={6}>
                                <BootstrapForm.Label>Subcategory *</BootstrapForm.Label>
                                <Field as="select" name="subCategory" className="form-select">
                                    <option value="">Select subcategory</option>
                                    {subCategories.map((sub) => (
                                        <option key={sub._id} value={sub.slug}>
                                            {sub.name}
                                        </option>
                                    ))}
                                </Field>
                            </Col>

                            {/* Price, Old Price, Stock, Delivery */}
                            <Col md={3}><BootstrapForm.Label>Price (AED)</BootstrapForm.Label><Field type="number" name="price" className="form-control" /></Col>
                            <Col md={3}><BootstrapForm.Label>Old Price</BootstrapForm.Label><Field type="number" name="oldPrice" className="form-control" /></Col>
                            <Col md={3}><BootstrapForm.Label>Stock</BootstrapForm.Label><Field type="number" name="stock" className="form-control" /></Col>
                            <Col md={3}><BootstrapForm.Label>Delivery Days</BootstrapForm.Label><Field type="number" name="deliveryDays" className="form-control" /></Col>

                            {/* Description */}
                            <Col md={12}>
                                <BootstrapForm.Label>Description *</BootstrapForm.Label>
                                <Field as="textarea" rows="4" name="description" className="form-control" placeholder="Enter detailed description" />
                                <ErrorMessage name="description" component="div" className="text-danger small" />
                            </Col>

                            {/* Specifications */}
                            <Col md={12}>
                                <h5 className="mt-4 fw-bold">Specifications *</h5>
                                <FieldArray name="specifications">
                                    {({ push, remove, form }) => (
                                        <div>
                                            {form.values.specifications.map((spec, index) => (
                                                <div key={index} className="mb-3">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className="flex-grow-1">
                                                            <Field
                                                                name={`specifications.${index}.key`}
                                                                className="form-control"
                                                                placeholder="Key"
                                                            />
                                                            <ErrorMessage
                                                                name={`specifications.${index}.key`}
                                                                component="div"
                                                                className="text-danger small mt-1"
                                                            />
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <Field
                                                                name={`specifications.${index}.value`}
                                                                className="form-control"
                                                                placeholder="Value"
                                                            />
                                                            <ErrorMessage
                                                                name={`specifications.${index}.value`}
                                                                component="div"
                                                                className="text-danger small mt-1"
                                                            />
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="danger"
                                                            onClick={() => remove(index)}
                                                        >
                                                            <Delete />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}

                                            <Button
                                                type="button"
                                                variant="light"
                                                onClick={() => push({ key: "", value: "" })}
                                            >
                                                <Add /> Add Specification
                                            </Button>
                                        </div>
                                    )}
                                </FieldArray>
                            </Col>

                            {/* Features, Why Choose, Instructions */}
                            {["features", "whyChoose", "instructions"].map((field) => (
                                <Col md={12} key={field}>
                                    <h5 className="mt-4 fw-bold">{field === "whyChoose" ? "Why Choose" : field === "instructions" ? "Care Instructions" : "Key Features"}</h5>
                                    <FieldArray name={field}>
                                        {({ push, remove, form }) => (
                                            <div >
                                                {form.values[field].map((item, index) => (
                                                    <div key={index}>
                                                        <div key={index} className="d-flex align-items-center mb-2 gap-2">
                                                            <Field name={`${field}.${index}`} className="form-control" placeholder={`${field} ${index + 1}`} />
                                                            <Button type="button" variant="danger" onClick={() => remove(index)}><Delete /></Button>
                                                        </div>
                                                        <ErrorMessage
                                                            name={`${field}.${index}`}
                                                            component="div"
                                                            className="text-danger small mt-2"
                                                        />
                                                    </div>
                                                ))}
                                                <Button type="button" variant="light" onClick={() => push("")}><Add /> Add {field}</Button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </Col>
                            ))}

                            {/* Main Image */}
                            <Col md={6}>
                                <BootstrapForm.Label>Main Image *</BootstrapForm.Label>
                                <input type="file" accept="image/*" name="image" onChange={(e) => handleImageChange(e, setFieldValue)} className="form-control" />
                                <ErrorMessage name="image" component="div" className="text-danger small" />
                                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 rounded shadow-sm" style={{ width: "100px", height: "100px", objectFit: "cover" }} />}
                            </Col>

                            {/* Gallery Images */}
                            <Col md={6}>
                                <BootstrapForm.Label>Gallery Images *</BootstrapForm.Label>
                                <input type="file" multiple accept="image/*" name="images" onChange={(e) => handleGalleryChange(e, setFieldValue, values)} className="form-control" />
                                <ErrorMessage name="images" component="div" className="text-danger small" />
                                <div className="d-flex flex-wrap mt-2 gap-2">
                                    {galleryPreviews.map((img, i) => (
                                        <div key={i} className="position-relative">
                                            <img src={img} alt="Gallery" className="rounded shadow-sm" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                            <Button size="sm" variant="danger" className="position-absolute top-0 end-0" onClick={() => {
                                                setGalleryPreviews(prev => prev.filter((_, idx) => idx !== i));
                                                setRemovedGallery(prev => [...prev, img]);
                                                setFieldValue("images", values.images.filter((_, idx) => idx !== i));
                                            }}>×</Button>
                                        </div>
                                    ))}
                                </div>
                            </Col>

                            {/* SEO */}
                            <SEOFields values={values.seo} setFieldValue={setFieldValue} />

                            {/* Submit */}
                            <Col md={12} className="text-center mt-4">
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Button type="submit" variant="success" className="px-5 py-2 fw-bold">
                                        <CloudUpload className="me-2" /> {productId ? "Update Product" : "Add Product"}
                                    </Button>
                                </motion.div>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>

        </motion.div>
    );
};

export default ProductForm;
