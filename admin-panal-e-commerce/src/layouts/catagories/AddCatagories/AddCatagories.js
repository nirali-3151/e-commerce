import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { blueColour, table_shadow_color } from "constants/constants"

import FormCatagory from "layouts/catagories/form/form"
import { useState } from "react";

import { storeCatagoryImage } from 'firebase_action/images/addCatagory'

import { useNavigate } from "react-router-dom";

import UserService from 'services/userService';

//add routes
import {
    viewCatagory
} from "routes/routesPath"

function AddCatagories() {

    //variable for form data
    const [data, setData] = useState({
        catagory_name: "",
        thumb_nail_image: ""
    })

    const [disabledBtn, setDisabledBtn] = useState(false)

    const navigate = useNavigate()

    const onClickAddBtn = async (e) => {
        e.preventDefault()
        if (data.thumb_nail_image === "" || data.catagory_name === "") {
            alert("every feild is important")
        }
        else {
            setDisabledBtn(true)
            const image = await storeCatagoryImage(data.thumb_nail_image)
            const newData = {
                catagory_name: data.catagory_name,
                thumb_nail_image: image
            }
            const initialData = await UserService.addCatagoryList(newData)
            if (initialData.success === true) {
                alert("data added successfully")
                navigate(`${viewCatagory}`)
            }
        }
    }

    const onChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const onClickAddThumbnailImg = (e) => {
        setData({
            ...data,
            thumb_nail_image: e.target.files[0]
        })
    }

    const onClickDeletePreviewIcon = () => {
        setData({
            ...data,
            thumb_nail_image: "",
        })
    }

    return (
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
                                    Add Catagories
                                </MDTypography>
                            </MDBox>
                            <FormCatagory
                                disabledBtn={disabledBtn}
                                onClickAddThumbnailImg={(e) => onClickAddThumbnailImg(e)}
                                onChangeHandler={onChangeHandler}
                                data={data}
                                onClickDeletePreviewIcon={onClickDeletePreviewIcon}
                                onClickAddBtn={(e) => onClickAddBtn(e)}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    )
}

export default AddCatagories