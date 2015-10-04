import AppBundler from './AppBundler';
import path       from 'path';

export default class GulpTasks {

    appBundler () {

        console.log('GulpTasks.appBundler');
        
        return new AppBundler ({
            entries           : path.resolve( __dirname, '../../client/src/app/main.js' ),
            bundleName        : 'appBundle.js',
            destinationFolder : './dist/',
            // lint              : false,
            // watch             : true,
            // uglify            : false,
            vendors           : [ 'react' ]
        });
    
    }

    vendorBundler () {

        console.log( 'GulpTasks.vendorBundler' );        

    }

}