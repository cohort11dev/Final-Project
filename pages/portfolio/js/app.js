import { portfolioCards } from './cards.js';

const qs = selector => document.querySelector(selector);
const qsa = selector => document.querySelectorAll(selector);

const siteObj = {
    demo0: "./portfolio/portfolio/fgelly/index.html",
    demo1: "./portfolio/portfolio/cgriffith/index.html",
    demo2: "./portfolio/portfolio/tromano/index.html",
    demo3: "./portfolio/portfolio/smcnatt/index.html",
    demo4: "./portfolio/portfolio/cwalls/index.html",
    demo5: "./portfolio/portfolio/cappleton/index.html",
}

function modalContent(selector) {
    document.querySelector(`.modal-body`).innerHTML = `
    <iframe class="c-frame" src="${siteObj[selector]}">
        <p>Your browser doesn't seem to support iframes.</p>
        <p>You can still view the raw code below.</p>
    </iframe>
    `;
}

const renderPortfolioCards = (portfolio, i) => {
    let HTML = `<div class="col-md-6 mb-4">
        <div class="card mb-4 box-shadow h-100">

            <img id="demo-${i}"
                class="card-img-top demo-img"
                src="${portfolio[i].demoImage}"
                alt="${portfolio[i].name}'s demo site image"
                data-demo="demo${i}"
                data-toggle="modal"
                data-target="#demo-modal" />

            <div class="card-body">
                <h5 class="card-title">
                    ${portfolio[i].title}
                </h5>
                <p class="card-text">
                    ${portfolio[i].description}
                </p>
            </div>

            <div class="card-footer">
                <div class="text-muted mb-1">
                    Coded by: <strong>${portfolio[i].name}</strong>
                </div>
                <small class="text-muted port-foot">
                    <div class="demo-modal">
                        <a class="trigger-modal"
                            href="#"
                            data-demo="demo${i}"
                            data-toggle="modal"
                            data-target="#demo-modal">
                            <i class="fas fa-external-link-alt mr-1"></i> View demo
                        </a>
                    </div>
                    <div class="demo-code">
                        <a href="${portfolio[i].link}"
                            target="_blank">
                            <i class="fas fa-code-branch mr-1"></i> View code
                        </a>
                    </div>
                </small>
            </div>
        </div> 
    </div>`;

    document.querySelector('.port-gen').insertAdjacentHTML('beforeend', HTML);
    [...qsa('.demo-img')].concat([...qsa('.trigger-modal')])
    .forEach(cur => cur.addEventListener('click', event => {
            modalContent(event.target.dataset.demo);
        })
    );
}

for(let i in portfolioCards) renderPortfolioCards(portfolioCards, i);
