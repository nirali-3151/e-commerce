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

import ViewProductIdInner from "./ViewProductIdInner"

//redux
import { useSelector, useDispatch } from 'react-redux'

import { Switch, Route, useLocation } from 'react-router-dom'
import UserService from "services/userService";

import "./viewProductId.css"
import { useEffect, useState } from "react";

function ViewProductId() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get("product_id")

    const Products = useSelector((state) => state.ProductReducer)
    const dispatch = useDispatch()

    const [product, setProduct] = useState([])

    const getProductDataWithId = async () => {
        const initialData = await UserService.ViewProductWithIdList(id)
        setProduct(initialData.rows)
    }


    useEffect(() => {
        getProductDataWithId()
    }, [id])

    return (
        <div className="cover-full-page">
            <div className="DashboardNavbar-div">
                <DashboardNavbar />
            </div>
            <DashboardLayout>
                <MDBox
                    pb={0}
                    pt={2}
                >
                    <Grid justifyContent="center" container bgColor={blueColour}>
                        <Grid item xs={12} sm={8.5} md={18} >
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
                                        View Products detail
                                    </MDTypography>
                                </MDBox>
                                <div className="view-product-with-id-main-wrapper">
                                    {
                                        !_.isEmpty(product) ?
                                            <ViewProductIdInner
                                                product_id={product}
                                            />
                                            :
                                            <p className="view-catagory-empty-array">
                                                Product data unavailable
                                            </p>
                                    }
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
            </DashboardLayout>
        </div>
    )
}

export default ViewProductId