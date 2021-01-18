// Получение доступов к элементу инпута и к ul, в который будет встраиваться успешный результат поиска.
const inputRef = document.querySelector('[data-query="search"]');
const containerRef = document.querySelector('.countries-list');

export default { inputRef, containerRef };