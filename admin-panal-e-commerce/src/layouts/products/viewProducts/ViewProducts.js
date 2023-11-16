import { useEffect, useRef, useState } from "react";

//add layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

//add components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

//import colors
import { blueColour, table_shadow_color } from "constants/constants"

import UserService from "services/userService";

//redux
import { viewProductListFirstPage } from "reduxStore/Actions/ProductsAction"
import { useSelector, useDispatch } from 'react-redux'

//react router dom
import { useNavigate } from 'react-router-dom';

//add routes
import { addProduct } from 'routes/routesPath'

import ViewProductsInner from "./ViewProductsInner"

//import design
import './ViewProduct.css'

const _ = require('lodash');

function ViewProducts() {

    const counter = useRef(0);
    const [loading, setLoading] = useState(true)

    const Products = useSelector((state) => state.ProductReducer)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const getProductList = async () => {
        const initialData = await UserService.viewProductsList()
        dispatch(viewProductListFirstPage(initialData))
    }

    useEffect(() => {
        getProductList()
    }, []);

    const onClickAddProducts = (e) => {
        e.preventDefault()
        navigate(`${addProduct}`)
    }

    const imageLoaded = () => {
        counter.current += 1;
        if (counter.current <= product_List.length) {
            setLoading(false);
        }
    }

    const { product_List } = Products

    return (
        <div className="cover-full-page">
            <DashboardLayout>
                <div className="DashboardNavbar-div">
                    <DashboardNavbar />
                </div>
                <MDBox
                    pt={2}
                    pb={0}
                >
                    <Grid justifyContent="center" container bgColor={blueColour}>
                        <Grid item xs={12} sm={12} md={18} >
                            <Card style={{
                                maxHeight: "100%",
                            }}>
                                <MDBox
                                    mx={2}
                                    mt={-3}
                                    py={3}
                                    px={2}
                                    display="flex"
                                    variant=""
                                    alignItems="center"
                                    bgColor={blueColour}
                                    borderRadius="lg"
                                    coloredShadow={table_shadow_color} >
                                    <MDTypography variant="h6" color="white">
                                        View Products
                                    </MDTypography>
                                    <MDBox
                                        mx={3}
                                        mr={4}
                                        py={0.8}
                                        px={4}
                                        bgColor="#fff"
                                        position="absolute"
                                        right="0"
                                        borderRadius="lg"
                                        coloredShadow={table_shadow_color}
                                        onClick={(e) => onClickAddProducts(e)}
                                    >
                                        <MDTypography variant="h6" color="black" style={{ cursor: "pointer" }}>
                                            Add Products
                                        </MDTypography>
                                    </MDBox>
                                </MDBox>
                                <div className="view-product-main-wrapper">
                                    {
                                        !_.isEmpty(product_List) ?
                                            product_List.map((product, key = { i }) => {
                                                return (
                                                    <ViewProductsInner
                                                        imageLoaded={() => imageLoaded(product_List.images)}
                                                        loading={loading}
                                                        key={key}
                                                        product_List={product}
                                                    />
                                                )
                                            })
                                            :
                                            <p className="view-catagory-empty-array">
                                                {null} 
                                            </p>
                                    }
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
            </DashboardLayout>
        </div>
    );
}

export default ViewProducts