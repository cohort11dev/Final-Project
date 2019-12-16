import {jq} from './jquery.min.js';
import {pop} from './popper.min.js';
import {boot} from './bootstrap.min.js';
import {nav} from '../nav/nav.js'

(function(){
    jq();

    // if(document.URL.includes('careers')) pop();
    boot();
    nav();
})();