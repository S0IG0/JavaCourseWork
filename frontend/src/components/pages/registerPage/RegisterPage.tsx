import {BaseUserForm, IUser} from "../../ui/forms/baseUserForm/BaseUserForm";
import {BaseFormForPublisher, IBasePublisher} from "../../ui/forms/BaseFormForPublisher";
import {BaseFormForCustomer, IBaseCustomer} from "../../ui/forms/BaseFormForCustomer";
import React, {useContext, useState} from "react";
import './RegisterPage.css'
import {RetypePasswordForm} from "../../ui/forms/RetypePasswordForm";
import {useMutation} from "@apollo/client";
import {createCustomer, createPublisher, login} from "../../graphql/mutation";
import {Context} from "../../../index";
import {privateRouter, RoutesNames} from "../../routers/Routers";
import {useNavigate} from "react-router-dom";

export const RegisterPage = () => {
    const {store} = useContext(Context)
    const path: string | undefined = privateRouter.get(RoutesNames.PERSONAL_ACCOUNT)?.path;
    const navigate = useNavigate();
    const {request, response} = login;
    const [loginFunction, loginData] = useMutation<typeof response>(request)
    const [createPublisherFunction, createPublisherData] = useMutation<typeof createPublisher.response>(createPublisher.request);
    const [createCustomerFunction, createCustomerData] = useMutation<typeof createCustomer.response>(createCustomer.request);

    const loginUser = () => {
        if (createCustomerData.error || createPublisherData.error) {return}
        loginFunction({
            variables: {username: baseUser.username, password: baseUser.password}
        }).then(data => {
            if (data.data?.login !== undefined && path !== undefined) {
                store.setAuth(true);
                store.login({username: baseUser.username, password: baseUser.password}, data.data.login);
                navigate(path, {replace: false})
            }
        })
    };

    const [baseUser, setBaseUser] = useState<IUser>({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    })

    const [baseCustomer, setBaseCustomer] = useState<IBaseCustomer>({
        address: '',
        telephone: ''
    })

    const [basePublisher, setBasePublisher] = useState<IBasePublisher>({
        addressCompany: '',
        nameCompany: '',
        activitiesCompany: '',
        positionInCompany: ''
    })

    const [isPublisher, setIsPublisher] = useState(false);
    return (
        <>
            <div>
                {Array.from(new Set([
                    createPublisherData,
                    createCustomerData,
                    loginData
                ].map(data => data.error?.message))).map(message => {
                        if (message) {
                            return (
                                <div className="alert alert-danger m-4" role="alert">
                                    {message}
                                </div>
                            )
                        }
                        return ''
                    }
                )}


                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-interval="false">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0"
                                data-bs-pause="true"
                                className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                                data-bs-pause="true"
                                aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                                data-bs-pause="true"
                                aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="divFlex">
                            <div className="carousel-item active itemInCarousel" data-bs-interval="false"
                                 data-bs-pause="true">
                                <BaseUserForm
                                    user={baseUser}
                                    setUser={setBaseUser}
                                    isPublisher={isPublisher}
                                    setIsPublisher={setIsPublisher}
                                ></BaseUserForm>
                            </div>
                            <div className="carousel-item itemInCarousel" data-bs-interval="false" data-bs-pause="true">
                                <RetypePasswordForm user={baseUser} setUser={setBaseUser}></RetypePasswordForm>
                            </div>
                            <div className="carousel-item itemInCarousel" data-bs-interval="false" data-bs-pause="true">
                                {isPublisher ?
                                    <BaseFormForPublisher
                                        publisher={basePublisher}
                                        setPublisher={setBasePublisher}
                                    >
                                        <div className="col-12">
                                            <button
                                                className="btn btn-primary"
                                                type="button"
                                                onClick={() => {
                                                    createPublisherFunction({
                                                        variables: {
                                                            publisher: {...basePublisher, user: baseUser}
                                                        }
                                                    }).then(() => loginUser())
                                                }}
                                            >{createPublisherData.loading || loginData.loading ?
                                                <div className="spinner-border"
                                                     role="status"
                                                     style={{height: "20px", width: "20px"}}
                                                >
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> : "Register for publisher"}
                                            </button>
                                        </div>
                                    </BaseFormForPublisher>
                                    :
                                    <BaseFormForCustomer
                                        customer={baseCustomer}
                                        setCustomer={setBaseCustomer}
                                    >
                                        <div className="col-12">
                                            <button
                                                className="btn btn-primary"
                                                type="button"
                                                onClick={() => {
                                                    createCustomerFunction({
                                                        variables: {
                                                            customer: {...baseCustomer, user: baseUser}
                                                        }
                                                    }).then(() => loginUser())
                                                }}
                                            >
                                                {createCustomerData.loading || loginData.loading ?
                                                    <div className="spinner-border"
                                                         role="status"
                                                         style={{height: "20px", width: "20px"}}
                                                    >
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div> : "Register for customer"}
                                            </button>
                                        </div>
                                    </BaseFormForCustomer>
                                }
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                            data-bs-slide="prev" data-bs-pause="true">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                            data-bs-slide="next" data-bs-pause="true">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
        </>
    );
};