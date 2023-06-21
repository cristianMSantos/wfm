import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
// color design tokens export


export const tokens = (mode, componentMode) => ({
  ...(mode === "dark"
    ? {    
      grey: {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
      },
      primary: {
        100: "#d2d2d2",
        200: "#a4a4a4",
        300: "#777777",
        400: "#494949",
        500: "#1c1c1c",
        600: "#161616",
        700: "#111111",
        800: "#0b0b0b",
        900: "#060606",
      },
      systembar:{
        100: "#d2d2d2",
        200: "#a4a4a4",
        300: "#777777",
        400: "#494949",
        500: "#1c1c1c",
        600: "#161616",
        700: "#111111",
        800: "#0b0b0b",
        900: "#060606",
      },
      corComponent: componentMode === 'blue' ? {
        100: "#cfcee2",
        200: "#a09ec4",
        300: "#706da7",
        400: "#413d89",
        500: "#110c6c",
        600: "#0e0a56",
        700: "#0a0741",
        800: "#07052b",
        900: "#030216"
      } : componentMode === 'orage' ? {
        100: "#d2d2d2",
        200: "#a4a4a4",
        300: "#777777",
        400: "#494949",
        500: "#1c1c1c",
        600: "#161616",
        700: "#111111",
        800: "#0b0b0b",
        900: "#060606",
      } : { //grey
        100: "#d2d2d2",
        200: "#a4a4a4",
        300: "#777777",
        400: "#494949",
        500: "#1c1c1c",
        600: "#161616",
        700: "#111111",
        800: "#0b0b0b",
        900: "#060606",
      }
    }
    : {
      grey: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0",
      },
      primary: {
        100: "#fefefd",
        200: "#fdfdfb",
        300: "#fcfbfa",
        400: "#fbfaf8",
        500: "#FAF9F6",
        600: "#c8c7c5",
        700: "#969594",
        800: "#646462",
        900: "#323231"
      },
      systembar:{
        100: "#ccdbef",
          200: "#99b7de",
          300: "#6692ce",
          400: "#336ebd",
          500: "#E6F2FF",
          600: "#003b8a",
          700: "#002c68",
          800: "#001e45",
          900: "#000f23"
      },
      corComponent: componentMode === 'blue' ? {
        100: "#cfcee2",
        200: "#a09ec4",
        300: "#706da7",
        400: "#413d89",
        500: "#110c6c",
        600: "#0e0a56",
        700: "#0a0741",
        800: "#07052b",
        900: "#030216"
      } : componentMode === 'orange' ? {
        100: "#d2d2d2",
        200: "#a4a4a4",
        300: "#777777",
        400: "#494949",
        500: "#1c1c1c",
        600: "#161616",
        700: "#111111",
        800: "#0b0b0b",
        900: "#060606",
      } : { //grey
        100: "#d2d2d2",
        200: "#a4a4a4",
        300: "#777777",
        400: "#494949",
        500: "#1c1c1c",
        600: "#161616",
        700: "#111111",
        800: "#0b0b0b",
        900: "#060606",
      }
    
    }),
});

// mui theme settings
export const themeSettings = (mode, componentMode) => {
  const colors = tokens(mode, componentMode);
  return {
    palette: {
      mode: mode,
      componentMode: componentMode,
      primary: {
        main: 'rgba(10,113,247,0.18)',
        contrastText: '#0f279a',
      },
      background: {
        default: colors.primary[500],
        paper: colors.corComponent[500],
      },
      text: {
        primary: '#0f279a',
      },
      secondary: {
        main: colors.grey[500],
      },
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    // components: {
    //   mode: mode,
    //   ...(mode === "dark"
    //     ? {
    //       // Name of the component
    //       MuiDrawer: {
    //         styleOverrides: {
    //           // Name of the slot
    //           root: {
    //             // Some CSS
    //             backgroundColor: colors.primary[500]
    //           },
    //         },
    //       },
    //       // MuiTypography: {
    //       //   styleOverrides: {
    //       //     root: {
    //       //       color: colors.primary[100],
    //       //     },
    //       //     colorSecondary: {
    //       //       color: colors.greenAccent[500],
    //       //     },
    //       //     colorText: {
    //       //       color: colors.grey[500],
    //       //     },
    //       //     colorTextDark: {
    //       //       color: colors.grey[700],
    //       //     },
    //       //   },
    //       // },
    //       // MuiIconButton: {
    //       //   styleOverrides: {
    //       //     root: {
    //       //       color: colors.primary[100],
    //       //     },
    //       //   },
    //       // }
    //     }
    //     : {
    //       // Name of the component
    //       MuiDrawer: {
    //         styleOverrides: {
    //           // Name of the slot
    //           root: {
    //             // Some CSS
    //             backgroundColor: "#fcfcfc"
    //           },
    //         },
    //       },
    //       // MuiTypography: {
    //       //   styleOverrides: {
    //       //     root: {
    //       //       color: colors.primary[500],
    //       //     },
    //       //     colorSecondary: {
    //       //       color: colors.greenAccent[500],
    //       //     },
    //       //     colorText: {
    //       //       color: colors.grey[500],
    //       //     },
    //       //     colorTextDark: {
    //       //       color: colors.grey[700],
    //       //     },
    //       //   },
    //       // },
    //       // MuiIconButton: {
    //       //   styleOverrides: {
    //       //     root: {
    //       //       color: colors.primary[100],
    //       //     },
    //       //   },
    //       // }
    //     }),
    // },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  toggleComponentMode: () => {}
});

export const useMode = () => {
  const [mode, setMode] = useState("light");
  const [componentMode, setComponentMode] = useState("blue"); // Default component mode is "blue"


  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
      toggleComponentMode: (colorModeComponent) => {
        // console.log(colorModeComponent)
        setComponentMode(colorModeComponent)
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode, componentMode)), [mode, componentMode]);
  return [theme, colorMode];
};
