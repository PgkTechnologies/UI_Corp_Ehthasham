import React, { useState, useEffect } from "react";
import {
  TextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import moment from "moment";
import { actionGetDependencyLookUpsSagaAction } from "../../Store/Actions/SagaActions/CommonSagaActions";
import { useDispatch } from "react-redux";

const BasicCmp = (props) => {

  const dispatch = useDispatch();
  const [corporateTypes, setCorporateTypes] = useState([]);
  const [corporateCategories, setCorporateCategories] = useState([]);
  const [corporateIndustries, setCorporateIndustries] = useState([]);

  const onGetDependencyLookUpsResponse = (response) => {
    console.log(response,'ressppiii')
    setCorporateTypes(
      response?.corporateType?.length
        ? response.corporateType.map((item) => {
          if (item?.corporateTypeCode) {
            return {
              value: item.corporateTypeCode,
              label: item.corporateTypeName,
            };
          }
        })
        : []
    );

    setCorporateCategories(
      response?.corporateCategory?.length
        ? response.corporateCategory.map((item) => {
          if (item?.categoryName) {
            return {
              value: item.categoryCode,
              label: item.categoryName,
            };
          }
        })
        : []
    );

    setCorporateIndustries(
      response?.corporateIndustry?.length
        ? response.corporateIndustry.map((item) => {
          if (item?.industryName) {
            return {
              value: item.industryCode,
              label: item.industryName,
            };
          }
        })
        : []
    );
  };


  useEffect(() => {
    dispatch(
      actionGetDependencyLookUpsSagaAction({
        apiPayloadRequest: [
          "corporateType",
          "corporateCategory",
          "corporateIndustry",
        ],
        callback: onGetDependencyLookUpsResponse,
      })
    );
  }, []);

 
  //console.log(props, "BASIC")
  localStorage.setItem('tpID', props?.profileData?.stakeholderID?.value);
  return (
    <div className="cmp-main">
      <p className="cmp-head">Basic</p>
      <div className="row">
        <div className="col-3">
          <TextField
            label="Stakeholder ID"
            type="text"
            name="stakeholderID"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            value={
              props?.profileData?.stakeholderID
                ? props?.profileData?.stakeholderID?.value
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
              props?.profileInfo?.dateOfJoining ?  moment(props?.profileInfo?.dateOfJoining).format("DD-MM-YYYY")
              : "-"
            }
          />
        </div>

        <div className="col-3">
          <TextField
            label="Corporate Sector"
            type="text"
            name="corporateType"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            onChange={props?.onChange}
            InputLabelProps={{
              shrink: true
            }}
            required={true}
            disabled={true}
            value={props?.profileData?.corporateType?.value ? props?.profileData?.corporateType?.value : ''}
            
          />
        </div>
        <div className="col-3">
          <TextField
            label="Year Of Establishment"
            type="text"
            name="yearOfEstablishment"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            onChange={props?.onChange}
            InputLabelProps={{
              shrink: true
            }}
            value={ props?.profileData?.yearOfEstablishment?.value !== undefined
                    ? parseInt(props?.profileData?.yearOfEstablishment?.value)
                    : ""}
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
            value={props?.profileInfo?.corporateName}
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
            value={props?.profileInfo?.CIN }
            onChange = {props?.onChange}
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
            value={props?.profileInfo?.corporateCategory}
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
            value={props?.profileInfo?.corporateIndustry}
          />
        </div>
        {/* <div className="col-6">
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
            value={props?.profileData?.primaryContactEmail}
          />
        </div> */}
        <div className="col-6" style={{width:'100%'}}>
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
            value={props?.profileInfo?.gstn }
          />
        </div>
      </div>
    </div>
  );
};

export default BasicCmp;
