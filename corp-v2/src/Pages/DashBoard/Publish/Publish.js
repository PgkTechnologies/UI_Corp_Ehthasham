import React, { useEffect, useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actionGetPublishOtherInformationListRequest } from "../../../Store/Actions/SagaActions/OtherInformationSagaActions";

const Publish = (props) => {
    const dispatch = useDispatch();

    let isNotDisabled =
        props.allProfiles?.publishedFlag === false;

    console.log(props.allProfiles, 'hihiihi')

    useEffect(() => {
        getPublishedOtherInformation();
      }, [])

    const getPublishedOtherInformation = () => {
        dispatch(
            actionGetPublishOtherInformationListRequest({
                callback: onOtherInformationListResponse,
            })
        );
    }

    const onOtherInformationListResponse = (resp) => {
        console.log(resp, 'respoinse')
    }



    return (
        <Modal
            show={props?.showPublish}
            onHide={props?.handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title className="d-flex justify-content-center align-items-center">
                    <h2>Select Sections to Publish</h2>{" "}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    <form onSubmit={props?.handleSubmit}>
                        {isNotDisabled ? (
                            <div className="d-flex" style={{ flexDirection: "column" }}>
                                {props?.allProfiles?.publishedFlag === false ? (
                                    <ListGroup.Item>
                                        <div className="d-flex">
                                            <input
                                                type="checkbox"
                                                name="universityProfile"
                                                id="universityProfile"
                                                onChange={props?.handleChange}
                                            />
                                            <label className="sub-title" htmlFor="universityProfile">
                                                Your Profile
                                            </label>
                                        </div>
                                    </ListGroup.Item>
                                ) : (
                                    <></>
                                )}


                                {/* {props.allProfiles?.OterInformation  ? ( */}
                                    {/* <ListGroup.Item>
                                        <div className="d-flex">
                                            <input
                                                type="checkbox"
                                                name="OterInformation"
                                                id="OterInformation"
                                                onChange={props?.handleChange}
                                            />
                                            <label className="sub-title" htmlFor="OterInformation">
                                                Other Information
                                            </label>
                                        </div>
                                    </ListGroup.Item> */}
                                {/* ) : (
                                    <></>
                                )} */}

                            </div>
                        ) : (
                            <></>
                        )}


                        <div className="d-flex justify-content-center align-items-center mt-5">
                            <button type="submit" className="btn" disabled={!isNotDisabled}>
                                Publish
                            </button>
                        </div>
                    </form>
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
}

export default Publish;