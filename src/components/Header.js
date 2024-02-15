import * as React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { Connect } from "@/components/Connect";

const pages = [
  {
    title: "Profile",
    href: "/dapp/profile",
  },
  {
    title: "Manager",
    href: "/dapp/manager",
  },
  {
    title: "Another Dapp",
    href: "/dapp/another-dapp",
  },
];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        position="fixed"
        color="inherit"
        sx={{
          padding: 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href="/" legacyBehavior>
              <Box>
                <Typography
                  variant="h1"
                  component="div"
                  color="primary"
                  sx={{
                    cursor: "pointer",
                    fontFamily: "Monoton, sans-serif",
                    display: { xs: "none", sm: "none", md: "none", lg: "flex" },
                    fontWeight: 400,
                  }}
                >
                  mosaic
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  color="primary"
                  sx={{
                    cursor: "pointer",
                    fontFamily: "Monoton, sans-serif",
                    display: { xs: "none", md: "flex", lg: "none" },
                  }}
                >
                  mosaic
                </Typography>
              </Box>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="app-menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link key={page.href} href={page.href} legacyBehavior>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="div"
              color="primary"
              sx={{
                fontFamily: "Monoton",
                display: { xs: "none", sm: "flex", md: "none" },
                mr: 2,
                flexGrow: 1,
              }}
            >
              mosaic
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="primary"
              sx={{
                fontFamily: "Monoton",
                display: { xs: "flex", sm: "none" },
                mr: 1,
                flexGrow: 1,
              }}
            >
              mosaic
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              {pages.map((page) => (
                <Link key={page.href} href={page.href} legacyBehavior>
                  <Button
                    onClick={handleCloseNavMenu}
                    color="inherit"
                    sx={{ my: 2, display: "block", mx: 0 }}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Connect />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
