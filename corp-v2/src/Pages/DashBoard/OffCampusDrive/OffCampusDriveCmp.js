import { AccountBalance, ArrowRight, CalendarMonth, LocationOn } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionGetAllOffCampusDrivesRequest } from "../../../Store/Actions/SagaActions/OffCampusDrive/OffCampusDriveSagaAction";


const OffCampusDriveCmp = () => {


    const size = 5;
    const history = useNavigate();
    const [offDriveList, setOffDriveList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    const getResponse = (dataList) => {
        // console.log(dataList.allOffCampusDriveForCorp)
        const sortData = dataList.allOffCampusDriveForCorp.map((item, i) => ({ ...item, id: i }));
        setOffDriveList(sortData);
        setTotalCount(dataList.totalCount);
    };

    useEffect(() => {
        dispatch(
            actionGetAllOffCampusDrivesRequest({
                page: page,
                size: size,
                callback: getResponse,
            })
        );
        console.log(page);
        console.log(totalCount);
    }, [page]);

    const navigateToOffCampusDrive = (offCampusDriveId, universityId,RoutePath) => {
        // history('/dashboard/off-campus-drive/' + offCampusDriveId + '/home')
        history("/dashboard/off-campus-drive/" + offCampusDriveId + RoutePath + universityId);
    };

    console.log(offDriveList, 'yessss');

    return (
        <>
            <div style={{ width: '100%',marginTop : '100px', overflowY : 'auto' }}>
            <div style={{display:'flex', justifyItems:'center' }}>
            <h1>Off Campus Drive</h1>
            </div>
                {offDriveList?.length >= 1 ?
                    offDriveList?.map((item, index) => {

                        return (
                            <div className="container-body">
                                <div className="cards-container">

                                    <div className='jobs-cards-container'>


                                        <div className="row job-card-main">
                                            <div
                                                className="col-5 d-flex justify-content-flex-start align-items-center"
                                                style={{ fontWeight: "bold" }}
                                            >
                                                <AccountBalance style={{ fontSize: "30px", marginRight: "25px" }} />
                                                {item.driveName}
                                            </div>
                                            <div
                                                className="col-3 d-flex justify-content-flex-start align-items-center"
                                                style={{ fontSize: "15px", color: "gray" }}
                                            >
                                                <LocationOn style={{ marginRight: "10px", color: "gray" }} />
                                                {item.location}
                                            </div>
                                            <div
                                                className="col-3 d-flex justify-content-flex-start align-items-center"
                                                style={{ fontSize: "15px", color: "gray" }}
                                            >
                                                <CalendarMonth style={{ marginRight: "10px", color: "gray" }} />
                                                {item.startDate}
                                            </div>
                                            <div className="col-1 d-flex justify-content-end align-items-center">
                                                <ArrowRight
                                                    style={{ fontSize: "50px", color: "darkblue", cursor: "pointer" }}
                                                onClick={() => {
                                                    navigateToOffCampusDrive(item.cdID, item.initiatorID,"/off-define-jobs/");
                                                }}
                                                />
                                            </div>
                                        </div>


                                    </div>




                                </div>


                            </div>

                        );
                    })
                    :
                    <div style={{ color: 'gray', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60%' }}>
                        <h5>No Active Drives</h5>
                    </div>
                }

            </div>
        </>
    )
}

export default OffCampusDriveCmp;