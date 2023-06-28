import { Work } from "@mui/icons-material";
import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import DateAndLocationFinalization from "./Sections/DateAndLocationFinalization";
// import OffCampusDriveLayout from "../Components/OffCampuDriveLayout";
// import DefineJobApplicationWindowSection from "../../CampusDrive/DefineJobs/Sections/DefineJobApplicationWindowSection/DefineJobApplicationWindowSection";
// import DefineJobsSection from "../../CampusDrive/DefineJobs/Sections/DefineJobsSection/DefineJobsSection";
// import ShareJobDetailsSection from "../../CampusDrive/DefineJobs/Sections/ShareJobDetailsSection/ShareJobDetailsSection";

const OffDefineJobs = (props) => {
    
    const { offCampusDriveId, universityId } = useParams();
    const onTabClick = (tabIndex) => {
        console.log(tabIndex,'innnn')
        const newTabs = tabs.map((item, index) => {
            if (index <= tabIndex) {
                return { ...item, isActive: true };
            } else {
                return { ...item, isActive: false };
            }
        });
        setTabs(newTabs);
    };

    const [tabs, setTabs] = useState([
        {
            label: "Dates and Location Finalization",
            iconName: "fa-calendar-alt",
            isActive: true,
            isDisabled: false,
            onClick: onTabClick,
              section: (
                <DateAndLocationFinalization
                  offCampusDriveId={offCampusDriveId}
                  universityId={universityId}
                />
              ),
        },
        {
            label: "Define Jobs",
            iconName: "fa-file-alt",
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
            //   section: (
            //     <DefineJobsSection
            //       campusDriveId={offCampusDriveId}
            //       universityId={universityId}
            //     />
            //   ),
        },
        {
            label: "Share Job Details",
            iconName: "fa-briefcase",
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
            //   section: (
            //     <ShareJobDetailsSection
            //       campusDriveId={offCampusDriveId}
            //       universityId={universityId}
            //     />
            //   ),
        },
        {
            label: "Define Job Application Window",
            iconName: "fa-briefcase",
            isActive: false,
            isDisabled: false,
            onClick: onTabClick,
            //   section: (
            //     <DefineJobApplicationWindowSection
            //       campusDriveId={offCampusDriveId}
            //       universityId={universityId}
            //     />
            //   ),
        },
    ]);

    const prevBtn = () => {
        let currentIndex = 1;

        tabs.forEach((item, index) => {
            if (item.isActive) {
                currentIndex = index;
            }
        });

        onTabClick(currentIndex - 1);
    };


    const getTabSection = () => {
        if (
            tabs?.length &&
            tabs?.some((item) => item.isActive === true)
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


   const cardStyle = tabs?.map((item) => {
    if(item?.isActive === true){
        
    }
   })

console.log(tabs,'tabss')

    // http://{{hostip}}:{{hostport}}/lut/?ignoreCache=true&lutList=reportName
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
                                 
                                "step-card tab-select"
                                 
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
                            className={ "step-card"
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
                                "step-card"
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
                                <div className={item?.isActive ? 'sub-job-tabs sec-select' : 'sub-job-tabs'} onClick={() => { item?.onClick(index) }}>
                                    <div className='sub-job-tabs-names'>
                                        {item?.label}
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
};

export default OffDefineJobs;