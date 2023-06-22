import {
    styled,
    ListSubheader,
    Paper,
    ListItemButton,
    ListItem,
  } from "@mui/material";
  import { motion } from "framer-motion";
  
  export const LogoContainer = styled(motion.div)`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    cursor: pointer;
  `;
  
  export const ListSubheaderStyled = styled(ListSubheader)`
    background-color: transparent;
    font-size: 12px;
    line-height: 1.2;
    padding-top: 12px;
    padding-bottom: 4px;
    text-align: left;
  `;
  
  export const DrawerPaperStyled = (props) => (
    <Paper
      sx={{
        width: props.sidebarWidth,
        flexShrink: 0,
        boxSizing: "border-box",
        backgroundColor: `${props.colors.primary[500]} !important`,
        color: `${props.colors.grey[100]} !important`,
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.35) !important",
        "&.MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation0.MuiDrawer-paper.MuiDrawer-paperAnchorLeft.MuiDrawer-paperAnchorDockedLeft.css-15b8vjn-MuiPaper-root-MuiDrawer-paper":
          {
            width: props.sidebarWidth,
            boxSizing: "border-box",
            backgroundColor: `${props.colors.primary[500]} !important`,
            color: `${props.colors.grey[100]} !important`,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.35) !important",
          },
      }}
      {...props}
    />
  );
  
  export const ListItemButtonStyled = styled(ListItemButton)`
    padding: 4px 26px;
  `;
  
  export const ListItemStyled = styled(ListItem)`
    pl: 6;
  `;
  