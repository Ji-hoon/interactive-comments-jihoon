import {createCommentForm, createComment, checkCharacterLength} from './scripts/createComment.js';
import {reply} from './scripts/replyComment.js';
import {generateCommentElement} from './scripts/template.js';

export const commentSection = document.querySelector('#comments-section');

export let commentData = {};
export let myName = "";


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
    //console.log(data);
    let innerContents = "";
    Array.from(data.replies).forEach( (item) => {
        innerContents += generateCommentElement(item.replyingTo, item, null);
    })

    // ref - 부모 자식 노드, 요소 찾기 : https://hianna.tistory.com/712
    // ref - js로 insertAfter() 기능 구현 
    //      : https://stackoverflow.com/questions/56624028/using-template-strings-to-append-html
    //      : https://blog.asamaru.net/2016/12/06/how-to-do-insertafter-in-javascript/
    Array.from(commentSection.children).find( (targetItem) => {
        if(targetItem.id==data.id) {
            //console.log(targetItem);
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

        replyButton.addEventListener('click', reply);
        
    });
}

export function scrollToTargetElement(id) {
    //console.log(document.querySelectorAll('.comment-item'));
    Array.from(document.querySelectorAll('.comment-item')).find( (targetItem) => {
        if(targetItem.id==id) {
            //ref - how to get the absolute position of element : 
            // https://tutorial.eyehunts.com/js/get-absolute-position-of-element-javascript-html-element-browser-window/
            const scrollY = window.scrollY;
            const offsetY = targetItem.getBoundingClientRect().top;
            //console.log(offsetY);
            window.scrollTo({top: scrollY+offsetY-91.5, behavior: 'smooth'});
        }
    })
}