import { useEffect, useState } from "react";
import api from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../../store/features/Menu";

export const useMenu = () => {
  const [error, setError] = useState(null);
  const menuItems = useSelector((state) => state.menu.list);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.isAuthenticated);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    const options = {
      url: `sidebar/fillMenu`,
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    const optionsB = {
      url: `/auth/me`,
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    let user = await api(optionsB)
    let response = await api(options);

    response = response.data.filter(e => e.perfil === null || Array.isArray(e.perfil) && e.perfil.includes(user.data.co_perfil))
    dispatch(setMenu(response));

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
    setOpenIcons((prevOpenIcons) => {
      const updatedOpenIcons = { ...prevOpenIcons };
      Object.keys(updatedOpenIcons).forEach((key) => {
        if (key !== item) {
          updatedOpenIcons[key] = false;
        }
      });
      updatedOpenIcons[item] = !prevOpenIcons[item];
      return updatedOpenIcons;
    });

    const menuItem = menuItems?.find((menuItem) => menuItem.id === item);
    if (menuItem && menuItem.route) {
      setSelectedRoute(menuItem.route);
    } else {
      setSelectedRoute(null);
    }
  }
};
