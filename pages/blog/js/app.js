import {blogPosts} from './blogPosts.js';

const removeSpaces = title => {
    // remove spaces from item name to be used as item ID
    title = title.replace(/\s+/g, '-');
    return title;
}

const renderBlogCard = (blog) => {
    let markup;
    markup = `
        <div class="card border-0">
            <div class="row no-gutters">
                <div class="col-md-3 blogCardImg" style="background: center/cover no-repeat url(${blog.image})"></div>
                <img src="${blog.image}" class="cardSmallImg" alt="tech image">
                <div class="col-md-9 align-self-center">
                    <div class="card-body ml-2">
                        <h3 class="card-title">${blog.title}</h3>
                        <p class="card-text blog-date"><small>${blog.date} by <span class="text-muted">${blog.author}</span></small></p>
                        <p class="card-text">${blog.cardPost}</p>
                        <a class="btn btn-outline-primary mt-3" href="#" data-toggle="modal"
                        data-target="#${removeSpaces(blog.title)}">Continue Reading <i class="fal fa-angle-double-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.querySelector(".container").insertAdjacentHTML("beforeend", markup);
}

const renderBlogPost = (blog) => {
    let markup;
    markup = `
        <div class="modal fade" id="${removeSpaces(blog.title)}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
        aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content p-3">
                    <img src="${blog.fullImage}" alt="tech image">
                    <div class="blog-post">
                        <h3 class="font-weight-bold mt-3">${blog.title}</h3>
                        <p class="font-italic mb-2">${blog.date} by <span class="text-muted">${blog.author}</span></p>
                        ${blog.fullPost}     
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.querySelector(".modalContainer").insertAdjacentHTML("beforeend", markup);
}

for (let post of blogPosts) {
    renderBlogCard(post);
    renderBlogPost(post);
}
