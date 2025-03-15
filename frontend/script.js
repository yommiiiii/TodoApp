document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todo-list");
    const datePicker = document.getElementById("date-picker");

    // 날짜 변경 시 해당 날짜의 할 일 목록 불러오기
    datePicker.addEventListener("change", fetchTodos);

    async function fetchTodos() {
        const selectedDate = datePicker.value;
        if (!selectedDate) return;

        try {
            const response = await fetch(`http://localhost:3000/todos?date=${selectedDate}`);
            const todos = await response.json();
            renderTodos(todos);
        } catch (error) {
            console.error("할 일 목록을 불러오는 중 오류 발생:", error);
        }
    }

    function renderTodos(todos) {
        todoList.innerHTML = "";
        todos.forEach(todo => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? "checked" : ""} data-id="${todo.id}">
                <input type="text" value="${todo.task}" data-id="${todo.id}">
                <button class="delete-btn" data-id="${todo.id}">X</button>
            `;
            todoList.appendChild(li);
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", deleteTodo);
        });

        document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
            checkbox.addEventListener("change", updateTodoStatus);
        });
    }

    // 새로운 할 일 추가
    document.getElementById("add-todo").addEventListener("click", async function () {
        const selectedDate = datePicker.value;
        if (!selectedDate) return alert("날짜를 선택하세요.");

        const newTodo = { date: selectedDate, task: "새로운 할 일" };
        const response = await fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo)
        });

        if (response.ok) fetchTodos();
    });

    // 할 일 완료 상태 업데이트
    async function updateTodoStatus(event) {
        const id = event.target.dataset.id;
        const completed = event.target.checked;
        await fetch(`http://localhost:3000/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed })
        });
    }

    // 할 일 삭제
    async function deleteTodo(event) {
        const id = event.target.dataset.id;
        await fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" });
        fetchTodos();
    }
});
