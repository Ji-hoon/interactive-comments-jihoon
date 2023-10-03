import {
    commentData,
    myName,
    commentSection,
    generateCommentElement,
    filterMyComment,
    reloadData
    } from '../index.js';

export const createCommentForm = document.querySelector('#comment-input .input-form form');
createCommentForm.addEventListener('submit', createComment);

export const createCommentButton = document.querySelector('#comment-input .input-form button[type="submit"]');
export const createCommentField = document.querySelector('#comment-input .input-form textarea');
createCommentField.addEventListener('keyup', checkCharacterLength);


export function checkCharacterLength(e) {
    if(e.target.value.length>0) createCommentButton.removeAttribute('disabled');
    else createCommentButton.setAttribute('disabled','disabled');
}

export function createComment (e) {
    e.preventDefault();
    const createdDate = new Date();
    //console.log(e); // e.target[0].value : 12\n123\n12\n321
    // ref - textarea 있는 그대로 출력하기 : https://oneshottenkill.tistory.com/320

    const newCommentId = commentSection.children.length+2;
    commentData.push({
          "id": newCommentId,
          "content": translateNewLineIntoBr(e.target[0].value),
          "createdAt": "Less than 1 minute ago",
          "score": 0,
          //"replyingTo": "ramsesmiron",
          "user": {
            "image": { 
              "png": "./images/avatars/image-juliusomo.png",
              "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": myName
          },
          "replies": [],
        });
    
    // 입력필드 초기화, 서밋 버튼 초기화
    e.target[0].value = "";
    createCommentButton.setAttribute('disabled','disabled');

    // 이미 표시되고 있는 리플 입력창이 있다면 닫아준다.
    if( document.querySelector('.input-form.temp')) {
        document.querySelector('.input-form.temp').remove();
    }
    
    setTimeout( () => {
        const newCommentData = commentData.find( (item) => item.id == newCommentId);
        const newCommentElement = generateCommentElement(myName, newCommentData, null);
        commentSection.innerHTML += newCommentElement;
        filterMyComment();

        let targetPos = document.querySelector('body').offsetHeight;
        window.scrollTo({top: targetPos, behavior: 'smooth'});
        // ref - scroll-behavior : https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
    }, 200);
    
};


export function translateNewLineIntoBr(value) {
    return value.replace(/\n/g, `<br>`);
}


export function createNewCommentInput(label, id) {
    //let commentInputElement = document.createElement('div');
    //commentInputElement.classList = 'input-form set-flex';
    let commentInputElement = `
    <div class="input-form temp set-flex" id="${id}">
        <img src="./images/avatars/image-juliusomo.png"/>
        <form class="set-flex">
        <textarea id="comment" placeholder="Add a comment..." rows="2" cols="20" wrap="hard"></textarea>
        <button type="submit" disabled="disabled">${label}</button>
        </form>
    </div>
    `;

    return commentInputElement;
}