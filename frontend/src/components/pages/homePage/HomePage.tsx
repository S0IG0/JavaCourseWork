import {OffCanvas} from "../../ui/OffCanvas";
import {Link} from "react-router-dom";
import './HomePage.css'
import {CardLoader} from "../../ui/loaders/CardLoader";
import {useQuery} from "@apollo/client";
import {backend} from "../../config/BackendUtils";
import React, {useContext} from "react";
import {findAllComputerComponent} from "../../graphql/query";
import {Context} from "../../../index";


export const HomePage = () => {
    const {store} = useContext(Context);
    const {request, response} = findAllComputerComponent;
    const {loading, error, data} = useQuery<typeof response>(request);

    const icon = (
        <div>
            Categories
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                 fill="currentColor" className="bi bi-tags ms-2"
                 viewBox="0 0 16 16">
                <path
                    d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                <path
                    d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
            </svg>
        </div>
    )
    return (
        <>
            <div className="d-flex justify-content-start align-items-center m-4">
                {loading ?
                    <>
                        <div className={"btn btn-primary disabled"}>{icon}</div>
                        <div className={"placeholder-glow ms-4"}>
                            <span className="placeholder col-12 me-2">_______________</span>
                        </div>
                    </>
                    :
                    <>
                        <OffCanvas headFill="Categories" buttonFill={icon}>
                            <ul className="list">
                                <li>All</li>
                                <li>
                                    Electric
                                    <ul className="list">
                                        <li>
                                            Computers components
                                            <ul>
                                                <li>
                                                    Cpu
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            laptop
                                        </li>
                                        <li>
                                            desktop
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </OffCanvas>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb ms-4 mb-0">
                                <li className="breadcrumb-item">Home</li>
                                <li className="breadcrumb-item active" aria-current="page">All</li>
                            </ol>
                        </nav>
                    </>
                }
            </div>

            {error &&
                <div className="alert alert-danger m-4" role="alert">
                    {error.message}
                </div>
            }

            <div className="mb-4 ms-3 me-3">
                <div className="row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4">

                    {loading ?
                        Array.from({length: 20}).map(() =>
                            <div className="col mt-4">
                                <CardLoader></CardLoader>
                            </div>
                        )

                        :
                        data?.findAllComputerComponent.map(value =>
                            <div className="col mt-4">
                                <div

                                    className={"card shadow-sm m-auto _card"}
                                    style={{maxWidth: "400px", minWidth: "200px"}}>
                                    <div className="card-header text-center">
                                        <big>{value.name}</big>
                                    </div>
                                    <Link to={`/card/${value.id}`}>
                                        <img
                                            className="card-img"
                                            src={backend.getImagesById(value.previewImage.id)}
                                            alt=""/>
                                    </Link>
                                    <div className="card-body">
                                        <p className="card-text"
                                           style={{height: "70px"}}
                                        >{value.description}</p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between align-items-center">
                                        <big className="text-body-secondary">{value.price}</big>
                                        <button type="button" className="btn btn btn-warning"
                                        onClick={() => store.addComputerComponentsInOrder(value)}>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </>
    );
};