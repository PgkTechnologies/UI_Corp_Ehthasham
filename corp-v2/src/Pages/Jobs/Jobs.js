import { useState } from "react";
import OnCampusJobs from "./onCampusJobs";
import OffCampusJobs from "./offCampusJobs";


const Jobs = () => {

    const [goOnCampus, setGoOnCampus] = useState(false);
    const [goOffCampus, setGoOffCampus] = useState(false);

    const handleCampusDrive = (mode) => {
        console.log(mode, 'driveMode')
        if (mode === 'ONCAM') {
            setGoOnCampus(true);
            setGoOffCampus(false);
            
        } else if (mode === 'OFFCAM') {
            setGoOffCampus(true);
            setGoOnCampus(false);
        }

    }

    return (
        <>
            <div style={{ display: 'flex', width: '35%', alignItems: 'center', justifyContent: 'center', marginTop: '55px', position: 'relative' }}>
                <img src="/images/corporateIcons/JobsPage.svg" alt="Example" style={{ maxWidth: '100%', maxHeight: '100%', zIndex: '-1' }} />

                <div style={{ position: 'absolute', bottom: '110px', left: '30px' }}>
                    <button className="step-card tab-select"
                        style={{ display: 'flex', marginLeft: '15px' }}
                        onClick={() => { handleCampusDrive('ONCAM') }}
                    >ON Campus Drive</button>

                </div>

                <div style={{ position: 'absolute', bottom: '110px', right: '30px' }}>
                    <button className="step-card tab-select"
                        style={{ display: 'flex' }}
                        onClick={() => { handleCampusDrive('OFFCAM') }}
                    >
                        OFF Campus Drive</button>

                </div>
            </div>

            {goOnCampus && (
                <OnCampusJobs/>
            )}
            {goOffCampus && (
                <OffCampusJobs/>
            )}
        </>
    )
}

export default Jobs;