import {
    commentData,
    myName,
    commentSection,
    scrollToTargetElement,
    renderComments,
    reloadData
    } from '../index.js';
import {createNewCommentInput, createComment, checkCharacterLength, translateNewLineIntoBr} from './createComment.js';
import {generateCommentElement} from './template.js';

let replyName = "";
let replyToName = "";

export function reply(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('id');

    //console.log(targetId);
    const newInput = createNewCommentInput('reply', targetId);
    replyToName = e.currentTarget.getAttribute('reply-to');

    // 이미 표시되고 있는 리플 입력창이 있다면 닫아준다.
    if( document.querySelector('.input-form.temp')) {
        document.querySelector('.input-form.temp').remove();
    }


    // 리플이 아닌 코멘트의 리플 버튼을 클릭한 경우
    if(replyToName === 'undefined') {
        Array.from(commentSection.children).find( (targetItem) => {
            if(targetItem.id==targetId) {
                //console.log(targetItem);
                targetItem.insertAdjacentHTML('afterend', newInput);
            }
        })
    } 
    // 리플 코멘트의 리플 버튼을 클릭한 경우
    else {
        Array.from(commentSection.querySelectorAll('.reply .comment-item')).find( (targetItem) => {
            if(targetItem.id==targetId) {
                //console.log(targetItem);
                targetItem.insertAdjacentHTML('afterend', newInput);
            }
        })
    }

    // 리플 버튼을 클릭한 코멘트 아이템의 위치로 스크롤을 이동시키고, 텍스트 필드를 활성화
    scrollToTargetElement(targetId);
    const tempInputElement = document.querySelector('.input-form.temp textarea');
    tempInputElement.focus();

    const tempInputForm = document.querySelector('.input-form.temp form');
    const tempInputSubmitButton = document.querySelector('.input-form.temp form button');
    const tempInputTextarea = document.querySelector('.input-form.temp form textarea');

    tempInputTextarea.addEventListener('keyup', (e)=> {
        if(e.target.value.length>0) tempInputSubmitButton.removeAttribute('disabled');
        else tempInputSubmitButton.setAttribute('disabled','disabled');
    });

    tempInputForm.addEventListener('submit', (e) => {
        replyComment(e, targetId);
    });

};


export function replyComment(e, targetId) {
    e.preventDefault();
    //console.log(targetId);
    const newCommentId = document.querySelectorAll('.comment-item').length+1;

    // 리플 남기려는 코멘트가 리플이 아닌 경우
    if(replyToName === 'undefined') {
        Array.from(commentData).find( (targetItem) => {
           
            if(targetItem.id == targetId) {
                //console.log(targetItem);
                targetItem.replies.push( {
                    "id": newCommentId,
                    "content": translateNewLineIntoBr(e.target[0].value),
                    "createdAt": "Less than 1 minute ago",
                    "score": 0,
                    "replyingTo": targetItem.user.username,
                    "user": {
                        "image": { 
                        "png": "./images/avatars/image-juliusomo.png",
                        "webp": "./images/avatars/image-juliusomo.webp"
                        },
                        "username": myName
                    }
                });
            }
        });
    } else {
        let targetComment = findParentObject(commentData, targetId);
        //console.log(typeof(targetComment));
        targetComment.replies.push( {
            "id": newCommentId,
            "content": translateNewLineIntoBr(e.target[0].value),
            "createdAt": "Less than 1 minute ago",
            "score": 0,
            "replyingTo": replyName,
            "user": {
                "image": { 
                    "png": "./images/avatars/image-juliusomo.png",
                    "webp": "./images/avatars/image-juliusomo.webp"
                },
                "username": myName
            }
        })
    }
    
    let newComment;
    
    setTimeout( () => {
        renderComments(commentData);
        //console.log(commentData);

        newComment = Array.from(document.getElementsByClassName('comment-item'))
            .find( (item) => item.id == newCommentId);
        newComment.classList.add('blink');

        setTimeout( () => {
            newComment.classList.remove('blink');
        }, 1400);

        Array.from(document.querySelectorAll('.comment-item')).find( (targetItem) => {
            if(targetItem.id == newCommentId) {
                //ref - how to get the absolute position of element : 
                // https://tutorial.eyehunts.com/js/get-absolute-position-of-element-javascript-html-element-browser-window/
                const scrollY = window.scrollY;
                const offsetY = targetItem.getBoundingClientRect().top;
                //console.log(offsetY);
                window.scrollTo({top: scrollY+offsetY-88, behavior: 'smooth'});
            }
        })
    }, 200);
    
}


export function findParentObject(comments, id) {
    for (const comment of comments) {
      if (comment.replies && comment.replies.length > 0) {
        for (const reply of comment.replies) {
          if (reply.id == id) {
            replyName = reply.user.username;
            console.log(replyName);
            return comment; // 상위 객체 반환
          }
        }
      }
    }
    return null; // 특정 id를 가진 객체가 없을 경우 null 반환
}
