import AppBundle from './AppBundle';

export default class {

    appBundle() {

        let options = {
            entries             : [ './client/src/app/main.js' ],
            bundleName          : './appBundle.js',
            destinationFolder   : './dist/',
            //Look for env var / mode etc
            watch               : true,
            uglify              : false,
            vendors             : [ 'react' ]
        };

        return new AppBundle( options );
    
    }


    vendorBundle() {

        console.log( 'GulpTasks.vendorBundle' );        

    }

}