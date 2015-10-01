import browserify from 'browserify';
import watchify   from 'watchify';
import gutil      from 'gulp-util';
import source     from 'vinyl-source-stream';
import buffer     from 'vinyl-buffer';
import uglify     from 'gulp-uglify';
import gulp       from 'gulp';

export default class DefaultBundler {

    setConfigProperties( a, b ) {
        this.config = Object.assign( a, b );
    }

    bundle ( watch, minify ) {
    
        /*
            this.config
            is not correct
        */

        this.bundler = watchify( browserify( this.config ) );
        this.bundler.external( this.config.options.vendors );
  
        //Find out what .bind looks like in ES6
        this.bundler.on( 'error', gutil.log.bind( gutil, 'Browserify Error .' ) );

        this.bundler.on( 

            'update', 

            function () { 
         
                var updateStart = Date.now();

                console.log('Updating...');

                bundler.bundle() 
                .pipe( source( this.config.settings.bundleName ) )

                .pipe( gulp.dest( this.config.settings.destinationFolder ) );

                console.log( 'Updated, took ', ( Date.now() - updateStart ) + 'ms' );

            }
        )

        .bundle()
        .pipe( source( this.config.settings.bundleName ) )

        // .pipe( buffer() )
        // .pipe( uglify() )

        .pipe( gulp.dest( this.config.settings.destinationFolder ) );

    }


}


DefaultBundler.requiredProperties = { 
    
    required : {
        //What does this due if false?
        debug           : true, 
        //Encapsulate this cryptic mess!
        cache           : {}, 
        packageCache    : {},
        fullPaths       : true
    }

};