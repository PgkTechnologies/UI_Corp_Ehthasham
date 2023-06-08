import { Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es";
import { useNavigate } from "react-router-dom";

const ContactPersonnelCmp = (props) => {

    const history = useNavigate();
    const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [valueRadio, setValueRadio] = useState(null);
    const [disable, setDisable] = useState(false);
    const [checked, setChecked] = useState(false);
    const isMatch = (value) => {
        if (props?.contactPersonnel?.password !== value) {
            return "Password does not match";
        }
    };

    const canBeSubmitted = () => {
        return checked ? setIsDisabled(true) : setIsDisabled(false);
    };

    const onCheckboxClick = () => {
        setChecked(!checked);
        return canBeSubmitted();
    };

    const handlerChange = (event) => {
        setValueRadio(event.target.value);
        if (event.target.value === "true" || event.target.value === true) {
            props?.setContactPersonnel((prev) => ({
                ...prev,
                gstn: "",
            }));
            setDisable(false);
        }

        if (event.target.value === "false" || event.target.value === false) {
            props?.setContactPersonnel((prev) => ({
                ...prev,
                gstn: "",
            }));
            setDisable(true);
        }
        // } else {
        //   if (paymentData.gstn) {
        //     setpaymentData((prev) => ({
        //       ...prev,
        //       gstn: paymentData.gstn,
        //     }));
        //   } else {
        //     setpaymentData((prev) => ({
        //       ...prev,
        //       gstn: localStorage.getItem("GST"),
        //     }));
        //   }

    };


    return (
        <form onSubmit={props?.handleSubmit} className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
            <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>Primary Contact</div>


                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="primaryContactFirstName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'First Name'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.primaryContactFirstName}
                            required={true}
                        />
                    </FormControl>
                </div>




                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="primaryContactMiddleName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Middle Name'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.primaryContactMiddleName}

                        />
                    </FormControl>
                </div>



                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="primaryContactLastName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Last Name'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.primaryContactLastName}
                            required={true}
                        />
                    </FormControl>
                </div>


                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="primaryContactDesignation"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Designation'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.primaryContactDesignation}
                            required={true}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="primaryContactPhone"
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Phone Number'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.primaryContactPhone
                            }
                            required={true}
                            error={props?.errors?.primaryContactPhone}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="primaryContactEmail"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Email'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.primaryContactEmail}
                            required={true}
                            error={props?.errors?.primaryContactEmail}
                        />
                    </FormControl>
                </div>

            </div>
            <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>Secondary Contact</div>


                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="secondaryContactFirstName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'First Name'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.secondaryContactFirstName}
                            required={true}
                        />
                    </FormControl>
                </div>




                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="secondaryContactMiddleName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Middle Name'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.secondaryContactMiddleName}

                        />
                    </FormControl>
                </div>



                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="secondaryContactLastName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Last Name'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.secondaryContactLastName}
                            required={true}
                        />
                    </FormControl>
                </div>


                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="secondaryContactDesignation"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Designation'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.secondaryContactDesignation}
                            required={true}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="secondaryContactPhone"
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Phone Number'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.secondaryContactPhone}
                            required={true}
                            error={props?.errors?.secondaryContactPhone}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="secondaryContactEmail"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Email'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.secondaryContactEmail}
                            required={true}
                            error={props?.errors?.secondaryContactEmail}
                        />
                    </FormControl>
                </div>

            </div>

            <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>GSTN</div>
                <div className="col-4">

                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            Have a GSTN (Goods and Services Tax Number) ? *
                        </FormLabel>
                        <RadioGroup row aria-label="position" name="gstn" onChange={handlerChange} value={valueRadio} >

                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="Yes"

                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio color="primary" />}
                                label="No"

                            />
                        </RadioGroup>
                    </FormControl>
                </div>


                <div >
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="gstn"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'GSTN'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.gstn}
                            required={true}
                            disabled={disable}
                            error={props?.errors?.gstn}
                        />
                    </FormControl>
                </div>

            </div>



            <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>Password</div>

                <div className="col-4" >
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="password"
                            type='password'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Password (min 8)'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.password}
                            required={true}
                            error={props?.errors?.password}
                        />
                    </FormControl>
                </div>

                <div className="col-4" >
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="repeatPassword"
                            type='password'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Repeat the password'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.repeatPassword}
                            required={true}
                            error={props?.errors?.repeatPassword}
                        />
                    </FormControl>
                </div>

            </div>

            <div className="row-container row">
                <div className="row-container">
                    <Checkbox
                        // checked={universityPrimaryData.attribute6 || ""}
                         onClick={onCheckboxClick}
                        required
                    />
                    <div>I here by accept the terms and conditions of C2Hire</div>
                </div>
            </div>

            <div style={{ width: '100%' }}>
        <div style={{ float: 'left' }}>
          <button className="btn" type="button"onClick={() => {
            history("/register/CorporateSecondary");
          }}>
            Back
          </button>
        </div>
        <div style={{ float: 'right' }}>
          <button
            className="btn"
            type="submit"
            disabled={isDisabled}
          >
            Next
          </button>
        </div>
      </div>

        </form>
    )
}

export default ContactPersonnelCmp;
