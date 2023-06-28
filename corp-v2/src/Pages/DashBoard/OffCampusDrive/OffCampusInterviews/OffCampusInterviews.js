import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import OffCampusDriveLayout from "../Components/OffCampuDriveLayout";
// import ReleaseOfferLetters from "../../CampusDrive/CampusInterviews/Sections/ReleaseOfferLetters";
// import ValidateProfiles from "../../CampusDrive/CampusInterviews/Sections/ValidateProfiles";
// import ShareRoundResults from "../../CampusDrive/CampusInterviews/Sections/ShareRoundResults";
// import OffEndCampusDrive from "./Sections/OffEndCampusDrive";
import { NavLink, useParams } from "react-router-dom";
import { actionGetS3AttachRequest } from "../../../../Store/Actions/SagaActions/CommonSagaActions";
import { onGetFileInfo } from "../../../../utils/utils";
import { Work } from "@mui/icons-material";
import RoundWiseResults from "./Sections/RoundWiseResults";

const OffCampusInterviews = () => {
    const { universityId, offCampusDriveId } = useParams();

    const getTabSection = () => {
        if (
            tabs?.length &&
            tabs.some((item) => item.isActive === true)
        ) {
            let currentIndex = 0;
            tabs.forEach((item, index) => {
                if (item.isActive) {
                    currentIndex = index;
                }
            });

            if (tabs[currentIndex].section) {
                return tabs[currentIndex].section;
            }
        }
    };

    console.log(universityId, "Hiii");

    const dispatch = useDispatch();
    const onTabClick = (tabIndex) => {
        const newTabs = tabs.map((item, index) => {
            if (index <= tabIndex) {
                return { ...item, isActive: true };
            } else {
                return { ...item, isActive: false };
            }
        });
        setTabs(newTabs);
    };

    const getAttach = (data) => {
        dispatch(actionGetS3AttachRequest({ path: data, callback: onGetFileInfo }));
    };

    const [tabs, setTabs] = useState([
        {
            label: "Capture Round wise Interview Results",
            iconName: "fa-file-alt",
            isActive: true,
            isDisabled: false,
            onClick: onTabClick,
            section: (
                <RoundWiseResults
                    getAttach={getAttach}
                    campusDriveId={offCampusDriveId}
                />
            ),
        },
        {
            label: "Share Round-wise Interview Results",
            iconName: "fa-calendar-alt",
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
            // section: (
            //     <ShareRoundResults
            //         getAttach={getAttach}
            //         campusDriveId={offCampusDriveId}
            //     />
            // ),
        },
        {
            label: "View & Validate Final List of Students",
            iconName: "fa-calendar-alt",
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
            // section: <ValidateProfiles campusDriveId={offCampusDriveId} />,
        },
        {
            label: "Release Offer Letters",
            iconName: "fa-briefcase",
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
            // section: (
            //     <ReleaseOfferLetters
            //         getAttach={getAttach}
            //         campusDriveId={offCampusDriveId}
            //     />
            // ),
        },
        {
            label: "End Campus Drive",
            iconName: "fa-briefcase",
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
            // section: <OffEndCampusDrive campusDriveId={offCampusDriveId} />,
        },
    ]);

    return (
        <div className="jobs-layout-main">
            <div className="row home-title-steps-main">
                <div
                    className="col-2 d-flex justify-content-center align-items-center">
                    <NavLink
                        to={"/dashboard/off-campus-drive/"}
                        replace
                        exact
                        activeClassName="campusDriveBtnActive"
                        className="campusDriveBtn"
                    > </NavLink>

                    <div className="home-main">Home</div>
                </div>
                <div className="col-10 tile-steps-main">
                    <div style={{ fontSize: "25px", fontWeight: "bold" }}>
                        <Work style={{ marginRight: "10px", fontSize: "20px" }} />{" "}
                        {/* {corp} */}
                    </div>
                    <div className="steper-main">
                        <div
                            className={
                                // props.round === "1" ? 
                                "step-card tab-select"
                                //  : "step-card"
                            }>
                            <NavLink
                                to={
                                    "/dashboard/off-campus-drive/" +
                                    offCampusDriveId +
                                    "/off-define-jobs/" +
                                    universityId
                                }
                                exact
                                activeClassName="campusDriveBtnActive"
                                className="campusDriveBtn"
                            ></NavLink>
                            <div className="num-icon">1</div>
                            <div className="step-name">Define Jobs</div>
                        </div>
                        <div
                            className={
                                // props.round === "2" ?
                                "step-card tab-select"
                                //  : "step-card"
                            }>
                            <NavLink
                                to={
                                    "/dashboard/off-campus-drive/" +
                                    offCampusDriveId +
                                    "/off-communication/" +
                                    universityId
                                }
                                exact
                                activeClassName="campusDriveBtnActive"
                                className="campusDriveBtn"
                            ></NavLink>
                            <div className="num-icon">2</div>
                            <div className="step-name">Communication</div>
                        </div>
                        <div
                            className={
                                // props.round === "3" ? 
                                "step-card tab-select"
                                //  : "step-card"
                            }>
                            <NavLink
                                to={
                                    "/dashboard/off-campus-drive/" +
                                    offCampusDriveId +
                                    "/off-campus-interviews/" +
                                    universityId
                                }
                                exact
                                activeClassName="campusDriveBtnActive"
                                className="campusDriveBtn"
                            ></NavLink>
                            <div className="num-icon">3</div>
                            <div className="step-name">Campus Interviews</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row home-title-steps-main">
                <div className="col-2">
                    {tabs?.length
                        ? tabs?.map((item, index) => {
                            return (
                                <div className={item?.isActive ? 'sub-job-tabs sec-select' : 'sub-job-tabs'} onClick={() => {  item.onClick(index) }}>
                                    <div className='sub-job-tabs-names'>
                                        {item?.lable}
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center' style={{ width: "30%" }}>
                                        <item.iconName />
                                    </div>
                                </div>
                            )
                        })
                        : undefined}
                </div>
                <div className="col-10 content-main">
                    {!tabs.some((item) => item.isActive === true) ? (
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ width: "100%", height: "100%" }}
                        >
                            <p
                                className="text-center"
                                style={{ fontSize: ".850rem", color: "#a1a1a1" }}
                            >
                                Select any option to preview the content here
                            </p>
                        </div>
                    ) : undefined}
                    {getTabSection()}
                </div>
            </div>
        </div>
    );

}

export default OffCampusInterviews;
