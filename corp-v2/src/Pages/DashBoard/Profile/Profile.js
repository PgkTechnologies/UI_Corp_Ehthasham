import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import BasicForm from "./ProfileForm/BasicForm";
// import AddressAndContactForm from "./ProfileForm/AddressAndContactForm";
// import ProfileForm from "./ProfileForm/ProfileForm";
// import ReferralForm from "./ProfileForm/ReferralForm";
// import AccountSettingsForm from "./ProfileForm/AccountSettingsForm";
import { toast } from "react-toastify";
import moment from "moment";
import CustomToastModal from "../../../Components/CustomToastModal";
import CustomModal from "../../../Components/CustomModal";
import {
  actionGetCorporateProfileSagaAction,
  actionPatchCorporateProfileSagaAction,
} from "../../../Store/Actions/SagaActions/CorporateProfileSagaActions";
import {
  actionGetCountryCodesSagaAction,
  actionGetCitiesByStateNameRequest,
} from "../../../Store/Actions/SagaActions/CommonSagaActions";
import PasswordForm from "./ProfileForm/PasswordForm";
import { actionGetS3AttachRequest } from "../../../Store/Actions/SagaActions/CommonSagaActions";
import { onGetFileInfo } from "../../../utils/utils";
import CryptoJS from "crypto-js";

const requiredFields = [
  "stakeholderID",
  "CIN",
  "corporateType",
  "corporateCategory",
  "corporateIndustry",
  "yearOfEstablishment",
  "corporateHQAddressLine1",
  "corporateHQAddressCountry",
  "corporateHQAddressState",
  "corporateHQAddressCity",
  "corporateHQAddressDistrict",
  "corporateHQAddressZipCode",
  "corporateHQAddressPhone",
  "corporateHQAddressEmail",
  "primaryContactFirstName",
  "primaryContactLastName",
  "primaryContactPhone",
  "primaryContactEmail",
];

const formFields = [
  "stakeholderID",
  "CIN",
  "corporateType",
  "corporateCategory",
  "corporateIndustry",
  "yearOfEstablishment",
  "attribute7",
  "corporateHQAddressLine1",
  "corporateHQAddressLine2",
  "corporateHQAddressCountry",
  "corporateHQAddressState",
  "corporateHQAddressCity",
  "corporateHQAddressDistrict",
  "corporateHQAddressZipCode",
  "corporateHQAddressPhone",
  "corporateHQAddressEmail",
  "gstn",
  "corporateLocalBranchAddressLine1",
  "corporateLocalBranchAddressLine2",
  "corporateLocalBranchAddressCountry",
  "corporateLocalBranchAddressState",
  "corporateLocalBranchAddressCity",
  "corporateLocalBranchAddressDistrict",
  "corporateLocalBranchAddressZipCode",
  "corporateLocalBranchAddressPhone",
  "corporateLocalBranchAddressEmail",

  "primaryContactFirstName",
  "primaryContactMiddleName",
  "primaryContactLastName",
  "primaryContactPhone",
  "primaryContactEmail",
  "primaryContactDesignation",
  "companyProfile",
  "profilePicture",
  "attachment",
];

