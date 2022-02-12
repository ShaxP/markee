import { AppBar, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  drawerWidth: number;
  handleDrawerToggle: () => void;
};

export default function NotesDrawer({
  drawerWidth,
  handleDrawerToggle,
}: Props) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        display: {
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          xs: "block",
        },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { xs: "block" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Markee
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
