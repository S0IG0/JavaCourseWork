import {BaseForm} from "./baseForm/BaseForm";
import {Dispatch, FC, ReactNode, SetStateAction} from "react";
import React from "react";
export interface IBasePublisher {
    nameCompany: string,
    activitiesCompany: string,
    positionInCompany: string,
    addressCompany: string
}

interface BaseFormForPublisherProps {
    publisher: IBasePublisher
    setPublisher: Dispatch<SetStateAction<IBasePublisher>>
    children?: ReactNode

}
export const BaseFormForPublisher: FC<BaseFormForPublisherProps> = ({publisher, setPublisher, children}) => {
    return (
        <>
            <BaseForm>
                <div className="col-md-6">
                    <label className="form-label">Name company</label>
                    <input
                        value={publisher.nameCompany}
                        onChange={event => setPublisher({...publisher, nameCompany: event.target.value})}
                        type="text" className="form-control" required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Activities company</label>
                    <input value={publisher.activitiesCompany}
                           onChange={event => setPublisher({...publisher, activitiesCompany: event.target.value})}
                           type="text" className="form-control" required/>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Position in company</label>
                    <input value={publisher.positionInCompany}
                           onChange={event => setPublisher({...publisher, positionInCompany: event.target.value})}
                           type="text" className="form-control" required/>
                </div>
                <div className="col-md-8">
                    <label className="form-label">Address</label>
                    <input value={publisher.addressCompany}
                           onChange={event => setPublisher({...publisher, addressCompany: event.target.value})}
                           type="text" className="form-control" required/>
                </div>
                {children}
            </BaseForm>
        </>
    );
};