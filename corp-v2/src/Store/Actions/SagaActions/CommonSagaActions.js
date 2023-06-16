import {
  ACTION_GET_DEPENDENCY_LOOKUPS_REQUEST,
  ACTION_GET_COUNTRY_CODES_REQUEST, 
  ACTION_GET_STATES_BY_COUNTRY_NAME_REQUEST, 
  ACTION_GET_CITIES_BY_STATE_NAME_REQUEST,
  ACTION_GET_CITIES_BY_COUNTRY_NAME_REQUEST,
  ACTION_SAVE_COUNTRIES,
  ACTION_GET_BULK_TOKEN_NUMBER_REQUEST,
  ACTION_GET_S3_ATTACH_REQUEST,
  ACTION_GET_STUDENT_NOTIFICATIONS_INFO_REQUEST,
  PATCH_NOTIFICATIONS,
  ACTION_CREATE_PAYMENT_REQUEST,
  VALIDATE_PAYMENT_ACTION_REQUEST
} from "./SagaActionTypes";

// import * as actionType from '../SagaActions'
export const actionGetDependencyLookUpsSagaAction = (payload) => {
  return {
    type: ACTION_GET_DEPENDENCY_LOOKUPS_REQUEST,
    payload: payload, 
  };
};

export const actionGetStudentNotificationRequest = (payload) => {
  return {
      type: ACTION_GET_STUDENT_NOTIFICATIONS_INFO_REQUEST,
      payload: payload
  }
}
 export const markNotifications = (payload) =>{
  return {
    type : PATCH_NOTIFICATIONS,
    payload : payload
  }
 }

export const actionGetCountryCodesSagaAction = (payload) => {
  return {
    type: ACTION_GET_COUNTRY_CODES_REQUEST,
    payload: payload,
  };
};

export const actionUpdateGlobalLoaderSagaAction = (payload) => {
  return {
    type: "APISTATUS",
    payload: payload,
  };
};

export const actionSaveCountries = (payload) => {
  return {
    type: ACTION_SAVE_COUNTRIES,
    payload: payload
  }
}

export const actionGetStatesByCountryNameRequest = (payload) => {
  return {
    type: ACTION_GET_STATES_BY_COUNTRY_NAME_REQUEST,
    payload: payload
  }
}

export const actionGetCitiesByStateNameRequest = (payload) => {
  return {
    type: ACTION_GET_CITIES_BY_STATE_NAME_REQUEST,
    payload: payload
  }
}

export const actionGetCitiesByCountryNameRequest = (payload) => {
  return {
    type: ACTION_GET_CITIES_BY_COUNTRY_NAME_REQUEST,
    payload: payload
  }
}

export const actionGetBulkTokenNumberRequest = (payload)=>{
  return {
    type: ACTION_GET_BULK_TOKEN_NUMBER_REQUEST,
    payload: payload
  }
}

export const actionGetS3AttachRequest = (payload)=>{
  return {
    type: ACTION_GET_S3_ATTACH_REQUEST,
    payload: payload
  }
}

export const actionCreatePaymentAction = (payload) => {
    return {
        type: ACTION_CREATE_PAYMENT_REQUEST,
        payload: payload
    }
}

export const ValidatePaymentActions = (payload) => {
  return {
    type: VALIDATE_PAYMENT_ACTION_REQUEST,
    payload: payload,
  };
};