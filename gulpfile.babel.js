import gulp      from 'gulp';
import GulpTasks from './gulp/tasks/GulpTasks';

let _gulpTasks = new GulpTasks();

gulp.task( 'app', _gulpTasks.appBundle );

gulp.task( 'vendor', _gulpTasks.vendorBundle );

gulp.task( 'default',   [ 'app', 'vendor' ] );
