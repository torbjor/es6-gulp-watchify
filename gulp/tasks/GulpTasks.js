import AppBundler from './AppBundler';

export default class GulpTasks {

    appBundler () {

        console.log('GulpTasks.appBundler');
        
        return new AppBundler (

            {
                entries           : [ './client/src/app/main.js' ],
                bundleName        : 'appBundle.js',
                destinationFolder : './dddist/',
                watch             : true,
                uglify            : false,
                vendors           : [ 'react' ]
            }

        );
    
    }

    vendorBundler () {

        console.log( 'GulpTasks.vendorBundler' );        

    }

}