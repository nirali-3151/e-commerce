import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { blueColour, table_shadow_color } from "constants/constants"

import FormCatagory from "layouts/catagories/form/form"
import { useEffect, useState } from "react";

import { storeCatagoryImage } from 'firebase_action/images/addCatagory'

import { useNavigate } from "react-router-dom";

import UserService from 'services/userService'

import { useSelector, useDispatch } from 'react-redux'

//add routes
import {
    viewCatagory
} from "routes/routesPath"

function UpdateCatagories() {

    const [data, setData] = useState({
        catagory_name: "",
        thumbNail_image: ""
    })

    const [disabledBtn, setDisabledBtn] = useState(false)

    const [updateFlag, setUpdateFlag] = useState(true)

    const Catagories = useSelector((state) => state.CatagoriesReducer)

    const navigate = useNavigate()

    // const prevCount = usePrevious(count);

    const onClickAddBtn = async (e) => {
        e.preventDefault()
        if (data.thumbNail_image === "" || data.catagory_name === "") {
            alert("every feild is important")
        }
        else {
            if (!data.thumbNail_image) {
                setDisabledBtn(true)
                const image = data.thumb_nail_image
                const newData = {
                    catagory_name: data.catagory_name,
                    thumb_nail_image: image,
                }
                const id = data.catagory_id
                const initialData = await UserService.updateCatagoryList(id, newData)
                if (initialData.success === true) {
                    alert("data updated successfully")
                    navigate(`${viewCatagory}`)
                }
            }
            else {
                setDisabledBtn(true)
                const image = await storeCatagoryImage(data.thumbNail_image)
                const newData = {
                    catagory_name: data.catagory_name,
                    thumb_nail_image: image,
                }
                const id = data.catagory_id
                const initialData = await UserService.updateCatagoryList(id, newData)
                if (initialData.success === true) {
                    alert("data updated successfully")
                    navigate(`${viewCatagory}`)
                }
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
            thumbNail_image: e.target.files[0]
        })
    }

    const onClickDeletePreviewIcon = () => {
        setData({
            ...data,
            thumbNail_image: "",
        })
    }

    useEffect(() => {
        const cata_data = Catagories.update_cat
        if (_.isEmpty(cata_data)) {
            navigate(`${viewCatagory}`)
        }
        setData(cata_data)
    }, [])

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
                                    Update Catagories
                                </MDTypography>
                            </MDBox>
                            <FormCatagory
                                disabledBtn={disabledBtn}
                                onClickAddThumbnailImg={(e) => onClickAddThumbnailImg(e)}
                                onChangeHandler={onChangeHandler}
                                data={data}
                                onClickDeletePreviewIcon={onClickDeletePreviewIcon}
                                onClickAddBtn={(e) => onClickAddBtn(e)}
                                updateFlag={updateFlag}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    )
}

export default UpdateCatagories