import React from "react";
import {Dispatch, FC, ReactNode, SetStateAction} from "react";
import './ModalWindow.css';

interface ModalWindowProps {
    active: boolean,
    setActive: Dispatch<SetStateAction<boolean>>,
    children?: ReactNode
}
export const ModalWindow: FC<ModalWindowProps> = ({active, setActive, children}) => {
    return (
        <>
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div
                    className={active ? "modal__content active" : "modal__content"}
                    onClick={event => event.stopPropagation()}>
                    {children}
                </div>
            </div>
        </>
    );
};


