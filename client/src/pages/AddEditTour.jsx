import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { useSelector, useDispatch } from "react-redux";
import { createfood, updatePost } from "../redux/features/foodSlice";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

export const AddEditTour = () => {
  const [foodData, setFoodData] = useState(initialState);
  const { error, loading, userFoods } = useSelector((state) => ({
    ...state.food,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, description, tags } = foodData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singlePost = userFoods.find((food) => food._id === id);
      setFoodData({ ...singlePost });
    }
  }, [id]);
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags) {
      const updatedPostData = { ...foodData, name: user?.user?.name };
      console.log(updatedPostData);
      if (!id) {
        dispatch(createfood({ updatedPostData, navigate, toast }));
      } else {
        dispatch(updatePost({ id, updatedPostData, toast, navigate }));
      }

      handelClear();
    }
  };

  const handelClear = () => {
    setFoodData({ title: "", description: "", tags: [] });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setFoodData({ ...foodData, tags: [...foodData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setFoodData({
      ...foodData,
      tags: foodData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  return (
    <div
      className="container"
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center", //align all items vertically.
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update Post" : "Add Post"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handelSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide title"
              />
            </div>

            <div className="col-md-12">
              <textarea
                type="text"
                style={{ height: "100px" }}
                placeholder="Enter Description"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div className="d-flex-justify-content-start">
              {/* converts image into base64 */}
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setFoodData({ ...foodData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {id ? "UPDATE" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handelClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};
