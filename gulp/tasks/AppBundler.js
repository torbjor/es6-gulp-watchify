
import DefaultBundler   from './DefaultBundler';
import ObjectUtil       from '../utils/ObjectUtil';

export default class AppBundler {

    constructor( props ) {
        
        let _defaultBundler = new DefaultBundler();
        _defaultBundler.setConfigProperties( props );
        _defaultBundler.bundle();

    }

}