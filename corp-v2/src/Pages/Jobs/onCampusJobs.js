import { Badge, Container, Tab, Tabs, Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import OutboxIcon from '@mui/icons-material/Outbox';
import { AccountBalance } from "@mui/icons-material";
import { IoArrowForwardCircleSharp } from 'react-icons/io5';
import { TiDownload } from 'react-icons/ti';
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { actionGetCampusDriveAcceptedInvitesListRequest } from "../../Store/Actions/SagaActions/CampusDriveSagaActions";
import { Pagination } from "@mui/material";
import NearMeDisabledRoundedIcon from '@mui/icons-material/NearMeDisabledRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
const OnCampusJobs = (props) => {

    const [tabValue, setTabValue] = useState(0);
    const size = 5;
    const [receivedList, setReceivedList] = useState([]);
    const [receivedPage, setReceivedPage] = useState(1);
    const [receivedCount, setReceivedCount] = useState(0);
    const [sentList, setSentList] = useState([]);
    const [sentPage, setSentPage] = useState(1);
    const [sentCount, setSentCount] = useState(0);
    const dispatch = useDispatch();
    const history = useNavigate();



    const getResponse = (dataList) => {
        if (dataList?.campusInviteReceived?.length) {
            setReceivedList(dataList.campusInviteReceived);
        }

        if (dataList?.campusInviteSent?.length) {
            setSentList(dataList.campusInviteSent);
        }

        if (dataList?.campusInviteSentCount) {
            setSentCount(dataList.campusInviteSentCount);
        }

        if (dataList?.campusInviteReceivedCount) {
            setReceivedCount(dataList.campusInviteReceivedCount);
        }
    }

    useEffect(() => {
        dispatch(actionGetCampusDriveAcceptedInvitesListRequest({
            page: tabValue === 0 ? sentPage : receivedPage,
            size,
            callback: getResponse
        }))
    }, [sentPage, receivedPage]);

    useEffect(() => {
        setReceivedPage(1);
        setSentPage(1);
    }, [tabValue]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

    const navigateToCampusDrive = (campusDriveId, universityId) => {
        history('/jobs/' + campusDriveId + '/define-jobs/' + universityId)
    }

    console.log(sentList, receivedList, 'sentVALUE    ')
    return (
        <>
            <div style={{
                display: 'flex',
                paddingTop: '150px',
                width: '100%',
                flexDirection: 'column',
                background: '#72A0C1', color: '#000000'
            }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="secondary"
                    textColor="primary"
                    variant="scrollable"
                >
                    <Tab
                        icon={
                            <Badge color="error">
                                <TiDownload size={30} />
                            </Badge>
                        }
                        label={tabValue === 0 ? 'Campus Invite Received' : ''}
                        wrapped
                        style={{
                            outline: "none",
                            minWidth: '13%'
                        }}
                    />
                    <Tab
                        icon={
                            <Badge color="error">
                                <OutboxIcon size={40} />

                            </Badge>
                        }
                        label={tabValue === 1 ? 'Campus Invite Sent' : ''}
                        wrapped
                        style={{
                            outline: "none",
                            minWidth: '13%'
                        }}
                    />
                </Tabs>
                {tabValue === 0 && <>
                    {sentList.map((item, index) => {
                        return <div className="cards-job" key={index}>
                            <div className="col-lg-12 col-md-12 col-sm-12 card-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                <div className="icon" style={{ marginRight: "30px" }}>

                                    <AccountBalance />
                                </div>
                                <div>
                                    <span style={{ fontWeight: "bold", paddingRight: '55px' }} >
                                        {item?.receiverName}
                                    </span>

                                    <span style={{ paddingRight: '205px' }}>
                                        {item?.receiverLocation}
                                    </span>

                                    {item?.campusDriveClosed ? (
                                        <span style={{ paddingLeft: '800px' }}>
                                            <LockRoundedIcon style={{ color: 'red' }} />
                                            <p style={{fontWeight:'bold' , color:'#FF2400'}} >Drive Closed</p>
                                        </span>
                                    ) : (
                                        <span style={{ paddingLeft: '800px' }}>
                                            <IoArrowForwardCircleSharp
                                                size={35}
                                                onClick={() => {
                                                    navigateToCampusDrive(item?.campusDriveID, item?.receiverID);
                                                }}
                                            />
                                        </span>
                                    )}
                                </div>
                            </div>

                        </div>
                    })
                    }
                    <Container component={Box} py={3} style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                        <Pagination
                            count={Math.ceil(sentCount / size)}
                            page={sentPage}
                            shape={'rounded'}
                            color={'primary'}
                            variant={'outlined'}
                            onChange={(event, value) => setSentPage(value)}
                        />
                    </Container>
                </>}


                {tabValue === 1 &&
                    <>
                        {receivedList.map((item, index) => {
                            return <div className="cards-job" key={index}>
                                <div className="col-lg-12 col-md-12 col-sm-12 card-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                    <div className="icon" style={{ marginRight: "30px" }}>

                                        <AccountBalance />
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: "bold", paddingRight: '55px' }} >
                                            {item?.initiatorName}
                                        </span>

                                        <span style={{ paddingRight: '205px' }}>
                                            {item?.initiatorLocation}
                                        </span>
                                        {item?.campusDriveClosed ? (
                                        <span style={{ paddingLeft: '900px' }}>
                                            <LockRoundedIcon style={{ color: 'red' }}/>
                                            <p style={{fontWeight:'bold' , color:'#FF7F50'}} >Drive Closed</p>
                                        </span>
                                    ) : (
                                        <span style={{ paddingLeft: '900px' }}>
                                            <IoArrowForwardCircleSharp
                                                size={35}
                                                onClick={() => {
                                                    navigateToCampusDrive(item?.campusDriveID, item?.initiatorID)
                                                }}
                                            />
                                        </span>
                                    )}
                                    </div>
                                </div>

                            </div>
                        })
                        }
                        <Container component={Box} py={3} style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                            <Pagination
                                count={Math.ceil(receivedCount / size)}
                                page={receivedPage}
                                shape={'rounded'}
                                color={'primary'}
                                variant={'outlined'}
                                onChange={(event, value) => setReceivedPage(value)}
                            />
                        </Container>
                    </>
                }
            </div>
        </>

    )
}

export default OnCampusJobs;