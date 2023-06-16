import React, { useState } from "react";
import PreLoader from "../../utils/PreLoader";
import { useSelector } from "react-redux";
import { Badge, Tab, Tabs } from "@material-ui/core";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import { AccountCircle } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachEmailRoundedIcon from '@mui/icons-material/AttachEmailRounded';


const SubscriptionHistory = () => {

    const apiStatus = useSelector((state) => state.loginReducer?.apiStatus);
   
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (currentValue) =>{
    setTabValue(currentValue);
    }

    return (
        <div className="container-body">
        <div className="row">
          <h2>Subscriptions</h2>
          {apiStatus ? <PreLoader/> : null}
          <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="primary"
          variant="scrollable"
          >
           <Tab
           icon={
            <Badge color="error" >
                <SchoolRoundedIcon/>
            </Badge>
           }
           label={tabValue === 0 ? "CampusDrive" : ""}
           wrapped
           style={{
             outline: "none",
             minWidth: "12%",
           }}
           />
            <Tab
           icon={
            <Badge color="error" >
                <AttachEmailRoundedIcon/>
                
            </Badge>
           }
           label={tabValue === 1 ? "OtherInformation" : ""}
           wrapped
           style={{
             outline: "none",
             minWidth: "12%",
           }}
           />

<Tab
           icon={
            <Badge color="error" >
                <GroupsIcon/>
            </Badge>
           }
           label={tabValue === 1 ? "Students" : ""}
           wrapped
           style={{
             outline: "none",
             minWidth: "12%",
           }}
           />
           <Tab
           icon={
            <Badge color="error" >
                <AccountCircle/>
            </Badge>
           }
           label={tabValue === 1 ? "Profile" : ""}
           wrapped
           style={{
             outline: "none",
             minWidth: "12%",
           }}
           />
           
          </Tabs>
        </div>
      </div>
    )
}

export default SubscriptionHistory;