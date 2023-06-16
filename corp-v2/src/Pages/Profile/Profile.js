import { Badge, Tab, Tabs } from "@material-ui/core";
import { AccountCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CorporateProfile from "../../Components/Profile/CorporateProfile";



const Profile = () => {
     
    const dispatch = useDispatch();
    const [allData, setAllData] = useState([]);
    const [showAnnouncement, setShowAnnouncement] = useState(false);
    const [showPublish, setShowPublish] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [profileCheck, setProfileCheck] = useState(null);

    const getProfilePublishData = () => {

        if (allData?.profile?.publishedFlag) {
            setProfileCheck('p')
        }
        else {
            setProfileCheck('n')
        }
    }

    const handleTabChange = (Currentvalue) => {
        setTabValue(Currentvalue);
    }



    const GetProfileData = useSelector(
        (state) => state.DashboardReducer?.profileInfo
    );



    useEffect(() => {

    }, [GetProfileData]);



    return (
        <>
            <div className="container-body">
                <div className="student-info-main">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="row student-info-card">
                            <div className="col-lg-6 col-sm-12 student-details">
                                <div className="profile-picture">
                                    {GetProfileData?.profilePicture ? (
                                        <img
                                            src={
                                                GetProfileData?.profilePicture
                                                    ? "data:image/jpg;base64," +
                                                    GetProfileData?.profilePicture
                                                    : null
                                            }
                                            className="profile-pic-img"
                                            alt="No Profile Picture"
                                        />
                                    ) : null}

                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "initial",
                                        marginTop: "15px",
                                        justifyContent: "center",
                                        paddingLeft: "20px",
                                        lineHeight: "0.8",
                                    }}
                                >
                                    <p style={{ fontSize: "22px", fontWeight: "bold" }}>
                                        {GetProfileData?.universityName} TOPG REGISTERED
                                    </p>
                                    <p>{GetProfileData?.yearOfEstablishment} %$%@2001</p>
                                </div>
                            </div>
                            <div className="col-lg-5 col-sm-6 d-flex align-items-center justify-content-end">
                                <button
                                    type="submit"
                                    className="profile-submit-button"
                                    onClick={() => {
                                        setShowPublish(true);
                                    }}
                                >
                                    Publish Profile
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Tabs
                            value={tabValue}
                            indicatorColor="secondary"
                            textColor="primary"
                            variant="scrollable"
                            onChange={handleTabChange}
                        >
                            <Tab
                                icon={
                                    <Badge color="error" variant={profileCheck === 'n' ? 'dot' : ''} >
                                        <AccountCircle />
                                    </Badge>
                                }
                                label={tabValue === 0 ? "Profile" : ""}
                                wrapped
                                style={{
                                    outline: "none",
                                    minwidth: '12%'
                                }}
                            >

                            </Tab>
                        </Tabs>
                    </div>
                    <div className="student-content">
                        {
                            tabValue === 0 && (
                                <CorporateProfile
                                    allData={allData}
                                    wholeProfile={allData?.profile}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;