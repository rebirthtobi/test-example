const request = (url, requestInfo) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    };

    /* For overriding default headers */
    requestInfo.headers = {
        ...headers,
        ...(requestInfo && requestInfo.headers ? requestInfo.headers : headers),
    };
    return fetch(url, requestInfo).then(response => response.json());
};

export default request;
