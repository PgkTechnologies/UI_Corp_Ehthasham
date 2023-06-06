import { call, takeLatest, put } from 'redux-saga/effects';
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";

import {
    ACTION_GET_CORPORATE_TOKENS_REQUEST,
    ACTION_GET_CORPORATE_TOKENS_RESPONSE,
    ACTION_GET_CORPORATE_PROFILE_STATS_REQUEST
} from "../Actions/SagaActions/SagaActionTypes";

import { actionUpdateGlobalLoaderSagaAction } from '../Actions/SagaActions/CommonSagaActions';


const getTokens = () => {
    const URL = '/t/balance';
    return Axios.get(URL).then(res => res.data);
}

function* getTokensSaga() {
    try {
        yield put(actionUpdateGlobalLoaderSagaAction(true));

        const resp = yield call(getTokens);
        yield put({ type: ACTION_GET_CORPORATE_TOKENS_RESPONSE, payload: resp })
    } catch (err) {
        if (err?.response) {
            toast.error(err?.response?.data?.errors[0]?.message);
        } else {
            //toast.error("Something Wrong!", err?.message);
        }
    } finally {
        yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
}

const getCorporateProfileStats = () => {
    const URL = '/u/profile/stats';
    return Axios.get(URL).then(res => res.data);
}

function* getCorporateProfileStatsSaga(action) {
    try {
        yield put(actionUpdateGlobalLoaderSagaAction(true));

        const resp = yield call(getCorporateProfileStats);
        if(action.payload.callback) {
            action.payload.callback(resp);
        }
    } catch (err) {
        if (err?.response) {
            toast.error(err?.response?.data?.errors[0]?.message);
        } else {
            //toast.error("Something Wrong!", err?.message);
        }
    } finally {
        yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
}

export default function* DashboardWatcherSaga() {
    yield takeLatest(ACTION_GET_CORPORATE_TOKENS_REQUEST, getTokensSaga);
    yield takeLatest(ACTION_GET_CORPORATE_PROFILE_STATS_REQUEST, getCorporateProfileStatsSaga);
}