const Profile = () => {
  const [profile, setProfile] = useState();
  const [checkStatus, setCheckStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [profilePicture, setProfilePicture] = useState();
  const [attachment, setAttachment] = useState({
    attachment: undefined,
    attachmentName: undefined,
    attachmentError: undefined,
  });
  const [isTermsAndConditionsChecked, setIsTermsAndConditionsChecked] =
    useState(true);

  const [initHqAddress, setInitHqAddress] = useState({
    states: false,
    cities: false,
  });

  const [initLocalAddress, setInitLocalAddress] = useState({
    states: false,
    cities: false,
  });

  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);

  const [hqStates, setHqStates] = useState([]);
  const [hqCities, setHqCities] = useState([]);

  const [localStates, setLocalStates] = useState([]);
  const [localCities, setLocalCities] = useState([]);

  const [passwordModel, setPasswordModel] = useState({
    password: "",
    oldPassword: "",
    reenterPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  const profileInfo = useSelector(
    (state) => state.DashboardReducer.profileInfo
  );

  const getAttach = (data) => {
    dispatch(actionGetS3AttachRequest({ path: data, callback: onGetFileInfo }));
  };
  const downloadPDF = (path, next) => {
    dispatch(
      actionGetS3AttachRequest({
        path: path,
        callback: next,
      })
    );
  };
  function getFile(file) {
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new Error("Error parsing file"));
      };
      reader.onload = function () {
        //This will result in an array that will be recognized by C#.NET WebApi as a byte[]
        let bytes = Array.from(new Uint8Array(this.result));

        //if you want the base64encoded file you would use the below line:
        let base64StringFile = btoa(
          bytes.map((item) => String.fromCharCode(item)).join("")
        );

        //Resolve the promise with your custom file structure
        resolve({
          base64StringFile: base64StringFile,
        });
      };
      reader.readAsArrayBuffer(file);
    });
  }

  const onCountryCodesResponse = (response) => {
    if (response) {
      setAllCountries(response.data);
      const updatedCountryOptions = response.data.map((item) => {
        return { value: item?.name, label: item?.name };
      });
      setCountries(updatedCountryOptions);
      if (profileInfo?.corporateLocalBranchAddressCountry) {
        response.data.map((item) => {
          if (item.name === profileInfo?.corporateLocalBranchAddressCountry) {
            onStatesResponse(item.states, "LOCAL");
          }
        });
      }

      if (profileInfo?.corporateLocalBranchAddressState) {
        getCitiesByStateName(
          profileInfo?.corporateLocalBranchAddressCountry,
          profileInfo?.corporateLocalBranchAddressState,
          "LOCAL"
        );
      }

      if (profileInfo?.corporateHQAddressCountry) {
        response?.data?.map((item) => {
          if (item.name === profileInfo?.corporateHQAddressCountry) {
            onStatesResponse(item.states, "HQ");
          }
        });
        //getStatesByCountryName(profile?.corporateHQAddressCountry?.value, 'HQ');
      }

      if (profileInfo?.corporateHQAddressState) {
        getCitiesByStateName(
          profileInfo?.corporateHQAddressCountry,
          profileInfo?.corporateHQAddressState,
          "HQ"
        );
      }
    }
  };

  const onStatesResponse = (response, type) => {
    let updatedStatesOptions = [];

    if (response?.length) {
      updatedStatesOptions = response.map((item) => {
        return { value: item?.name, label: item?.name };
      });
    }

    if (type === "HQ") {
      setHqStates(updatedStatesOptions);
      if (!initHqAddress.states) {
        setInitHqAddress((prevState) => ({
          ...prevState,
          states: true,
        }));
      }
    } else {
      setLocalStates(updatedStatesOptions);
      if (!initLocalAddress.states) {
        setInitLocalAddress((prevState) => ({
          ...prevState,
          states: true,
        }));
      }
    }
  };

  const onCitiesResponse = (response, type) => {
    let updatedCitiesOptions = [];

    if (response?.length) {
      updatedCitiesOptions = response.map((item) => {
        return { value: item, label: item };
      });
    }

    if (type === "HQ") {
      setHqCities(updatedCitiesOptions);
      if (!initHqAddress.cities) {
        setInitHqAddress((prevState) => ({
          ...prevState,
          cities: true,
        }));
      }
    } else {
      setLocalCities(updatedCitiesOptions);
      if (!initLocalAddress.cities) {
        setInitLocalAddress((prevState) => ({
          ...prevState,
          cities: true,
        }));
      }
    }
  };

  const getCitiesByStateName = (countryName, stateName, type) => {
    dispatch(
      actionGetCitiesByStateNameRequest({
        model: {
          country: countryName,
          state: stateName,
        },
        callback: (response) => {
          onCitiesResponse(response, type);
        },
      })
    );
  };

  useEffect(() => {
    if (profileInfo) {
      setProfilePicture(profileInfo?.profilePicture);
      setAttachment({
        attachment: profileInfo?.attachment,
        attachmentName: profileInfo?.attachmentName,
        attachmentError: undefined,
      });

      let profileData = {};

      formFields.forEach((key) => {
        if (["profilePicture", "attachment"].includes(key)) {
          profileData[key] = {
            value: undefined,
            errorMessage: undefined,
            isRequired: requiredFields.includes(key) ? true : false,
          };
        } else if (
          [
            "corporateHQAddressCountry",
            "corporateLocalBranchAddressCountry",
          ].includes(key)
        ) {
          profileData[key] = {
            // value: 'India',
            value: profileInfo[key],
            errorMessage: undefined,
            isRequired: requiredFields.includes(key) ? true : false,
          };
        } else if (
          [
            "corporateHQAddressPhone",
            "corporateLocalBranchAddressPhone",
            "primaryContactPhone",
          ].includes(key)
        ) {
          profileData[key] = {
            value: profileInfo[key]
              ? profileInfo[key].substring(profileInfo[key].length - 10)
              : "",
            errorMessage: undefined,
            isRequired: requiredFields.includes(key) ? true : false,
          };
        } else {
          profileData[key] = {
            value: profileInfo[key],
            errorMessage: undefined,
            isRequired: requiredFields.includes(key) ? true : false,
          };
        }
      });

      setProfile(profileData);
      dispatch(
        actionGetCountryCodesSagaAction({
          callback: onCountryCodesResponse,
        })
      );
    }
  }, [profileInfo]);

  const updateProfileData = (name, value, errorMessage) => {
    let data = profile[name];
    data["value"] = value;
    data["errorMessage"] = errorMessage;

    let updatedProfile = { ...profile };

    if (
      name === "corporateHQAddressCountry" ||
      name === "corporateLocalBranchAddressCountry"
    ) {
      allCountries?.data.map((item) => {
        if (item.name === value) {
          onStatesResponse(
            item.states,
            name === "corporateHQAddressCountry" ? "HQ" : "LOCAL"
          );
        }
      });

      if (name === "corporateHQAddressCountry") {
        setHqStates([]);
      } else if (name === "corporateLocalBranchAddressCountry") {
        setLocalStates([]);
      }

      if (name === "corporateHQAddressCountry") {
        setHqCities([]);
      } else if (name === "corporateLocalBranchAddressCountry") {
        setLocalCities([]);
      }

      if (name === "corporateHQAddressCountry") {
        updatedProfile = {
          ...updatedProfile,
          corporateHQAddressState: {
            ...updatedProfile.corporateHQAddressState,
            value: undefined,
            errorMessage: updatedProfile.corporateHQAddressState.isRequired
              ? "Required"
              : "",
          },
          corporateHQAddressCity: {
            ...updatedProfile.corporateHQAddressCity,
            value: undefined,
            errorMessage: updatedProfile.corporateHQAddressCity.isRequired
              ? "Required"
              : "",
          },
        };
      } else if (name === "corporateLocalBranchAddressCountry") {
        updatedProfile = {
          ...updatedProfile,
          corporateLocalBranchAddressState: {
            ...updatedProfile.corporateLocalBranchAddressState,
            value: undefined,
            errorMessage: updatedProfile.corporateLocalBranchAddressState
              .isRequired
              ? "Required"
              : "",
          },
          corporateLocalBranchAddressCity: {
            ...updatedProfile.corporateLocalBranchAddressCity,
            value: undefined,
            errorMessage: updatedProfile.corporateLocalBranchAddressCity
              .isRequired
              ? "Required"
              : "",
          },
        };
      }
    }

    if (
      name === "corporateHQAddressState" ||
      name === "corporateLocalBranchAddressState"
    ) {
      getCitiesByStateName(
        value,
        name === "corporateHQAddressState" ? "HQ" : "LOCAL"
      );
      if (name === "corporateHQAddressState") {
        setHqCities([]);
      } else if (name === "corporateLocalBranchAddressState") {
        setLocalCities([]);
      }
      if (name === "corporateHQAddressState") {
        updatedProfile = {
          ...updatedProfile,
          corporateHQAddressCity: {
            ...updatedProfile.corporateHQAddressCity,
            value: undefined,
            errorMessage: updatedProfile.corporateHQAddressCity.isRequired
              ? "Required"
              : "",
          },
        };
      } else if (name === "corporateLocalBranchAddressState") {
        updatedProfile = {
          ...updatedProfile,
          corporateLocalBranchAddressCity: {
            ...updatedProfile.corporateLocalBranchAddressCity,
            value: undefined,
            errorMessage: updatedProfile.corporateLocalBranchAddressCity
              .isRequired
              ? "Required"
              : "",
          },
        };
      }
    }

    setProfile((prevProfile) => ({
      ...prevProfile,
      ...updatedProfile,
      ...data,
    }));
  };

  const updatePassword = (event) => {
    const { name, value } = event.target;
    setPasswordModel((preState) => ({
      ...preState,
      [name]: value,
    }));
    if (name === "password" && passwordModel?.reenterPassword !== value) {
      setPasswordError("Mismatch");
    } else if (
      name === "reenterPassword" &&
      passwordModel?.password !== value
    ) {
      setPasswordError("Mismatch");
    } else if (
      name === "reenterPassword" &&
      passwordModel?.password === value
    ) {
      setPasswordError("");
    } else if (
      name === "password" &&
      passwordModel?.reenterPassword === value
    ) {
      setPasswordError("");
    }
  };

  const fileHandler = (event) => {
    event.preventDefault();
    const { name } = event.target;

    if (event.target.files) {
      let errorMessage = undefined;
      const val = event.target.files.length;

      if (val) {
        if (parseFloat((event.target.files[0].size / 1024).toFixed(2)) > 5000) {
          errorMessage = "Please select file below 5 MB";
        }
      }

      for (let i = 0; i < val; i++) {
        let reader = new FileReader();
        reader.onload = function (ev) {
          if (name === "profilePicture") {
            setProfilePicture(ev.target.result.split(",")[1]);
          } else if (name === "attachment") {
            getFile(event.target.files[0]).then((customJsonFile) => {
              console.log(customJsonFile, "cc");
              setAttachment({
                attachment: customJsonFile.base64StringFile,
                attachmentName: event.target.files[0].name,
                attachmentError: undefined,
              });
            });
          }
        };

        reader.readAsDataURL(event.target.files[i]);
      }

      let data = profile[name];
      data["value"] = event.target.files[0];
      data["errorMessage"] = errorMessage;
      setProfile((prevProfile) => ({
        ...prevProfile,
        ...data,
      }));
    }
  };

  const toggleCorporateHeadQuarters = () => {
    setCheckStatus(!checkStatus);
    if (!checkStatus) {
      setLocalStates(hqStates);
      setLocalCities(hqCities);

      setProfile((prevState) => ({
        ...prevState,
        corporateLocalBranchAddressLine1: {
          value: prevState.corporateHQAddressLine1.value,
          errorMessage: undefined,
        },
        corporateLocalBranchAddressLine2: {
          value: prevState.corporateHQAddressLine2.value,
          errorMessage: undefined,
        },
        corporateLocalBranchAddressCountry: {
          value: prevState.corporateHQAddressCountry.value,
          errorMessage: undefined,
        },
        corporateLocalBranchAddressState: {
          value: prevState.corporateHQAddressState.value,
          errorMessage: undefined,
        },
        corporateLocalBranchAddressCity: {
          value: prevState.corporateHQAddressCity.value,
          errorMessage: undefined,
        },
        corporateLocalBranchAddressDistrict: {
          value: prevState.corporateHQAddressDistrict.value,
          errorMessage: undefined,
        },
        corporateLocalBranchAddressZipCode: {
          value: prevState.corporateHQAddressZipCode.value,
          errorMessage: undefined,
        },
        corporateLocalBranchAddressPhone: {
          value: prevState.corporateHQAddressPhone.value,
          errorMessage: undefined,
        },
        corporateLocalBranchAddressEmail: {
          value: prevState.corporateHQAddressEmail.value,
          errorMessage: undefined,
        },
      }));
    }
  };

  const saveProfile = () => {
    const profileKeys = profile ? Object.keys(profile) : [];

    let updatedProfile = {};

    profileKeys?.forEach((item) => {
      if (profile[item]?.value) {
        updatedProfile[item] = profile[item].value;
      }
    });

    updatedProfile = {
      ...updatedProfile,
      corporateHQAddressPhone:
        updatedProfile.corporateHQAddressPhone &&
        updatedProfile.corporateHQAddressPhone.toString().trim() !== ""
          ? "+91" + updatedProfile.corporateHQAddressPhone
          : "",
      corporateLocalBranchAddressPhone:
        updatedProfile.corporateLocalBranchAddressPhone &&
        updatedProfile.corporateLocalBranchAddressPhone.toString().trim() !==
          "" &&
        updatedProfile.corporateLocalBranchAddressPhone.toString().trim()
          .length === 10
          ? "+91" + updatedProfile.corporateLocalBranchAddressPhone
          : "",
      primaryContactPhone:
        updatedProfile.primaryContactPhone &&
        updatedProfile.primaryContactPhone.toString().trim() !== "" &&
        updatedProfile.primaryContactPhone.toString().trim().length === 10
          ? "+91" + updatedProfile.primaryContactPhone
          : "",
      dateOfJoining: moment(updatedProfile.dateOfJoining),
      ...attachment,
    };
    console.log(attachment, "hgjg");
    if (updatedProfile?.attachment === undefined) {
      delete updatedProfile.attachment;
    }

    if (updatedProfile?.profilePicture === undefined) {
      delete updatedProfile.profilePicture;
    }

    // Check is password is provided
    if (passwordModel?.oldPassword?.length > 0) {
      if (passwordError?.length === 0) {
        let iv = CryptoJS.enc.Utf8.parse("1234567812345678");
        let key = CryptoJS.enc.Utf8.parse("5v8y/B?E(G+KbPeShVmYq3t6w9z$C&12");
        let hashedPassword = CryptoJS.AES.encrypt(
          passwordModel?.password,
          key,
          {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
          }
        ).toString();

        let hashedOldPassword = CryptoJS.AES.encrypt(
          passwordModel?.oldPassword,
          key,
          {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
          }
        ).toString();
        updatedProfile = {
          ...updatedProfile,
          oldPassword: hashedOldPassword,
          password: hashedPassword,
        };
        dispatch(
          actionPatchCorporateProfileSagaAction({
            apiPayloadRequest: updatedProfile,
            callback: () => {
              setShowModal(true);
            },
          })
        );
      }
    } else {
      dispatch(
        actionPatchCorporateProfileSagaAction({
          apiPayloadRequest: updatedProfile,
          callback: () => {
            setShowModal(true);
          },
        })
      );
    }
  };

  const isFormValid = () => {
    if (
      (profile &&
        requiredFields.some(
          (item) => profile[item]?.errorMessage !== undefined
        )) ||
      attachment.attachmentError ||
      passwordError?.length !== 0
    ) {
      return false;
    } else {
      return true && isTermsAndConditionsChecked;
    }
  };

  console.log(profile, profileInfo, "TOT");
  console.log(profileInfo.stakeholderID, "direc corp msu");
  localStorage.setItem("stakeholderID", profileInfo.stakeholderID);

  return (
    <div className="main" style={{ marginTop: 0 }}>
      <h3 className="main-title">Corporate Profile</h3>
      <div className="profile-pic">
        <img
          src={
            profilePicture
              ? "data:image/png;base64," + profilePicture
              : "../../../images/logo.png"
          }
          className="profile-pic-img"
          alt="no img"
        />
        <div className="upload-pic">
          <label htmlFor="profile">
            Click to <br /> Change your <br /> Logo
          </label>
          <input
            type="file"
            name="profilePicture"
            onChange={fileHandler}
            id="profile"
            accept="image/jpeg, image/jpg, image/png"
            className="upload-pic-inp"
          />
        </div>
      </div>
      <div
        className={
          "d-flex welcome-widget flex-row justify-content-end align-items-center"
        }
        style={{ backgroundColor: "transparent", border: "none", padding: 0 }}
      >
        <div
          className={
            "date-of-joining-widget d-flex flex-column justify-content-center"
          }
        >
          <p className={"sub-label"}>Date of joining the Platform</p>
          <p className={"label"}>
            {profileInfo?.dateOfJoining
              ? moment(profileInfo?.dateOfJoining).format("DD-MM-YYYY")
              : "-"}
          </p>
        </div>
      </div>
      {/* <BasicForm
        profileData={profile}
        onChange={updateProfileData}
        profileInfo={profileInfo}
      /> */}
      {/* <AddressAndContactForm
        profileData={profile}
        onChange={updateProfileData}
        checkStatus={checkStatus}
        toggleCorporateHeadQuarters={toggleCorporateHeadQuarters}
        countries={countries}
        hqStates={hqStates}
        hqCities={hqCities}
        localStates={localStates}
        localCities={localCities}
      /> */}
      {/* <ProfileForm
        profileData={profile}
        onChange={updateProfileData}
        tempAttachment={attachment}
        fileHandler={fileHandler}
        getAttach={getAttach}
        downloadPDF={downloadPDF}
      />
      <AccountSettingsForm profileData={profile} onChange={updateProfileData} />
      <PasswordForm
        profileData={passwordModel}
        onChange={updatePassword}
        passwordErr={passwordError}
      />
      <ReferralForm profileData={profileInfo} /> */}
      <div className="d-grp">
        <div className="custom-control custom-checkbox">
          <input
            onChange={() => {
              setIsTermsAndConditionsChecked(!isTermsAndConditionsChecked);
            }}
            checked={isTermsAndConditionsChecked}
            type="checkbox"
            className="custom-control-input"
            id="accept"
            required
          />
          <label className="custom-control-label" htmlFor="accept">
            I hereby accept the
            <span
              onClick={() => {
                setShowTermsAndConditions(true);
              }}
              style={{
                textDecoration: "underline",
                color: "#646464",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              <i>Terms & Conditions</i>
            </span>{" "}
            of the Platform
          </label>
        </div>
      </div>

      <div className="w-100 text-center">
        <button
          type="button"
          onClick={saveProfile}
          disabled={!isFormValid()}
          className="btn"
        >
          Save
        </button>
      </div>
      {showModal && (
        <CustomToastModal
          onClose={() => {
            setShowModal(false);
          }}
          show={showModal}
          iconNameClass={"fa-building"}
          message={"Your profile has been updated successfully"}
        />
      )}
      {showTermsAndConditions && (
        <CustomModal show={showTermsAndConditions}>
          <div className="hiring-modal">
            <div className="modal-header hiring-modal-header">
              <h5
                className="modal-title"
                style={{ fontSize: "1.5rem" }}
                id="exampleModalLabel"
              >
                Terms and Conditions
              </h5>
              <button
                type="button"
                className="close"
                style={{ fontSize: "1rem", color: "white" }}
                onClick={() => {
                  setShowTermsAndConditions(false);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div style={{ fontSize: "21px", padding: "12px" }}>
              <p>
                Though all efforts have been made to ensure the accuracy and
                concurrency of the content on this website, the same should not
                be construed as a statement of law or used for any legal
                purposes. In case of any ambiguity or doubts, users are advised
                to send email to contact@c2hire.com or verify/check with the
                concerned given in the Contact section of this website to obtain
                appropriate professional advice. Under no circumstances will
                C2Hire. be liable for any expense, loss or damage including,
                without limitation, indirect or consequential loss or damage, or
                any expense, loss or damage whatsoever arising from use or loss
                of use of data, arising out of or in connection with the use of
                the contents of this website.
              </p>
              <br />
              <h3 style={{ color: "blue", fontSize: "25px" }}>1. Terms</h3>
              <p>
                By accessing this web site, you are agreeing to be bound by
                these web site Terms and Conditions of Use, all applicable laws
                and regulations, and agree that you are responsible for
                compliance with any applicable local laws. If you do not agree
                with any of these terms, you are prohibited from using or
                accessing this site. The materials contained in this web site
                are protected by applicable copyright and trade mark law.
              </p>
              <br />
              <h3 style={{ color: "blue", fontSize: "25px" }}>
                2. Use License
              </h3>
              <p>
                Permission is granted to temporarily download one copy of the
                materials (information or software) on C2Hire’s web site for
                personal, non-commercial transitory viewing only. This is the
                grant of a license, not a transfer of title, and under this
                license you may not:
                <br />
                1.Modify or copy the materials
                <br />
                2. Use the materials for any commercial purpose, or for any
                public display (commercial or non-commercial)
                <br />
                2. Attempt to decompile or reverse engineer any software
                contained on C2Hire.
                <br />
                3. Remove any copyright or other proprietary notations from the
                materials or
                <br />
                4. Transfer the materials to another person or “mirror” the
                materials on any other server.
              </p>
              <br />
              <p>
                This license shall automatically terminate if you violate any of
                these restrictions and may be terminated by C2Hire. at any time.
                Upon terminating your viewing of these materials or upon the
                termination of this license, you must destroy any downloaded
                materials in your possession whether in electronic or printed
                format.
              </p>
              <br />
              <h3 style={{ color: "blue", fontSize: "25px" }}>3. Disclaimer</h3>
              <p>
                1. The materials on C2Hire’s web site are provided “as is”.
                C2Hire makes no warranties, expressed or implied, and hereby
                disclaims and negates all other warranties, including without
                limitation, implied warranties or conditions of merchantability,
                fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights. Further,
                C2Hire does not warrant or make any representations concerning
                the accuracy, likely results, or reliability of the use of the
                materials on its Internet web site or otherwise relating to such
                materials or on any sites linked to this site.
              </p>
              <br />{" "}
              <h3 style={{ color: "blue", fontSize: "25px" }}>
                {" "}
                4. Limitations
              </h3>
              <p>
                The materials on C2Hire’s web site are provided “as is”. C2Hire
                makes no warranties, expressed or implied, and hereby disclaims
                and negates all other warranties, including without limitation,
                implied warranties or conditions of merchantability, fitness for
                a particular purpose, or non-infringement of intellectual
                property or other violation of rights. Further, C2Hire does not
                warrant or make any representations concerning the accuracy,
                likely results, or reliability of the use of the materials on
                its Internet web site or otherwise relating to such materials or
                on any sites linked to this site.
              </p>
              <br />
              <h3 style={{ color: "blue", fontSize: "25px" }}>
                5. Revisions and Errata
              </h3>
              <p>
                The materials appearing on C2Hire’s web site could include
                technical, typographical, or photographic errors. C2Hire does
                not warrant that any of the materials on its web site are
                accurate, complete, or current. C2Hire may make changes to the
                materials contained on its web site at any time without notice.
                C2Hire does not, however, make any commitment to update the
                materials.
              </p>
              <br />
              <h3 style={{ color: "blue", fontSize: "25px" }}>6. Links</h3>
              <p>
                C2Hire has not reviewed all of the sites linked to its Internet
                web site and is not responsible for the contents of any such
                linked site. The inclusion of any link does not imply
                endorsement by C2Hire of the site. Use of any such linked web
                site is at the user’s own risk.
              </p>
              <br />
              <h3 style={{ color: "blue", fontSize: "25px" }}>
                7. Site Terms of Use Modifications
              </h3>
              <p>
                C2Hire may revise these terms of use for its web site at any
                time without notice. By using this web site you are agreeing to
                be bound by the then current version of these Terms and
                Conditions of Use.
              </p>
              <br />
              <h3 style={{ color: "blue", fontSize: "25px" }}>
                8. Site Visit data
              </h3>
              <p>
                C2HIRE.Website does not automatically capture any specific
                personal information from you, (like name, phone number or
                e-mail address), that allows us to identify you individually.
              </p>
              <br />
              <p>
                This website records your visit and logs the following
                information for statistical purposes, such as Internet protocol
                (IP) addresses, domain name, server's address; name of the
                top-level domain from which you access the Internet (for
                example, .gov, .com, .in, etc.), browser type, operating system,
                the date and time of the visit, the pages you have accessed, the
                documents downloaded and the previous Internet address from
                which you linked directly to the site. We make no attempt to
                link these addresses with the identity of individuals visiting
                our site unless an attempt to damage the site has been detected.
                We will not identify users or their browsing activities, except
                when a law enforcement agency may exercise a warrant to inspect
                the service provider's logs.
              </p>
              <br />
              <p>
                If the C2HIRE.Website requests you to provide personal
                information, for the particular purposes for which the
                information is gathered and adequate security measures will be
                taken to protect your personal information. C2HIRE.does not sell
                or share any personally identifiable information volunteered on
                the C2HIRE.Website to any third party (public/private). Any
                information provided to this website will be protected from
                loss, misuse, unauthorized access or disclosure, alteration, or
                destruction.
              </p>
              <br />
              <h3 style={{ color: "blue", fontSize: "25px" }}>
                9. Collection of Personal Information
              </h3>
              <p>
                If you are asked for any other Personal Information including
                Aadhar, it will only be used for the purpose of marketplace on
                this website. If at any time you believe the principles referred
                to in this privacy statement have not been followed, or have any
                other comments on these principles, please notify us by sending
                email to contact@c2hire.com.
              </p>
              <p>
                <strong>Note:</strong> The use of the term "Personal
                Information" in this privacy statement refers to any information
                from which your identity is apparent or can be reasonably
                ascertained.{" "}
              </p>
              <br />
              <h3 style={{ color: "blue", fontSize: "25px" }}>
                {" "}
                10. Use Of Personal Data
              </h3>
              <p>
                We will use your Personal Data, to:
                <br />
                1.Understand and strive to meet your needs and preferences in
                using our Services
                <br />
                2.Develop new and enhance existing service and product offerings
                <br />
                3.Manage and develop our business and operations
                <br />
                4.Carry out any actions for which we have received your consent
                <br />
                5.Prevent and investigate fraudulent or other criminal activity
                <br />
                6.To address service requests and resolve user questions and
                <br />
                7.Meet legal and regulatory requirements.
                <br /> We also reserve the right to use aggregated Personal Data
                to understand how our users use our Services, provided that
                those data cannot identify any individual.
                <br /> We also use third-party web analytics tools that help us
                understand how users engage with our website. These
                third-parties may use first-party cookies to track user
                interactions to collect information about how users use our
                website. This information is used to compile reports and to help
                us improve our website. The reports disclose website trends
                without identifying individual visitors. You can opt-out of such
                third-party analytic tools without affecting how you visit our
                site. For more information on opting-out, please contact
                contact@c2hire.com
              </p>
              <br />
              <h3 style={{ color: "blue", fontSize: "25px" }}>
                11. Reasonable Security Practices
              </h3>
              <p>
                Reasonable security measures such as administrative, technical,
                operational and physical controls have been implemented to
                ensure the security of personal information, if collected.
              </p>
              <br />
              <h3 style={{ color: "blue", fontSize: "25px" }}>
                12. Disclaimer of warranties
              </h3>
              <p>
                {" "}
                You understand that we cannot and do not guarantee or warrant
                that files available for downloading from the internet or the
                Website will be free of viruses or other destructive code. You
                are responsible for implementing sufficient procedures and
                checkpoints to satisfy your particular requirements for
                anti-virus protection and accuracy of data input and output, and
                for maintaining a means external to our site for any
                reconstruction of any lost data. TO THE FULLEST EXTENT PROVIDED
                BY LAW, WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A
                DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUSES, OR OTHER
                TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER
                EQUIPMENT, COMPUTER PROGRAMS, DATA, OR OTHER PROPRIETARY
                MATERIAL DUE TO YOUR USE OF THE WEBSITE OR ANY SERVICES OR ITEMS
                OBTAINED THROUGH THE WEBSITE OR TO YOUR DOWNLOADING OF ANY
                MATERIAL POSTED ON IT, OR ON ANY WEBSITE LINKED TO IT.
              </p>
              <br />
              <p>
                YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS
                OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE,
                ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE
                WEBSITE ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS,
                WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY
                MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE
                COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR
                AVAILABILITY OF THE WEBSITE. WITHOUT LIMITING THE FOREGOING,
                NEITHER THE COMPANY NOR ANYONE ASSOCIATED WITH THE COMPANY
                REPRESENTS OR WARRANTS THAT THE WEBSITE, ITS CONTENT, OR ANY
                SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE WILL BE ACCURATE,
                RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE
                CORRECTED, THAT OUR SITE OR THE SERVER THAT MAKES IT AVAILABLE
                ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT THE
                WEBSITE OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE
                WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.
              </p>
              <br />
              <p>
                {" "}
                TO THE FULLEST EXTENT PROVIDED BY LAW, THE COMPANY HEREBY
                DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
                IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO
                ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS
                FOR PARTICULAR PURPOSE. THE FOREGOING DOES NOT AFFECT ANY
                WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE
                LAW.
              </p>
              <br />
              <h3 style={{ color: "blue", fontSize: "25px" }}>
                13. Limitation on liability
              </h3>
              <p>
                TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE
                COMPANY, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS,
                EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES
                OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN
                CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, ANY
                WEBSITES LINKED TO IT, ANY CONTENT ON THE WEBSITE OR SUCH OTHER
                WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED
                TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS,
                LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR
                ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF
                DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH
                OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE. THE FOREGOING
                DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED
                UNDER APPLICABLE LAW.
              </p>
              <br />
              <h3 style={{ color: "blue", fontSize: "25px" }}>
                14. Governing Law
              </h3>
              <p>
                Any claim relating to C2Hire's web site shall be governed by the
                laws of the State of India without regard to its conflict of law
                provisions.
                <br /> General Terms and Conditions applicable to Use of a Web
                Site.
                <br />
                All other feedback, comments, requests for technical support,
                and other communications relating to the Website should be
                directed to:
                <a href="mailto:contact@c2hire.com"> contact@c2hire.com</a>
                <br /> This website is operated by PGK Technologies Private
                Limited (for its product C2Hire.), Plot no 33, Jayabheri Enclave
                Phase-2 Gachibowli, Hyderabad. 500032, INDIA.
              </p>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default Profile;
