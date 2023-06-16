import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SecurityIcon from "@mui/icons-material/Security";
import { useEffect, useState } from "react";
import PreLoader from "../../utils/PreLoader";
import { useSelector } from "react-redux";
import BasicCmp from "./BasicCmp";
import AddressCmp from "./AddressCmp";
import ProfileCmp from "./ProfileCmp";
import PasswordForm from "./Password";



const CorporateProfile = () => {

    const apiStatus = useSelector((state) => state.loginReducer?.apiStatus);
    const [profile, setProfile] = useState([]);


    const profileInfo = useSelector(//
        (state) => state.DashboardReducer.profileInfo
    );

    useEffect(()=>{
        setProfile(profileInfo)
    },[profileInfo]) 

    console.log(profileInfo, 'REDUCER PRO');

    return (
        <>
            {apiStatus ? <PreLoader /> : null}
            <div className="modal-main">
                <p className="modal-title"> Corporate Profile </p>
                {profile?.publishedFlag ? (
                    <p
                        className="sub-title"
                        style={{
                            padding: "0px 10px 5px",
                            margin: "0",
                            fontWeight: "bold",
                        }}
                    >
                        <div style={{ float: "right" }}>
                            <VerifiedUserIcon
                                style={{ marginBottom: "3px", marginRight: "5px" }}
                            />
                            Published
                        </div>
                    </p>
                ) : (
                    <p
                        className="sub-title"
                        style={{
                            padding: "10px",
                            margin: "0",
                            fontWeight: "bold",
                            alignSelf: "flex-end",
                            color: "#ae840f",
                        }}
                    >
                        <SecurityIcon style={{ marginBottom: "3px", marginRight: "5px" }} />
                        Yet to be Published
                    </p>
                )}
            </div>
            <div>
                <BasicCmp
                    profileData={profile}
                />
                <AddressCmp
                 profileData={profile}
                />

                <ProfileCmp 
                 profileData={profile}
                />

                <PasswordForm 
                 profileData={profile}
                />

            </div>
        </>
    )
}

export default CorporateProfile;