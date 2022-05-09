import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RestoreIcon from "@material-ui/icons/Restore";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import NotificationsIcon from "@material-ui/icons/Notifications";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0
  },
  selected: {
    color: "#F50057 !important"
  }
});

const ArticleNav = [
  {
    label: "Main",
    icon: <MenuBookIcon />,
    path: "/article"
  },
  {
    label: "Home",
    icon: <HomeIcon />,
    path: "/"
  },
  {
    label: "Bookmark",
    icon: <BookmarkIcon />,
    path: "/article/bookmarks"
  },
  {
    label: "Notifiction",
    icon: <NotificationsIcon />,
    path: "/article/notifiction"
  }
];

const ShopNav = [
  {
    label: "Wishlist",
    icon: <FavoriteIcon />,
    path: "/wishlist"
  },
  {
    label: "Home",
    icon: <HomeIcon />,
    path: "/"
  },
  {
    label: "Cart",
    icon: <ShoppingCartIcon />,
    path: "/cart"
  },
  {
    label: "Orders",
    icon: <RestoreIcon />,
    path: "/order-history"
  }
];

const BottomNav = ({ location, history }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {

      setNavItems(ArticleNav);

  }, []);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      {navItems.map((item, index) => (
        <BottomNavigationAction
          key={`${item.label}-${index}`}
          classes={{
            selected: classes.selected
          }}
          label={item.label}
          value={item.label}
          icon={item.icon}
          onClick={() =>   history.push({
            pathname: item.path,
            state:{ title:item.label } ,
          })}
        />
      ))}
    </BottomNavigation>
  );
};

export default BottomNav;
