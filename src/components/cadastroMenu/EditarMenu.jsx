import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuAccordionItem from "./MenuAccordionItem";
const EditarMenu = ({ menuList }) => {
  const sectionsSet = new Set(menuList.map((item) => item.section));
  const sections = Array.from(sectionsSet);
  return (
    <div>
      <h2>Editar Menu</h2>
      {/* Use the menuList prop here */}
      {menuList.map((menu) => (
        <Accordion key={menu.text}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p>{menu.text}</p>
          </AccordionSummary>
          <AccordionDetails>
            <MenuAccordionItem menu={menu} sections={sections} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default EditarMenu;