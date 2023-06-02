import React, {FC, useContext} from "react";
import {Context} from "../../../../index";
import {User} from "../../../graphql/typesTS";
import { SettingsForCustomer } from "./SettingsForCustomer";
import { SettingsForPublisher } from "./SettingsForPublisher";

interface SettingsPageProps {
    user: User,
    component: React.ReactNode,
}

export const SettingsPage: FC<SettingsPageProps> = ({user, component}) => {
    return (
        <>
            <div className="row row-cols-1 row-cols-lg-2">
                <div className="col mb-2">
                    <label className="form-label">First name</label>
                    <input type="text" className="form-control" value={user.firstname} />
                </div>
                <div className="col mb-2">
                    <label className="form-label">Last name</label>
                    <input type="text" className="form-control" value={user.lastname} />
                </div>
                <div className="col mb-2">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={user.username} />
                </div>
                <div className="col mb-2">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={user.email} />
                </div>

                {component}

                {/*{isPublisher ?*/}
                {/*    <SettingsForPublisher></SettingsForPublisher> : <SettingsForCustomer></SettingsForCustomer>*/}
                {/*}*/}
                <div className="col mb-2">
                    <label className="form-label">Last password</label>
                    <input type="password" className="form-control"/>
                </div>

                <div className="col mb-2">
                    <label className="form-label">New password</label>
                    <input type="password" className="form-control"/>
                </div>

                <div className="col mt-2 mb-2">
                    <button type="button" className="btn btn-success">Save changes</button>
                </div>
            </div>
        </>
    );
};