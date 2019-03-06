
var httpConfig;

exports.corsOptions = () => {
    return {
        origin: httpConfig.cors.origin,
        methods: httpConfig.cors.methods,
        allowedHeaders: httpConfig.cors.headers,
        maxAge: httpConfig.cors.maxAge
    };
};

exports.res = (res, data) => {
    res.status(200).json({
        status: 'SUCCESS',
        data: data
    });
}

exports.err = (res, error) => {
    res.status(500).json({
        status: 'ERROR',
        error: error.message ? error.message : error
    });    
}

exports.init = (config) => {
    console.log('iot module initialized.');
    httpConfig = config;
}
