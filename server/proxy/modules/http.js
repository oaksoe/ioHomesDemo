var httpConfig;

exports.enableCORS = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', httpConfig.cors.allowOrigin);
    res.header('Access-Control-Allow-Methods', httpConfig.cors.allowMethods);
    res.header('Access-Control-Max-Age', httpConfig.cors.maxAge);
    res.header('Access-Control-Allow-Headers', httpConfig.cors.allowHeaders);

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);	
    } else {
        next();
    }
};

exports.res = (res, data) => {
    res.status(200).json({
        status: "SUCCESS",
        data: data
    });
}

exports.err = (res, error) => {
    res.status(500).json({
        status: "ERROR",
        error: error.message ? error.message : error
    });    
}

exports.init = (config) => {
    console.log("http module initialized.");
    httpConfig = config;
}
