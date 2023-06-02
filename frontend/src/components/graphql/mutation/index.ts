import {Login, Logout, LogoutAllSessions, CreatePublisher, CreateCustomer, RefreshAccessToken} from './mutation.graphql'
import {Customer, JwtResponse, Publisher} from "../typesTS";

export const login = {
    request: Login,
    response: {
        login: {} as JwtResponse
    }
}

export const logout = {
    request: Logout,
    response: {
        logout: String
    }
}

export const logoutAllSessions = {
    request: LogoutAllSessions,
    response: {
        logoutAllSessions: String
    }
}

export const createPublisher = {
    request: CreatePublisher,
    response: {
        createPublisher: {} as Publisher
    }
}

export const createCustomer = {
    request: CreateCustomer,
    response: {
        createPublisher: {} as Customer
    }
}

export const refreshAccessToken = {
    request: RefreshAccessToken,
    response: {
        refreshAccessToken: {} as JwtResponse
    }
}