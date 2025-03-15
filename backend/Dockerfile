# Node.js 이미지 사용
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사 후 패키지 설치
COPY package.json package-lock.json ./
RUN npm install

# 백엔드 코드 복사
COPY . .

# 서버 실행
CMD ["node", "backend.js"]
