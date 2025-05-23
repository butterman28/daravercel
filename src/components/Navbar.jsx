import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Drawer, List, ListItem, ListItemText, } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { PostContext } from './postcontext';
import MenuIcon from "@mui/icons-material/Menu";



const navItems = [
  { label: "Home", path: "/" },
  //{ label: "About", path: "/about" },
  { label: "Articles", path: "/post" },
  //{ label: "Podcast", path: "/podcast" },
  //{ label: "Article Categories", path: "/article-categories" },
];
const articleCategories = [
  { label: 'Agriculture', path: 'agriculture' },
  { label: 'Health', path: 'health' },
  { label: 'Climate', path: 'climate' },
  { label: 'Law & Order', path: 'law-and-order' },
  { label: 'Society', path: 'society' },
  { label: 'Education', path: 'education' },
  { label: 'Politics', path: 'politics' },
];

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { setCate, filterpostByCategory } = useContext(PostContext);
  const handleClick = () => {
    //setCate("All Post"); // Replace 'item.category' with the appropriate category value
    filterpostByCategory("all");
    // console.log("all post");   
  };
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Open the dropdown menu
  };
  const toggleDrawer = (open) => setDrawerOpen(open);


  const handleMenuClose = (category) => {
    //filterpostByCategory(category.path)
    setAnchorEl(null); // Close the dropdown menu
  };
  return (
    <>
      <AppBar position="fixed" color="primary"> {/* Changed position to "fixed" */}
        <Toolbar>
          {/* Website Name on the Left */}
          <Typography textAlign="left" variant="h6" component="div">
            Dara Alegbeleye
          </Typography>


          {/* Navigation Items on the Right */}
          <Box sx={{ ml: 'auto', display: { xs: "none", md: "flex" } }}>
            {navItems.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                component={Link}
                to={item.path}
                onClick={handleClick}
                sx={{
                  color: location.pathname === item.path ? 'black' : 'inherit', // Highlight if active
                  textDecoration: location.pathname === item.path ? 'underline' : 'none', // Underline if active
                  '&:hover': {
                    color: 'black', // Change this to the desired hover color
                    textDecoration: 'underline',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button color="inherit" onClick={handleMenuOpen} onMouseEnter={handleMenuOpen} sx={{
              '&:hover': {
                color: 'black', // Change this to the desired hover color
                textDecoration: 'underline',
              },
            }}>
              Article Categories
            </Button>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)} // Boolean to show/hide menu
              onClose={handleMenuClose} // Handle menu close
              MenuListProps={{
                onMouseLeave: handleMenuClose, // Close menu when mouse leaves
              }}
            >
              {articleCategories.map((category, index) => (
                <MenuItem
                  key={index}
                  //component={Link} // Use React Router Link
                  //to={category.path}
                  // onClick={() =>filterpostByCategory(category.path)}
                  component={Link}
                  to="/post"
                  onClick={() => filterpostByCategory(category.path)} // Close menu after click
                >
                  {category.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box color="powderblue" sx={{ ml: 'auto', display: { xs: "flex", md: "none" } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              color="powderblue"
              anchor="left"
              open={drawerOpen}
              onClose={() => toggleDrawer(false)}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={() => toggleDrawer(false)}
                onKeyDown={() => toggleDrawer(false)}

              >
                <List>
                  {navItems.map((item, index) => (
                    <ListItem>
                      <Button
                        key={index}
                        color="inherit"
                        component={Link}
                        to={item.path}
                        onClick={handleClick}
                        sx={{
                          color: location.pathname === item.path ? 'black' : 'inherit', // Highlight if active
                          textDecoration: location.pathname === item.path ? 'underline' : 'none', // Underline if active
                          '&:hover': {
                            color: 'black', // Change this to the desired hover color
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    </ListItem>
                  ))}
                  <ListItem>

                    <Button color="inherit" onClick={handleMenuOpen} onMouseEnter={handleMenuOpen} sx={{
                      '&:hover': {
                        color: 'black', // Change this to the desired hover color
                        textDecoration: 'underline',
                      },
                    }}>
                      Article Categories
                    </Button>
                    {/* Dropdown Menu */}
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)} // Boolean to show/hide menu
                      onClose={handleMenuClose} // Handle menu close
                      MenuListProps={{
                        onMouseLeave: handleMenuClose, // Close menu when mouse leaves
                      }}
                    >
                      {articleCategories.map((category, index) => (
                        <MenuItem
                          key={index}
                          //component={Link} // Use React Router Link
                          //to={category.path}
                          // onClick={() =>filterpostByCategory(category.path)}
                          component={Link}
                          to="/post"
                          onClick={() => filterpostByCategory(category.path)} // Close menu after click
                        >
                          {category.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </>

  );
}


export default Navbar;
