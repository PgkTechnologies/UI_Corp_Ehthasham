import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import PgkTextField from '../FormFields/PgkTextField';
import { actionGetBulkTokenNumberRequest } from "../../Store/Actions/SagaActions/CommonSagaActions";

// const $ = window.$;

const HeaderModal = (props) => {
  console.log(props, "Pay");
  const { universityId } = props;

  const [amount, setAmount] = useState(0);
  const [tokenCount, setTokensCount] = useState(1);
  const [bulkPrice, setBulkPrice] = useState(1);
  const dispatch = useDispatch();

  const history = useNavigate();

  const getBulkTokens = () => {
    dispatch(
      actionGetBulkTokenNumberRequest({
        callback: (response) => {
          setTokensCount(parseInt(response.bulkCount));
          setBulkPrice(parseInt(response.bulkPrice));
        },
      })
    );
  };

  // useEffect(() => {
  //   getBulkTokens();
  //   setAmountField((prevState) => ({
  //     ...prevState,
  //     value: props?.additionalTokens,
  //     errorMessage: undefined
  //   }));
  // }, [props?.additionalTokens]);

  useEffect(() => {
    getBulkTokens();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAmount(value);
  };

  const handleSubmit = () => {
    if (amount === undefined || amount?.toString()?.trim() === "") return;
    localStorage.setItem("tokensPurchase", amount);
    if (universityId) {
      localStorage.setItem(
        "navigateUrl",
        `/dashboard/subscribe/newuniversity/${universityId}`
      );
    } else {
      localStorage.setItem("navigateUrl", `/dashboard`);
    }
    history("/payment");
  };

  return (
    <div style={{width:'800px'}} className="modal-content purchase-modal">
      <div className="modal-header purchase-modal-header">
        <button type="button" className="close" onClick={props?.onClose}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-body purchase-modal-body d-flex flex-column justify-content-center align-items-center">
          <p className="heading">
            How many credits would you like to purchase ?
          </p>
          <input
            type="number"
            name="amount"
            step={tokenCount}
            min={tokenCount}
            onChange={handleChange}
            className="form-control credits-input"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="modal-footer-full-btn w-100 border-0 disabled"
            style={{ cursor: "pointer" }}
          >
            Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default  HeaderModal ;
