const qs = selector => document.querySelector(selector);
const qsa = selector => document.querySelectorAll(selector);

const siteObj = {
    demo_1: "./portfolio/portfolio/fgelly/index.html",
    demo_2: "./portfolio/portfolio/cgriffith/index.html",
    demo_3: "./portfolio/portfolio/tromano/index.html",
    demo_4: "./portfolio/portfolio/smcnatt/index.html",
    demo_5: "./portfolio/portfolio/cwalls/index.html",
    demo_6: "./portfolio/portfolio/dchhan/index.html",
}

function modalContent(selector) {
    document.querySelector(`#xl-modal`).innerHTML = `
    <iframe class="c-frame h-100" src="${siteObj[selector]}">
        <p>Your browser doesn't seem to support iframes.</p>
        <p>You can still view the raw code below.</p>
    </iframe>
    `;
}

qsa('.demo-img')
    .forEach(cur => cur.addEventListener('click', event => {
            console.log(event.target.id);
            modalContent(event.target.id);
        })
    );

qsa('.trigger-modal')
    .forEach(cur => cur.addEventListener('click', event => {
        event.preventDefault();
        console.log(event.target.hash);
        modalContent(event.target.hash.replace(/#/, ''));
    }));