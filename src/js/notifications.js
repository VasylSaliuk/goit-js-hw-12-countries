import { notice, error } from "@pnotify/core/dist/PNotify.js";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { defaults } from "@pnotify/core";
defaults.sticker = false;
defaults.closer = false;
defaults.delay = 2000;

function errorMsg() {
  notice({
    text: "Too many matches found. Please enter a more specific query!",
  });
}

function notFound() {
  error({
    text: "Not Found. Please enter a more correct query!",
  });
}

export default { errorMsg, notFound };
