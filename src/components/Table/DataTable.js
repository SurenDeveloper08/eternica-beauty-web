import React from "react";
import { Table } from "react-bootstrap";
import { motion } from "framer-motion";
import "./Table.css";

const DataTable = ({ columns, data, renderRow }) => (
  <motion.div
    className="table-responsive"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    <Table bordered hover className="custom-table align-middle text-center">
      <thead className="table-dark">
        <tr>{columns.map((col, i) => <th key={i}>{col}</th>)}</tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, i) => renderRow(item, i))
        ) : (
          <tr>
            <td colSpan={columns.length} className="py-4">
              No records found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </motion.div>
);

export default DataTable;
