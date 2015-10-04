
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

    bundle () {
        let config = this.config;
        var b = watchify( browserify( {
            entries           : [ config.entries ],
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