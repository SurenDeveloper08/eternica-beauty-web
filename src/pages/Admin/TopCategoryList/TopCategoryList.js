import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { Edit, Delete, Add } from "@mui/icons-material";
import DataTable from "../../../components/Table/DataTable";
import SearchFilterBar from "../../../components/Table/SearchFilterBar";
import PaginationControl from "../../../components/Table/PaginationControl";
import { getAdminMainCategories } from "../../../redux/actions/categoryActions"
import { clearSubCategoryDeleted, clearSubCategoryUpdated, clearError } from '../../../redux/slices/categorySlice'

const TopCategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mainCategories = [], loading = true, error } = useSelector(state => state.categoriesState);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    dispatch(getAdminMainCategories())
  }, [dispatch, error]);

  const filtered = mainCategories?.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleEdit = (id) => {
    navigate(`/admin/topcat/${id}`);
  };
  // Table Columns
  const columns = ["#", "Image", "Category", "Main Category"];

  const renderRow = (c, i) => (
    <tr key={c.id}>
      <td>{(page - 1) * perPage + i + 1}</td>
      <td>
        <img
          src={c.image}
          alt={c.name}
          className="cat-img"
        />
      </td>
      <td>{c.name}</td>
      <td>{c.category.name}</td>
      {/* <td>
        <div className="d-flex justify-content-center gap-2">
          <Button size="sm" variant="warning" onClick={() => handleEdit(c.id)}>
            <Edit />
          </Button>
        </div>
      </td> */}
    </tr>
  );

  return (
    <div className="container-fluid p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-4">Top Category Management</h4>
        {/* <Button
          variant="success"
          onClick={() => navigate("/admin/topcat/add")}
        >
          <Add className="me-2" /> Add New
        </Button> */}
      </div>

      <SearchFilterBar
        searchTerm={search}
        setSearchTerm={setSearch}
        placeholder="Search category..."
        filterValue={filter}
        setFilterValue={setFilter}
        // filterOptions={["Active", "Inactive"]}
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

export default TopCategoryList;
