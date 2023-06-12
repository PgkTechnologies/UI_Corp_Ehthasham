import React from "react";
import { TextField } from "@material-ui/core";

const BasicCmp = (props) => {
  //console.log(props, "BASIC")
  localStorage.setItem('tpID', props?.profileData?.stakeholderID);
  return (
    <div className="cmp-main">
      <p className="cmp-head">Basic</p>
      <div className="row">
        <div className="col-3">
          <TextField
            label="Stakeholder ID"
            type="text"
            name="stackholderId"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            value={
              props?.profileData?.stakeholderID
                ? props?.profileData?.stakeholderID
                : ""
            }
            required={true}
            disabled={true}
          />
        </div>
        <div className="col-3">
          <TextField
            label="Date of Joining the Platform"
            type="text"
            name="dateOfJoiningThePlatform"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            required={true}
            disabled={true}
            InputLabelProps={{
              shrink: true,
            }}
            value={
              props?.profileData?.dateOfJoining
                ? new Date(props?.profileData?.dateOfJoining)
                  .toISOString()
                  .substring(0, 10)
                : undefined
            }
          />
        </div>
        <div className="col-3">
          <TextField
            label="Corporate Sector"
            type="text"
            name="CorporateSector"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            InputLabelProps={{
              shrink: true
            }}
            required={true}
            disabled={true}
            value={props?.profileData?.universitySector}
          />
        </div>
        <div className="col-3">
          <TextField
            label="Year Of Establishment"
            type="text"
            name="yearOfEstablishment"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            InputLabelProps={{
              shrink: true
            }}
            value={props?.profileData?.yearOfEstablishment}
            required={true}
            disabled={true}
          />
        </div>
        <div className="col-6">
          <TextField
            label="Corporate Name"
            type="text"
            name="CorporateName"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            InputLabelProps={{
              shrink: true
            }}
            required={true}
            disabled={true}
            value={props?.profileData?.universityCollegeName ? props?.profileData?.universityCollegeName : ""}
          />
        </div>
        <div className="col-6">
          <TextField
            label="Organisation Registration ID / CIN"
            type="text"
            name="CorporateId"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            InputLabelProps={{
              shrink: true
            }}
            required={true}
            value={props?.profileData?.universityID ? props?.profileData?.universityID : ""}
            disabled={true}
          />
        </div>
        <div className="col-6">
          <TextField
            label="Corporate Category"
            type="text"
            name="CorporateCategory"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            InputLabelProps={{
              shrink: true
          }}
            required={true}
            disabled={true}
            value={props?.profileData?.universityCollegeName ? props?.profileData?.universityCollegeName : ""}
          />
        </div>
        <div className="col-6">
          <TextField
            label="Industry Vertical"
            type="text"
            name="IndustryVertical"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            InputLabelProps={{
              shrink: true
          }}
            required={true}
            disabled={true}
            value={props?.profileData?.universityCollegeID ? props?.profileData?.universityCollegeID : ""}
          />
        </div>
        <div className="col-6">
          <TextField
            label="Email"
            type="text"
            name="primaryContactEmail"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            InputLabelProps={{
              shrink: true
            }}
            required={true}
            disabled={true}
            value={props?.profileData?.primaryContactEmail ? props?.profileData?.primaryContactEmail : ""}
          />
        </div>
        <div className="col-6">
          <TextField
            label="GSTN"
            type="text"
            name="GSTN"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            InputLabelProps={{
              shrink: true
            }}
            required={true}
            disabled={true}
            value={props?.profileData?.primaryContactEmail ? props?.profileData?.primaryContactEmail : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicCmp;
