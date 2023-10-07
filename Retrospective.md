# 엘리스 SW7기 스터디 1주차 요약
1차 스터디 6팀 - 프론트엔드 프로젝트 스터디 1주차에서는 frontend mentor 사이트의 [Interactive Comment Section](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9) 프로젝트 구현을 진행했습니다.

## 스터디 진행 방식
 
- Github의 Organization에 각자 repository 생성
- Frontend Mentor 챌린지 페이지에서 제공하는 기본 리소스를 다운받아 소스 코드 작성
- 별도 Branch 생성 후 Pull Request 단위로 Merge
- 다른 팀원들의 작업한 PR을 리뷰하고 코멘트 남기기

## 사용 스택
HTML, CSS, Vanilla JS

## 프로젝트 결과물

![코멘트 및 댓글 작성](https://user-images.githubusercontent.com/6611105/272307373-a11ebe26-f169-447b-8762-999cf2b55356.gif)
- Github Repository : https://github.com/elice-study-first/interactive-comments-jihoon
  
## 주요 구현 내용

### 구현 완료
- 제공되는 data.json을 Parsing하여 화면을 Rendering 하는 기능 구현
  - window.onload 메소드를 사용하여 페이지 로드 완료 시 parsing된 데이터를 그려줌
- 화면 하단 코멘트 입력 필드를 통해 새로운 코멘트를 등록하고 화면에 추가하는 기능 구현
  - 입력 필드는 textarea 태그를 사용하여 여러 줄을 입력 가능토록 함
  - keyup 이벤트 발생 시 마다 value를 체크하여 submit 버튼에 대한 비활성화 처리
- 이미 등록된 코멘트와 댓글에도 새로운 댓글을 입력하고 등록하는 기능 구현
  - replyingTo 키 값을 활용하여 댓글을 등록할 대상의 위치를 파악하여 data에 추가하고, 해당 아이템을 화면에도 추가
- App의 사용성을 높이기 위한 Loading Spinner 추가, 코멘트/댓글 등록 시 해당 아이템의 위치로 이동하는 Scroll Event 구현

### 구현 예정
- [ ] 코멘트 / 댓글 내용 수정, 삭제 기능 구현
- [ ] 삭제 시도 시 Confirm modal 동작 구현
- [ ] 코멘트 / 댓글에 Vote up/down 기능 구현
- [ ] 로컬 스토리지를 활용해 변경된 데이터 저장하기


## 1주차 회고 

### 느낀 점
- 기존 수업과 병행하며 프로젝트를 같이 진행하다보니 예상보다 시간이 더 걸린다는 걸 깨달음
- 작업 진행 시 작업 순서나 우선순위를 잡고 진행을 했지만, 작업 진행하면서 발견하게되는 이슈들을 그때 그때 처리하느라 더 오래걸린 듯 함 (e.g. 스크롤 이벤트 처리, 버튼 활성-비활성 처리, 입력된 줄바꿈 적용 처리, 디자인 다듬기 등)
- README.md 파일이나 스타일 가이드, 주석, 구현 로직 설계에 대한 문서화 등 코드를 리뷰하는 분들이 미리 코드에 대해 이해할 수 있는 문서들이 필요하다는 걸 느낌
### 개선할 점
- (개인) 새로운 프로젝트 시작 전에 프로젝트에서 어떤 부분까지 필수로 구현할 지 스터디원 끼리 미리 생각해보고 합의한 후에 진행한다면 작업 시간을 어느 정도 맞출 수 있을거라 예상합니다.
- (개인) 이번에는 깃헙 프로젝트를 활용하지 못했는데, 새로운 프로젝트 진행 시 이슈들을 사용자 스토리 형태로 직접 만들어 기능 구현을 진행해보면 좋을 것 같네요. ([참고 링크](https://www.codestates.com/blog/content/prd-%EC%A0%9C%ED%92%88%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD%EC%A0%95%EC%9D%98%EC%84%9C))
- (개인, 스터디 진행 의견) 이번 프로젝트에서는 구현 시간만 3일 정도를 진행했는데, 다음 부터는 구현 시간 외에 별도로 시간을 정해서 코드를 더 이해하기 쉽도록 하는 주석이나 가이드 문서를 작성하는 시간도 따로 있다면 더 좋을 것 같아요.
- (스터디 진행 의견) 번외로 이번 프로젝트 진행할 때는 시작일과 리뷰 시작일에만 디스코드 채널에서 논의가 이루어졌는데 다음 프로젝트 부터는 ‘구현 일정에는 하루에 최소 한 번은 PR을 merge 한다’ 같은 제약을 두고 진행하면 완성도를 좀 더 높일 수 있을 것 같아요.
  
### 팀원 들의 코드를 통해 배운 점
- 템플릿 리터럴 구문 내부 변수 처리 구간 안에서도 삼항 연산자 사용이 가능하다.
  - ``` ${조건 ? true일 때 : false일 때}```
- 일반 css 파일 내에서 전처리기(pre-processor) 사용 없이 nesting이 가능하다. (scss 처럼)
  - ``` input { border-color: #EEE; &:hover { border-color: #333;} }```
- Desktop/Mobile 환경에서 하나의 html 구조를 사용하려 하는 경우, grid가 유리하다.
  - ``` display:grid; ```
- 함수 파라미터 선언 시 값을 즉시 할당하는 것이 가능하다.
  - ```function sample(value = 0) {}```