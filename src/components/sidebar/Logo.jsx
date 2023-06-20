import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.png";
import { styled } from "@mui/system";

const LogoContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Logo = ({ onClick }) => {
  return (
    <LogoContainer
      onClick={onClick}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src={logo}
        alt="Logo"
        style={{ width: "70%", height: "50%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    </LogoContainer>
  );
};

export default Logo;
