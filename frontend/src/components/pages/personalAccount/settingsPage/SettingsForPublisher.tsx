import React, {useContext} from "react";
import {Context} from "../../../../index";
import {useMutation, useQuery} from "@apollo/client";
import {getPublisherByRefreshToken} from "../../../graphql/query";
import {secretKeyForAuthorization} from "../../../config/BackendUtils";
import {refreshAccessToken} from "../../../graphql/mutation";

export const SettingsForPublisher = () => {
    const {store} = useContext(Context);
    const {
        data,
        loading,
        error
    } = useQuery<typeof getPublisherByRefreshToken.response>(getPublisherByRefreshToken.request, {
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
            {loading ? 'loading...' : data&&
                <>
                    <div className="col mb-2">
                        <label className="form-label">Name company</label>
                        <input type="text" className="form-control" value={data.getPublisherByRefreshToken.nameCompany}/>
                    </div>
                    <div className="col mb-2">
                        <label className="form-label">Address company</label>
                        <input type="text" className="form-control" value={data.getPublisherByRefreshToken.addressCompany} />
                    </div>

                    <div className="col mb-2">
                        <label className="form-label">Activity company</label>
                        <input type="text" className="form-control" value={data.getPublisherByRefreshToken.activitiesCompany} />
                    </div>
                    <div className="col mb-2">
                        <label className="form-label">Position in company</label>
                        <input type="text" className="form-control" value={data.getPublisherByRefreshToken.positionInCompany} />
                    </div>
                </>
            }
        </>
    );
};