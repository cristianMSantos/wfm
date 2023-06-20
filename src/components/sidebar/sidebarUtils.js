import { useEffect, useState } from "react";
import api from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../../store/features/Menu";

export const useMenu = () => {
  const [error, setError] = useState(null);
  const menuItems = useSelector((state) => state.menu.list);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.isAuthenticated)
  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    const options = {
      url: `sidebar/fillMenu`,
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: token ? `Bearer ${token}` : '',
      },
    };

    try {
      const response = await api(options);
      dispatch(setMenu(response.data));
    } catch (error) {
      console.error("Error fetching menu:", error.response);
      setError(
        "Falha ao montar o menu. Entre em contato com o time de desenvolvimento."
      );
    }
  };

  return { menuItems, error };
};

export const generateInitialOpenState = (menuItems) => {
  return menuItems?.reduce((openState, menuItem) => {
    if (menuItem.hasSubItems) {
      openState[menuItem.id] = false;
    }
    return openState;
  }, {});
};

export const handleClick = (
  item,
  subItem,
  setOpenIcons,
  setSelectedRoute,
  menuItems
) => {
  if (item === "logo") {
    setSelectedRoute("/");
    return;
  }

  if (subItem) {
    if (subItem.route) {
      setSelectedRoute(subItem.route);
    } else {
      setSelectedRoute(null);
    }
  } else {
    setOpenIcons((prevOpenIcons) => ({
      ...prevOpenIcons,
      [item]: !prevOpenIcons[item],
    }));

    const menuItem = menuItems?.find((menuItem) => menuItem.id === item);
    if (menuItem && menuItem.route) {
      setSelectedRoute(menuItem.route);
    } else {
      setSelectedRoute(null);
    }
  }
};
