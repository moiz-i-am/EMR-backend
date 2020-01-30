

exports.responseHandler = (res, status, data) => {
    res.status(status);
    return res.jsonp({
        status:'success',
        data
    })
}