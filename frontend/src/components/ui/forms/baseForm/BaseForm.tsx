import './BaseForm.css'
import {FC, ReactNode} from "react";
import React from 'react';

interface IBaseForm {
    children?: ReactNode
}

export const BaseForm: FC<IBaseForm> = ({children}) => {
    return (
        <>
            <div className="supportForForm">
                <div className="allForms m-auto">
                    <form className="row g-3 needs-validation">
                        {children}
                    </form>
                </div>
            </div>
        </>
    );
};