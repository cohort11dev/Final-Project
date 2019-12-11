const qs = selector => document.querySelector(selector);
const qsa = selector => document.querySelectorAll(selector);

const siteObj = {
    demo_1: "./portfolio/fgelly/index.html",
    demo_2: "./portfolio/cgriffith/index.html",
    demo_3: "./portfolio/tromano/index.html",
    demo_4: "./portfolio/smcnatt/index.html",
    demo_5: "./portfolio/cwalls/index.html",
    demo_6: "./portfolio/dchhan/index.html",
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
    }))




const smoothScroll = e => {
    e.preventDefault();
    let targetId = window.getAttribute("href");
    let targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    let toTop = distanceToTop(targetSection);
    window.scrollBy({
        top: toTop,
        left: 0,
        behavior: "smooth"
    });

    let checkIfDone = setInterval(function () {
        let reachedBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
        if (distanceToTop(targetSection) === 0 || reachedBottom) {
            targetSection.tabIndex = "-1";
            targetSection.focus();
            window.history.pushState("", "", targetId);
            clearInterval(checkIfDone);
        }
    }, 100);
}