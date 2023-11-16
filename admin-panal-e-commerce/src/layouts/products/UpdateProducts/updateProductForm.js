import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { blueColour, table_shadow_color } from "constants/constants"

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from '@mui/icons-material/Close';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

//color-picker
import { ChromePicker } from "react-color";

import { Number, romanNumber, KG, Gram, Liter } from '../form/sizeList'

//style mui forms
import { makeStyles } from "@material-ui/core/styles";

import UserService from "services/userService";

import CatagoryIcon from 'assets/images/img_preview.jpg'

import _ from "lodash"
import { useEffect, useState, useRef } from "react";

const useOutlinedInputStyles = makeStyles(theme => ({
    root: {

        '& label.Mui-focused': {
            color: 'orange',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
        },
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


function UpdateFormProduct(props) {
    let data = []

    const [catagoryData, setCatagoryData] = useState([])
    const [sub_catagoryData, setsub_catagoryData] = useState([])

    const [radio_btn, setRadioBtn] = useState("")

    //catagory data api call
    const getCatagoryData = async () => {
        const initialData = await UserService.viewCatagoriesList()
        setCatagoryData(initialData)
    }

    useEffect(() => {
        getCatagoryData()
    }, [])

    //get sub catagory data
    const getSubCatagoryData = async () => {
        const initialData = await UserService.viewSubCatagoryList(props.data.catagory_id)
        setsub_catagoryData(initialData.data)
    }

    useEffect(() => {
        getSubCatagoryData()
    }, [props.data.catagory_id])

    const handleChangeForRadioBtn = (e) => {
        setRadioBtn(e.target.value)
        props.setSizeDataEmpty()
    }


    const outlinedInputClasses = useOutlinedInputStyles();
    const { color } = props.data
    const { images,
        catagory_id,
        sub_catagory_id,
        price,
        discount,
        size,
        image_name
    } = props.data

    return (
        <>
            <MDBox mt={2} ml={2.5}>
                <MDBox mb={0} pr={2.5}>

                    {/* product name */}
                    <MDBox mb={2.5}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-dName">Product Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-dName"
                                name="product_name"
                                value={props.data.product_name}
                                onChange={props.onChangeHandler}
                                label="Product Name"
                                classes={outlinedInputClasses}
                                aria-describedby="outlined-weight-helper-text"
                            />
                            {props.errors.product_name.length > 0 && <span className='error'>{props.errors.product_name}</span>}
                        </FormControl>
                    </MDBox>

                    {/* select catagory */}
                    <MDBox mb={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-dName">Select Catagory</InputLabel>
                            <Select
                                style={{ height: "44px" }}
                                labelId="demo-simple-select-label"
                                id="outlined-adornment-lName"
                                label="Select Catagory"
                                name="catagory_id"
                                value={catagory_id}
                                onChange={props.onChangeHandler}
                            >
                                {catagoryData.map(data => {
                                    return (
                                        <MenuItem key={data.catagory_id} value={data.catagory_id}>
                                            {data.catagory_name}
                                        </MenuItem>
                                    )
                                })
                                }
                            </Select>
                        </FormControl>
                    </MDBox>

                    {/* select sub catagory */}
                    <MDBox mb={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-dName">Select Sub Catagory</InputLabel>
                            <Select
                                style={{ height: "44px" }}
                                labelId="demo-simple-select-label"
                                id="outlined-adornment-lName"
                                label="Select sub Catagory"
                                name="sub_catagory_id"
                                value={sub_catagory_id}
                                onChange={props.onChangeHandler}
                            >
                                {
                                    catagory_id === "" ?
                                        <MenuItem className="add-product-menu-item">
                                            <p className="add-product-menu-item">
                                                first select catagory
                                            </p>
                                        </MenuItem> :
                                        !sub_catagoryData || sub_catagoryData.length === 0 ?
                                            <MenuItem >
                                                <p className="add-product-menu-item">
                                                    this user does not contain any sub catagory
                                                </p>
                                            </MenuItem>
                                            :
                                            sub_catagoryData.map(data => {
                                                return (
                                                    <MenuItem key={data.sub_catagory_id} value={data.sub_catagory_id}>
                                                        {data.sub_catagory_name}
                                                    </MenuItem>
                                                )
                                            })
                                }

                            </Select>
                            {props.errors.sub_catagory_id.length > 0 && <span className='error'>
                                {props.errors.sub_catagory_id}
                            </span>}
                        </FormControl>
                    </MDBox>

                    {/* select size */}
                    <MDBox mb={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-dName">Select Size : </InputLabel>
                            <Select
                                style={{ height: "44px" }}
                                labelId="demo-simple-select-label"
                                id="outlined-adornment-lName"
                                label="Select size"
                                name="size"
                                value={size}
                                onChange={props.onChangeHandlerSize}
                                multiple
                            >
                                <MenuItem>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        value={radio_btn}
                                        onChange={handleChangeForRadioBtn}
                                    >
                                        <div className="radio-buttons-group-select-size">
                                            <FormControlLabel className="radio-buttons-group-select-size-inner" value="1" control={<Radio />} label="Number" />
                                            <FormControlLabel className="radio-buttons-group-select-size-inner" value="2" control={<Radio />} label="Roman Number" />
                                            <FormControlLabel className="radio-buttons-group-select-size-inner" value="3" control={<Radio />} label="KG" />
                                            <FormControlLabel className="radio-buttons-group-select-size-inner" value="4" control={<Radio />} label="Gram" />
                                            <FormControlLabel className="radio-buttons-group-select-size-inner" value="5" control={<Radio />} label="Liter" />
                                        </div>
                                    </RadioGroup>
                                </MenuItem>
                                {radio_btn === '1' ?
                                    Number.map((data, i) => {
                                        return (
                                            <MenuItem value={data} key={i}>
                                                {data}
                                            </MenuItem>
                                        )
                                    })
                                    : ""
                                }

                                {radio_btn == '2' ?
                                    romanNumber.map((data, i) => {
                                        return (
                                            <MenuItem value={data} key={i}>
                                                {data}
                                            </MenuItem>
                                        )
                                    }) : ""}

                                {radio_btn === '3' ?
                                    KG.map((data, i) => {
                                        return (
                                            <MenuItem value={data} key={i}>
                                                {data}
                                            </MenuItem>
                                        )
                                    }) : ""}

                                {radio_btn === '4' ?
                                    Gram.map((data, i) => {
                                        return (
                                            <MenuItem value={data} key={i}>
                                                {data}
                                            </MenuItem>
                                        )
                                    }) : ""}

                                {radio_btn === '5' ?
                                    Liter.map((data, i) => {
                                        return (
                                            <MenuItem value={data} key={i}>
                                                {data}
                                            </MenuItem>
                                        )
                                    }) : ""}
                            </Select>
                        </FormControl>
                    </MDBox>


                    {/* add colors */}
                    <>
                        <MDTypography variant="h6" color="black" fontSize="14px" marginBottom="3px">
                            Add colors :
                        </MDTypography>
                        <MDBox mb={2}>
                            <div className="add-propduct-color-picker">
                                <ChromePicker
                                    color={props.colors !== null && props.colors.hex}
                                    onChange={props.colorPicker}
                                    disableAlpha
                                    renderers={false}
                                />
                                <MDBox pt={25} pl={3} pb={1}>
                                    <MDBox
                                        mx={0}
                                        mt={0}
                                        px={2}
                                        variant=""
                                        bgColor={blueColour}
                                        borderRadius="lg"
                                        coloredShadow={table_shadow_color}
                                    >
                                        <MDTypography
                                            variant="h6"
                                            color="white"
                                            align="center"
                                            style={{ cursor: "pointer", width: "85px" }}
                                            onClick={props.onClickAddColorBtn}
                                        >
                                            Add Colors
                                        </MDTypography>
                                    </MDBox>
                                </MDBox>

                                <div className="form-color-data-display">
                                    {_.isEmpty(color) ? "Choose colors" :
                                        color.map((c, key = { i }) => {
                                            return (
                                                <div
                                                    key={key}
                                                    className="form-product-color-wrapper"
                                                    onMouseEnter={(e) => props.setFlagOnMouseOver(e, key)}
                                                    onMouseLeave={props.setFlagOnMouseLeave}
                                                >
                                                    <div className="form-product-color-round"
                                                        style={{ backgroundColor: `${c}` }}>
                                                    </div>
                                                    <div
                                                        className="form-product-hex-value">
                                                        {c}
                                                    </div>
                                                    <>
                                                        {props.hoverIcon && props.IndexValue === key ?
                                                            <CloseIcon
                                                                onClick={() => props.removeItemFromArray(key)}
                                                                className="close-icon-colors"
                                                                style={{ fontSize: "8px" }} />
                                                            : ""}
                                                    </>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        </MDBox>
                    </>


                    {/* add images */}
                    <>
                        <input
                            onChange={props.onClickAddImages}
                            type="file"
                            name='images'
                            id="images"
                            accept="image/*"
                            style={{ display: "none" }}
                            multiple
                        />
                        <MDTypography variant="h6" color="black" fontSize="14px" marginBottom="3px">
                            Add images :
                        </MDTypography>
                        <MDBox mb={2.5}>
                            <div className="add-propduct-image-select">
                                <div className="add-propduct-image-select-left-side">
                                    <div className="add-propduct-image-select-left-side-inner">
                                        <label htmlFor="images">
                                            <img
                                                src={`${CatagoryIcon}`}
                                                className="cover2"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="add-propduct-image-select-right-side">
                                    {_.isEmpty(images) && !image_name ? "select images" :
                                        images.map((url, key) => (
                                            <div
                                                className="add-propduct-image-select-right-side-preview"
                                                key={url.product_image_id}
                                                onMouseEnter={(e) => props.setFlagOnMouseOver1(e, url.product_image_id)}
                                                onMouseLeave={props.setFlagOnMouseLeave1}
                                            >
                                                <img
                                                    className="cover2"
                                                    src={url.image_name}
                                                    alt="..." />
                                                {props.hoverIcon1 && props.IndexValue1 === url.product_image_id ?
                                                    <CloseIcon
                                                        onClick={() => props.removeImagesFromAlreadyExistedImages(url.product_image_id)}
                                                        className="close-icon-image"
                                                        style={{ fontSize: "8px" }} />
                                                    : ""}
                                            </div>
                                        ))
                                    }

                                    {_.isEmpty(image_name) && _.isEmpty(images) ? "" :
                                        (image_name || []).map((url, key) => (
                                            <div
                                                className="add-propduct-image-select-right-side-preview"
                                                key={key}
                                                onMouseEnter={(e) => props.setFlagOnMouseOver1(e, key)}
                                                onMouseLeave={props.setFlagOnMouseLeave1}
                                            >
                                                <img
                                                    className="cover2"
                                                    src={url}
                                                    alt="..." />
                                                {props.hoverIcon1 && props.IndexValue1 === key ?
                                                    <CloseIcon
                                                        onClick={() => props.removeItemFromArray1(key)}
                                                        className="close-icon-image"
                                                        style={{ fontSize: "8px" }} />
                                                    : ""}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            {props.errors.image_name.length > 0 && <span className='error' style={{ margintop: "-10px" }}>
                                {props.errors.image_name}
                            </span>}
                        </MDBox>
                    </>

                    {/* add price */}
                    <MDBox mb={2.5}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-dName">Price</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-dName"
                                name="price"
                                value={price}
                                onChange={props.onChangeHandlerForPriceAndDiscount}
                                label="price"
                                classes={outlinedInputClasses}
                                aria-describedby="outlined-weight-helper-text"
                            />
                            {props.errors.price.length > 0 && <span className='error'>
                                {props.errors.price}
                            </span>}
                        </FormControl>
                    </MDBox>

                    {/* add discount */}
                    <MDBox mb={2.5}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-dName">Discount</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-dName"
                                name="discount"
                                value={discount}
                                onChange={props.onChangeHandlerForPriceAndDiscount}
                                label="Discount"
                                classes={outlinedInputClasses}
                                aria-describedby="outlined-weight-helper-text"
                            />
                              {props.errors.discount.length > 0 && <span className='error'>
                                {props.errors.discount}
                            </span>}
                        </FormControl>
                    </MDBox>

                    {/* user price by adding discount */}
                    {/* <MDBox mb={2.5}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-dName">Payable amount by user</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-dName"
                                name="PayableAmount"
                                value={props.PayableAmount}
                                label="Payable amount by user"
                                classes={outlinedInputClasses}
                                aria-describedby="outlined-weight-helper-text"
                            />
                        </FormControl>
                    </MDBox> */}

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
                        >
                            <MDTypography variant="h6" color="white" align="center"
                                style={{ cursor: props.disabledBtn ? "wait" : "pointer" }}
                            >
                                {/* // style={{ cursor: "pointer" }}> */}
                                Update product
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </MDBox>
        </>
    )
}

export default UpdateFormProduct
