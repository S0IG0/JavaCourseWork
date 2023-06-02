import {
    FindAllComputerComponent,
    FindComputerComponentById,
    GetUserByRefreshToken,
    GetCustomerByRefreshToken,
    GetPublisherByRefreshToken
} from './query.graphql'
import {ComputerComponent, Customer, Publisher, User} from "../typesTS";


export const findAllComputerComponent = {
    request: FindAllComputerComponent,
    response: {
        findAllComputerComponent: {} as ComputerComponent[],
    },
}

export const findComputerComponentById = {
    request: FindComputerComponentById,
    response: {
        findComputerComponentById: {} as ComputerComponent,
    },
}

export const getUserByRefreshToken = {
    request: GetUserByRefreshToken,
    response: {
        getUserByRefreshToken: {} as User
    }
}

export const getCustomerByRefreshToken = {
    request: GetCustomerByRefreshToken,
    response: {
        getCustomerByRefreshToken: {} as Customer
    }
}

export const getPublisherByRefreshToken = {
    request: GetPublisherByRefreshToken,
    response: {
        getPublisherByRefreshToken: {} as Publisher
    }
}