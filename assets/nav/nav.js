import { jumbotron } from './jumbotron.js';

export const nav = function () {
    const index = document.URL.includes('index.html');
    const checkActivePage = bool => {
        if (bool) return 'active';
        return '';
    }

    const navbar = `<div class="container nav-wrap">
        <a class="navbar-brand" href="#" aria-label="Logo">
            <div id="${index ? 'nav-logo-i' : 'nav-logo'}" alt="Cohort 11 Dev"></div>
        </a>
        <button class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
                        
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item ${checkActivePage(document.URL.includes('index.html'))}">
                    <a class="nav-link" href="${index ? '#to-top' : 'https://cohort11dev.github.io/Final-Project/'}">Home</a>
                </li>
                <li class="nav-item">

                    <div class="dropdown">
                        <a class="btn btn-db dropdown-toggle ${checkActivePage(document.URL.includes('about.html'))} nav-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        About Us
                        </a>
                    
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" href="${index ? '#about' : './about.html'}">About Cohort 11</a>
                        <a class="dropdown-item" href="${index ? './pages/ourteam.html' : './ourteam.html'}">Meet the Team</a>
                        </div>
                    </div>

                </li>
                <li class="nav-item ${checkActivePage(document.URL.includes('portfolio.html'))}">
                    <a class="nav-link" href="${index ? '#portfolio' : './portfolio.html'}">Portfolio</a>
                </li>
                <li class="nav-item ${checkActivePage(document.URL.includes('blog.html'))}">
                    <a class="nav-link" href="${index ? '#blog' : './blog.html'}">Blog</a>
                </li>
                <li class="nav-item ${checkActivePage(document.URL.includes('contact.html'))}">
                    <a class="nav-link" href="${index ? './pages/contact.html' : './contact.html'}">Contact</a>
                </li>
                <li class="nav-item ${checkActivePage(document.URL.includes('careers.html'))}">
                    <a class="nav-link" href="${index ? './pages/careers.html' : './careers.html'}">Careers</a>
                </li>
            </ul>
        </div>
    </div>`;

const checkPage = function(url) {
    let i = -1;

    if(url.includes('index')) return '';
    else if(url.includes('about')) i = 0;
    else if(url.includes('portfolio')) i = 1;
    else if(url.includes('blog')) i = 2;
    else if(url.includes('contact')) i = 3;
    else if(url.includes('careers')) i = 4;
    else if(url.includes('ourteam')) i = 5;

    return `<section id="to-top" class="jumbotron text-center">
                <div class="container">
                    <h1 class="p-highlight"> ${jumbotron[i].header1} </h1>
                    <h1 class="p-topic"> ${jumbotron[i].header2} </h1>
                    <p class="h-wrap mt-4 mx-auto">
                        ${jumbotron[i].text}
                    </p>
                </div>
            </section>`;
}

const jumbo = checkPage(document.URL);
// RmVsaXggd2FzIGhlcmU=

    const footer = `<div id="top">
        <a href="#to-top" class="menu-link">
            <i class="fas fa-sort-up mt-1"></i>
            <p> Top </p>
        </a>
    </div>
    <div id="info">
        <div id="locations">
            <h2> Locations </h2>
            <ul class="address-container">
                <li class="mt-3">
                    <p>
                        2040 South Park Street
                        <br>
                        Madison, WI — 53713
                    </p>
                </li>
                
            </ul>
        </div>

        <div id="hours">
            <h2> Hours </h2>
            <ul class="open-container">
                <li class="open mt-3">
                    <p>
                        Monday - Friday
                        <br>
                        8:30pm - 5:30pm
                    </p>
                </li>
                <li class="open mt-3">
                    <p>
                        Saturday
                        <br>
                        8:00am - 12:00pm
                    </p>
                </li>
                        
                <li class="open mt-3">
                    <p>
                        Available for private consultations
                        <br>
                        Hackathons on Sundays
                    </p>
                </li>
            </ul>
        </div>
    </div>
    <div class="copyright-container">
        <div id="copyright">
            <ul class="d-flex justify-content-center">
                <li>Copyright 2019</li>
                <li class="dot">&copy;</li>
                <li>Cohort 11 Dev</li>
                <li class="teamLink">
                    &laquo; <a href="${index ? './pages/ourteam.html' : './ourteam.html'}">Meet the team</a> &raquo;
                </li>
            </ul>
            <ul class="d-flex justify-content-center">
                <li>Permissions and Copyright</li>
                <li class="dot"> &middot; </li>
                <li>
                    <a href="${index ? './pages/contact.html' : './contact.html'}">Contact Us</a>
                </li>
            </ul>
        </div>
    </div>`;

    document.querySelector('#nav').classList.add('navbar', 'justify-content-between', 'navbar-expand-md', 'navbar-dark', 'bg-dark-blue')
    document.querySelector('#nav').innerHTML = navbar;
    document.querySelector('#footer').innerHTML = footer;
    document.querySelector('main').insertAdjacentHTML('afterbegin', jumbo);
}

nav();
