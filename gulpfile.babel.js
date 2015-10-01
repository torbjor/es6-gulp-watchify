import gulp      from 'gulp';
import GulpTasks from './gulp/tasks/GulpTasks';

let _gulpTasks = new GulpTasks();

gulp.task( 'app', _gulpTasks.appBundler );

gulp.task( 'vendor', _gulpTasks.vendorBundler );

gulp.task( 'default',   [ 'app', 'vendor' ] );
