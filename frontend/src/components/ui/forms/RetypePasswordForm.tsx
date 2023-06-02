import {BaseForm} from "./baseForm/BaseForm";
import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {IUser} from "./baseUserForm/BaseUserForm";

interface RetypePasswordFormProps {
    user: IUser
    setUser: Dispatch<SetStateAction<IUser>>
}

export const RetypePasswordForm: FC<RetypePasswordFormProps> = ({user, setUser}) => {
    const [password, setPassword] = useState<string>('');
    return (
        <>
            <BaseForm>
                <div className="col-md-12">
                    <label className="form-label">Password</label>
                    <input value={user.password}
                           onChange={(event) => setUser({...user, password: event.target.value})}
                           type="password" className="form-control" required/>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Retype password</label>
                    <input type="password"
                           className={password !== user.password ? "form-control is-invalid" : "form-control"}
                           id="validationServer03"
                           aria-describedby="validationServer03Feedback"
                           value={password}
                           onChange={event => setPassword(event.target.value)}
                           required/>
                    <div id="validationServer03Feedback" className="invalid-feedback">
                        passwords don't match
                    </div>
                </div>
            </BaseForm>
        </>
    );
};