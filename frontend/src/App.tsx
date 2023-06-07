import React, {useContext, useEffect} from 'react';
import {NavigationBar} from "./components/ui/navigationBar/NavigationBar";
import {FooterBar} from "./components/ui/footerBar/FooterBar";
import {MainRouter} from "./components/routers/MainRouter";
import {MainBody} from "./components/ui/MainBody";
import {SwitchTheme} from "./components/ui/SwitchTheme";
import {Context} from "./index";
import {refreshAccessToken} from "./components/graphql/mutation";
import {useMutation} from "@apollo/client";

function App() {
    const {store} = useContext(Context);
    const {request, response} = refreshAccessToken;
    const [refresh] = useMutation<typeof response>(request);
    useEffect(() => {
        store.deserializeData()
        store.deserializeOrder()
        store.deserializeIsBlack()

        if (store.isBlack) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'light')
        }
        // dotenv.config();

        console.log('process.env', process.env)
        console.log('process.env.REACT_APP_HOST', process.env.REACT_APP_HOST)

        if (store.data.refreshToken) {
            refresh({
                variables: {
                    jwtRefreshRequest: {refreshToken: store.data.refreshToken}
                }
            }).then(data => {
                console.log(data)
                store.setData({
                    accessToken: data.data?.refreshAccessToken.accessToken,
                    refreshToken: store.data.refreshToken,
                })
                store.setAuth(true);

            }).catch((error) => {
                console.log('error', error)
                store.setAuth(false);
                store.logout()
            })

        }
    }, [refresh, store])
    return (
        <div className="App">
            <NavigationBar></NavigationBar>
            <MainBody>
                <MainRouter></MainRouter>
                <SwitchTheme></SwitchTheme>
            </MainBody>
            <FooterBar></FooterBar>
        </div>
    );
}

export default App;
