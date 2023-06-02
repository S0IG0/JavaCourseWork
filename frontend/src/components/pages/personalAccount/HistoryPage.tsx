export const HistoryPage = () => {
    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Count items</th>
                    <th scope="col">Total price</th>
                    <th scope="col">Date</th>
                </tr>
                </thead>
                <tbody>
                {Array.from({length: Math.floor(Math.random() * 100)}).map((value, index) =>
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{Math.floor(Math.random() * 20_000)}</td>
                        <td>{Math.floor(Math.random() * 500_000)}</td>
                        <td>
                            {String(new Date().getDate()).padStart(2, '0')}
                            .{String(new Date().getMonth() + 1).padStart(2, '0')}
                            .{new Date().getFullYear()
                        }</td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    );
};