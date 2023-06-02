export const CardForOrderLoader = () => {
    return (
        <>
            <div className="card mb-2">
                <div className="row g">
                    <div className="col-md-4">
                        <div className="img-fluid rounded"
                             style={{width: "100%", height: "100%", background: "#868e96"}}></div>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title placeholder-glow">
                                <span className="placeholder col-6"></span>
                            </h5>
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-8"></span>
                            </p>
                            <button type="button" className="btn btn-danger disabled placeholder col-1">
                            </button>

                            <div
                                className="btn btn-secondary disabled placeholder col-2 position-absolute bottom-2 end-0 me-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};