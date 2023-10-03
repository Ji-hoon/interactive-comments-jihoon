
export function generateCommentElement(originalCommentAuthor, item, replyTo) {
    //console.log(originalCommentAuthor);
    return `
    <div class="comment-item set-flex" id="${item.id}" >
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
            <div class="comment-author set-flex"> 
                <div class="comment-author-info set-flex">
                    <img class="comment-author-profile" src="${item.user.image.png}"/>
                    <span class="comment-author-name">${item.user.username}</span>
                    <span class="">${item.createdAt}</span>
                </div>
                <a class="comment-reply" id="${item.id}" reply-to="${item.replyingTo}" href="#">
                    <img src="./images/icon-reply.svg"/>
                    <span>Reply</span>
                </a>
                <a class="comment-update" id="${item.id}" href="#">
                    <img src="./images/icon-edit.svg"/>
                    <span>Edit</span>
                </a>
                <a class="comment-delete" id="${item.id}" href="#">
                    <img src="./images/icon-delete.svg"/>
                    <span>Delete</span>
                </a>
            </div>
            <div class="comment-content">
                <span class="mention">${originalCommentAuthor}</span>
                ${item.content}
            </div>
        </div>
    </div>
    `;
}