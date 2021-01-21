import refs from "./refs.js";
import countriesListTpl from "../templates/countries-list.hbs";
import oneCountryTpl from "../templates/one-country.hbs";
import debounce from "lodash.debounce";
import ShowErrorMsg from "./notifications.js";
import fetchCountries from "./fetchCountries.js";

// Добавляем слушатель события на элемент ввода запроса.
refs.inputRef.addEventListener("input", debounce(onSearch, 500));

function onSearch() {
  const searchQuery = getSearchQuery();
  if (!searchQuery) {
    return;
  }
  refs.inputRef.value = "";

  // Отправляем запрос на Rest Countries API и обрабатываем результат запроса.
  fetchCountries(searchQuery)
    .then((data) => {
      // Очищаем содержимое элемента, куда встраивается результат запроса.
      refs.containerRef.innerHTML = "";
      // Если пришло в ответ больше 10 элементов, показыает уведомление с просьбой о более конкретном запросе.
      if (data.length > 10) {
        ShowErrorMsg.errorMsg();
      } // Если пришло от 2 до 10 элементов, рендерим их списком.
      else if (data.length > 1 && data.length <= 10) {
        renderCountriesList(data);
      } // Если нашлось только одно совпадение, рендерим карточку с информацией о стране.
      else {
        renderCountryCard(data);
      }
    })
    .catch(onFetchError);
}

// Функция, которая получает запрос, введенный в инпут.
function getSearchQuery() {
  return refs.inputRef.value;
}

// Функция, которая рендерит карточку для одной страны.
function renderCountryCard(data) {
  const oneCountryMarkup = oneCountryTpl(data);
  refs.containerRef.insertAdjacentHTML("beforeend", oneCountryMarkup);
}

// Функция, которая рендерит список стран.
function renderCountriesList(data) {
  const countriesListMarkup = countriesListTpl(data);
  refs.containerRef.insertAdjacentHTML("beforeend", countriesListMarkup);
}

//Функция, которая отлавливает ошибки
function onFetchError() {
  ShowErrorMsg.notFound();
}
