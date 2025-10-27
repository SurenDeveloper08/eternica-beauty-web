import React, { useState, useEffect } from "react";
import { Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ActiveSwitch from "../../../components/ActiveSwitch/ActiveSwitch";
import { Edit, Delete, Add } from "@mui/icons-material";
import DataTable from "../../../components/Table/DataTable";
import SearchFilterBar from "../../../components/Table/SearchFilterBar";
import PaginationControl from "../../../components/Table/PaginationControl";
import toast, { Toaster } from 'react-hot-toast';
import { getAdminProducts, deleteProduct, toggleProductActive } from "../../../redux/actions/productActions";
import { clearProductDeleted, clearProductUpdated, clearError } from '../../../redux/slices/productSlice';
import ConfirmToast from "../components/ConfirmToast";
import { useDispatch, useSelector } from "react-redux";

const ProductList = () => {
    const { products = [], loading = true, error: productError } = useSelector(state => state.productsState);
    const { isProductDeleted, isProductUpdated, error } = useSelector(state => state.productState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [stockFilter, setStockFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 5;

    useEffect(() => {
        dispatch(getAdminProducts())
    }, [dispatch]);

    useEffect(() => {
        if (isProductDeleted) {
            toast.success("Category deleted successfully!");
            dispatch(clearProductDeleted());
            dispatch(getAdminProducts());
        }
        else if (isProductUpdated) {
            toast.success("Stataus Updated successfully!");
            dispatch(clearProductUpdated());
            dispatch(getAdminProducts());
        }
    }, [isProductDeleted, isProductUpdated, dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        else if (productError) {
            toast.error(productError);
            dispatch(clearError());
        }
    }, [error, productError, dispatch]);

    const toggleStatus = (slug) => {
        dispatch(toggleProductActive(slug));
    };

    const handleDelete = (id) => {
        ConfirmToast({
            message: "Are you sure you want to delete this sub category?",
            onConfirm: () => dispatch(deleteProduct(id)),
        });
    };

    const filtered = products?.filter(p => {
        const matchesSearch = p?.productName?.toLowerCase().includes(search.toLowerCase());
        const matchesStock =
            stockFilter === "All" ||
            (stockFilter === "InStock" && p.stock > 0) ||
            (stockFilter === "OutOfStock" && p.stock === 0);
        return matchesSearch && matchesStock;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const handleEdit = (id) => {
        navigate(`/admin/product/${id}`);
    };

    const columns = ["#", "Image", "Name", "Category", "Price", "Stock", "Status", "Actions"];
    const renderRow = (p, i) => (
        <tr key={p.id}>
            <td>{i + 1}</td>
            <td><img src={p.image} className="cat-img" alt="" /></td>
            <td>{p.productName}</td>
            <td>{p.category}</td>
            <td>{p.price}</td>
            <td> <Badge bg={p.stock <= 0 ? "danger" : p.stock > 10 ? "success" : "warning"}>
                {p.stock}
            </Badge></td>
            <td>
                <ActiveSwitch checked={p.isActive} onChange={() => toggleStatus(p.slug)} />
            </td>
            <td>
                <div className="d-flex justify-content-center gap-2">
                    <Button size="sm" variant="warning" onClick={() => handleEdit(p.slug)}><Edit /></Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(p.slug)}><Delete /></Button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="container-fluid p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-4">Products Management</h4>
                <Button
                    variant="success"
                    onClick={() => navigate("/admin/product/add")}
                >
                    <Add className="me-2" /> Add New Product
                </Button>
            </div>
            <SearchFilterBar
                searchTerm={search}
                setSearchTerm={setSearch}
                filterValue={stockFilter}
                setFilterValue={setStockFilter}
                filterOptions={["InStock", "OutOfStock"]}
                placeholder="Search product..."
            />
            <DataTable columns={columns} data={paginated} renderRow={renderRow} />
            <PaginationControl totalPages={totalPages} currentPage={page} onPageChange={setPage} />
 
        </div>
    );
};

export default ProductList;
