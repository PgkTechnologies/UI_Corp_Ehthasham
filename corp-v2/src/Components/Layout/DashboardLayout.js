import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import routes from '../../routes';
// import DashboardHeader from '../Common/DashboardHeader';
// import DashboardSidebar from '../Common/DashboardSidebar';
// import HeaderModalForm from '../Common/HeaderModalForm';
import { useSelector } from 'react-redux';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { actionLogoutRequestSaga } from '../../Store/Actions/SagaActions/DashboardSaga/LoginSagaActions';
import { Outlet} from 'react-router-dom';


const DashboardLayout = () => {
    const apiStatus = useSelector(state => state.DashboardReducer.apiStatus);
    const dispatch = useDispatch();
    const history = useNavigate();

    const handleOnIdle = event => {
        dispatch(actionLogoutRequestSaga());
        history('/');
    }

    const handleOnActive = event => {
        //console.log('user is active', event)
        //console.log('time remaining', getRemainingTime())
    }

    const handleOnAction = event => {
        // console.log('user did something', event)
    }

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 1000 * 60 * 15,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        onAction: handleOnAction,
        debounce: 500
    });

    // const getRoutes = (routes) => {
    //     const token = localStorage.getItem('token');
    //     const type = 'Corporate';
    //     if (!token)
    //     {
    //         return <Navigate to="/" />
    //     }            
    //     return routes.map((route, i) => {
    //         if (route.role === 'dashboard') {
    //             return route.component ? (<Route path={route.path}
    //                 key={i}
    //                 exact={route.exact}
    //                 strict={route.strict}
    //                 name={route.name}
    //                 render={props => <route.component {...props} />}
    //             />) : (null)
    //         }
    //     });
    // }

    return (
        <>
           <p> hiiidashboard</p>
        </>
    )
}

export default DashboardLayout;
