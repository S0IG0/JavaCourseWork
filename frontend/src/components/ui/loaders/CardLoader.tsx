
export const CardLoader = () => {
    return (
        <>
            <div
                className="card shadow-sm m-auto"
                aria-hidden="true"
                style={{maxWidth: "400px", minWidth: "200px"}}>
                <div className="card-header">
                    <big className="card-title placeholder-glow">
                        <span className="placeholder col-12"></span>
                    </big>
                </div>
                <div className="" style={{width: "100%", height: "300px", background: "#868e96"}}>
                </div>
                <div className="card-body">
                    <p className="card-text placeholder-glow" style={{height: "100px"}}>
                        <span className="placeholder col-4 me-2"></span>
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-6 me-2"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-3 me-2"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center placeholder-glow">
                    <big className="text-body-secondary  placeholder col-6"></big>
                    <button type="button" className="btn btn btn-warning disabled placeholder col-4"></button>
                </div>
            </div>
        </>
    );
};