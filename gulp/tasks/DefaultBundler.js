import browserify from 'browserify';
import watchify   from 'watchify';
import gutil      from 'gulp-util';
import source     from 'vinyl-source-stream';
import buffer     from 'vinyl-buffer';
import uglify     from 'gulp-uglify';
import gulp       from 'gulp';

export default class DefaultBundler {

    setConfigProperties( a, b ) {
        this.config = Object.assign( a, b, DefaultBundler.requiredProperties );
    }

    bundle () {
        var b = watchify(browserify({
            entries           : [ this.config.entries ],
            bundleName        : this.config.bundleName,
            destinationFolder : this.config.destinationFolder,
            debug           : true, 
            cache           : {}, 
            packageCache    : {},
            fullPaths       : true
        }));
        
        b.bundle()
            .pipe(source( this.config.entries ))
            .pipe(gulp.dest(this.config.destinationFolder));

        b.on('update', () => 
            b.bundle()
            .pipe(source( this.config.entries ))
            .pipe(gulp.dest(this.config.destinationFolder))
        );

    }

}

DefaultBundler.requiredProperties = { 
    debug           : true, 
    cache           : {}, 
    packageCache    : {},
    fullPaths       : true
};