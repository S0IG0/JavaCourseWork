import {makeAutoObservable} from "mobx";
import {ComputerComponent, JwtResponse, Order} from "../graphql/typesTS";

export interface AuthUser {
    username: string,
    password: string,
}

const token = 'token24ufvn489234'
const orderName = 'orderfmdn84yrhf49'
const theme = 'theme83hfe8hf94fmds'
export default class Store {
    isBlack: boolean = true;
    user = {} as AuthUser;
    isAuth = false;
    data = {} as JwtResponse;
    order = {
        id: Date.now(),
        createDate: '',
        relationOrdersToComputerComponents: [],
    } as Order;

    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }

    setIsBlack(value: boolean) {
        this.isBlack = value;
        this.serializeIsBlack()
    }

    serializeIsBlack() {
        localStorage.setItem(theme, JSON.stringify(this.isBlack));
    }

    serializeData() {
        localStorage.setItem(token, JSON.stringify(this.data));
    }

    serializeOrder() {
        localStorage.setItem(orderName, JSON.stringify(this.order));
    }

    deserializeData() {
        let data = localStorage.getItem(token);
        if (data) {
            this.data = JSON.parse(data);
        }
    }

    deserializeOrder() {
        let order = localStorage.getItem(orderName);
        if (order) {
            this.order = JSON.parse(order);
        }
    }

    deserializeIsBlack() {
        let isBlack = localStorage.getItem(theme);
        if (isBlack) {
            this.isBlack = JSON.parse(isBlack);
        }
    }

    setOrder(order: Order) {
        this.order = order;
        this.serializeOrder();
    }

    setCountItemInOrderById(id: number, count: number) {
        this.order.relationOrdersToComputerComponents.forEach((value, index) => {
            if (value.id === id) {
                this.order.relationOrdersToComputerComponents[index].count = count;
            }
        })
        this.serializeOrder();
    }

    deleteRelationOrdersToComputerComponentInOrderById(id: number) {
        this.order.relationOrdersToComputerComponents.forEach((value, index) => {
            if (value.id === id) {
                this.order.relationOrdersToComputerComponents.splice(index, 1);
                return;
            }
        })
        this.serializeOrder();
    }

    addComputerComponentsInOrder(computerComponent: ComputerComponent) {
        let isFind = false;
        this.order.relationOrdersToComputerComponents.forEach((value, index) => {
            if (value.computerComponent.id === computerComponent.id) {
                isFind = true;
                this.order.relationOrdersToComputerComponents[index] = {
                    ...value,
                    count: value.count + 1,
                }
                return;
            }
        })

        if (!isFind) {
            this.order.relationOrdersToComputerComponents.push({
                id: Date.now(),
                count: 1,
                computerComponent: computerComponent
            })
        }
        this.serializeOrder()
    }

    getCountItemsInOrder(): number {
        let count = 0;
        this.order.relationOrdersToComputerComponents.forEach((value) => {
            count += value.count;
        })

        return count;
    }

    getAmountOrder(): number {
        let amount = 0;

        this.order.relationOrdersToComputerComponents.forEach((value) => {
            amount += value.count * Number(value.computerComponent.price);
        })

        return amount;
    }

    setAuth(auth: boolean) {
        this.isAuth = auth;
    }

    setUser(user: AuthUser) {
        this.user = user;
    }

    setData(data: JwtResponse) {
        this.data = data;
    }

    login(user: AuthUser, data: JwtResponse) {
        this.setUser(user);
        this.setAuth(true);
        this.setData(data);
        this.serializeData()
    }

    logout() {
        this.setAuth(false);
        this.setUser({} as AuthUser);
        this.setData({} as JwtResponse);
        localStorage.removeItem(token);
    }
}