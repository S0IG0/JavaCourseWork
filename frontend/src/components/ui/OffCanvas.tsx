import React, {FC} from "react";

interface OffCanvasProps {
    buttonFill?: JSX.Element | string,
    headFill?: JSX.Element | string,
    children?: React.ReactNode,
}

export const OffCanvas: FC<OffCanvasProps> = ({buttonFill, headFill, children}, context) => {
    return (
        <>
            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"> {buttonFill}
            </button>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex={-1} id="offcanvasWithBothOptions"
                 aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">{headFill}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {children}
                </div>
            </div>
        </>
    );
};