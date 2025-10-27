import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { Button } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import { Edit, Delete, Add } from "@mui/icons-material";
import ActiveSwitch from "../../../components/ActiveSwitch/ActiveSwitch";
import DataTable from "../../../components/Table/DataTable";
import SearchFilterBar from "../../../components/Table/SearchFilterBar";
import PaginationControl from "../../../components/Table/PaginationControl";
import { getAdminSubCategories, deleteSubCategory, toggleSubCategoryActive } from "../../../redux/actions/categoryActions"
import { clearSubCategoryDeleted, clearSubCategoryUpdated, clearError } from '../../../redux/slices/categorySlice'
import ConfirmToast from "../components/ConfirmToast";
const SubCategoryList = () => {

    const { subCategories = [], loading = true, error } = useSelector(state => state.categoriesState);
    const { isSubCategoryDeleted, isSubCategoryUpdated } = useSelector(state => state.categoryState);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 5;

    useEffect(() => {
        dispatch(getAdminSubCategories())
    }, [dispatch, error]);

    useEffect(() => {
        if (isSubCategoryDeleted) {
            toast.success("Sub Category deleted successfully!");
            dispatch(clearSubCategoryDeleted());
            dispatch(getAdminSubCategories());
        }
        else if (isSubCategoryUpdated) {
            toast.success("Stataus Updated successfully!");
            dispatch(clearSubCategoryUpdated());
            dispatch(getAdminSubCategories());
        }
    }, [isSubCategoryDeleted, isSubCategoryUpdated, dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const toggleStatus = (cid, scid) => {
        dispatch(toggleSubCategoryActive(cid, scid));
    };

    const filtered = subCategories.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
            filter === "All" ||
            (filter === "Active" && p.status) ||
            (filter === "Inactive" && !p.status);
        return matchesSearch && matchesFilter;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const handleEdit = (cid, scid) => {
        navigate(`/admin/subcategory/${cid}/${scid}`);
    };

    const handleDelete = (cid, scid) => {
        ConfirmToast({
            message: "Are you sure you want to delete this sub category?",
            onConfirm: () => dispatch(deleteSubCategory(cid, scid)),
        });
    };
    const columns = ["#", "Category Name", "Slug", "Status", "Actions"];

    const renderRow = (c, i) => (
        <tr key={c._id}>
            <td>{i + 1}</td>
            <td>{c.name}</td>
            <td>{c.categoryName}</td>
            <td><ActiveSwitch checked={c.isActive} onChange={() => toggleStatus(c.categoryId, c._id)} /></td>
            <td>
                <div className="d-flex justify-content-center gap-2">
                    <Button size="sm" variant="warning" onClick={() => handleEdit(c.categoryId, c._id)} ><Edit /></Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(c.categoryId, c._id)}><Delete /></Button>
                </div>
            </td>
        </tr>
    );

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-4">Sub Category Management</h4>
                <Button
                    variant="success"
                    onClick={() => navigate("/admin/subcategory/add")}
                >
                    <Add className="me-2" /> Add New
                </Button>
            </div>

            <SearchFilterBar
                searchTerm={search}
                setSearchTerm={setSearch}
                placeholder="Search category..."
                filterValue={filter}
                setFilterValue={setFilter}
                filterOptions={["Active", "Inactive"]}
            />

            <DataTable columns={columns} data={paginated} renderRow={renderRow} />
            <PaginationControl totalPages={totalPages} currentPage={page} onPageChange={setPage} />
     
        </>
    );
};

export default SubCategoryList;
