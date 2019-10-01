var gulp = require('gulp');
var exec = require('gulp-exec');

var paths = {
    clients: {
        src:  'wireguard/clients/**/*.conf',
        dest: 'wireguard/clients/**/*.conf'
    },
    peers: {
        src:  'wireguard/peers/**/*.conf',
        dest: 'wireguard/peers/**/*.conf'
    }
};

var scripts = {
    s1: "sed -i '/^DNS.*$/d' <%= file.path %>",
    s2: "sed -i 's/^\\(AllowedIPs.=.\\).*$/\\110.99.97.1\\/32,192.168.0.0\\/22/g' <%= file.path %>",
    s3: "sed -i 's/^\\(Endpoint.=.\\).*/\\1nc.nznd.org:51820/g' <%= file.path %>"
}

function replace() {
    //var options = {
        //continueOnError: false, // default = false, true means don't emit error event
        //pipeStdout: false // default = false, true means stdout is written to file.contents
    //};
    //var reportOptions = {
        //err: true, // default = true, false means don't write err
        //stderr: true, // default = true, false means don't write stderr
        //stdout: true // default = true, false means don't write stdout
    //};
    return gulp.src(paths.clients.src)
        .pipe(exec(scripts.s1))
        .pipe(exec(scripts.s2))
        .pipe(exec(scripts.s3));
}

function watch() {
    gulp.watch(paths.clients.src, { events: 'add' }, replace);
}

var build = gulp.series(replace, watch);

exports.replace = replace;
exports.watch = watch;
exports.build = build;
/*
 * Export a default task
 */
exports.default = build;
