import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { blueColour, table_shadow_color } from "constants/constants"

import FormCatagory from "layouts/subCatagories/form/form"
import { useState } from "react";

import { storeSubCatagoryImage } from 'firebase_action/images/addCatagory'

import { useNavigate } from "react-router-dom";

import UserService from 'services/userService';

import { viewSubCatagory } from 'routes/routesPath';

function AddSubCatagories() {
    const [disabledBtn, setDisabledBtn] = useState(false)

    //variable for form data
    const [data, setData] = useState({
        sub_catagory_name: "",
        sc_image: "",
        sc_catagory_id: ""
    })

    const navigate = useNavigate()

    const onClickAddBtn = async (e) => {
        e.preventDefault()
        if (data.sc_image === "" || data.sub_catagory_name === "") {
            alert("every feild is important")
        }
        else {
            setDisabledBtn(true)
            const image = await storeSubCatagoryImage(data.sc_image)
            const id = localStorage.getItem('catagory_id')
            const newData = {
                sub_catagory_name: data.sub_catagory_name,
                sc_image: image,
                sc_catagory_id: id
            }
            const initialData = await UserService.addSubCatagoryList(newData)
            if (initialData.success === true) {
                alert("data added successfully")
                navigate(`${viewSubCatagory}`)
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
            sc_image: e.target.files[0]
        })
    }

    const onClickDeletePreviewIcon = () => {
        setData({
            ...data,
            sc_image: "",
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
                                    Add Sub Catagories
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

export default AddSubCatagories