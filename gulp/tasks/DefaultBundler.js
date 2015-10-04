
import browserify from 'browserify';
import watchify   from 'watchify';
import reactify   from 'reactify';
import babelify   from 'babelify';
import uglify     from 'gulp-uglify';
import gutil      from 'gulp-util';
import source     from 'vinyl-source-stream';
import buffer     from 'vinyl-buffer';
import gulp       from 'gulp';

export default class DefaultBundler {

    setConfigProperties( props ) {
        this.config = Object.assign( props, { transforms : [ babelify, reactify ] } );
    }

    bundle () {
        let config = this.config;
        var b = watchify( browserify({
            entries           : [ config.entries ],
            transform         : this.config.transforms,
            bundleName        : config.bundleName,
            destinationFolder : config.destinationFolder,
            debug             : true,
            cache             : {}, 
            packageCache      : {},
            fullPaths         : true
        }));
        
        b.bundle()
            .pipe(source( config.bundleName ))
            .pipe(gulp.dest( config.destinationFolder ) );

        b.on('update', () => 
            b.bundle()
            .pipe( source( config.bundleName ) )
            .pipe( gulp.dest( config.destinationFolder) )
        );

    }

}