import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { blueColour, table_shadow_color } from "constants/constants"

import { useEffect, useRef, useState } from "react";
import UserService from "services/userService";

import { viewSubCatagoriesList } from "reduxStore/Actions/SubCatagoryAction"

import { useSelector, useDispatch } from 'react-redux'

import ViewSubCatagoriesInner from 'layouts/subCatagories/ViewSubCatagories/ViewSubCatagoriesInner'

import { useNavigate } from 'react-router-dom';

//add routes
import { addSubCatagory } from 'routes/routesPath'

const _ = require('lodash');

function ViewSubCatagories() {

    const counter = useRef(0);
    const [loading, setLoading] = useState(true)

    const Catagories = useSelector((state) => state.CatagoriesReducer)
    const subCatagories = useSelector((state) => state.subCatagoriesReducer)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const getCatagoryList = async () => {
        const id = localStorage.getItem('catagory_id')
        const initialData = await UserService.viewSubCatagoryList(id)
        dispatch(viewSubCatagoriesList(initialData.data))
    }

    useEffect(() => {
        getCatagoryList()
    }, []);

    const onClickAddCatagories = (e) => {
        e.preventDefault()
        navigate(`${addSubCatagory}`)
    }

    const imageLoaded = () => {
        counter.current += 1;
        if (counter.current <= subCatagories.sub_cat_List.length) {
            setLoading(false);
        }
    }

    const { sub_cat_List } = subCatagories

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
                                    coloredShadow={table_shadow_color} 
                                    style={{
                                        cursor: "pointer"
                                    }}>
                                    <MDTypography variant="h6" color="white">
                                        View Sub Catagories
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
                                        onClick={(e) => onClickAddCatagories(e)}
                                    >
                                        <MDTypography variant="h6" color="black">
                                            Add Sub Catagory
                                        </MDTypography>
                                    </MDBox>
                                </MDBox>
                                <div className="view-catagories-main-wrapper">
                                    {
                                        !_.isEmpty(sub_cat_List) ?
                                            sub_cat_List.map((catagory, key = { i }) => {
                                                return (
                                                    <ViewSubCatagoriesInner
                                                        key={key}
                                                        cat_List={catagory}
                                                        imageLoaded={imageLoaded}
                                                        loading={loading}
                                                    />
                                                )
                                            })
                                            :
                                            <p className="view-catagory-empty-array">
                                                Create your first sub catagory
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

export default ViewSubCatagories