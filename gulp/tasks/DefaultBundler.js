import path       from 'path';
import browserify from 'browserify';
import watchify   from 'watchify';
import gutil      from 'gulp-util';
import source     from 'vinyl-source-stream';
import buffer     from 'vinyl-buffer';
import uglify     from 'gulp-uglify';
import gulp       from 'gulp';

// import foo        from '../../client/src/app/main'

export default class DefaultBundler {

//     setConfigProperties( a, b ) {
//         // {
//         //     entries           : [ './client/src/app/main.js' ],
//         //     bundleName        : 'appBundle.js',
//         //     destinationFolder : './dddist/',
//         //     watch             : true,
//         //     uglify            : false,
//         //     vendors           : [ 'react' ]
//         // }
//         this.config = Object.assign( a, b, DefaultBundler.requiredProperties );
//     }

    bundle () {

        var pathToEntry = path.resolve( __dirname, '../../client/src/app/main.js' );
        var b = watchify(browserify({
            entries           : [ pathToEntry ],
            bundleName        : 'appBundle.js',
            destinationFolder : './dist/',
            debug           : true, 
            cache           : {}, 
            packageCache    : {},
            fullPaths       : true
        }));
        
        b.bundle()
            .pipe(source( pathToEntry ))
            .pipe(gulp.dest('./dist'));

        b.on('update', 
            foo
        );

        function foo () {
            b.bundle()
            .pipe(source( pathToEntry ))
            .pipe(gulp.dest('./dist'))
        }

    }

}


DefaultBundler.requiredProperties = { 
    
        debug           : true, 
        cache           : {}, 
        packageCache    : {},
        fullPaths       : true

};