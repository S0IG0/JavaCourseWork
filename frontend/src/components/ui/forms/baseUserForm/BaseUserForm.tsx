import {BaseForm} from "../baseForm/BaseForm";
import {Dispatch, FC, SetStateAction, useState} from "react";
import React from "react";

export interface IUser {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
}

interface BaseUserFormProps {
    user: IUser
    setUser: Dispatch<SetStateAction<IUser>>
    isPublisher?: boolean
    setIsPublisher: Dispatch<SetStateAction<boolean>>
}

export const BaseUserForm: FC<BaseUserFormProps> = ({user, setUser, setIsPublisher}) => {
    const [countOn, setCountOn] = useState<number>(0);
    return (
        <>
            <BaseForm>
                <div className="col-md-6">
                    <label className="form-label">First name</label>
                    <input
                        value={user.firstname}
                        onChange={(event) => setUser({...user, firstname: event.target.value})}
                        type="text" className="form-control" placeholder="Mark" required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Last name</label>
                    <input value={user.lastname}
                           onChange={(event) => setUser({...user, lastname: event.target.value})}
                           type="text" className="form-control" placeholder="Lotto" required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input value={user.username}
                           onChange={(event) => setUser({...user, username: event.target.value})}
                           type="text" className="form-control" placeholder="Username" required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input value={user.email}
                           onChange={(event) => setUser({...user, email: event.target.value})}
                           type="email" className="form-control" placeholder="email@example.com" required/>
                </div>
                <div className="col-md-12">
                    <div className="form-check">
                        <input
                            onChange={() => {
                                setCountOn((countOn + 1) % 2);
                                setIsPublisher(countOn === 0);
                            }}
                            type="checkbox" className="form-check-input" required/>
                        <label className="form-check-label">You publisher ?</label>
                    </div>
                </div>
            </BaseForm>
        </>
    );
};