import {BaseForm} from "./baseForm/BaseForm";
import {Dispatch, FC, ReactNode, SetStateAction, useState} from "react";
import React from "react";

export interface IBaseCustomer {
    address: string,
    telephone: string
}

interface BaseFormForCustomerProps {
    customer: IBaseCustomer;
    setCustomer: Dispatch<SetStateAction<IBaseCustomer>>
    children?: ReactNode
}

export const BaseFormForCustomer: FC<BaseFormForCustomerProps> = ({customer, setCustomer, children}) => {
    const [numberCountry, setNumberCountry] = useState<number>(7);
    const [telephone, setTelephone] = useState<string>('');
    const numbersCountry: number[] = [1, 7, 31,];
    return (
        <>
            <BaseForm>
                <div className="col-md-12">
                    <label className="form-label">Address</label>
                    <input
                        value={customer.address}
                        onChange={event => setCustomer({...customer, address: event.target.value})}
                        type="text" className="form-control" required/>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Telephone number</label>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">country +{numberCountry}
                        </button>
                        <ul className="dropdown-menu">
                            {numbersCountry.map(countryNumber =>
                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() => {
                                            setNumberCountry(countryNumber);
                                            setCustomer({...customer, telephone: countryNumber + telephone})
                                        }}>
                                        {countryNumber}</button>
                                </li>
                            )}
                        </ul>
                        <input value={telephone}
                               onChange={event => {
                                   setTelephone(event.target.value);
                                   setCustomer({...customer, telephone: numberCountry + event.target.value})
                               }}
                               type="tel" className="form-control" aria-label="Text input with dropdown button"/>
                    </div>
                </div>
                {children}
            </BaseForm>
        </>
    );
};