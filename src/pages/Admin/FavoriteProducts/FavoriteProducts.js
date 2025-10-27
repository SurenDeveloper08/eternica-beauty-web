import React, { useState, useEffect } from "react";
import { Button, Badge } from "react-bootstrap";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import DataTable from "../../../components/Table/DataTable";
import SearchFilterBar from "../../../components/Table/SearchFilterBar";
import PaginationControl from "../../../components/Table/PaginationControl";
import ActiveSwitch from "../../../components/ActiveSwitch/ActiveSwitch";
import img from '../../../assets/Dispenser.png';

const TrendingProducts = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [page, setPage] = useState(1);
    const perPage = 5;

    useEffect(() => {
        setProducts([
            { id: 1, name: "Lavender Oil", category: "Oil", price: "AED 250", stock: 0, image: img },
            { id: 4, name: "Coconut Oil", category: "Oil", price: "AED 45", stock: 60, image: img },
            { id: 3, name: "Gym Wipes", category: "Wipes", price: "", stock: 8, image: img },
            { id: 14, name: "Lavender Oil", category: "Oil", price: "AED 250", stock: 12, image: img },
            { id: 42, name: "Coconut Oil", category: "Oil", price: "AED 45", stock: 60, image: img },
            { id: 34, name: "Gym Wipes", category: "Wipes", price: "AED 190", stock: 8, image: img },
            { id: 51, name: "Lavender Oil", category: "Oil", price: "AED 250", stock: 12, image: img },
            { id: 25, name: "Coconut Oil", category: "Oil", price: "AED 45", stock: 60, image: img },
            { id: 63, name: "Gym Wipes", category: "Wipes", price: "AED 190", stock: 8, image: img },
            { id: 71, name: "Lavender Oil", category: "Oil", price: "AED 250", stock: 12, image: img },
            { id: 32, name: "Coconut Oil", category: "Oil", price: "AED 45", stock: 60, image: img },
            { id: 53, name: "Gym Wipes", category: "Wipes", price: "AED 190", stock: 8, image: img },
        ]);
    }, []);

    const toggleStatus = (id) => {
        setProducts((prev) =>
            prev.map((cat) =>
                cat.id === id ? { ...cat, status: !cat.status } : cat
            )
        );
    };

    const filtered = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
            filter === "All" ||
            (filter === "Active" && p.status) ||
            (filter === "Inactive" && !p.status);
        return matchesSearch && matchesFilter;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const columns = ["#", "Image", "Name", "Category", "Status", "Price", "Stock", "Actions"];
    const renderRow = (p, i) => (
        <tr key={p.id}>
            <td>{i + 1}</td>
            <td><img src={p.image} className="cat-img" alt="" /></td>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td><ActiveSwitch checked={p.status} onChange={() => toggleStatus(p.id)} /></td>
            <td>{p.price}</td>
            <td><Badge bg={p.stock > 10 ? "success" : "warning"}>{p.stock}</Badge></td>
            <td>
                <div className="d-flex justify-content-center gap-2">
                    <Button size="sm" variant="info"><Visibility /></Button>
                    <Button size="sm" variant="warning"><Edit /></Button>
                    <Button size="sm" variant="danger"><Delete /></Button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="container-fluid p-3">
            <h4 className="fw-bold mb-4">Trending Products</h4>

            <SearchFilterBar
                searchTerm={search}
                setSearchTerm={setSearch}
                filterValue={filter}
                setFilterValue={setFilter}
                filterOptions={["Active", "Inactive"]}
                placeholder="Search product..."
            />

            <DataTable columns={columns} data={paginated} renderRow={renderRow} />
            <PaginationControl totalPages={totalPages} currentPage={page} onPageChange={setPage} />
        </div>
    );
};

export default TrendingProducts;
