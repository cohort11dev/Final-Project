import { jObject } from './descriptions.js'

(function () {
    $('[data-toggle="tooltip"]').tooltip();
})();

document.querySelectorAll('[data-type^="job"]').forEach(cur => {
    cur.addEventListener('click', event => {
        // clear the innerHTML before loading the new content
        [ document.querySelector('#jobDescTitle'),
          document.querySelector('#job-desc'),
          document.querySelector('#job-res'),
          document.querySelector('#job-res-list'),
          document.querySelector('#job-reqs'),
          document.querySelector('#job-reqs-list') ].forEach(cur => cur.innerHTML = '');

        const job = event.target.dataset.type;
        document.querySelector('#jobDescTitle').innerHTML = jObject[job][0];

        document.querySelector('#job-desc').innerHTML = jObject[job][1];

        document.querySelector('#job-res').innerHTML = jObject[job][2];

        let list = ['<li class="list-group-item">', '</li>']
        for(let el of jObject[job][3]) {
            el = list[0] + el + list[1];
            document.querySelector('#job-res-list').innerHTML += el;
        }

        document.querySelector('#job-reqs').innerHTML = jObject[job][4];
        for(let el of jObject[job][5]) {
            el = list[0] + el + list[1];
            document.querySelector('#job-reqs-list').innerHTML += el;
        }
    });
})

