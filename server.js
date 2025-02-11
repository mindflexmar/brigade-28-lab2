const express = require('express');
const app = express();
const path = require('path');

// Налаштування шаблонізатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Налаштування папки для статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Головна сторінка (статична)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Динамічна сторінка студента
app.get('/student/:name', (req, res) => {
    const students = {
        'kostya': { name: 'Костя Ткачов', role: 'Програміст' },
        'maria': { name: 'Марія Зозуля', role: 'Дизайнер' },
        'bogdan': { name: 'Коваленко Богдан', role: 'Тестувальник' }
    };

    const student = students[req.params.name.toLowerCase()];

    if (student) {
        res.render('student', { student });
    } else {
        res.send('<h1>Студента не знайдено</h1>');
    }
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
