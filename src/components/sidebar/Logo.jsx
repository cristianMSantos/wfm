import React, { useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.png";
import logoBlue from "../../assets/images/logo_blue.png";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";

const LogoContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Logo = ({ onClick }) => {
  const selectedTheme = useSelector((state) => state.temaControl.tema);
  const mode = useSelector((state) => state.temaControl.mode);
  const [isMobile, setIsMobile] = React.useState(
    window.matchMedia("(max-width: 900px)").matches
  );

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.matchMedia("(max-width: 900px)").matches);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  console.log(selectedTheme.name);
  console.log(mode);
  return (
    <LogoContainer
      onClick={onClick}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {console.log(mode)}
      <motion.img
        src={
          selectedTheme.name == "plansul-default" && mode == "light"
            ? logoBlue
            : logo
        }
        alt="Logo"
        style={{ width: "70%", height: isMobile ? "65%" : "auto" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    </LogoContainer>
  );
};

export default Logo;
