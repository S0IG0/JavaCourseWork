import React, {useContext} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {refreshAccessToken} from "../../../graphql/mutation";
import {Context} from "../../../../index";
import {getCustomerByRefreshToken} from "../../../graphql/query";
import {secretKeyForAuthorization} from "../../../config/BackendUtils";

export const SettingsForCustomer = () => {
    const {store} = useContext(Context);
    const {
        data,
        loading,
        error
    } = useQuery<typeof getCustomerByRefreshToken.response>(getCustomerByRefreshToken.request, {
        variables: {
            jwtRefreshRequest: {refreshToken: store.data.refreshToken}
        },
        context: {
            headers: {
                'Authorization': `${secretKeyForAuthorization} ${store.data.accessToken}`
            }
        }
    });
    const [refresh] = useMutation<typeof refreshAccessToken.response>(refreshAccessToken.request);

    if (error) {
        console.log('SettingsForCustomer', error)
        if (error.message === 'Unauthorized') {
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
        }
    }

    return (
        <>
            {loading ? 'loading...' : data &&
                <>
                    <div className="col mb-2">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" value={data.getCustomerByRefreshToken.address}/>
                    </div>
                    <div className="col mb-2">
                        <label className="form-label">Telephone</label>
                        <input type="tel" className="form-control" value={data.getCustomerByRefreshToken.telephone}
                        />
                    </div>
                </>
            }
        </>
    );
};