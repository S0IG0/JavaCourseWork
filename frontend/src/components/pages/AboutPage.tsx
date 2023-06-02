import {Link} from "react-router-dom";
import {baseRouters, IRoute, RoutesNames} from "../routers/Routers";

export const AboutPage = () => {
    const home: IRoute | undefined = baseRouters.get(RoutesNames.HOME);
    const delivery: IRoute | undefined = baseRouters.get(RoutesNames.DELIVERY);

    return (
        <>
            <div className="px-4 pt-5 my-5 text-center border-bottom">
                <h1 className="display-4 fw-bold text-body-emphasis">Powerful components</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                        The online store of computer components is a convenient way to quickly and inexpensively buy the
                        necessary components for your PC. Today, when computer technology is so important for our daily
                        life, it must not only be of high quality, but also have sufficient power.
                        In our online store you will find everything you need to build your computer - motherboards,
                        processors, video cards, hard drives, RAM and much more. We offer products only from trusted
                        suppliers, which guarantees high quality products.
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                        <Link
                            to={home ? home.path : '/'}
                            type="button"
                            className="btn btn-primary btn-lg px-4 me-sm-3">Go {home ? home.name : 'Home'}</Link>
                        <Link
                            to={delivery ? delivery.path : '/'}
                            type="button"
                            className="btn btn-outline-secondary btn-lg px-4">
                            more about {delivery?.name.toLocaleLowerCase()}</Link>
                    </div>
                </div>
                <div className="overflow-hidden" style={{maxHeight: "30vh"}}>
                    <div className="container px-5">
                        <img src="https://cdn.fishki.net/upload/post/201409/05/1301415/02.jpg"
                             className="img-fluid border rounded-3 shadow-lg mb-4"
                             alt="" width="700" height="500" loading="lazy"/>
                    </div>
                </div>
            </div>
        </>
    );
};