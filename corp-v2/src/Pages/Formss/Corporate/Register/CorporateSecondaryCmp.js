import { FormControl, TextField } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux/es';
import { useNavigate } from 'react-router-dom';

const CorporateSecondaryCmp = (props) => {

    const type = 'Corporate';
    const countryCodes = props.countryCodes && props.countryCodes.length >= 0
        ? props.countryCodes?.map((item, i) => ({ value: item.value, label: item.label })) : (null);
        const history = useNavigate();
        const apiStatus = useSelector(state => state.DashboardReducer.apiStatus);

    return(
        <form onSubmit={props?.handleSubmit} className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
        <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>Corporate Headquarters</div>
                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="corporateName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Address(Line 1)'}
                            onChange={props?.handleChange}
                            value={props?.corporatePrimaryData?.corporateName}
                            required={true}
                        />
                    </FormControl>
                </div>



                </div>
        </form>
    )
}
export default  CorporateSecondaryCmp ;