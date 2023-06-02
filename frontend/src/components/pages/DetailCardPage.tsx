import {useParams} from "react-router-dom";
import {DetailCardLoader} from "../ui/loaders/DetailCardLoader";
import {useQuery} from "@apollo/client";
import React, {useContext} from "react";
import {findComputerComponentById} from "../graphql/query";
import {backend} from "../config/BackendUtils";
import {Context} from "../../index";

export const DetailCardPage = () => {
    const {store} = useContext(Context);
    const {request, response} = findComputerComponentById;
    const {id} = useParams();
    const {loading, error, data} = useQuery<typeof response>(request, {
        variables: {
            id: Number(id)
        }
    });
    return (
        <>
            {error ?
                <div className="alert alert-danger m-4" role="alert">
                    {error.message}
                </div>
                :
                <div className="container mt-4">
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div className={loading ? "col text-center mb-4" : "col text-center"}>
                            {loading ?
                                <div style={{
                                    width: "100%",
                                    height: "100%",
                                    background: "#868e96",
                                    minHeight: "400px",
                                }}></div>
                                :
                                <div id="carouselExampleIndicators" className="carousel carousel-dark slide mb-4">
                                    <div className="carousel-indicators">
                                        <button type="button"
                                                data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to="0"
                                                className="active"
                                                aria-current="true"></button>
                                        {data?.findComputerComponentById.images.map((value, index) =>
                                            <button type="button"
                                                    data-bs-target="#carouselExampleIndicators"
                                                    data-bs-slide-to={`${index + 1}`}></button>
                                        )}
                                    </div>
                                    <div className="carousel-inner">
                                        {data?.findComputerComponentById.images.map((value, index) =>
                                            <div
                                                className={index === 0 ? "carousel-item active" : "carousel-item"}>
                                                <img
                                                    src={backend.getImagesById(value.id)}
                                                    className="d-block w-100 card-img"
                                                    style={{height: "35em"}}
                                                    alt="..."/>
                                            </div>
                                        )}

                                    </div>
                                    <button className="carousel-control-prev" type="button"
                                            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button"
                                            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            }

                        </div>
                        <div className="col">
                            {loading ?
                                <DetailCardLoader></DetailCardLoader>
                                :
                                <div className="card mb-4 carousel">
                                    <div className="card-header">
                                        <p className="h1 text-center">{data?.findComputerComponentById.name}</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <big className="text-body-secondary">
                                                Company name
                                            </big>
                                            <big className="text-body-secondary text-uppercase">
                                                {data?.findComputerComponentById.companyName}
                                            </big>
                                        </li>
                                        <li className="list-group-item overflow-hidden" style={{maxHeight: "400px"}}>
                                            {data?.findComputerComponentById.description}
                                        </li>
                                    </ul>
                                    <div className="card-footer d-flex justify-content-between align-items-center">
                                        <big
                                            className="text-body-secondary">Price {data?.findComputerComponentById.price}</big>
                                        <button type="button"
                                                className="btn btn btn-warning"
                                                onClick={() => {
                                                    if (data) {
                                                        store.addComputerComponentsInOrder(
                                                            data.findComputerComponentById
                                                        );
                                                    }
                                                }}
                                        >Add to cart
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
};