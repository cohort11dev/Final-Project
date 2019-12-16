export const nav = function () {
    const index = document.URL.includes('index.html');
    const checkPage = bool => {
        if (bool) return 'active';
        return '';
    }

    const navbar = `
<div class="container nav-wrap">
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
            <li class="nav-item ${checkPage(document.URL.includes('index.html'))}">
                <a class="nav-link" href="${index ? '#' : '../../index.html'}">Home</a>
            </li>
            <li class="nav-item ${checkPage(document.URL.includes('about.html'))}">
                <a class="nav-link" href="${index ? '#about' : './about.html'}">About</a>
            </li>
            <li class="nav-item ${checkPage(document.URL.includes('portfolio.html'))}">
                <a class="nav-link" href="${index ? '#portfolio' : './portfolio.html'}">Portfoilo</a>
            </li>
            <li class="nav-item ${checkPage(document.URL.includes('contact.html'))}">
                <a class="nav-link" href="${index ? './pages/contact.html' : './contact.html'}">Contact</a>
            </li>
            <li class="nav-item ${checkPage(document.URL.includes('careers.html'))}">
                <a class="nav-link" href="${index ? './pages/careers.html' : './careers.html'}">Careers</a>
            </li>
            <li class="nav-item ${checkPage(document.URL.includes('blog.html'))}">
                <a class="nav-link" href="${index ? '#blog' : './blog.html'}">Blog</a>
            </li>
        </ul>
    </div>
</div>
`;

    const footer = `
<div id="top">
    <a href="#to-top" class="menu-link">
        <i class="fas fa-sort-up mt-1"></i>
        <p> Top </p>
    </a>
</div>
<div id="info">
    <div id="locations">
        <h2> Locations </h2>
        <ul class="address-container">
            <li class="address1">
                <p>
                    106 st Lexington Ave
                    <br>
                    Manhattan, NY — 12009
                </p>
            </li>
            <li class="address2">
                <p>
                    25 Union Square West
                    <br>
                    New York, NY — 10003
                </p>
            </li>
        </ul>
    </div>

    <div id="hours">
        <h2> Hours </h2>
        <ul class="open-container">
            <li class="open">
                <p>
                    Monday - Friday
                    <br>
                    8:30pm - 5:30pm
                </p>
                <br>
            </li>
            <li class="open">
                <p>
                    Saturday
                    <br>
                    8:00am - 12:00pm
                </p>
                <br>
            </li>
                    
            <li class="open">
                <p>
                    Available for private consolutations
                    <br>
                    Hackatons on Sundays
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
</div>
`;
    document.querySelector('#nav').classList.add('navbar', 'justify-content-between', 'navbar-expand-md', 'navbar-dark', 'bg-dark-blue')
    document.querySelector('#nav').innerHTML = navbar;
    document.querySelector('#footer').innerHTML = footer;
}
