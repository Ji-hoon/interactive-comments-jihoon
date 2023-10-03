import {
    commentData,
    myName,
    commentSection,
    reloadData
    } from '../index.js';

export const createCommentForm = document.querySelector('#comment-input .input-form form');
createCommentForm.addEventListener('submit', createComment);

export const createCommentButton = document.querySelector('#comment-input .input-form button[type="submit"]');
export const createCommentField = document.querySelector('#comment-input .input-form textarea');
createCommentField.addEventListener('keyup', (e) => {
    //console.log(e.target.value.length);
    if(e.target.value.length>0) createCommentButton.removeAttribute('disabled');
    else createCommentButton.setAttribute('disabled','disabled');
});

export function createComment (e) {
    e.preventDefault();
    //console.log(e); // e.target[0].value : 12\n123\n12\n321
    // ref - textarea 있는 그대로 출력하기 : https://oneshottenkill.tistory.com/320

    commentData.push({
          "id": commentSection.children.length+2,
          "content": translateNewLineIntoBr(e.target[0].value),
          "createdAt": "now",
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
    
    e.target[0].value = "";
    createCommentButton.setAttribute('disabled','disabled');
    
    reloadData();
};


export function translateNewLineIntoBr(value) {
    return value.replace(/\n/g, `<br>`);
}