import { jObject } from './descriptions.js';
import { card } from './cards.js';

const listMaker = arr => {
    let list = ['<li class="list-group-item">', '</li>'],
        bundle = '';

    for(let el of arr) {
        bundle += list[0] + el + list[1];
    }

    return bundle;
}

const renderInnerCard = (card, i) => { 
    let HTML = `<div class="col-sm-6 my-2">
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">${card[i].title}</h5>
                <p class="card-text">
                    ${card[i].description}
                </p>
            </div>

            <div class="card-footer">
                <button type="button" class="btn btn-bo" data-type="job-${i}" data-toggle="modal" data-target="#job-modal">
                    Read More
                </button>
            </div>

        </div>
    </div>`;
    document.querySelector(".card-gen").insertAdjacentHTML("beforeend", HTML);
}

const renderCardModal = job => {
    document.querySelector(".modal-content").innerHTML = "";

    const HTML = `<div class="modal-header">
          <h4 class="modal-title m-c" id="jobDescTitle">${job.title}</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span> <!-- close button -->
          </button>
        </div>
        <div class="modal-body">

          <div class="container">
            <div class="row">
              <div class="col">
                <div id="job-desc" class="m-c">${job.description}</div>
              </div>
            </div>
            
            <div class="row">
              <div class="col-md-6">
                <h5 id="job-res" class="m-c pt-3 pb-2">${job["responsibility header"]}</h5>
                <ul id="job-res-list" class="list-group">
                    ${listMaker(job.responsibilities)}
                </ul>
              </div>
              <div class="col-md-6">
                <h5 id="job-reqs" class="m-c pt-3 pb-2">${job["skills header"]}</h5>
                <ul id="job-reqs-list" class="list-group">
                    ${listMaker(job.skills)}
                </ul>
              </div>
            </div>
            
          </div>

        </div>
        <div class="modal-footer">
          <button type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal">
            Close
          </button>
          <span class="d-inline-block"
                tabindex="0"
                data-toggle="tooltip"
                title="Not accepting applications at this time">
            <button type="button"
                    class="btn btn-danger disabled"
                    style="pointer-events: none;"
                    disabled>
              Apply
            </button>
          </span>
        </div>`;
    
        document.querySelector(".modal-content").insertAdjacentHTML("beforeend", HTML);
}

for(let i in card) renderInnerCard(card, i)

document.querySelectorAll('[data-type^="job-"]').forEach(cur => {
    cur.addEventListener('click', event => {
        const i = event.target.dataset.type.replace('job-', '');
        renderCardModal(jObject[i]);
    })
})
