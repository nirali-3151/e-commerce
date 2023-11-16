import { useEffect, useRef, useState } from "react";
import moment from "moment";

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

import "../../Design/navbar.css"

function ViewOrders() {
    const [orders, setOrders] = useState([])

    const getAllOrderDetails = async () => {
        const initialData = await UserService.viewOrdersList()
        setOrders(initialData)
    }

    useEffect(() => {
        getAllOrderDetails()
    }, [])

    return (
        <>
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
                                            View Orders
                                        </MDTypography>
                                    </MDBox>
                                    <div className="view-product-main-wrapper"
                                        style={{ gridTemplateColumns: "100%" }}
                                        >
                                        {
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th style={{ paddingLeft: "40px" }}>order_id</th>
                                                        <th>razorpay order id</th>
                                                        <th>user id</th>
                                                        <th>Order</th>
                                                        <th>Price</th>
                                                        <th>Placed at</th>
                                                    </tr>
                                                </thead>

                                                <tbody className='tbody1'>
                                                    {
                                                        orders.map((order) => (
                                                            <tr key={order.order_id}>
                                                                <td style={{ paddingLeft: "40px" }}>{order.order_id} </td>
                                                                <td>{order.razorpay_order_id}</td>
                                                                <td>{order.o_user_id}</td>
                                                                <td>{order.order_flag ? "Ordered" : "Cencelled"}</td>
                                                                <td>{order.price}</td>
                                                                <td>
                                                                    {moment(order.created_at).format("DD/MM/YYYY")}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                                <div>
                                                </div>
                                            </table>
                                        }
                                    </div>
                                </Card>
                            </Grid>
                        </Grid>
                    </MDBox>
                </DashboardLayout>
            </div>
        </>
    )
}

export default ViewOrders