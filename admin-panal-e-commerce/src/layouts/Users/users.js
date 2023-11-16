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

import "./users.css"

function ViewUsers() {

    const [users, setUsers] = useState([])

    const getUsersData = async () => {
        const initialData = await UserService.viewUsersList()
        setUsers(initialData)
    }

    useEffect(() => {
        getUsersData()
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
                                            View Users
                                        </MDTypography>
                                    </MDBox>
                                    <div className="view-product-main-wrapper"
                                        style={{ gridTemplateColumns: "100%" }}>
                                        {
                                            <table className='table1'>
                                                <thead>
                                                    <tr>
                                                        <th style={{ paddingLeft: "40px" }}>Id</th>
                                                        <th>First Name</th>
                                                        <th>Last Name</th>
                                                        <th>Email</th>
                                                        <th>phone_number</th>
                                                    </tr>
                                                </thead>

                                                <tbody className='tbody1'>
                                                    {
                                                        users.map((user) => (
                                                            <tr key={user.user_id}>
                                                                <td style={{ paddingLeft: "40px" }}>{user.user_id} </td>
                                                                <td>{user.first_name}</td>
                                                                <td>{user.last_name}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.phone_number}</td>
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

export default ViewUsers