import {teamMembers} from './teamMembers.js'

const renderTeamMember = (person) => {
    let markup;
    markup = `
        <div class="col-6 col-md-4 py-1 text-center">
            <div class="card border-0">
                <img src="${person.image}" class="card-img-top" alt="${person.name}">
                <div class="card-img-overlay">
                    <p class="card-text text-center">${person.bio}</p>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${person.name}</h5>
                    <p class="card-text">${person.title}</p>
                </div>
            </div>
        </div>
    `;
    document.querySelector(".row").insertAdjacentHTML("beforeend", markup);
}

for (let person of teamMembers) {
    renderTeamMember(person);
}