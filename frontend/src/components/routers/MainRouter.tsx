import {NotFoundPage} from "../pages/NotFoundPage";
import React from "react";
import {Route, Routes} from 'react-router-dom'
import {baseRouters, IRoute, loginAndRegister, order, privateRouter, publicRoutes} from "./Routers";

export const MainRouter = () => {
    const allRoutes: IRoute[] = [
        ...Array.from(baseRouters.values()),
        ...Array.from(loginAndRegister.values()),
        ...Array.from(privateRouter.values()),
        ...Array.from(publicRoutes.values()),
        order,
    ];
    return (
        <>
            <Routes>
                {allRoutes.map(route => <Route path={route.path} element={route.component} key={route.name}></Route>)}
                <Route path={"*"} element={<NotFoundPage/>}></Route>
            </Routes>
        </>
    );
};