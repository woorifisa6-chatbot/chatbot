# 🤖 Chatbot Practice 🤖

-------------------------

<img width="300" height="700" alt="Image" src="https://github.com/user-attachments/assets/b14cfcf9-08d2-41c1-9b45-298d9c6df791" />
<img width="300" height="700" alt="Image" src="https://github.com/user-attachments/assets/1a505488-58ad-4691-b423-f3789c5d91a0" />

금융 지식 습득을 위한 경제 금융 언어 개념 안내 챗봇

금융 관련 지식이 없는 학습 대상자들을 상대로 **Clova chatbot API**를 활용한 문답형 챗봇 제작


## ✏️ OverView

-------------------------

### Tech Stack
![html](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)

### Tool & Environments
![vscode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### 👥 Members
| 이혜윤 | 박재하 | 조우재 | 김지민 |
|:------:|:------:|:------:|:------:|
| <img src="https://avatars.githubusercontent.com/u/109073947?s=48&v=4" alt="이혜윤" width="100"> | <img src="https://avatars.githubusercontent.com/u/127723000?s=48&v=4" alt="박재하" width="100"> | <img src="https://avatars.githubusercontent.com/u/63555689?s=48&v=4" alt="조우재" width="100"> | <img src="https://avatars.githubusercontent.com/u/108601006?v=4" alt="김지민" width="100"> |
| [GitHub](https://github.com/hyeyoon23/Portfolio.git) | [GitHub](https://github.com/jaepar/jaepar.github.io) | [GitHub](https://github.com/Jo-dv/Jo-dv.github.io) | [GitHub](https://github.com/realjimin/realjimin.git) |

## ✏️ How to run

-------------------------

```
git clone https://github.com/woorifisa6-chatbot/chatbot.git
npm start
```

## ✏️Structure

-------------------------

```plaintext
chatbot-main/  
├─── assets/
    ├─── original.svg   # 우리은행 로고
    └─── signature.svg  # 위비캐릭터
├─── app.js         # 애플리케이션 컴포넌트
├─── index.html     # HTML 템플릿 파일
├─── style.css      # 전역 css 파일
├─── server.js              # 서버
├─── .gitignore             # Git 무시 파일 목록
├─── package.json           # 프로젝트 종속성 및 스크립트 정의
├─── package-lock.json      # 정확한 종속성 버전이 기록된 파일
├─── (.env)                 # port 및 키 정보(사용자 개별 작성 필요)
└─── README.md              # 프로젝트 개요 및 사용 방법
```

## ✏️Key features

-------------------------

- **질문 입력란**
    - 알고자 하는 금융 개념에 대한 질문 작성란

- **메시지 전송**
    - 질문한 입력을 Clova chatbot로 전송하는 버튼

- **채팅 화면**
    - 질문에 대한 답변을 화면에 채팅 메시지로 표시
      
 
**하단의 질문 입력란에 질문 입력 -> 우측 하단의 메시지 전송 버튼 클릭 -> 질문에 대한 답변이 메신저 형태로 게재**

## 🎇State
Implementing a simple chat using Clova Chatbot (ver 1)
