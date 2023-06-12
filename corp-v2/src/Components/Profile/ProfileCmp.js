import React from "react";
import { TextField, Button } from "@material-ui/core";

const ProfileCmp = (props) => {
  return (
    <div className="cmp-main">
      <p className="cmp-head">Profile</p>
      <div className="row">
        <div className="col-12">
          <TextField
            label="Website / Profile URL (if any)"
            type="text"
            name="attribute7"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            onChange={props?.onChange}
            value={
              props?.profileData?.attribute7
                ? props?.profileData?.attribute7
                : ""
            }
          />
        </div>
        <div className="col-12">
          <TextField
            label="Write in brief about you"
            type="text"
            multiline
            minRows={4}
            name="universityProfile"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            required={true}
            onChange={props?.onChange}
            value={
              props?.profileData?.universityProfile
                ? props?.profileData?.universityProfile
                : ""
            }
          />
        </div>
        <div className="col-2">
          <label htmlFor="accredationfile" className="file_label">
            Attach File
          </label>
          <p>{props?.fileSizeErr}</p>
          <input
            type="file"
            onChange={props?.handleChangeImg}
            className="attach-inp"
            accept=".pdf"
            name="attachment"
            id="accredationfile"
            alt=""
            required
          />
          <p className="attach-inp_label">
            {props?.profileData?.attachmentName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCmp;
