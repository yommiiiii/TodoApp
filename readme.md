# 📝 To-Do List Web App

**To-Do List Web App**은 사용자가 날짜별로 할 일을 추가, 수정, 삭제할 수 있는 웹 애플리케이션입니다.  
Node.js(Express)와 MySQL을 사용하여 백엔드를 구축하고, HTML과 JavaScript를 이용하여 프론트엔드를 개발하였습니다.  
Docker를 활용하여 개발 환경을 컨테이너화하여 배포할 수 있습니다.  


## 🚀 **프로젝트 개요**
- 사용자가 **날짜를 선택**하여 해당 날짜의 To-Do 리스트를 조회
- **새로운 할 일 추가 및 완료 체크** 기능 제공
- **매일 해야 하는 일, 메모, 리마인더** 기능 추가
- **백엔드 (Node.js + Express)와 MySQL 데이터베이스** 연동
- Docker를 활용하여 **컨테이너 기반 실행** 지원


## 📂 **프로젝트 구조**
📁 TodoApp
│── 📁 backend          # 백엔드 (Node.js, Express, Sequelize)
│   ├── backend.js      # Express 서버 및 MySQL 연동
│   ├── Dockerfile      # 백엔드 Docker 설정
│   ├── package.json    # Node.js 종속성 관리
│
│── 📁 frontend         # 프론트엔드 (HTML, JavaScript)
│   ├── index.html      # To-Do 리스트 UI
│   ├── script.js       # 프론트엔드 로직
│
│── docker-compose.yml  # 전체 애플리케이션 도커 설정
│── README.md           # 프로젝트 설명 파일


## 🛠 **사용된 기술 스택**
### 🔹 프론트엔드
- **HTML, CSS, JavaScript**
- Fetch API (백엔드와 데이터 통신)

### 🔹 백엔드
- **Node.js + Express**
- **Sequelize ORM** (MySQL 데이터베이스 연동)

### 🔹 데이터베이스
- **MySQL**
- Docker를 이용한 **MySQL 컨테이너 실행**

### 🔹 배포 및 실행 환경
- **Docker + Docker Compose**
- **GitHub** (버전 관리)



## 🔧 **설치 및 실행 방법**
### **1️⃣ 프로젝트 클론**
git clone https://github.com/사용자명/TodoApp.git
cd TodoApp

### **2️⃣ 백엔드 패키지 설치**
cd backend
npm install

### **3️⃣ Docker로 전체 애플리케이션 실행**
docker-compose up -d --build

### **4️⃣ 실행 확인**
프론트엔드: http://127.0.0.1:5500/frontend/index.html
백엔드 API: http://localhost:3000/todos


