const commentSection = document.querySelector('#comments-section');
const myName = "juliusomo";
let commentData = {};

window.onload = function () {

    fetch('./data.json')
        .then(res => res.json() )
        .then(data => {
            commentData = data;
            console.log(commentData.comments);
            renderComments(commentData.comments);
        });
};


function renderComments(data) {
    let innerContents = "";
    Array.from(data).forEach( (item) => {
        innerContents += 
            `<div class="comment-item set-flex" id="${item.id}">
                <div class="col-rank set-flex direction-col">
                    <a class="btn rank-up" href="#">
                        <img src="./images/icon-plus.svg"/>
                    </a>
                    <div class="">${item.score}</div>
                    <a class="btn rank-down" href="#">
                        <img src="./images/icon-minus.svg"/>
                    </a>
                </div>
                <div class="col-content set-flex direction-col">
                    <div class="set-flex"> 
                        <div class="comment-author-info">
                            <img class="comment-author-profile" src="${item.user.image.png}"/>
                            <span class="comment-author-name">${item.user.username}</span>
                            <span class="">${item.createdAt}</span>
                        </div>
                        <a class="comment-reply" href="#">
                            <img src="./images/icon-reply.svg"/>
                            <span>Reply</span>
                        </a>
                    </div>
                    <div class="comment-content">
                        ${item.content}
                    </div>
                </div>
            </div>
            `;
    });
    commentSection.innerHTML = innerContents;

    return new Promise((resolve, reject) => {
        resolve( 
            Array.from(data).filter( (item) => {
                if(item.replies.length>0) renderReplies(item)
            })
        )
    });
}

function renderReplies(data) {
    console.log(data);
    let innerContents = "";
    Array.from(data.replies).forEach( (item) => {
        innerContents += 
            `<div class="comment-item set-flex reply" id="${item.id}">
                <div class="col-rank set-flex direction-col">
                    <a class="btn rank-up" href="#">
                        <img src="./images/icon-plus.svg"/>
                    </a>
                    <div class="">${item.score}</div>
                    <a class="btn rank-down" href="#">
                        <img src="./images/icon-minus.svg"/>
                    </a>
                </div>
                <div class="col-content set-flex direction-col">
                    <div class="set-flex"> 
                        <div class="comment-author-info">
                            <img class="comment-author-profile" src="${item.user.image.png}"/>
                            <span class="comment-author-name">${item.user.username}</span>
                            <span class="">${item.createdAt}</span>
                        </div>
                        <a class="comment-reply" href="#">
                            <img src="./images/icon-reply.svg"/>
                            <span>Reply</span>
                        </a>
                    </div>
                    <div class="comment-content">
                        ${item.content}
                    </div>
                </div>
            </div>
            `;
    })

    Array.from(commentSection.children).filter( (targetItem) => {
        if(targetItem.id==data.id) {
            console.log(targetItem);
            targetItem.insertAdjacentHTML('afterend', innerContents);
        }
    })
    
    return new Promise((resolve, reject) => {
        resolve( 
            Array.from(commentSection.querySelectorAll('.comment-author-name')).filter( (item) => {
                if(String(item.textContent) == myName) {
                    console.log(item);
                    item.classList = "comment-author-name you";
                }
            })
        )
    });

}