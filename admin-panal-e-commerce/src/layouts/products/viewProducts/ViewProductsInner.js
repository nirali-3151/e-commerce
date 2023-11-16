//set react router
import { useNavigate } from "react-router-dom";

//import route
import { viewProductIds } from "routes/routesPath"

//import redux data
import { viewProductDataId } from "reduxStore/Actions/ProductsAction"
import { useSelector, useDispatch } from 'react-redux'

import { Rings } from "react-loader-spinner";

function ViewProductsInner(props) {

    const Products = useSelector((state) => state.ProductReducer)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onClickViewProductWithId = (product_data) => {
        dispatch(viewProductDataId(product_data))
        navigate(`/view-products-with-id?product_id=${product_data.product_id}`)
    }

    const { product_name,
        images,
        price,
        discount,
        final_price
    } = props.product_List

    return (
        <span
            className="view-product-main-wrapper-inner"
            onClick={() => onClickViewProductWithId(props.product_List)}>
            <div className="view-product-main-wrapper-inner-discount-wrapper">
                <span className="view-product-main-wrapper-inner-discount-number">
                    {discount}
                </span>
                <span className="view-product-main-wrapper-inner-discount-percen">
                    %
                </span>
                <div className="view-product-main-wrapper-inner-discount-off">
                    off
                </div>
            </div>

            <div style={{ display: props.loading ? "block" : "none" }}>
                <p className="view-catagory-loader">
                    <Rings
                        type="Puff"
                        color="rgb(27, 134, 192)"
                        height={100}
                        width={100}
                    />
                </p>
            </div>

            <div style={{ display: props.loading ? "none" : "block" }}>
                <div className="view-product-main-wrapper-inner-display-image">
                    {
                        _.isEmpty(images) ? ""
                            : <img
                                onLoad={props.imageLoaded}
                                className="view-product-main-wrapper-inner-display-image-img"
                                src={images[0].image_name} />
                    }
                </div>
            </div>
            <div className="view-product-main-wrapper-inner-display-detail">
                <div className="view-product-main-wrapper-inner-display-product-name">
                    {product_name}
                </div>
                <div className='view-cart-display-data-product-price-discount'>
                    ₹{final_price}
                </div>
                <div className="view-product-main-wrapper-inner-display-price">
                    M.R.P : {price}
                </div>
            </div>
        </span>
    )
}

export default ViewProductsInner