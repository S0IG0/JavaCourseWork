export const DeliveryPage = () => {
    return (
        <>
            <div className="container py-4">
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">Courier delivery</h1>
                        <p className="col-md-8 fs-4">The main advantage is the possibility of delivery to the door and
                            greater efficiency. Depending on the specific company, there may be additional services,
                            including fitting or partial purchase of the order. In comparison with the "Russian Post"
                            with courier delivery, the failure rate is lower.

                            Usually, when delivering by courier service, customers are more demanding of deadlines.
                            Often the client associates the courier with the online store itself, so he will attribute
                            problems with delivery to you.</p>
                    </div>
                </div>

                <div className="row align-items-md-stretch">
                    <div className="col-md-6">
                        <div className="h-100 p-5 text-bg-dark rounded-3">
                            <h2>Pick-up points</h2>
                            <p>This type is similar to the "Russian Post", but with several differences: the geography
                                of delivery is smaller and such points are usually provided by commercial companies. The
                                buyer is not tied to time — he will pick up the parcel when there is free time.
                                Sometimes additional services are also available.

                                At the same time, the percentage of unbought orders is higher than when delivered by
                                courier service. If the network of pick-up points is small, then this method will be
                                ineffective: it is easier for the buyer to get to Russian Post and stand in line
                                there than to go to the other end of the city.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                            <h2>Reasons for increasing the time</h2>
                            <p>The delivery time may increase depending on the time of application with customer
                                addresses. If the service collects applications before 18:00, then the customer who
                                bought the product at 18:01 will receive it only after 2-3 days, even if he lives on the
                                next street.

                                The terms depend both on the time of transfer of orders to the warehouse of the courier
                                service, and on the time when the goods were taken from the online store. Specify this
                                point to know exactly how many days the goods will go on the road.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};