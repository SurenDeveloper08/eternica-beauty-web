import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Badge } from "react-bootstrap";
import { Visibility, Edit, Delete, Add } from "@mui/icons-material";
import DataTable from "../../../components/Table/DataTable";
import SearchFilterBar from "../../../components/Table/SearchFilterBar";
import PaginationControl from "../../../components/Table/PaginationControl";
import ActiveSwitch from "../../../components/ActiveSwitch/ActiveSwitch";
import toast, { Toaster } from 'react-hot-toast';
import { getAdminHighlights, deleteProduct, toggleHighlightActive } from "../../../redux/actions/productActions";
import { clearProductDeleted, clearProductUpdated, clearError } from '../../../redux/slices/productSlice';
import ConfirmToast from "../components/ConfirmToast";
import { useDispatch, useSelector } from "react-redux";
const ProductHighlights = () => {
    const { products = [], loading = true, error: productError } = useSelector(state => state.productsState);
    const { isProductDeleted, isProductUpdated, error } = useSelector(state => state.productState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 5;

    useEffect(() => {
        dispatch(getAdminHighlights())
    }, [dispatch]);

    useEffect(() => {
        if (isProductDeleted) {
            toast.success("Category deleted successfully!");
            dispatch(clearProductDeleted());
            dispatch(getAdminHighlights());
        }
        else if (isProductUpdated) {
            toast.success("Stataus Updated successfully!");
            dispatch(clearProductUpdated());
            dispatch(getAdminHighlights());
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

    const toggleStatus = (id) => {
        dispatch(toggleHighlightActive(id));
    };

    const handleDelete = (id) => {
        ConfirmToast({
            message: "Are you sure you want to delete this sub category?",
            onConfirm: () => dispatch(deleteProduct(id)),
        });
    };

    const filtered = products?.filter(
        (p) =>
            p.productId?.productName?.toLowerCase().includes(search.toLowerCase()) &&
            (filter === "All" || p.category === filter)
    );

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const handleEdit = (id) => {
        navigate(`/admin/highlights/${id}`);
    };
    const columns = ["#", "Image", "Name", "section", "Status", "Price", "Stock", "Actions"];
    const renderRow = (p, i) => (
        <tr key={p.id}>
            <td>{i + 1}</td>
            <td><img src={p.productId.image} className="cat-img" alt="" /></td>
            <td>{p.productId.productName}</td>
            <td>{p.category}</td>
            <td><ActiveSwitch checked={p.isActive} onChange={() => toggleStatus(p._id)} /></td>
            <td>{p.price}</td>
            <td><Badge bg={p.stock > 10 ? "success" : "warning"}>{p.productId.stock}</Badge></td>
            <td>
                <div className="d-flex justify-content-center gap-2">
                    <Button size="sm" variant="warning" onClick={() => handleEdit(p._id)}><Edit /></Button>
                    <Button size="sm" variant="danger"><Delete /></Button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="container-fluid p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-4">Product Highlights</h4>
                <Button
                    variant="success"
                    onClick={() => navigate("/admin/highlights/add")}
                >
                    <Add className="me-2" /> Add New
                </Button>
            </div>
            <SearchFilterBar
                searchTerm={search}
                setSearchTerm={setSearch}
                filterValue={filter}
                setFilterValue={setFilter}
                filterOptions={["trending", "favourite"]}
                placeholder="Search product..."
            />

            <DataTable columns={columns} data={paginated} renderRow={renderRow} />
            <PaginationControl totalPages={totalPages} currentPage={page} onPageChange={setPage} />

        </div>
    );
};

export default ProductHighlights;
