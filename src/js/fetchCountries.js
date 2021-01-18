// Есть файл fetchCountries.js с дефолтным экспортом функции fetchCountries(searchQuery),
// возвращающей промис с массивом стран, результат запроса к API.

// Функция делает запрос на Rest Countries API.
// Если по запросу ничего не было найдено(ошибка 404), возвращает ошибку.
// Если статус запроса успешен, то данные преобразовываются в json формат, а потом в массив объектов.
export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response.status);
      }
    })
    .then(data => data);
}