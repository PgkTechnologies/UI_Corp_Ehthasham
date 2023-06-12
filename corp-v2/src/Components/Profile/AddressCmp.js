import React from "react";
import {
  TextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import PreLoader from "../../utils/PreLoader";

const AddressCmp = (props) => {
  const { profileData, countries, cityListHQ, onChange, cityListLocal } = props;
  const [age, setAge] = React.useState("");
  const apiStatus = useSelector((state) => state.loginReducer?.apiStatus);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  //console.log(profileData?.universityHQAddressCountry, countries, cityListLocal, "CHECK");

  return (
    <>
      {apiStatus ? <PreLoader /> : null}
      <div className="cmp-main">
        <p className="cmp-head">Address & Contacts</p>
        <div className="row d-flex align-items-center justify-content-center">
          <div className="row col-lg-6 col-md-12 col-sm-12">
            <div className="sub-title" style={{ paddingTop: "0" }}>
              Headquarters
            </div>
            <div className="col-12">
              <TextField
                label="Adress (Line 1)"
                type="text"
                name="universityHQAddressLine1"
                variant="filled"
                helperText={props?.errors?.hAddressLine1}
                error={props?.errors?.hAddressLine1 ? true : false}
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.universityHQAddressLine1
                    ? profileData.universityHQAddressLine1
                    : ""
                }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Adress (Line 2)"
                type="text"
                name="universityHQAddressLine2"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.universityHQAddressLine2
                    ? profileData?.universityHQAddressLine2
                    : ""
                }
              />
            </div>
            <div className="col-6">
              <FormControl
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel id="demo-simple-select-filled-label17">
                  Country *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label17"
                  id="demo-simple-select-filled17"
                  name="universityHQAddressCountry"
                  required
                  value={profileData?.universityHQAddressCountry ? profileData?.universityHQAddressCountry : ""}
                  onChange={onChange}
                >
                  {countries?.length > 0 ? (
                    countries.map((item, i) => (
                      <MenuItem key={i} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-6">
              <FormControl
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel id="demo-simple-select-filled-label2">
                  State *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label2"
                  id="demo-simple-select-filled2"
                  name="universityHQAddressState"
                  required
                  value={
                    profileData?.universityHQAddressState
                      ? profileData?.universityHQAddressState
                      : ""
                  }
                  onChange={onChange}
                >
                  {countries?.length > 0 ? (
                    countries
                      .filter(
                        (x) =>
                          x.name === profileData?.universityHQAddressCountry
                      )[0]
                      ?.states?.map((item, i) => (
                        <MenuItem key={i} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-4">
              <FormControl
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel id="demo-simple-select-filled-label3">
                  City *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label3"
                  id="demo-simple-select-filled3"
                  name="universityHQAddressCity"
                  required
                  value={
                    profileData?.universityHQAddressCity
                      ? profileData?.universityHQAddressCity
                      : ""
                  }
                  onChange={onChange}
                >
                  {cityListHQ?.length > 0 ? (
                    cityListHQ.map((item, i) => (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-4">
              <TextField
                label="District"
                type="text"
                name="universityHQAddressDistrict"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.universityHQAddressDistrict
                    ? profileData?.universityHQAddressDistrict
                    : ""
                }
              />
            </div>
            <div className="col-4">
              <TextField
                label="Zipcode"
                type="text"
                name="universityHQAddressZipcode"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.universityHQAddressZipcode
                    ? profileData?.universityHQAddressZipcode
                    : ""
                }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Phone Number"
                type="text"
                name="universityHQAddressPhone"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.primaryContactPhone
                    ? profileData?.primaryContactPhone
                    : ""
                }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Office Mail"
                type="text"
                name="universityHQAddressemail"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.universityHQAddressemail
                    ? profileData?.universityHQAddressemail
                    : ""
                }
              />
            </div>
          </div>
          <div className="row col-lg-6 col-md-12 col-sm-12">
            <div className="col-6">
              <div className="sub-title" style={{ paddingTop: '0' }} >Local Branch</div>
            </div>
            <div className="col-6" >
              <div className="d-flex">
                <div className="sub-title d-flex justify-content-center align-items-center" style={{ paddingTop: '0' }}>
                  <input
                    type="checkbox"
                    onChange={props?.toggleUniversityHeadQuarters}
                    name={"sameAsuniversityHeadquarters"}
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                    style={{ fontSize: "12px" }}
                  >
                    &nbsp; Same as Headquarters
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12">
              <TextField
                label="Adress (Line 1)"
                type="text"
                name="universityLocalBranchAddressLine1"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.universityLocalBranchAddressLine1
                    ? profileData?.universityLocalBranchAddressLine1
                    : ""
                }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Adress (Line 2)"
                type="text"
                name="universityLocalBranchAddressLine2"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.universityLocalBranchAddressLine2
                    ? profileData?.universityLocalBranchAddressLine2
                    : ""
                }
              />
            </div>
            <div className="col-6">
              <FormControl
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel id="demo-simple-select-filled-label4">
                  Country *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label4"
                  id="demo-simple-select-filled4"
                  name="universityLocalBranchAddressCountry"
                  required
                  value={
                    profileData?.universityLocalBranchAddressCountry
                      ? profileData?.universityLocalBranchAddressCountry
                      : ""
                  }
                  onChange={onChange}
                >
                  {countries?.length > 0 ? (
                    countries.map((item, i) => (
                      <MenuItem key={i} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-6">
              <FormControl
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel id="demo-simple-select-filled-label5">
                  State *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label5"
                  id="demo-simple-select-filled5"
                  name="universityLocalBranchAddressState"
                  required
                  value={
                    profileData?.universityLocalBranchAddressState
                      ? profileData?.universityLocalBranchAddressState
                      : ""
                  }
                  onChange={onChange}
                >
                  {countries?.length > 0 ? (
                    countries
                      .filter(
                        (x) =>
                          x.name ===
                          profileData?.universityLocalBranchAddressCountry
                      )[0]
                      ?.states?.map((item, i) => (
                        <MenuItem key={i} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-4">
              <FormControl
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel id="demo-simple-select-filled-label6">
                  City *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label6"
                  id="demo-simple-select-filled6"
                  name="universityLocalBranchAddressCity"
                  required
                  value={
                    profileData?.universityLocalBranchAddressCity
                      ? profileData?.universityLocalBranchAddressCity
                      : ""
                  }
                  onChange={onChange}
                >
                  {cityListLocal?.length > 0 ? (
                    cityListLocal.map((item, i) => (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-4">
              <TextField
                label="District"
                type="text"
                name="universityLocalBranchAddressDistrict"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.universityLocalBranchAddressDistrict
                    ? profileData?.universityLocalBranchAddressDistrict
                    : ""
                }
              />
            </div>
            <div className="col-4">
              <TextField
                label="Zipcode"
                type="text"
                name="universityLocalBranchAddressZipcode"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.universityLocalBranchAddressZipcode
                    ? profileData?.universityLocalBranchAddressZipcode
                    : ""
                }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Phone Number"
                type="text"
                name="universityLocalBranchAddressPhone"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.universityLocalBranchAddressPhone
                    ? profileData?.universityLocalBranchAddressPhone
                    : ""
                }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Office Mail"
                type="text"
                name="universityLocalBranchAddressemail"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.universityLocalBranchAddressemail
                    ? profileData?.universityLocalBranchAddressemail
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressCmp;
