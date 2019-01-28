exports.enableCORS = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Max-Age', '1000');
    res.header('Access-Control-Allow-Headers', 'Cache-Control, Content-Type, Authorization, Content-Length');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);	
    } else {
        next();
    }
};