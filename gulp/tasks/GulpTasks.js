import browserify from 'browserify';
import source     from 'vinyl-source-stream';
import gutil      from 'gulp-util';
import watchify   from 'watchify';
import reactify   from 'reactify';
import babelify   from 'babelify';
import buffer     from 'vinyl-buffer';
import uglify     from 'gulp-uglify';
import gulp       from 'gulp';

export default class {

    appBundle() {

        let opts = {
            entries         : [ './client/src/app/main.js' ],
            transform       : [ babelify, reactify ],
            debug           : true, 
            cache           : {}, 
            packageCache    : {},
            fullPaths       : true
        };

        let bundler = watchify( browserify( opts ) );
        // bundle.external( config.vendor.list );

        bundler.on( 'error', gutil.log.bind( gutil, 'Browserify Error .' ) );

        bundler.on( 

            'update', 

            function () { 
         
                var updateStart = Date.now();

                console.log('Updating.');

                bundler.bundle() 
                .pipe( source( './appBundle.js' ) )

                .pipe( gulp.dest( './dist/' ) );

                console.log( 'Updated.', ( Date.now() - updateStart ) + 'ms' );

            }
        )

        .bundle()
        .pipe( source( './appBundle.js' ) )

        // .pipe( buffer() )
        // .pipe( uglify() )

        .pipe( gulp.dest( './dist/' ) );
    
    }


    vendorBundle() {

        console.log( 'GulpTasks.vendorBundle' );        

    }

}