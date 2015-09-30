
/*
    Looking to do the following:
    
    1) Publish an NPM package

    2) Create a extensible gulp / browserify build package using ES6 classes to leverage inheritance, 
    and encapsulate the cryptic complexity of browserify.

    3) Aim for a togglable feature set, opt in

    3) Build an app on top of it

*/

import reactify   from 'reactify';
import babelify   from 'babelify';
import browserify from 'browserify';
import source     from 'vinyl-source-stream';
import gutil      from 'gulp-util';
import watchify   from 'watchify';
import buffer     from 'vinyl-buffer';
import uglify     from 'gulp-uglify';
import gulp       from 'gulp';

import DefaultBundle from './DefaultBundle';

export default class AppBundle extends DefaultBundle {

    constructor( options ) {

        super();

        let opts = {
            entries         : options.entries,
            //Find an elegant way to move this into options
            transform       : [ babelify, reactify ],
            //What does this due if false?
            debug           : true, 
            //Encapsulate this cryptic mess!
            cache           : {}, 
            packageCache    : {},
            fullPaths       : true
        };

        let bundler = watchify( browserify( opts ) );
        
        bundler.external( options.vendors );

        //Find out what .bind looks like in ES6
        bundler.on( 'error', gutil.log.bind( gutil, 'Browserify Error .' ) );

        bundler.on( 

            'update', 

            function () { 
         
                var updateStart = Date.now();

                console.log('Updating...');

                bundler.bundle() 
                .pipe( source( options.bundleName ) )

                .pipe( gulp.dest( options.destinationFolder ) );

                console.log( 'Updated, took ', ( Date.now() - updateStart ) + 'ms' );

            }
        )

        .bundle()
        .pipe( source( options.bundleName ) )

        // .pipe( buffer() )
        // .pipe( uglify() )

        .pipe( gulp.dest( options.destinationFolder ) );

    }

}