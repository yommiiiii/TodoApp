const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// MySQL 연결 설정
const sequelize = new Sequelize('todo_db', 'root', 'root', {
    host: 'db', // Docker 컨테이너 환경에서는 'db' 사용
    dialect: 'mysql'
});

// 데이터베이스 연결 확인
sequelize.authenticate()
    .then(() => console.log('MySQL 연결 성공'))
    .catch(err => console.error('MySQL 연결 실패:', err));

// To-Do 모델 정의
const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'todos',
    timestamps: false
});

// 데이터베이스 동기화
sequelize.sync()
    .then(() => console.log('데이터베이스 동기화 완료'))
    .catch(err => console.error('데이터베이스 동기화 실패:', err));

// API 엔드포인트

// 특정 날짜의 To-Do 조회
app.get('/todos', async (req, res) => {
    try {
        const { date } = req.query;
        const todos = await Todo.findAll({ where: { date } });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: '할 일 목록을 불러오는 데 실패했습니다.' });
    }
});

// 새로운 To-Do 추가
app.post('/todos', async (req, res) => {
    try {
        const { date, task } = req.body;
        const newTodo = await Todo.create({ date, task });
        res.json(newTodo);
    } catch (error) {
        res.status(500).json({ error: '할 일 추가에 실패했습니다.' });
    }
});

// To-Do 완료 상태 변경
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        await Todo.update({ completed }, { where: { id } });
        res.json({ message: '업데이트 완료' });
    } catch (error) {
        res.status(500).json({ error: '할 일 업데이트에 실패했습니다.' });
    }
});

// To-Do 삭제
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.destroy({ where: { id } });
        res.json({ message: '삭제 완료' });
    } catch (error) {
        res.status(500).json({ error: '할 일 삭제에 실패했습니다.' });
    }
});

// 서버 실행
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
