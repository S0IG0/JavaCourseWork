import React, {useContext, useState} from 'react';
import './sign-in.css'
import {login} from "../../graphql/mutation";
import {useMutation} from "@apollo/client";
import {Context} from "../../../index";
import {useNavigate} from 'react-router-dom'
import {AuthUser} from "../../store/store";
import {privateRouter, RoutesNames} from "../../routers/Routers";


export const LoginPage = () => {
    const {store} = useContext(Context)
    const path: string | undefined = privateRouter.get(RoutesNames.PERSONAL_ACCOUNT)?.path;
    const navigate = useNavigate();
    const {request, response} = login;
    const [Authentication, setAuthentication] = useState<AuthUser>({
        username: '',
        password: ''
    })
    const [loginFunction, {loading, error}] = useMutation<typeof response>(request)
    return (
        <>
            {error &&
                <div className="alert alert-danger m-4" role="alert">
                    {error.message === 'Failed to fetch' ? error.message : 'Wrong username or password'}
                </div>
            }
            <div className="support-form">
                <main className="form-signin m-auto text-center">
                    <form onSubmit={event => {
                        event.preventDefault();
                        loginFunction({
                            variables: {
                                username: Authentication.username,
                                password: Authentication.password
                            }
                        })
                            .then(data => {
                                if (data.data?.login !== undefined && path !== undefined) {
                                    store.setAuth(true);
                                    store.login(Authentication, data.data.login);
                                    navigate(path, {replace: false})
                                }
                            })
                            .catch(error => console.log('error', error));
                    }
                    }>
                        <img className="mb-4" src="https://i.ibb.co/VmCS91r/video-card.png" alt="" width="75"/>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInput"
                                   placeholder="username"
                                   value={Authentication.username}
                                   onChange={event => setAuthentication({
                                       ...Authentication,
                                       username: event.target.value
                                   })}
                            />
                            <label htmlFor="floatingInput">You username</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword"
                                   placeholder="Password"
                                   value={Authentication.password}
                                   onChange={event => setAuthentication({
                                       ...Authentication,
                                       password: event.target.value
                                   })}
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <button
                            className={loading ?
                                "w-100 btn btn-lg btn-primary mt-4 disable" :
                                "w-100 btn btn-lg btn-primary mt-4"}
                            type="submit">
                            {loading ?
                                <div className="spinner-border"
                                     role="status"
                                     style={{height: "20px", width: "20px"}}
                                >
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                :
                                "Sign in"
                            }
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
};