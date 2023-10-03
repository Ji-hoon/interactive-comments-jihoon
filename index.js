import {createCommentForm, createComment, checkCharacterLength} from './scripts/createComment.js';
import {replyComment} from './scripts/replyComment.js';

export const commentSection = document.querySelector('#comments-section');

export let commentData = {};
export let myName = "";

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

// ref - 페이지 로딩 후 실행 함수 : https://m.blog.naver.com/ka28/221991865312
window.onload = function() {
    window.scrollTo(0,0);
    getJSONData('./data.json');
}

export function getJSONData(json) {
    fetch(json)
    .then(res => res.json() )
    .then(data => {
        commentData = data.comments;
        myName = data.currentUser.username;
        
        renderComments(commentData);
    });
}

export function reloadData() {
    window.scrollTo(0,0);
    commentSection.innerHTML =
    `<div class="main__loading spinner">
        <h3><span class="visually-hidden">visuallyhidden</span></h3>
    </div>`;
    return new Promise((resolve, reject) => {
        resolve( setTimeout( ()=> renderComments(commentData), 300) )
    });
}

export function renderComments(data) {
    let innerContents = "";
    Array.from(data).forEach( (item) => {
        innerContents += generateCommentElement(item.user.username, item, null);
            // `<div class="comment-item set-flex" id="${item.id}">
            //     <div class="col-rank set-flex direction-col">
            //         <a class="btn rank-up" href="#">
            //             <img src="./images/icon-plus.svg"/>
            //         </a>
            //         <div class="">${item.score}</div>
            //         <a class="btn rank-down" href="#">
            //             <img src="./images/icon-minus.svg"/>
            //         </a>
            //     </div>
            //     <div class="col-content set-flex direction-col">
            //         <div class="comment-author set-flex"> 
            //             <div class="comment-author-info set-flex">
            //                 <img class="comment-author-profile" src="${item.user.image.png}"/>
            //                 <span class="comment-author-name">${item.user.username}</span>
            //                 <span class="">${item.createdAt}</span>
            //             </div>
            //             <a class="comment-reply" id="${item.id}" href="#">
            //                 <img src="./images/icon-reply.svg"/>
            //                 <span>Reply</span>
            //             </a>
            //         </div>
            //         <div class="comment-content">
            //             ${item.content}
            //         </div>
            //     </div>
            // </div>
            // `;
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

export function renderReplies(data) {
    console.log(data);
    let innerContents = "";
    Array.from(data.replies).forEach( (item) => {
        innerContents += generateCommentElement(data.user.username, item, null);
            // `<div class="comment-item set-flex" id="${item.id}">
            //     <div class="col-rank set-flex direction-col">
            //         <a class="btn rank-up" href="#">
            //             <img src="./images/icon-plus.svg"/>
            //         </a>
            //         <div class="">${item.score}</div>
            //         <a class="btn rank-down" href="#">
            //             <img src="./images/icon-minus.svg"/>
            //         </a>
            //     </div>
            //     <div class="col-content set-flex direction-col">
            //         <div class="comment-author set-flex"> 
            //             <div class="comment-author-info set-flex">
            //                 <img class="comment-author-profile" src="${item.user.image.png}"/>
            //                 <span class="comment-author-name">${item.user.username}</span>
            //                 <span class="">${item.createdAt}</span>
            //             </div>
            //             <a class="comment-reply" id="${item.id}" href="#">
            //                 <img src="./images/icon-reply.svg"/>
            //                 <span>Reply</span>
            //             </a>
            //             <a class="comment-update" id="${item.id}" href="#">
            //                 <img src="./images/icon-edit.svg"/>
            //                 <span>Edit</span>
            //             </a>
            //             <a class="comment-delete" id="${item.id}" href="#">
            //                 <img src="./images/icon-delete.svg"/>
            //                 <span>Delete</span>
            //             </a>
            //         </div>
            //         <div class="comment-content">
            //             <span class="mention">${data.user.username}</span>${item.content}
            //         </div>
            //     </div>
            // </div>
            // `;
    })

    // ref - 부모 자식 노드, 요소 찾기 : https://hianna.tistory.com/712
    // ref - js로 insertAfter() 기능 구현 
    //      : https://stackoverflow.com/questions/56624028/using-template-strings-to-append-html
    //      : https://blog.asamaru.net/2016/12/06/how-to-do-insertafter-in-javascript/
    Array.from(commentSection.children).find( (targetItem) => {
        if(targetItem.id==data.id) {
            console.log(targetItem);
            targetItem.insertAdjacentHTML('afterend', 
                `<div class="reply set-flex direction-col" reply-to="${targetItem.id}">${innerContents}</div>`);
        }
    })
    
    return new Promise((resolve, reject) => {
        resolve( filterMyComment() )
    });

}

export function filterMyComment() {
    Array.from(commentSection.querySelectorAll('.comment-item')).filter( (item) => {
        if(String(item.querySelector('.comment-author-name').textContent) == myName) {
            //console.log(item);
            item.classList.add('my-comment');
        }
    });
    return new Promise( (resolve, reject) => {
        resolve( setCommentItemEvent() )
    });
}

export function setCommentItemEvent() {
    Array.from(commentSection.querySelectorAll('.comment-item')).forEach( (item) => {
        const replyButton = item.querySelector('.comment-reply');
        const updateButton = item.querySelector('.comment-update');
        const deleteButton = item.querySelector('.comment-delete');
        const upVoteButton = item.querySelector('.rank-up');
        const downVoteButton = item.querySelector('.rank-down');

        replyButton.addEventListener('click', replyComment);
        
    });
}

export function scrollToTargetElement(id) {
    Array.from(document.querySelectorAll('.comment-item')).find( (targetItem) => {
        if(targetItem.id==id) {
            const offsetY = targetItem.offsetTop-92;
            window.scrollTo({top: offsetY, behavior: 'smooth'});
            console.log(targetItem.offsetTop);
        }
    })
}