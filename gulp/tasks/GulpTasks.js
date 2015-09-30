import AppBundle from './AppBundle';

export default class {

    appBundle() {

        let options = {
            entries     : [ './client/src/app/main.js' ]
        };

        return new AppBundle( options );
    
    }


    vendorBundle() {

        console.log( 'GulpTasks.vendorBundle' );        

    }

}