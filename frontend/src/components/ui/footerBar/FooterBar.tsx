import {Link} from 'react-router-dom'
import {baseRouters, IRoute} from "../../routers/Routers";

export const FooterBar = () => {
    const footerRouters: IRoute[] = [
        ...Array.from(baseRouters.values())
    ];
    return (
        <>
            <div className="container">
                <footer className="py-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">

                        {footerRouters.map(route => {
                            return (
                                <li className="nav-item">
                                    <Link
                                        to={route.path}
                                        className="nav-link px-2 text-body-secondary"
                                        key={route.name}>{route.name}</Link>
                                </li>
                            );
                        })
                        }
                    </ul>
                    <p className="text-center text-body-secondary">© {new Date().getFullYear()} Company, Inc</p>
                </footer>
            </div>
        </>
    );
};