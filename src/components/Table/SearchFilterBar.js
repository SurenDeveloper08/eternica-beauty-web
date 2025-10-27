import React from "react";
import { Row, Col, InputGroup, Form } from "react-bootstrap";
import { Search, FilterList } from "@mui/icons-material";

const SearchFilterBar = ({
  searchTerm,
  setSearchTerm,
  filterValue,
  setFilterValue,
  filterOptions = [],
  placeholder = "Search..."
}) => (
  <Row className="mb-3 align-items-center">
    <Col md={6}>
      <InputGroup>
        <InputGroup.Text><Search /></InputGroup.Text>
        <Form.Control
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
    </Col>
    {filterOptions.length > 0 && (
      <Col md={3}>
        <InputGroup>
          <InputGroup.Text><FilterList /></InputGroup.Text>
          <Form.Select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="All">All</option>
            {filterOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </Form.Select>
        </InputGroup>
      </Col>
    )}
  </Row>
);

export default SearchFilterBar;
