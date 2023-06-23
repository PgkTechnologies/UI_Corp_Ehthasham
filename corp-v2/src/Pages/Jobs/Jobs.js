

const Jobs = () => {
    return (
        // <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', background: 'black', color: 'whitesmoke' }}>
        //     JObs Page
        // </div>
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '55px', position: 'relative' }}>
            <img src="/images/corporateIcons/JobsPage.svg" alt="Example" style={{ maxWidth: '100%', maxHeight: '100%', zIndex: '-1' }} />

            <div style={{ position: 'absolute', bottom: '110px', left: '230px' }}>
                <button className="step-card tab-select" style={{ display: 'flex', marginLeft: '15px' }}>ON Campus Drive</button>

            </div>

            <div   style={{ position: 'absolute', bottom: '110px', right: '230px' }}>
                <button className="step-card tab-select"  style={{ display: 'flex' }}>OFF Campus Drive</button>

            </div>
        </div>
    )
}

export default Jobs;