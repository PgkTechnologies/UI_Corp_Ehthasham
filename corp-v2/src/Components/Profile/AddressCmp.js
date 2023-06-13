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

  //console.log(profileData?.corporateHQAddressCountry, countries, cityListLocal, "CHECK");

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
                name="corporateHQAddressLine1"
                variant="filled"
                helperText={props?.errors?.hAddressLine1}
                error={props?.errors?.hAddressLine1 ? true : false}
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.corporateHQAddressLine1 ? profileData?.corporateHQAddressLine1 : '' }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Adress (Line 2)"
                type="text"
                name="corporateHQAddressLine2"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.corporateHQAddressLine2 ?  profileData?.corporateHQAddressLine2 : ''  }
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
                  name="corporateHQAddressCountry"
                  required
                  value={profileData?.corporateHQAddressCountry ? profileData?.corporateHQAddressCountry :'' }
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
                  name="corporateHQAddressState"
                  required
                  value={
                    profileData?.corporateHQAddressState ? profileData?.corporateHQAddressState : ''  }
                  onChange={onChange}
                >
                  {countries?.length > 0 ? (
                    countries
                      .filter(
                        (x) =>
                          x.name === profileData?.corporateHQAddressCountry
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
                  name="corporateHQAddressCity"
                  required
                  value={
                    profileData?.corporateHQAddressCity ?  profileData?.corporateHQAddressCity : ''}
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
                name="corporateHQAddressDistrict"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.corporateHQAddressDistrict ? profileData?.corporateHQAddressDistrict : '' }
              />
            </div>
            <div className="col-4">
              <TextField
                label="Zipcode"
                type="text"
                name="corporateHQAddressZipcode"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.corporateHQAddressZipCode ? profileData?.corporateHQAddressZipCode : ''}
              />
            </div>
            <div className="col-12">
              <TextField
                label="Phone Number"
                type="text"
                name="corporateHQAddressPhone"
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
                name="corporateHQAddressemail"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.corporateHQAddressEmail
                    ? profileData?.corporateHQAddressEmail
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
                    onChange={props?.toggleCorporateHeadQuarters}
                    name={"sameAscorporateHeadquarters"}
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
                name="corporateLocalBranchAddressLine1"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.corporateLocalBranchAddressLine1
                    ? profileData?.corporateLocalBranchAddressLine1
                    : ""
                }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Adress (Line 2)"
                type="text"
                name="corporateLocalBranchAddressLine2"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.corporateLocalBranchAddressLine2
                    ? profileData?.corporateLocalBranchAddressLine2
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
                  name="corporateLocalBranchAddressCountry"
                  required
                  value={
                    profileData?.corporateLocalBranchAddressCountry
                      ? profileData?.corporateLocalBranchAddressCountry
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
                  name="corporateLocalBranchAddressState"
                  required
                  value={
                    profileData?.corporateLocalBranchAddressState
                      ? profileData?.corporateLocalBranchAddressState
                      : ""
                  }
                  onChange={onChange}
                >
                  {countries?.length > 0 ? (
                    countries
                      .filter(
                        (x) =>
                          x.name ===
                          profileData?.corporateLocalBranchAddressCountry
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
                  name="corporateLocalBranchAddressCity"
                  required
                  value={
                    profileData?.corporateLocalBranchAddressCity
                      ? profileData?.corporateLocalBranchAddressCity
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
                name="corporateLocalBranchAddressDistrict"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.corporateLocalBranchAddressDistrict
                    ? profileData?.corporateLocalBranchAddressDistrict
                    : ""
                }
              />
            </div>
            <div className="col-4">
              <TextField
                label="Zipcode"
                type="text"
                name="corporateLocalBranchAddressZipcode"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.corporateLocalBranchAddressZipCode
                    ? profileData?.corporateLocalBranchAddressZipCode
                    : ""
                }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Phone Number"
                type="text"
                name="corporateLocalBranchAddressPhone"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.corporateLocalBranchAddressPhone
                    ? profileData?.corporateLocalBranchAddressPhone
                    : ""
                }
              />
            </div>
            <div className="col-12">
              <TextField
                label="Office Mail"
                type="text"
                name="corporateLocalBranchAddressemail"
                variant="filled"
                style={{ width: "100%", marginBottom: "15px" }}
                required={true}
                onChange={onChange}
                value={
                  profileData?.corporateLocalBranchAddressEmail
                    ? profileData?.corporateLocalBranchAddressEmail
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
