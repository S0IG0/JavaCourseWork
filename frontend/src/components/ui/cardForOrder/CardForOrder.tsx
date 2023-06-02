import './CardForOrder.css'
import React, {FC, useContext} from "react";
import {RelationOrdersToComputerComponents} from "../../graphql/typesTS";
import {backend} from "../../config/BackendUtils";
import {Context} from "../../../index";

export interface CardForOrderProps {
    value: RelationOrdersToComputerComponents
}

export const CardForOrder: FC<CardForOrderProps> = ({value}, context) => {
    const {store} = useContext(Context);
    return (
        <>
            <div className="card mb-2">
                <div className="row g">
                    <div className="col-md-4">
                        <img
                            src={backend.getImagesById(value.computerComponent.previewImage.id)}
                            className="img-fluid rounded"
                            alt=""
                            style={{width: "100%", height: "100%"}}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{value.computerComponent.name}</h5>
                            <p className="card-text">{value.computerComponent.description}</p>
                            <button type="button" className="btn btn-danger"
                                    onClick={() => store.deleteRelationOrdersToComputerComponentInOrderById(value.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                     fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                    <path
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                </svg>
                            </button>

                            <div className="btn-group position-absolute bottom-2 end-0 me-3" role="group"
                                 aria-label="Basic example">
                                <button type="button"
                                        className="btn btn-secondary"
                                        disabled={value.count === 1}
                                        onClick={() =>
                                            store.setCountItemInOrderById(value.id, value.count - 1)
                                        }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                    </svg>
                                </button>
                                <button type="button"
                                        className="btn btn-secondary disable"
                                >{value.count}</button>
                                <button type="button" className="btn btn-secondary"
                                onClick={() => store.setCountItemInOrderById(value.id, value.count + 1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                        <path
                                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};