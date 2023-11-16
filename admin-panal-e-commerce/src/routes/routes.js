//import icons
import { GrCatalog } from 'react-icons/gr'
import {FaUserAlt} from "react-icons/fa"
import {BsFillCartCheckFill} from "react-icons/bs"
import {GiCardboardBox} from "react-icons/gi"
import {CgPlayListSearch} from "react-icons/cg"

//add routes
import {
  //catagory
  viewCatagory,
  AddCatagory,
  UpdateCatagory,

  //sub catagory
  viewSubCatagory,
  addSubCatagory,
  updateSubCatagory,

  //products
  viewProduct,
  addProduct,
  updateProduct,
  viewProductIds,

  //orders
  viewOrders,

  //users
  users
} from "./routesPath"

//catagories
import {
  ViewCatagories,
  AddCatagories,
  UpdateCatagories
} from 'layouts/catagories/index'

//sub catagories
import {
  AddSubCatagories,
  ViewSubCatagories,
  UpdateSubCatagories
} from 'layouts/subCatagories/index'

//products
import {
  ViewProducts,
  AddProducts,
  UpdateProducts,
  ViewProductId
} from 'layouts/products/index'
import ViewOrders from 'layouts/orders/ViewOrders'
import ViewUsers from 'layouts/Users/users'

const routes = [
  {
    type: "collapse",
    name: "Catagories",
    key: "view-catagories",
    icon: <CgPlayListSearch fontSize="big" color="white"></CgPlayListSearch>,
    route: `${viewCatagory}`,
    component: <ViewCatagories />,
  },
  {
    key: "view-catagories",
    route: `${AddCatagory}`,
    component: <AddCatagories />,
  },
  {
    key: "view-catagories",
    route: `${UpdateCatagory}`,
    component: <UpdateCatagories />,
  },
  {
    key: "view-sub-catagories",
    route: `${viewSubCatagory}`,
    component: <ViewSubCatagories />,
  },
  {
    key: "view-sub-catagories",
    route: `${addSubCatagory}`,
    component: <AddSubCatagories />,
  },
  {
    key: "view-sub-catagories",
    route: `${updateSubCatagory}`,
    component: <UpdateSubCatagories />,
  },
  {
    type: "collapse",
    name: "Products",
    key: "view-products",
    icon: <GiCardboardBox fontSize="medium" color="white"></GiCardboardBox>,
    route: `${viewProduct}`,
    component: <ViewProducts />,
  },
  {
    key: "view-products",
    route: `${addProduct}`,
    component: <AddProducts />,
  },
  {
    key: "view-products",
    route: `${viewProductIds}`,
    component: <ViewProductId />,
  },
  {
    key: "view-products",
    route: `${updateProduct}`,
    component: <UpdateProducts />,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "view-orders",
    icon: <BsFillCartCheckFill fontSize="medium" color="white"></BsFillCartCheckFill>,
    route: `${viewOrders}`,
    component: <ViewOrders />,
  },
  {
    type: "collapse",
    name: "users",
    key: "view-users",
    icon: <FaUserAlt fontSize="small" color="white"></FaUserAlt>,
    route: `${users}`,
    component: <ViewUsers />,
  },
];

export default routes;
