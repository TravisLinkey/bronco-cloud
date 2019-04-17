function getTarget() {
    if (process.env.REST_SERVER_URLS) {
        const restServerURLs = JSON.parse(process.env.REST_SERVER_URLS);
        const restServerURL = restServerURLs['bronco-cloud'];
        if (restServerURL) {
            return restServerURL;
        }
    }
    if (process.env.REST_SERVER_URL) {
        const restServerURL = process.env.REST_SERVER_URL;
        return restServerURL;
    }
    return 'http://localhost:3001';
}

const target = getTarget();

module.exports = [{
    context: ['/auth', '/api'],
    target,
    secure: true,
    changeOrigin: true
}, {
    context: '/',
    target,
    secure: true,
    changeOrigin: true,
    ws: false,
    bypass: function (req, res, proxyOptions) {
        const accept = req.headers.accept || '';
        if (accept.indexOf('html') !== -1) {
            return '/index.html';
        }
    }
}];
