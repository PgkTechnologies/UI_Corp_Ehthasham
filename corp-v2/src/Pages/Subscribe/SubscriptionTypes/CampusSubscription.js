import AccountBalance from "@mui/icons-material/AccountBalance";
import { getFormattedDate } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { actionGetCorporateSingleNotificationRequest } from "../../../Store/Actions/SagaActions/NotificationsSagaAction";
import { Modal, ModalBody } from "reactstrap";
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
// import { Button, Modal, ModalHeader } from "react-bootstrap";

const CampusSubscription = (props) => {
  console.log(props, 'PROPZ')
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [hiringItem, setHiringItem] = useState();
  const [viewResponse, setViewResponse] = useState();
  const [unparsedData, setUnparsedData] = useState();
  const [displayModal, setDisplayModal] = useState(false);

  const getHiringItemById = (id) => {
    console.log(id, 'nftIDDDDD');
    if (id) {
      dispatch(
        actionGetCorporateSingleNotificationRequest({
          apiPayloadRequest: {
            type: "NOTIFICATION",
            notificationId: id,
          },
          callback: (response) => {
            console.log(response.content, 'nftResponse')
            setUnparsedData(response.content);
            console.log(response, 'completeNFT')
            console.log(JSON.parse(response.content), "content");

            const content = JSON.parse(response?.content);
            const contentMsg = response.content;
            console.log(content?.requestContent ? content?.requestContent : contentMsg, 'conditionall state')

            const jsonRegex = /^\s*(\{.*\})\s*$/;

            if (jsonRegex.test(response?.content)) {
              setHiringItem(content?.requestContent)
              console.log('ifCondition triggered')
            }
            else {
              console.log('else-# Condition triggered')
              setHiringItem(contentMsg);


            }
            setShowModal(true);
          },
        })
      );
    } else {
      toast.info("Status Pending.");
    }
  };

  useEffect(() => {

    if (hiringItem === null || hiringItem === undefined) {
      setViewResponse(unparsedData);
      setDisplayModal(true);
    }

  }, [hiringItem])


  console.log(hiringItem, 'hiringItem');
  console.log(viewResponse, 'viewResponse');
  console.log(displayModal,'displayModal');

  return (
    <>
      <div className="cards-border" key={props.index}>
        <div className="col-lg-9 col-sm-12 card-content">
          <div className="icon" style={{ marginRight: "20px" }}>
            <AccountBalance />
          </div>
          <div>
            <span style={{ paddingRight: '55px' }} >
              Campus Drive Request {" "}
            </span>
            <span style={{ color: 'gray', paddingLeft: '155px', paddingRight: '35px' }}>|</span>
            <span style={{ fontWeight: "bold" }}>
              {props?.item?.publisherName}  {" "}
            </span>
            <span style={{ color: 'gray', paddingRight: '35px', paddingLeft: '35px' }}>|</span>

            <div style={{ marginTop: '5px', marginLeft: '900px' }}
              onClick={() => {
                getHiringItemById(props?.item?.nftID);
              }}
            >
              <span
                className="btn"
                style={{ cursor: 'default' }}
              >
                view More
              </span>
            </div>

            <br />
            <span style={{ paddingLeft: '450px', marginTop: '55px' }} > {props?.item?.location} </span>


            <div className="card-date-main">

              <div className="card-date">
                Received on {getFormattedDate(props?.item?.dateOfSubscription)}
              </div>
            </div>
          </div>
        </div>


        {props?.item?.campusDriveStatus === "Accepted" ? (
          <div className="col-lg-3 col-sm-12  choice-btns ">
            <span style={{ paddingRight: '15px', fontWeight: 'bold' }} >Status {""}</span>
            <div
              style={{ border: 'none', boxShadow: 'none', cursor: 'default', color: '#12AD07' }}
            >
              Accepted
            </div>
          </div>
        ) : props?.item?.campusDriveStatus === "Pending" ? (
          <div className="col-lg-3 col-sm-12 choice-btns">
            <span style={{ paddingRight: '15px', fontWeight: 'bold' }} >Status {""}:</span>
            <div
              style={{ border: 'none', boxShadow: 'none', cursor: 'default', color: "#FEBE10" }}
            >
              Pending
            </div>
          </div>
        ) : (
          <div className="col-lg-3 col-sm-12 choice-btns">
            <span style={{ paddingRight: '15px', fontWeight: 'bold' }} >Status {""}:</span>
            <div
              style={{ border: 'none', boxShadow: 'none', cursor: 'default', color: '#20B2AA' }}
            >
              Sent
            </div>
          </div>
        )}
        {console.log(hiringItem, 'hiring Item Vaule 77')}
        {console.log(showModal, 'modalDispayCheck')}

        {showModal && (
          <Modal isOpen={showModal} >
            <ModalBody>
              <CancelSharpIcon
                onClick={() => {
                  setShowModal(false);
                }}
                data-dismiss="modal"
              />
              <div className={"mail-modal"}>
                <div className="modal-header d-block" style={{ padding: "26px" }}>
                  <span
                    className="modal-title"
                    style={{ fontSize: "1.1rem", padding: 0 }}>
                    Mail sent to <span style={{ fontWeight: "bold" }} > {props?.item?.publisherName}</span> Requesting Campus
                    Placement Drive
                  </span>

                </div>
                <div className="modal-body">
                  <div className="card d-none">
                    <span className="control-label" style={{ fontSize: "1rem" }}>
                      From&nbsp;:
                    </span>
                    <input
                      type="email"
                      name="emailFrom"
                      style={{ fontSize: "1rem" }}
                      defaultValue={hiringItem?.emailFrom}
                      readOnly
                    />
                  </div>
                  <div className="card d-none">
                    <span className="control-label" style={{ fontSize: "1rem" }}>
                      To&nbsp;:
                    </span>
                    <input
                      type="email"
                      name="emailTo"
                      style={{ fontSize: "1rem" }}
                      defaultValue={hiringItem?.emailTo}
                      readOnly
                    />
                  </div>
                  <div className="card" style={{ padding: "12px 20px" }}>
                    <span className="control-label" style={{ fontSize: "1rem" }}>
                      Subject&nbsp;:
                    </span>
                    <input
                      type="text"
                      name="emailSubject"
                      style={{ fontSize: "1rem" }}
                      defaultValue={hiringItem?.emailSubject}
                      readOnly
                    />
                  </div>
                  <div
                    className="card"
                    style={{ minWidth: "100%", padding: "20px" }}>
                    {console.log(hiringItem?.emailBody, "jkhgj")}
                    <textarea
                      name="emailBody"
                      style={{
                        fontSize: ".850rem",
                        minWidth: "100%",
                        minHeight: "400px",
                      }}
                      defaultValue={hiringItem?.emailBody}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
          </Modal>
        )}
      </div>

      {displayModal &&
        <div
          style={{
            display: "flex",
            marginTop: '10px',
            justifyContent: "center", alignItems: "center",
          }}>
          <Modal showModal={displayModal}>
            <ModalBody>
              <CancelSharpIcon
                onClick={() => {
                  setDisplayModal(false);
                }} />
              <p>{viewResponse} halooo</p>
            </ModalBody>
          </Modal>
        </div>
      }

    </>
  )
}

export default CampusSubscription;