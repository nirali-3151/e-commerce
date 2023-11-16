import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { blueColour, table_shadow_color } from "constants/constants"

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

//style mui forms
import { makeStyles } from "@material-ui/core/styles";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit"

import CatagoryIcon from 'assets/images/img_preview.jpg'

import './form.css'

const useOutlinedInputStyles = makeStyles(theme => ({
    root: {

        '& label.Mui-focused': {
            color: 'orange',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
        },
        //   '& .MuiOutlinedInput-root': {
        //     '& fieldset': {
        //       borderColor: 'white',
        // },
        "& $notchedOutline": {
            borderColor: "black"
        },
        "&:hover $notchedOutline": {
            borderColor: "#167d7f",
            color: "#167d7f"
        },
        "&$focused $notchedOutline": {
            borderColor: "#167d7f"
        },

    },
    focused: {},
    notchedOutline: {}
}));

function FormCatagory(props) {
    const outlinedInputClasses = useOutlinedInputStyles();
    return (
        <>
            <MDBox mt={3} ml={2.5}>
                <MDBox mb={2} pr={2.5}>
                    <MDBox mb={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-dName">Sub Catagory Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-dName"
                                name="sub_catagory_name"
                                value={props.data.sub_catagory_name}
                                onChange={props.onChangeHandler}
                                label="Sub Catagory Name"
                                classes={outlinedInputClasses}
                                aria-describedby="outlined-weight-helper-text"
                            />
                        </FormControl>
                    </MDBox>

                    <MDTypography variant="h6" color="black" fontSize="14px" marginBottom="-10px">
                        Add Thumbnail Image :
                    </MDTypography>
                    <MDBox mb={2} justifyContent="center">
                        <MDBox
                            mt={2}
                            maxWidth="300px"
                            display="flex"
                            variant=""
                            justifyContent="center"
                            alignItems="center"
                            borderRadius="lg"
                            border="1px solid black"
                        >

                            <input
                                onChange={props.onClickAddThumbnailImg}
                                type="file"
                                name='sc_image'
                                id="sc_image"
                                accept="image/*"
                                style={{ display: "none" }}
                            />

                            {props.data.sc_image !== "" ?
                                <div className='preview_img' >
                                    {!props.updateFlag ?
                                        <>
                                            <img
                                                src={URL.createObjectURL(props.data.sc_image)}
                                                alt="Thumb"
                                                className='cover2'
                                                style={{ borderRadius: "8px" }}
                                            />
                                            <div className="form-data-delete-icon">
                                                <DeleteIcon
                                                    onClick={props.onClickDeletePreviewIcon} />
                                            </div>
                                        </>
                                        :
                                        <>
                                            {typeof (props.data.sub_c_image) === 'undefined' ?
                                                <img src={`${props.data.sc_image}`} className="cover2" style={{ borderRadius: "8px" }} />
                                                : ""}

                                            {props.data.sub_c_image && (
                                                <img
                                                    src={URL.createObjectURL(props.data.sub_c_image)}
                                                    alt="Thumb"
                                                    className='cover2'
                                                    style={{ borderRadius: "8px" }}
                                                />

                                            )}
                                            <div className="form-data-delete-icon">
                                                <label htmlFor="sc_image">
                                                    <EditIcon />
                                                </label>
                                            </div>
                                        </>
                                    }
                                </div>
                                :
                                <div className='preview_img' >
                                    <label htmlFor="sc_image">
                                        <img
                                            src={`${CatagoryIcon}`}
                                            className="cover2"
                                            style={{ borderRadius: "8px" }}
                                        />
                                    </label>
                                </div>
                            }
                        </MDBox>
                    </MDBox>

                    <MDBox pt={3} pb={2}>
                        <MDBox
                            mx={0}
                            mt={-3}
                            py={0.75}
                            px={2}
                            variant=""
                            bgColor={blueColour}
                            borderRadius="lg"
                            coloredShadow={table_shadow_color}
                            onClick={props.disabledBtn ? null : props.onClickAddBtn}
                            style={{ cursor: props.disabledBtn ? "wait" : "pointer" }}
                        >
                            <MDTypography variant="h6" color="white" align="center">
                                {!props.updateFlag ? "Add Sub catagories" : "Update Sub catagories"}
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </MDBox>
        </>
    )
}

export default FormCatagory