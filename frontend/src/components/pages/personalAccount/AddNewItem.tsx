export const AddNewItem = () => {
    const categories: string[] = [
        'CPU',
        'GPU',
        'MOTHERBOARD',
        'POWER BLOCK',
        'LAPTOP',
        'DESKTOP PS',
    ]
    return (
        <>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                <div className="col mb-2">
                    <label className="form-label">Name item</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="col mb-2">
                    <label className="form-label">Price item</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="col mb-2">
                    <label className="form-label">Company name</label>
                    <input type="text" className="form-control"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mb-2">
                    <label className="form-label">Description</label>
                    <textarea className="form-control"/>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 mb-2">
                    <label className="form-label">Preview image</label>
                    <div className="input-group mb-3">
                        <input type="file" className="form-control" id="inputGroupFile02"/>
                        <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mb-2">
                    <label className="form-label">Images</label>
                    <div className="input-group mb-3">
                        <input type="file" className="form-control" id="inputGroupFile02" multiple/>
                        <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                    </div>
                </div>
            </div>
            <select className="form-select mb-4" multiple aria-label="multiple select example">
                {categories.map((value, index) =>
                    <option value={index}>{value}</option>
                )}
            </select>
            <button type="button" className="btn btn-success">Create new item</button>
        </>
    );
};