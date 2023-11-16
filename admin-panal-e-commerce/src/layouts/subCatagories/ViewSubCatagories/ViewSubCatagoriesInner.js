import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

import UserService from 'services/userService';

import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import {
    updateSubCatagoriesList,
    deleteSubCatagoriesList
} from "reduxStore/Actions/SubCatagoryAction"

import { updateSubCatagory } from "routes/routesPath"

import { Rings } from "react-loader-spinner";

function ViewSubCatagoriesInner(props) {

    const [icon, setIcon] = useState(false)
    const [catagoryId, setCatagoryId] = useState("")

    const Catagories = useSelector((state) => state.CatagoriesReducer)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onClickDeleteIcon = async (id) => {
        const initialData = await UserService.deleteSubCatagoryList(id)
        dispatch(deleteSubCatagoriesList(initialData))
    }

    const onClickEditIcon = (catagory) => {
        dispatch(updateSubCatagoriesList(catagory))
        navigate(`${updateSubCatagory}`)
    }

    const setIconFlagOnHoverToTrue = (catagory) => {
        setIcon(true)
        setCatagoryId(catagory.catagory_id)
    }

    const setIconFlagOnHoverToFalse = (catagory) => {
        setIcon(false)
    }

    return (
        <>
            <div className="view-catagories-main-wrapper-inner"
                onMouseEnter={() => {
                    setIconFlagOnHoverToTrue(props.cat_List)
                }}
                onMouseLeave={() => {
                    setIconFlagOnHoverToFalse(props.cat_List)
                }}
            >
                {icon && catagoryId === props.cat_List.catagory_id ?
                    <>
                        <div className="view-catagories-delete-icon">
                            <DeleteIcon
                                onClick={() => onClickDeleteIcon(props.cat_List.sub_catagory_id)}
                            />
                        </div>
                        <div className="view-catagories-edit-icon">
                            <ModeEditOutlineIcon
                                onClick={() => onClickEditIcon(props.cat_List)}
                            />
                        </div>
                    </> : ""
                }

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
                    <p className="view-catagory-img-view">
                        <img
                            src={`${props.cat_List.sc_image}`}
                            onLoad={props.imageLoaded}
                            className="cover" />
                    </p>
                </div>

                <p className="view-catagory-catagory-name">
                    {props.cat_List.sub_catagory_name}
                </p>
            </div>
        </>
    )

}

export default ViewSubCatagoriesInner