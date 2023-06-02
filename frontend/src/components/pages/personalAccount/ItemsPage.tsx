import {ModalWindow} from "../../ui/modal/ModalWindow";
import {useState} from "react";
import {ItemEdit} from "./ItemEdit";
import React from "react";

export const ItemsPage = () => {
    const [active, setActive] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <>
            <ModalWindow active={active} setActive={setActive}>
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit item</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setActive(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <ItemEdit></ItemEdit>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setActive(false)}
                            >Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                style={{minWidth: "130px"}}
                                onClick={() => {
                                    setIsLoading(true)
                                    setTimeout(() => {
                                        setActive(false)
                                        setIsLoading(false)
                                    }, 1000)
                                }}
                            >
                                {
                                    isLoading ?
                                        <div className="spinner-border"
                                             role="status"
                                             style={{height: "20px", width: "20px"}}
                                        >
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        :
                                        "Save changes"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWindow>

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">image</th>
                    <th scope="col">name</th>
                    <th scope="col">price</th>
                    <th scope="col">edit</th>
                    <th scope="col">delete</th>
                </tr>
                </thead>
                <tbody>
                {Array.from({length: Math.floor(Math.random() * 100)}).map((value, index) =>
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                            <img
                                className="img rounded img-fluid"
                                style={{maxHeight: "100px"}}
                                src="https://avatars.mds.yandex.net/get-mpic/5234219/img_id2490512960137088580.jpeg/orig"
                                alt=""/>
                        </td>
                        <td className="">Logitech mouse</td>
                        <td>
                            {Math.floor(Math.random() * 100_000)}
                        </td>
                        <td>
                            <button
                                // to={`/card/edit/${index}`}
                                className="btn btn-success btn-sm"
                                onClick={() => setActive(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd"
                                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger btn-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                     fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                    <path
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    );
};