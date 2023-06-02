import React from 'react';
import './feedbackPage.css'

export const FeedbackPage = () => {
    return (
        <>
            <div className="supportForForm">
                <div className="allForms m-auto">
                    <form className="row g-3 needs-validation" noValidate>
                        <div className="col-md-3">
                            <label htmlFor="validationCustom01" className="form-label">First name</label>
                            <input type="text" className="form-control" id="validationCustom01" placeholder="Mark"
                                   required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="validationCustom02" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="validationCustom02" placeholder="Otto"
                                   required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationCustom03" className="form-label">Email</label>
                            <input type="email" className="form-control" id="validationCustom03"
                                   placeholder="example@mail.ru" required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-9">
                            <label htmlFor="validationCustom04" className="form-label">Address</label>
                            <input type="text" className="form-control" id="validationCustom04"
                                   placeholder="124 Conch Street Bikini Bottom" required/>
                            <div className="invalid-feedback">
                                Please provide a valid address.
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="validationCustom05" className="form-label">Zip</label>
                            <input type="text" className="form-control" id="validationCustom05" placeholder="14477"
                                   required/>
                            <div className="invalid-feedback">
                                Please provide a valid zip.
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="validationCustom06" className="form-label">Message</label>
                            <textarea className="form-control" id="validationCustom06" required></textarea>
                            <div className="invalid-feedback">
                                Please provide a valid message.
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary" type="button"> Send a message</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};