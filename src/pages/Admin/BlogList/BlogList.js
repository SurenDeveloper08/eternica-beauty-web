import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Edit, Delete, Add } from "@mui/icons-material";
import DataTable from "../../../components/Table/DataTable";
import SearchFilterBar from "../../../components/Table/SearchFilterBar";
import PaginationControl from "../../../components/Table/PaginationControl";
import ActiveSwitch from "../../../components/ActiveSwitch/ActiveSwitch";
import img from "../../../assets/Banner/WIPPES_BANNER.png";

const BlogList = () => {
    const navigate = useNavigate();
    const [sliders, setSliders] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [page, setPage] = useState(1);
    const perPage = 5;

    useEffect(() => {
        setSliders([
            { id: 1, name: "Lavender Oil Banner", status: true, image: img },
            { id: 2, name: "Coconut Oil Banner", status: false, image: img },
            { id: 3, name: "Gym Wipes Banner", status: false, image: img },
            { id: 4, name: "Massage Bed Banner", status: true, image: img },
            { id: 21, name: "Lavender Oil Banner", status: true, image: img },
            { id: 22, name: "Coconut Oil Banner", status: false, image: img },
            { id: 223, name: "Gym Wipes Banner", status: false, image: img },
            { id: 42, name: "Massage Bed Banner", status: true, image: img },
        ]);
    }, []);

    const toggleStatus = (id) => {
        setSliders((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: !item.status } : item
            )
        );
    };

    const filtered = sliders.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
            filter === "All" ||
            (filter === "Active" && p.status) ||
            (filter === "Inactive" && !p.status);
        return matchesSearch && matchesFilter;
    });

    // Pagination
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const handleEdit = (id) => {
        navigate(`/admin/blog/${id}`);
    };

    const columns = ["#", "Image", "Name", "Status", "Actions"];

    const renderRow = (p, i) => (
        <tr key={p.id}>
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
                    checked={p.status}
                    onChange={() => toggleStatus(p.id)}
                />
            </td>
            <td>
                <div className="d-flex justify-content-center gap-2">
                    <Button size="sm" variant="warning" onClick={() => handleEdit(p.id)}>
                        <Edit fontSize="small" />
                    </Button>
                    <Button size="sm" variant="danger">
                        <Delete fontSize="small" />
                    </Button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="container-fluid p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-4">Blog Management</h4>
                <Button
                    variant="success"
                    onClick={() => navigate("/admin/blog/add")}
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

export default BlogList;
