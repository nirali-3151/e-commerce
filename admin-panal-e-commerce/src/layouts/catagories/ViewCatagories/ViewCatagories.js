import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { blueColour, table_shadow_color } from "constants/constants"

import { useEffect, useState, useRef } from "react";
import UserService from "services/userService";

import {
    viewCatagoriesList
} from "reduxStore/Actions/CatagoriesAction"

import { useSelector, useDispatch } from 'react-redux'

import './ViewCatgory.css'

import ViewCatagoriesInner from 'layouts/catagories/ViewCatagories/ViewCatagoriesInner'

import { useNavigate } from 'react-router-dom';

// import routes
import { AddCatagory } from 'routes/routesPath'

function ViewCatagories() {

    const [loading, setLoading] = useState(true)
    const counter = useRef(0);

    const Catagories = useSelector((state) => state.CatagoriesReducer)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const getCatagoryList = async () => {
        const initialData = await UserService.viewCatagoriesList()
        dispatch(viewCatagoriesList({ cat_List: initialData }))
    }

    const imageLoaded = () => {
        counter.current += 1;
        if (counter.current <= cat_List.length) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCatagoryList()
    }, []);


    const onClickAddCatagories = (e) => {
        e.preventDefault()
        navigate(`${AddCatagory}`)
    }

    const { cat_List } = Catagories

    return (
        <div className="cover-full-page">
            <DashboardLayout>
                <div className="DashboardNavbar-div">
                    <DashboardNavbar />
                </div>
                <MDBox pt={2} pb={0}>
                    <Grid justifyContent="center" container>
                        <Grid item xs={12} sm={8.5} md={18}>
                            <Card style={{ maxHeight: "100%" }}>
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
                                        View Catagories
                                    </MDTypography>
                                    <MDBox
                                        mx={3}
                                        mr={4}
                                        py={0.8}
                                        px={7}
                                        bgColor="#fff"
                                        position="absolute"
                                        right="0"
                                        borderRadius="lg"
                                        coloredShadow={table_shadow_color}
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        onClick={(e) => onClickAddCatagories(e)}
                                    >
                                        <MDTypography variant="h6" color="black" >
                                            Add
                                        </MDTypography>
                                    </MDBox>
                                </MDBox>
                                <div className="view-catagories-main-wrapper">
                                    {cat_List.map((catagory, key = { i }) => {
                                        return (
                                            <ViewCatagoriesInner
                                                key={key}
                                                cat_List={catagory}
                                                imageLoaded={() => imageLoaded(catagory.thumb_nail_image)}
                                                loading={loading}
                                            />
                                        )
                                    })
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

export default ViewCatagories