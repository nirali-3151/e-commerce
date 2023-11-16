import { size } from "lodash";
import { useState, useEffect, useRef } from "react"
import { TailSpin } from "react-loader-spinner";


//add components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { blueColour, table_shadow_color } from "constants/constants"

import React from "react";
import UserService from "services/userService";
import { useNavigate } from "react-router-dom";

import {viewProduct} from "routes/routesPath"
import { useDispatch } from "react-redux";
import {updateProductList} from "reduxStore/Actions/ProductsAction"

import {updateProduct} from "routes/routesPath"

function ViewProductIdInner(props) {

    const dispatch = useDispatch()

    const [imgId, setImgId] = useState("")
    const [loading, setLoading] = useState(true)
    const counter = useRef(0);

    const navigate = useNavigate()

    //set id to view main image
    const onClickPreviewImage = (img) => {
        setImgId(img)
    }

    const imageLoaded = () => {
        counter.current += 1;
        if (props.product_id.length !== 0) {
            if (counter.current <= props.product_id[0].images.length) {
                setLoading(false);
            }
        }
    }

    const onClickEditProducts = async (pro) => {
        dispatch(updateProductList(pro))
        navigate(`${updateProduct}`)
    }

    const onClickDeleteProducts = async (pro) => {
        const id = pro.product_id
        const initialData = await UserService.deleteProductList(id)
        alert("this product is deleted")
        navigate(`${viewProduct}`)
    }

    useEffect(() => {
        _.isEmpty(props.product_id) ?
            "" :
            setImgId(props.product_id[0].images[0])
    }, [])

    return (
        <>
            {
                _.isEmpty(props.product_id) ?
                    ""
                    :
                    props.product_id.map((pro) => {
                        return (
                            <React.Fragment key={pro.product_id}>
                                <div className="view-product-with-id-main-wrapper-inner-left">
                                    <div className="view-product-with-id-left-display-preview-image-main">
                                        {
                                            pro.images.map((img) => {
                                                return (
                                                    <React.Fragment key={img.product_image_id}>
                                                        <div
                                                            style={{ display: loading ? "flex" : "none", justifyContent: "center", alignItems: "center" }}
                                                            className="view-product-with-id-left-display-preview-image"
                                                            onClick={() => { onClickPreviewImage(img) }}
                                                            onLoad={() => imageLoaded()}
                                                        >
                                                            <TailSpin
                                                                type="Puff"
                                                                color="rgba(22, 125, 127, 0.5)"
                                                                height={50}
                                                                width={50}
                                                            />
                                                        </div>
                                                        <div
                                                            style={{ display: loading ? "none" : "flex" }}
                                                            className="view-product-with-id-left-display-preview-image"
                                                            onClick={() => { onClickPreviewImage(img) }}
                                                            onLoad={() => imageLoaded()}
                                                        >
                                                            <img
                                                                src={`${img.image_name}`}
                                                                className="cover2"
                                                            />
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="view-product-with-id-left-display-preview-image-main-right">
                                        <div className="view-product-with-id-left-display-preview-image-main-right-inner"
                                            style={{ display: loading ? "flex" : "none", justifyContent: "center", alignItems: "center", height: "90%" }}
                                        >
                                            <TailSpin
                                                type="Puff"
                                                color="rgba(22, 125, 127, 0.5)"
                                                height={70}
                                                width={70}
                                            />
                                        </div>
                                        <div className="view-product-with-id-left-display-preview-image-main-right-inner"
                                            style={{ display: loading ? "none" : "flex" }}
                                            onLoad={() => imageLoaded()}
                                        >
                                            <div className="view-product-main-wrapper-inner-discount-wrapper"
                                                style={{ top: "15px", left: "15px" }}>
                                                <span className="view-product-main-wrapper-inner-discount-number">
                                                    {pro.discount}
                                                </span>
                                                <span className="view-product-main-wrapper-inner-discount-percen">
                                                    %
                                                </span>
                                                <div className="view-product-main-wrapper-inner-discount-off">
                                                    off
                                                </div>
                                            </div>
                                            <img
                                                src={`${imgId.image_name}`}
                                                className="cover2"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="view-product-with-id-main-wrapper-inner-right">
                                    <div className="view-product-with-id-product-name">
                                        {pro.product_name}
                                    </div>
                                    <span className="view-product-with-id-product-price-after-discount">
                                        ₹{(pro.final_price)}
                                    </span>

                                    <span className="view-product-with-id-product-price">
                                        M.R.P:
                                        <span
                                            className="view-product-with-id-product-price-after-discount"
                                            style={{ fontSize: "18px", paddingLeft: "7px", textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                                            ₹ {pro.price}
                                        </span>
                                    </span>
                                    <div className='view-cart-display-data-product-save-money'
                                        style={{ lineHeight: "2", fontSize: "16px" ,color:"#00a651"}}>
                                        You  Save ₹{(pro.price - pro.final_price)}
                                    </div>
                                    <div className="View-product-data-id-in-stock">
                                        In Stock
                                    </div>
                                    <span style={{ marginRight: "7px", lineHeight: "1.5" }}>
                                        Inaugural Offer
                                    </span>
                                    <span style={{ fontWeight: "700" }}>
                                        Free Shipping
                                    </span>

                                    {_.isEmpty(pro.color) ? null :
                                        <>
                                            <div className="View-product-data-id-color-design-color-header"
                                            >
                                                Colours are:
                                            </div>
                                            <div className="View-product-data-id-color-design">
                                                {
                                                    pro.color.map((c) => {
                                                        return (
                                                            <React.Fragment key={c.color_id}>
                                                                <div className="View-product-data-id-color-dots-wrapper-main">
                                                                    <div
                                                                        className="View-product-data-id-color-dots"
                                                                        style={{ backgroundColor: `${c.color_name}` }} >
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </>
                                    }

                                    {_.isEmpty(pro.size) ? null :
                                        <>
                                            <div className="View-product-data-id-color-design-color-header">
                                                Sizes are:
                                            </div>
                                            <div className="View-product-data-design-product-size-wrapper">
                                                {
                                                    pro.size.map((s) => {
                                                        return (
                                                            <React.Fragment key={s.size_id}>
                                                                <div className="View-product-data-design-product-size-display">
                                                                    {s.available_size}
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </>
                                    }

                                    <Grid item  md={12} xl={6}>
                                        <MDBox
                                            mt={2}
                                            mr={2}
                                            py={0.8}
                                            px={4}
                                            bgColor="#167d7f"
                                            left="0"
                                            borderRadius="lg"
                                            style={{display:"flex" , justifyContent:"center"}}
                                            coloredShadow={table_shadow_color}
                                            onClick={() => onClickEditProducts(pro)}
                                        >
                                            <MDTypography variant="h6" color="white" style={{ cursor: "pointer" }}>
                                                Edit Products
                                            </MDTypography>
                                        </MDBox>
                                        <MDBox
                                            // mx={3}
                                            mt={2}
                                            mr={2}
                                            py={0.8}
                                            px={4}
                                            bgColor="#167d7f"
                                            style={{display:"flex" , justifyContent:"center"}}
                                            left="0"
                                            borderRadius="lg"
                                            coloredShadow={table_shadow_color}
                                            onClick={() => onClickDeleteProducts(pro)}
                                        >
                                            <MDTypography variant="h6" color="white" style={{ cursor: "pointer" }}>
                                                Delete Products
                                            </MDTypography>
                                        </MDBox>
                                    </Grid>
                                </div>
                            </React.Fragment>
                        )
                    })
            }
        </>
    )
}

export default ViewProductIdInner