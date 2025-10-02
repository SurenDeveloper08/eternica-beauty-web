import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import './Breadcrumbs.css'
const Breadcrumbs = () => {
  const location = useLocation();
  const { country } = useParams(); 
  const parts = location.pathname.split("/").filter(Boolean);


  const filteredParts = parts.filter((part, index) =>
    index === 0 ? part.toLowerCase() !== country?.toLowerCase() : true
  );

  return (
    <nav aria-label="breadcrumb" className="breadcrumb">
      <ol>
        <li>
          <Link to={`/${country}`}>Home</Link>
        </li>
        {filteredParts.map((part, index) => {
          const isLast = index === filteredParts.length - 1;
          const path = `/${country}/` + filteredParts.slice(0, index + 1).join("/");
          const label = part.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

          return (
            <li key={index}>
              {isLast ? (
                <span>{label}</span>
              ) : (
                <Link to={path}>{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
