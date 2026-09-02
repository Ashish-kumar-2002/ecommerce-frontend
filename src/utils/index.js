import { href } from "react-router-dom";
import { bannerImageOne, bannerImageThree, bannerImageTwo } from "./contsant";
import Icon from "@mui/material/Icon";
import { current } from "@reduxjs/toolkit";
import { FaBoxOpen, FaHome, FaShoppingCart, FaStore, FaThList } from "react-icons/fa";

export const bannerLists = [
  {
    id: 1,
    image: bannerImageOne,
    title: "Transform Your Living Room",
    subtitle: "Furniture Collection",
    description: "Discover premium sofas and furniture that blend comfort with style — up to 30% off",
  },
  {
    id: 2,
    image: bannerImageThree,
    title: "Next-Gen Entertainment",
    subtitle: "Smart TVs & Electronics",
    description: "Bring the theater home with our latest Smart TVs featuring 4K display and immersive sound",
  },
  {
    id: 3,
    image: bannerImageTwo,
    title: "Little Ones, Big Style",
    subtitle: "Kids' Fashion",
    description: "Colorful, comfortable, and trendy outfits your kids will love — flat 20% off this week",
  },
 
];
export default bannerLists;


export const adminNavigation = [
    {name: "Dashboard",
     href:"/admin",
     Icon: FaHome, 
     current: true
    },

     {name: "Orders",
     href:"/admin/orders",
     Icon: FaShoppingCart
    },


     {name: "Products",
     href:"/admin/products",
     Icon: FaBoxOpen
    },

     {name: "Categories",
     href:"/admin/categories",
     Icon: FaThList 
    },

     {name: "Sellers",
     href:"/admin/sellers",
     Icon: FaStore
    }
];



export const sellerNavigation = [
 
     {name: "Orders",
     href:"/admin/orders",
     Icon: FaShoppingCart,
      current: true 
    },


     {name: "Products",
     href:"/admin/products",
     Icon: FaBoxOpen
    }

];

