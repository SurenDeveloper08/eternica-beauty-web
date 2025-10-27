import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Edit, Delete, Add } from "@mui/icons-material";
import DataTable from "../../../components/Table/DataTable";
import SearchFilterBar from "../../../components/Table/SearchFilterBar";
import PaginationControl from "../../../components/Table/PaginationControl";
import ActiveSwitch from "../../../components/ActiveSwitch/ActiveSwitch";
import toast, { Toaster } from 'react-hot-toast';
import { getAdminSliders, toggleSliderActive, deleteSlider } from "../../../redux/actions/sliderActions";
import { clearSliderUpdated, clearError, clearSliderDeleted } from '../../../redux/slices/sliderSlice';
import ConfirmToast from "../components/ConfirmToast";
import { useDispatch, useSelector } from "react-redux";

const SliderList = () => {
    const { sliders = [], loading = true, error: sliderError } = useSelector(state => state.slidersState);
    const { isSliderDeleted, isSliderUpdated, error } = useSelector(state => state.sliderState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 5;

    useEffect(() => {
        dispatch(getAdminSliders())
    }, [dispatch]);

    useEffect(() => {
        if (isSliderDeleted) {
            toast.success("Category deleted successfully!");
            dispatch(clearSliderDeleted());
            dispatch(getAdminSliders());
        }
        else if (isSliderUpdated) {
            toast.success("Stataus Updated successfully!");
            dispatch(clearSliderUpdated());
            dispatch(getAdminSliders());
        }
    }, [isSliderDeleted, isSliderUpdated, dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        else if (sliderError) {
            toast.error(sliderError);
            dispatch(clearError());
        }
    }, [error, sliderError, dispatch]);

    const toggleStatus = (id) => {
        dispatch(toggleSliderActive(id));
    };

    const handleDelete = (id) => {
        ConfirmToast({
            message: "Are you sure you want to delete this sub category?",
            onConfirm: () => dispatch(deleteSlider(id)),
        });
    };

    const filtered = sliders.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
            filter === "All" ||
            (filter === "Active" && p.isActive) ||
            (filter === "Inactive" && !p.isActive);
        return matchesSearch && matchesFilter;
    });

    // Pagination
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const handleEdit = (id) => {
        navigate(`/admin/slider/${id}`);
    };

    const columns = ["#", "Image", "Name", "Status", "Actions"];

    const renderRow = (p, i) => (
        <tr key={p._id}>
            <td>{(page - 1) * perPage + i + 1}</td>
            <td>
                <img
                    src={p.image}
                    alt={p.name}
                    className="cat-img"
                />
            </td>
            <td>{p.name}</td>
            <td>
                <ActiveSwitch
                    checked={p.isActive}
                    onChange={() => toggleStatus(p._id)}
                />
            </td>
            <td>
                <div className="d-flex justify-content-center gap-2">
                    <Button size="sm" variant="warning" onClick={() => handleEdit(p._id)}>
                        <Edit fontSize="small" />
                    </Button>
                    <Button size="sm" variant="danger">
                        <Delete fontSize="small" onClick={() => handleDelete(p._id)} />
                    </Button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="container-fluid p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-4">Slider Management</h4>
                <Button
                    variant="success"
                    onClick={() => navigate("/admin/slider/add")}
                >
                    <Add className="me-2" /> Add New
                </Button>
            </div>

            <SearchFilterBar
                searchTerm={search}
                setSearchTerm={setSearch}
                placeholder="Search slider..."
                filterValue={filter}
                setFilterValue={setFilter}
                filterOptions={["Active", "Inactive"]}
            />

            <DataTable columns={columns} data={paginated} renderRow={renderRow} />
            <PaginationControl
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
            />

        </div>
    );
};

export default SliderList;
