import {Link, NavLink} from 'react-router-dom'
import React, {FC, useContext} from "react";
import {baseRouters, IRoute, loginAndRegister, order, privateRouter, RoutesNames} from "../../routers/Routers";
import './NavigationBar.css'
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

interface isActive {
    isActive: boolean
}

const setActive = ({isActive}: isActive) => isActive ? 'nav-link px-2 text-secondary' : 'nav-link px-2 text-white'
export const NavigationBar: FC = observer(() => {
    const {store} = useContext(Context);
    const loginRoute: IRoute | undefined = loginAndRegister.get(RoutesNames.LOGIN);
    const registerRoute: IRoute | undefined = loginAndRegister.get(RoutesNames.REGISTER);
    const navigationRoutes: IRoute[] = [
        ...Array.from(baseRouters.values())
    ];
    const countItems: number = store.getCountItemsInOrder();
    const personalAccount: IRoute | undefined = privateRouter.get(RoutesNames.PERSONAL_ACCOUNT);

    return (
        <>
            <header className="p-3 text-bg-dark">
                <div className="container">
                    <div
                        className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <NavLink to={"/"}
                                 className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <img
                                className="bi me-2"
                                width="75"
                                src="https://i.ibb.co/VmCS91r/video-card.png"
                                alt={"logo"}/>
                        </NavLink>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            {navigationRoutes.map(route => {
                                return (
                                    <li>
                                        <NavLink
                                            to={route.path}
                                            className={setActive}
                                            key={route.name}>{route.name}</NavLink>
                                    </li>
                                );
                            })}
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" className="form-control form-control-dark text-bg-dark"
                                   placeholder="Search..." aria-label="Search"/>
                        </form>

                        <NavLink
                            to={order.path}
                            key={order.name}
                            className="btn btn-outline-light me-2 position-relative" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-basket" viewBox="0.5 1.5 15 15">
                                <path
                                    d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                            {countItems > 0 && countItems <= 99 ? <span
                                className="position-absolute top-0 start-60 translate-middle badge rounded-pill bg-danger">{countItems}<span
                                className="visually-hidden">unread messages</span>
                            </span> : countItems > 99 ? <span
                                className="position-absolute top-0 start-60 translate-middle badge rounded-pill bg-danger">99+<span
                                className="visually-hidden">unread messages</span>
                            </span> : ''}
                        </NavLink>


                        <div className="text-end">
                            {loginRoute && !store.isAuth ?
                                <Link
                                    type="button"
                                    className="btn btn-outline-light me-2"
                                    to={loginRoute.path}
                                    key={loginRoute.name}>{loginRoute.name}</Link>
                                : ''
                            }
                            {registerRoute && !store.isAuth ?
                                <Link
                                    type="button"
                                    className="btn btn-warning me-2"
                                    to={registerRoute.path}
                                    key={registerRoute.name}>{registerRoute.name}</Link>
                                : ''
                            }
                            {personalAccount && store.isAuth ?
                                <NavLink
                                    to={personalAccount.path}
                                    key={personalAccount.name}
                                    className="btn btn-outline-light me-2 position-relative" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-person" viewBox="2 2 12 12">
                                        <path
                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                    </svg>
                                </NavLink>
                                : ''}
                        </div>
                    </div>
                </div>
            </header>
            <ul className="nav justify-content-center border-bottom"></ul>
            <div className="b-example-divider"></div>
        </>
    );
});