import {useParams} from "react-router-dom";

export const EditItemPage = () => {
    const {id} = useParams();
    return (
        <>
            <h1>{id}</h1>
        </>
    );
};