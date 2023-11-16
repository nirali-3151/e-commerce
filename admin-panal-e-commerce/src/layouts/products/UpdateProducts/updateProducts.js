import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { blueColour, table_shadow_color } from "constants/constants"

import FormCatagory from "layouts/catagories/form/form"
import { useEffect, useState, useRef } from "react";

import { storeProductsImage } from 'firebase_action/images/addCatagory'

import { useNavigate } from "react-router-dom";

import UpdateFormProduct from "./updateProductForm";
import UserService from 'services/userService'

import { useSelector, useDispatch } from 'react-redux'

import { viewProduct } from "routes/routesPath"

//add routes
import {
    viewCatagory
} from "routes/routesPath"
import _ from "lodash";

function UpdateProducts() {
    const Products = useSelector((state) => state.ProductReducer)
    const { update_product } = Products
    const navigate = useNavigate()

    //set multiple data
    const [size, setSizes] = useState([])
    const [images, setImages] = useState([])
    const [old_colors, set_old_Colors] = useState([])
    const [data, setData] = useState([])

    //error handling
    const [errors, setErrors] = useState({
        product_name: "",
        image_name: "",
        color: "",
        size: "",
        catagory_id: "",
        sub_catagory_id: 0,
        price: "",
        discount: 0
    })

    //set colors
    const [colors, setColors] = useState([]);

    // let images;

    //set images
    const [imageObj, setImageObj] = useState([]); //set image ibject
    const [imageObjNewData, setImageObjNewData] = useState([])
    const [imgArray, setImageArray] = useState([]); // array for set image preview
    const [imgDataFirebase, setimgDataFirebase] = useState([]);//set data for firbase array

    //set flag for display icon remove color and image from array icon 
    const [hoverIcon, setHoverIcon] = useState(false) //for color
    const [IndexValue, setIndexValue] = useState("") // for color

    const [hoverIcon1, setHoverIcon1] = useState(false) //for image
    const [IndexValue1, setIndexValue1] = useState("") //for image

    const [disabledBtn, setDisabledBtn] = useState(false)


    //payable amount
    const [PayableAmount, setPayableAmount] = useState(0)


    //set colors
    const colorPicker = e => {
        const newColor = {
            hex: e.hex,
            rgb: "(" + e.rgb.r + "," + e.rgb.g + "," + e.rgb.b + "," + e.rgb.a + ")"
        };
        setColors(newColor);
    };

    //form Validation handle
    const handleValidate = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'product_name':
                errors.product_name =
                    value.length === 0
                        ?
                        "product name is required feild*"
                        : '';
                break;

            case 'price':
                const regex = RegExp(/^[0-9]*$/)
                var matchNumber = value.match(regex)
                errors.price =
                    value.length === 0
                        ?
                        "price is required feild*"
                        : matchNumber === null ? "price can only numbers" : "";
                break;

            case 'sub_catagory_id':
                errors.sub_catagory_id =
                    value === 0
                        ?
                        "product name is required feild*"
                        : '';
                break;

            case 'images':
                errors.image_name =
                    value.length === 0
                        ?
                        "atleast one image required*"
                        : '';
                break

            case 'discount':
                const regex1 = RegExp(/^[0-9]*$/)
                var matchNumber = value.match(regex1)
                errors.discount =
                    matchNumber === null ? "price can only numbers" : "";
                break;
            default:
                break;
        }
        // this.setState({ errors })
        setErrors(errors)
    }

    // handle validate in submit btn
    const handleValidateOnSubmitBtn = (e) => {
        setErrors({
            ...errors,
            product_name: data.product_name.length === 0 ? "product name is required feild*" : "",
            sub_catagory_id: data.sub_catagory_id === "" ? "sub catagory is required feild*" : "",
            image_name: _.isEmpty(data.images) && !data.image_name || _.isEmpty(data.image_name) && _.isEmpty(data.images) ? "atleast one image required*" : "",
            price: data.price.length === 0 ? "Price is required feild*" : "",
        })
    }


    //on change handler for size 
    const onChangeHandlerSize = async (e) => {
        handleValidate(e)
        const {
            target: { value },
        } = e;
        setData({
            ...data,
            size: typeof value === 'string' ? value.split(',') : value,
        })
    }

    //set size data to empty when radio btn click
    const setSizeDataEmpty = () => {
        setData({
            ...data,
            size: [],
        })
    }

    //on change handle for price and discount
    const onChangeHandlerForPriceAndDiscount = async (e) => {
        handleValidate(e)
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const onChangeHandler = (e) => {
        handleValidate(e)
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    //add color on array
    const onClickAddColorBtn = () => {
        if(!colors.hex)
        {
            setData({
                ...data,
                color: ["#22194D"]
            })
        }
        else{
            setData({
                ...data,
                color: [...data.color, colors.hex]
            })
        }
    }

    const setPreviewImg = () => {
        for (let i = 0; i < imageObjNewData.length; i++) {
            imgArray.push(URL.createObjectURL(imageObjNewData[i]))
        }

        setData({
            ...data,
            image_name: imgArray
        })
    }

    useEffect(() => {
        _.isEmpty(imageObj) ?
            "" : setPreviewImg()
    }, [imageObjNewData])

    //update product
    const onClickAddBtn = async (e) => {
        handleValidateOnSubmitBtn(e)
        e.preventDefault();
        const data1 = data.product_name === "" || data.p_sub_catagory_id === 0 || _.isEmpty(data.images) && !data.image_name || _.isEmpty(data.image_name) && _.isEmpty(data.images) || data.price === "" || data.discount === "" || errors.price !== ""
        if (data1) {
            alert("somthing went wrong")
        }
        else {
            setDisabledBtn(true)

            let new_images = []
            if (!data.image_name) {
                null
            }
            else {
                new_images = await storeProductsImage(imageObj)
            }
            const id = data.product_id
            const newData = {
                product_name: data.product_name,
                price: data.price,
                discount: data.discount,
                p_sub_catagory_id: data.p_sub_catagory_id,
                size: data.size,
                colors: data.color,
                newly_added_images: new_images,
                images: data.images,
                old_size: size,
                old_images: images,
                old_colors: old_colors
            }
            const intialData = await UserService.updateProductList(id, newData)
            if (intialData.data.success === true) {
                alert("data updated succesfully")
                setDisabledBtn(true)
                navigate(`${viewProduct}`)
            }
        }
    }

    //add multiple images   
    const onClickAddImages = (e) => {
        handleValidate(e)
        let array = []
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImageObj((prevState) => [...prevState, newImage]);
            array.push(newImage)
        }
        setImageObjNewData(array);
    }

    //set flag for display icon remove color  from array icon onmouseover effect
    const setFlagOnMouseOver = (e, key) => {
        setIndexValue(key)
        setHoverIcon(true)
    }

    //set flag for display icon remove image from array icon onmouseleave effect
    const setFlagOnMouseLeave = () => {
        setHoverIcon(false)
    }

    // const remove color item from the array
    const removeItemFromArray = (key) => {
        const data1 = data.color.filter((o, i) => i !== key).map(x => x)
        setData({
            ...data,
            color: data1
        })
    }

    //set flag for display icon remove color and image from array icon onmouseover effect
    const setFlagOnMouseOver1 = (e, key) => {
        setIndexValue1(key)
        setHoverIcon1(true)
    }

    //set flag for display icon remove color and image from array icon onmouseleave effect
    const setFlagOnMouseLeave1 = () => {
        setHoverIcon1(false)
    }

    // const remove image item from the array
    const removeItemFromArray1 = (key) => {
        const data2 = imageObj.filter((o, i) => i !== key).map(x => x)
        const data1 = data.image_name.filter((o, i) => i !== key).map(x => x)
        setData({
            ...data,
            image_name: data1
        })
        setImageArray(data1)
        setImageObj(data2)

    }

    const removeImagesFromAlreadyExistedImages = (key) => {
        const data2 = data.images.filter((o, i) => o.product_image_id !== key).map(x => x)
        setData({
            ...data,
            images: data2
        })
    }

    //update size list for the first time and set data in data varialble
    const updateSizeListToArray = async () => {
        const size = await update_product.size.map((s) => {
            return (
                s.available_size
            )
        })
        const colors = await update_product.color.map((s) => {
            return (
                s.color_name
            )
        })
        setData(
            {
                ...update_product,
                size: size,
                color: colors
            }
        )
        setSizes(update_product.size)
        setImages(update_product.images)
        set_old_Colors(update_product.color)
    }

    //get data from am array
    useEffect(() => {
        updateSizeListToArray()
        if (_.isEmpty(update_product)) {
            navigate(-1)
        }
    }, [])

    return (
        <DashboardLayout>
            <MDBox pt={2} pb={0}
            >
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
                                    Update Products
                                </MDTypography>
                            </MDBox>
                            {
                                _.isEmpty(data) ? null :
                                    <div className="add-products-main-wrapper">

                                        <UpdateFormProduct
                                            // color
                                            hoverIcon={hoverIcon}
                                            setFlagOnMouseOver={setFlagOnMouseOver}
                                            setFlagOnMouseLeave={() => setFlagOnMouseLeave()}
                                            IndexValue={IndexValue}
                                            removeItemFromArray={removeItemFromArray}

                                            //image
                                            hoverIcon1={hoverIcon1}
                                            setFlagOnMouseOver1={setFlagOnMouseOver1}
                                            setFlagOnMouseLeave1={() => setFlagOnMouseLeave1()}
                                            IndexValue1={IndexValue1}
                                            removeItemFromArray1={removeItemFromArray1}
                                            removeImagesFromAlreadyExistedImages={removeImagesFromAlreadyExistedImages}

                                            PayableAmount={PayableAmount}
                                            colors={colors}
                                            colorPicker={(e) => colorPicker(e)}
                                            onChangeHandler={onChangeHandler}
                                            data={data}
                                            errors={errors}
                                            onChangeHandlerSize={onChangeHandlerSize}
                                            onClickAddColorBtn={() => onClickAddColorBtn()}
                                            onClickAddImages={(e) => onClickAddImages(e)}
                                            onClickAddBtn={(e) => onClickAddBtn(e)}
                                            onChangeHandlerForPriceAndDiscount={(e) => onChangeHandlerForPriceAndDiscount(e)}

                                            disabledBtn={disabledBtn}

                                            setSizeDataEmpty={() => setSizeDataEmpty()}
                                        />
                                    </div>

                            }
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    )
}

export default UpdateProducts