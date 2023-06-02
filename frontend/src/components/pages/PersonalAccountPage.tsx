import React, {useContext, useState} from "react";
import {HistoryPage} from "./personalAccount/HistoryPage";
import {ItemsPage} from "./personalAccount/ItemsPage";
import {AddNewItem} from "./personalAccount/AddNewItem";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {baseRouters, RoutesNames} from "../routers/Routers";
import {useMutation, useQuery} from "@apollo/client";
import {logout, logoutAllSessions, refreshAccessToken} from "../graphql/mutation";
import {getUserByRefreshToken} from "../graphql/query";
import {Roles, secretKeyForAuthorization} from "../config/BackendUtils";
import {SettingsPage} from "./personalAccount/settingsPage/SettingsPage";
import {SettingsForCustomer} from "./personalAccount/settingsPage/SettingsForCustomer";
import {SettingsForPublisher} from "./personalAccount/settingsPage/SettingsForPublisher";

interface IButton {
    style: string,
    data: string,
    component: JSX.Element
}

interface IButtons {
    activeStyle: string,
    defaultStyle: string,
    buttonsForCustomer: IButton[],
    buttonsForPublisher: IButton[],
}

export const PersonalAccountPage = () => {
    const {store} = useContext(Context);
    const {request, response} = getUserByRefreshToken;
    const {data, error, loading} = useQuery<typeof response>(request, {
        variables: {
            jwtRefreshRequest: {refreshToken: store.data.refreshToken}
        },
        context: {
            headers: {
                'Authorization': `${secretKeyForAuthorization} ${store.data.accessToken}`
            }
        }
    });

    const [refresh] = useMutation<typeof refreshAccessToken.response>(refreshAccessToken.request);


    const navigate = useNavigate();
    const [logoutFunction, LogoutData] = useMutation<typeof logout.response>(logout.request);
    const [logoutAllSessionFunction, LogoutAllSessionData] = useMutation<typeof logoutAllSessions.response>(logoutAllSessions.request);
    const path: string | undefined = baseRouters.get(RoutesNames.HOME)?.path;

    const [page, setPage] = useState<string>('settings');
    const pagesForPublisher: IButton[] = [
        {style: 'nav-link', data: 'items', component: <ItemsPage></ItemsPage>},
        {style: 'nav-link', data: 'add item', component: <AddNewItem></AddNewItem>},
    ];
    const pagesForCustomer: IButton[] = [
        {style: 'nav-link', data: 'history', component: <HistoryPage></HistoryPage>},

    ]

    const [buttons, setButtons] = useState<IButtons>({
        activeStyle: "nav-link active",
        defaultStyle: "nav-link",
        buttonsForCustomer: [
            ...pagesForCustomer,
        ],
        buttonsForPublisher: [
            ...pagesForPublisher,
        ]
    })

    if (error) {
        if (error.message === 'Unauthorized') {
            if (store.data.refreshToken) {
                refresh({
                    variables: {
                        jwtRefreshRequest: {refreshToken: store.data.refreshToken}
                    }
                }).then(data => {
                    console.log(data)
                    store.setData({
                        accessToken: data.data?.refreshAccessToken.accessToken,
                        refreshToken: store.data.refreshToken,
                    })
                    store.setAuth(true);
                }).catch((error) => {
                    console.log('error', error)
                    store.setAuth(false);
                    store.logout()
                })
            }
        }
    }

    const switchActiveButton = (index: number) => {
        if (index === -1) {
            setPage('settings');
            let tempButtons: IButton[] = data?.getUserByRefreshToken.roles.find(role => role.name === Roles.publisher)
                ? [...buttons.buttonsForPublisher] : [...buttons.buttonsForCustomer]
            for (let index in tempButtons) {
                tempButtons[index].style = buttons.defaultStyle
            }
        } else {
            let tempButtons: IButton[] = data?.getUserByRefreshToken.roles.find(role => role.name === Roles.publisher)
                ? [...buttons.buttonsForPublisher] : [...buttons.buttonsForCustomer]
            for (let index in tempButtons) {
                tempButtons[index].style = buttons.defaultStyle
            }
            tempButtons[index].style = buttons.activeStyle;
            if (data?.getUserByRefreshToken.roles.find(role => role.name === Roles.publisher)) {
                setPage(buttons.buttonsForPublisher[index].data)
                setButtons({
                        ...buttons, buttonsForPublisher: [
                            ...tempButtons
                        ]
                    }
                )
            } else {
                setPage(buttons.buttonsForCustomer[index].data)
                setButtons({
                        ...buttons, buttonsForCustomer: [
                            ...tempButtons
                        ]
                    }
                )
            }
        }
    };

    return (
        <>
            {Array.from(new Set([LogoutData, LogoutAllSessionData].map(data => data.error?.message))).map(message => {
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

            {loading ? 'loading...' :
                data && <>
                    <ul className="nav nav-pills m-4">
                        <li className="nav-item me-2">
                            <button type="button" className={page === 'settings' ? 'nav-link active' : 'nav-link'}
                                    onClick={() => switchActiveButton(-1)}
                            >
                                settings
                            </button>
                        </li>
                        {data.getUserByRefreshToken.roles.find(role => role.name === Roles.publisher) ?
                            buttons.buttonsForPublisher.map((button, index,) =>
                                <li className="nav-item me-2">
                                    <button type="button" className={button.style}
                                            onClick={() => switchActiveButton(index)}
                                    >
                                        {button.data}
                                    </button>
                                </li>
                            )
                            :
                            buttons.buttonsForCustomer.map((button, index,) =>
                                <li className="nav-item me-2">
                                    <button type="button" className={button.style}
                                            onClick={() => switchActiveButton(index)}
                                    >
                                        {button.data}
                                    </button>
                                </li>
                            )
                        }

                        {path &&
                            <div className="dropdown ms-auto">
                                <button className="btn btn-danger dropdown-toggle" type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    {LogoutData.loading || LogoutAllSessionData.loading ?
                                        <div className="spinner-border"
                                             role="status"
                                             style={{height: "20px", width: "20px"}}
                                        >
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        :
                                        <>
                                            <div className={'me-2'}>Logout</div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor"
                                                 className="bi bi-door-closed me-1" viewBox="0 0 16 16">
                                                <path
                                                    d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z"/>
                                                <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"/>
                                            </svg>
                                        </>}
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <button
                                            onClick={() => {
                                                logoutFunction({
                                                    variables: {
                                                        refreshToken: store.data.refreshToken
                                                    }
                                                }).then(() => {
                                                    store.logout();
                                                    navigate(path, {replace: false});
                                                })
                                            }}
                                            type='button'
                                            className="btn-danger dropdown-item"
                                            style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <div>logout this session</div>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                logoutAllSessionFunction({
                                                    variables: {
                                                        refreshToken: store.data.refreshToken
                                                    }
                                                }).then(() => {
                                                    store.logout();
                                                    navigate(path, {replace: false});
                                                })
                                            }}
                                            type='button'
                                            className="btn-danger dropdown-item"
                                            style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <div>logout all session</div>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        }
                    </ul>
                    <div className="mt-0 ms-4 me-4 mb-4">
                        {page === 'settings' ? <SettingsPage
                                user={data.getUserByRefreshToken}
                                component={
                                    data.getUserByRefreshToken.roles.find(role => role.name === Roles.publisher) ?
                                        <SettingsForPublisher></SettingsForPublisher> :
                                        <SettingsForCustomer></SettingsForCustomer>
                                }
                            ></SettingsPage> :
                            page === 'items' ? pagesForPublisher[0].component :
                                page === 'add item' ? pagesForPublisher[1].component :
                                    page === 'history' && pagesForCustomer[0].component
                        }
                    </div>
                </>
            }
        </>
    );
};