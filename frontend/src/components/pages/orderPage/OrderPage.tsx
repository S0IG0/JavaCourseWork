import './OrderPage.css'
import {CardForOrder} from "../../ui/cardForOrder/CardForOrder";
import {CardForOrderLoader} from "../../ui/loaders/CardForOrderLoader";
import {RightForOrderLoader} from "../../ui/loaders/RightForOrderLoader";
import React, {useContext} from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";

export const OrderPage = observer(() => {
    const {store} = useContext(Context);
    const isLoading: boolean = false;
    return (
        <>
            <div className="container mt-4 mb-3">
                <div className="row">
                    <div className="col-sm">
                        {isLoading ?
                            <CardForOrderLoader></CardForOrderLoader>
                            :
                            <>
                                {store.order.relationOrdersToComputerComponents.map((value) =>
                                    <CardForOrder value={value}></CardForOrder>)
                                }
                            </>
                        }
                    </div>
                    {isLoading ? <RightForOrderLoader></RightForOrderLoader> : store.getCountItemsInOrder() >= 1 ?
                        <div className="col-sm">
                            <div className="card m-auto">
                                <div className="card-header text-center">
                                    <button type="button" className="btn btn-success btn-lg px-5"
                                            style={{width: "100%"}}>Go
                                        to
                                        checkout
                                    </button>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item mt-2">
                                        <h4 className="left">Count</h4><h4
                                        className="right">{store.getCountItemsInOrder()}</h4>
                                    </li>
                                    <li className="list-group-item mt-2">
                                        <h4 className="left">Amount</h4><h4
                                        className="right">{store.getAmountOrder()}</h4>
                                    </li>
                                </ul>
                            </div>
                        </div> : <div className="d-flex align-items-center justify-content-center vh-100">
                            <div className="text-center">
                                <h1 className="display-1 fw-bold">EMPTY</h1>
                                <p className="fs-3"><span className="text-danger">You order is empty!</span> items not found.</p>
                                <p className="lead">
                                    Go to the Home page and select the products you want to purchase
                                </p>
                                <Link to={'/'} className="btn btn-success">Go Home</Link>
                            </div>
                        </div>}

                </div>
            </div>
        </>
    );
});