export const RightForOrderLoader = () => {
    return (
        <>
            <div className="col-sm">
                <div className="card m-auto">
                    <div className="card-header text-center">
                        <button type="button" className="btn btn-success btn-lg px-5  disabled placeholder col-12"
                                style={{width: "100%"}}>
                        </button>
                    </div>
                    <ul className="list-group list-group-flush placeholder-glow">
                        <li className="list-group-item mt-2">
                            <div className="h4 left placeholder col-3"></div>
                            <div className="h4 right placeholder col-1"></div>
                        </li>
                        <li className="list-group-item mt-2">
                            <div className="h4 left placeholder col-4"></div>
                            <div className="h4 right placeholder col-2"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};