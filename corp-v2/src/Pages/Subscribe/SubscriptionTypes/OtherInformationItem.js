import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from 'react-redux';
import { actionSagaGetCorporateSingleSubscriptionRequest } from "../../../Store/Actions/SagaActions/SubscriptionSagaAction";
import { Modal } from "reactstrap";
// import CustomModal from "../../../../Components/CustomModal";
// import PgkTextField from '../../../../Components/FormFields/PgkTextField';
// import { actionSagaGetCorporateSingleSubscriptionRequest } from '../../../../Store/Actions/SagaActions/SubscriptionSagaAction';

const OtherInformationItem = (props) => {
    console.log(props,'OTHErzz ')
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [otherInfo, setOtherInfo] = useState();
 
  const getPublishedData = (id) => {
    dispatch(actionSagaGetCorporateSingleSubscriptionRequest({
      apiPayloadRequest: {
        type: 'OTHER_INFORMATION',
        id: id
      },
      callback: (response) => {
        setOtherInfo(response);
        setShowModal(true);
      }
    }));
  }

  return (
    <>
      <div
        className="univ-sub-item d-flex justify-content-between align-items-center"
        key={props?.index}
        style={{padding:15}}
      >
        <div className="sub-type-container d-flex">
          <i className="far fa-file-alt icon" />
          <p className="sub-label" style={{fontWeight:'bold'}}>{props?.item?.generalNote}</p>
        </div>
        <div className="vertical-border" />
        <div className="name-address d-flex flex-column align-items-start">
          <p className="title">{props?.item?.publisherName}</p>
          {props?.item?.location?.trim()!=='' && <p className="sub-title">
            <i className="fas fa-map-marker-alt" /> {props?.item?.location}
          </p>}
        </div>
        <div className="vertical-border" />
        <div className="sub-item-container d-flex flex-column align-items-center">
          <p className="sub-title">{props?.item?.info?.Title}</p>
        </div>
        <div className="vertical-border" />
        <button
          type="button"
          className="view-info-btn btn d-flex justify-content-around align-items-center"
          style={{
            height: "20px",
            maxWidth: "100px",
            fontSize: ".600rem",
            borderRadius: "4px",
          }}
          onClick={() => {
            if(props?.item?.isSubscribed) {
              getPublishedData(props?.item?.publishID);
            } else if(props?.getDetails) {
              getPublishedData(props?.item?.publishID ? props?.item?.publishID : props?.item?.publishId);
            } else {
              if(props?.subscribeHandler) {
                props.subscribeHandler();
              }
            }
            // setShowModal(true);
          }}
        >
          View Information
        </button>
      </div>

      {showModal && <Modal show={showModal}>
        <div className="hiring-modal">
          <div className="modal-header hiring-modal-header">
            <h5
              className="modal-title"
              style={{ fontSize: "1rem" }}
              id="exampleModalLabel"
            >
              Other Information : {props?.item?.publisherName}
            </h5>
            <button
              type="button"
              className="close"
              style={{ fontSize: "1rem" }}
              onClick={() => {
                setShowModal(false);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {/* <form className="hiring-modal-form">
            <div className="row">
              <div className="col-md">
                <div className="modal-grp">
                  <PgkTextField
                      value={otherInfo?.publishID}
                      label={'Publish ID'}
                      inputLabelProps={{style:{fontSize: '.800rem'}}}
                      inputProps={{style:{fontSize: '.800rem'}}}
                      disabled
                  />
                </div>
              </div>
              <div className="col-md">
                <div className="modal-grp">
                  <PgkTextField 
                      value={otherInfo?.dateOfPublish ? `Published on ${moment(otherInfo?.dateOfPublish).format("DD-MM-YYYY")}`: ''}
                      label={'Published Date & Time'}
                      inputLabelProps={{style:{fontSize: '.800rem'}}}
                      inputProps={{style:{fontSize: '.800rem'}}}
                      disabled
                  />
                </div>
              </div>
              <div className="w-100"></div>
              <div className="col-md">
                <div className="modal-grp">
                  <PgkTextField 
                      value={otherInfo?.title ? otherInfo?.title : ''}
                      label={'Title'}
                      inputLabelProps={{style:{fontSize: '.800rem'}}}
                      inputProps={{style:{fontSize: '.800rem'}}}
                      disabled
                  />
                </div>
              </div>
              <div className="w-100"></div>
              <div className="col-md">
                <div className="modal-grp">
                  <PgkTextField
                    value={otherInfo?.information ? otherInfo?.information : ''}
                    label={"Content"}
                    disabled
                    multiline={true}
                    minRows={6}
                    inputLabelProps={{style:{fontSize: '.800rem'}}}
                    inputProps={{style:{fontSize: '.800rem'}}}
                  />
                </div>
              </div>
              <div className="w-100"></div>
              {(otherInfo?.attachment && otherInfo?.attachment?.trim()!=='' && otherInfo?.attachmentName?.trim()!=='') ?
                <div className="d-flex justify-content-between align-items-center attachmentStripeContainer w-full">
                <p className="label">Attachment Present (if any)</p>
                <a href={'data:application/pdf;base64,'+otherInfo?.attachment} style={{textDecoration:'none', outline:'none', width:'70%'}} download>
                  <div className="attachmentStripe d-flex justify-content-between align-items-center">
                      <p>{otherInfo?.attachmentName}</p>
                      <i className="fas fa-paperclip"></i>
                  </div>
                </a>
              </div> : null}
            </div>
          </form> */}
        </div>
      </Modal>}
    </>
  );
};

export default OtherInformationItem;
