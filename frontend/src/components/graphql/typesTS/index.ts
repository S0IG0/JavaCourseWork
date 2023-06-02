export interface JwtResponse {
    accessToken?: string
    refreshToken?: string
}


export interface Role {
    id: number
    name: string
}

export interface User {
    id: number
    username: string
    firstname: string
    lastname: string
    email: string
    roles: [Role]
}

export interface Category {
    id: number
    parentCategory: Category
    name: string
}

export interface Image {
    id: number
    name: string
}

export interface ComputerComponent {
    id: number
    name: string
    description: string
    price: string
    companyName: string
    categories: Category[]
    images: Image[]
    previewImage: Image
}

export interface RelationOrdersToComputerComponents {
    id: number
    computerComponent: ComputerComponent
    count: number
}

export interface Order {
    id: number
    createDate: string
    relationOrdersToComputerComponents: RelationOrdersToComputerComponents[]
}

export interface Customer {
    id: number
    address: string
    telephone: string
    user: User
    order: Order
}

export interface Publisher {
    id: number
    nameCompany: string
    addressCompany: string
    activitiesCompany: string
    positionInCompany: string
    user: User
    computerComponents: ComputerComponent[]
}

export interface JwtRequest {
    username: string
    password: string
}

export interface JwtRefreshRequest {
    refreshToken: string
}

export interface UserInput {
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
}

export interface CustomerInput {
    address: string
    telephone: string
    user: UserInput
}

export interface PublisherInput {
    nameCompany: string
    addressCompany: string
    activitiesCompany: string
    positionInCompany: string
    user: UserInput
}