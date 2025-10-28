import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Visibility,
    Edit,
    Cancel,
    FilterList,
    Search,
} from "@mui/icons-material";
import {
    Table,
    Button,
    Form,
    InputGroup,
    Row,
    Col,
    Badge,
} from "react-bootstrap";
import DataTable from "../../../components/Table/DataTable";
import SearchFilterBar from "../../../components/Table/SearchFilterBar";
import PaginationControl from "../../../components/Table/PaginationControl";
import "./Order.css";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [page, setPage] = useState(1);
    const perPage = 5;

    // useEffect(() => {
    //     const mockOrders = [
    //         {
    //             id: "ORD001",
    //             OrderId: "ORD001",
    //             customer: "John Doe",
    //             date: "2025-10-01",
    //             total: "AED 120.00",
    //             status: "Pending",
    //         },
    //         {
    //             id: "ORD002",
    //             OrderId: "ORD002",
    //             customer: "Jane Smith",
    //             date: "2025-10-03",
    //             total: "",
    //             status: "Completed",
    //         },
    //         {
    //             id: "ORD003",
    //             OrderId: "ORD003",
    //             customer: "Mark Wilson",
    //             date: "2025-10-05",
    //             total: "AED 80.00",
    //             status: "Cancelled",
    //         },
    //     ];
    //     setOrders(mockOrders);
    // }, []);

    const filtered = orders.filter(
        (p) =>
            p.customer.toLowerCase().includes(search.toLowerCase()) &&
            (statusFilter === "All" || p.status === statusFilter)
    );

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const columns = ["Order ID", "Customer", "Date", "Total", "Status", "Actions"];

    const renderRow = (order, i) => (
        <tr key={order.id}>
            <td>{order.OrderId}</td>
            <td>{order.customer}</td>
            <td>{order.date}</td>
            <td>{order.total}</td>
            <td>
                <Badge
                    bg={
                        order.status === "Completed"
                            ? "success"
                            : order.status === "Pending"
                                ? "warning"
                                : "danger"
                    }
                >
                    {order.status}
                </Badge>
            </td>
            <td>
                <div className="d-flex justify-content-center gap-2">
                    <Button variant="info" size="sm">
                        <Visibility />
                    </Button>
                    <Button variant="warning" size="sm">
                        <Edit />
                    </Button>
                    <Button variant="danger" size="sm">
                        <Cancel />
                    </Button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="container-fluid p-3">
            <h4 className="fw-bold mb-4">Orders Management</h4>

            <SearchFilterBar
                searchTerm={search}
                setSearchTerm={setSearch}
                filterValue={statusFilter}
                setFilterValue={setStatusFilter}
                filterOptions={["Pending", "Completed", "Cancelled"]}
                placeholder="Search product..."
            />

            <DataTable columns={columns} data={paginated} renderRow={renderRow} />
            <PaginationControl totalPages={totalPages} currentPage={page} onPageChange={setPage} />
        </div>
    );
};

export default Order;
