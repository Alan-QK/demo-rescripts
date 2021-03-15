import ReactDOM from 'react-dom';
const downloadFiles = function (params, url?) {
    const divElement = document.getElementById('downloadDiv');
    const downloadUrl = url || `/api/rpt/order/export-selected/`;

    ReactDOM.render(
        // @ts-ignore
        <form action={downloadUrl} method="post" encType="multipart/form-data">
            {Object.keys(params).map((k) => (
                <input key={k} name={k} type="text" value={params[k]} readOnly />
            ))}
        </form>,
        divElement
    );
    // @ts-ignore
    // ReactDOM.findDOMNode(divElement)?.querySelector('form').submit();
    ReactDOM.unmountComponentAtNode(divElement);
};
export default downloadFiles;
