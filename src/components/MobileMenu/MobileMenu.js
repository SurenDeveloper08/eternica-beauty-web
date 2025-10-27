import React, { useState } from "react";
import { Drawer, Box, IconButton, List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const MobileMenu = ({ drawerOpen, toggleDrawer, categories }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const handleToggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 260 }} role="presentation">
        <IconButton onClick={toggleDrawer(false)} sx={{ m: 1 }}>
          <CloseIcon />
        </IconButton>

        <List>
          {categories.map((category, catIndex) => (
            <React.Fragment key={category._id || catIndex}>
              {/* Main Category */}
              <ListItemButton onClick={() => handleToggleCategory(catIndex)}>
                <ListItemText
                  primary={category.name}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
                {category.subcategories?.length > 0 &&
                  (openCategory === catIndex ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {/* Subcategories */}
              <Collapse in={openCategory === catIndex} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {category.subcategories?.map((sub, subIndex) => (
                    <ListItemButton
                      key={subIndex}
                      component={Link}
                      to={`/${category.slug}/${sub.slug}`}
                      sx={{ pl: 4 }}
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemText primary={sub.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;
