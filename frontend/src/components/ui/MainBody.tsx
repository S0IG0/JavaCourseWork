import React, {FC, ReactNode} from "react";

interface BodyProps {
    children?: ReactNode
}
export const MainBody: FC<BodyProps> = ({children}) => {
    return (
        <>
            <div className="container-fluid pb-3">
                <div className="bg-body-tertiary border rounded-3">
                    {children}
                </div>
            </div>
        </>
    );
};