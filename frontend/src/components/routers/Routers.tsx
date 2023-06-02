import {LoginPage} from "../pages/loginPage/LoginPage";
import {AboutPage} from "../pages/AboutPage";
import {DeliveryPage} from "../pages/DeliveryPage";
import {FeedbackPage} from "../pages/feedbackPage/FeedbackPage";
import {HomePage} from "../pages/homePage/HomePage";
import {RegisterPage} from "../pages/registerPage/RegisterPage";
import {OrderPage} from "../pages/orderPage/OrderPage";
import {PersonalAccountPage} from "../pages/PersonalAccountPage";
import {DetailCardPage} from "../pages/DetailCardPage";
import {EditItemPage} from "../pages/EditItemPage";
import React from "react";

export interface IRoute {
    path: string,
    name: string
    component: JSX.Element
}

export enum RoutesNames {
    HOME = 'Home',
    ABOUT = 'About',
    DELIVERY = 'Delivery',
    FEEDBACK = 'Feedback',
    LOGIN = 'Login',
    REGISTER = 'Register',
    ORDER = 'Order',
    PERSONAL_ACCOUNT = "Personal account",
    DETAIL_CARD = "Detail card",
    EDIT_CARD = "Edit card",
}

export const loginAndRegister: Map<string, IRoute> = new Map<string, IRoute>()
    .set(RoutesNames.LOGIN, {path: '/login', name: RoutesNames.LOGIN, component: <LoginPage/>})
    .set(RoutesNames.REGISTER, {path: '/register', name: RoutesNames.REGISTER, component: <RegisterPage/>});

export const baseRouters: Map<string, IRoute> = new Map<string, IRoute>()
    .set(RoutesNames.HOME, {path: '/', name: RoutesNames.HOME, component: <HomePage/>})
    .set(RoutesNames.ABOUT, {path: '/about', name: RoutesNames.ABOUT, component: <AboutPage/>})
    .set(RoutesNames.DELIVERY, {path: '/delivery', name: RoutesNames.DELIVERY, component: <DeliveryPage/>})
    .set(RoutesNames.FEEDBACK, {path: '/feedback', name: RoutesNames.FEEDBACK, component: <FeedbackPage/>});

export const order: IRoute = {path: '/order', name: RoutesNames.ORDER, component: <OrderPage/>}

export const publicRoutes: Map<string, IRoute> = new Map<string, IRoute>()
    .set(RoutesNames.DETAIL_CARD, {path: "/card/:id", name: RoutesNames.DETAIL_CARD, component: <DetailCardPage/>});

export const privateRouter: Map<string, IRoute> = new Map<string, IRoute>()
    .set(RoutesNames.PERSONAL_ACCOUNT, {
        path: '/personalAccount',
        name: RoutesNames.PERSONAL_ACCOUNT,
        component: <PersonalAccountPage/>
    }).set(RoutesNames.EDIT_CARD, {
        path: '/card/edit/:id',
        name: RoutesNames.PERSONAL_ACCOUNT,
        component: <EditItemPage/>
    });
