import Language from 'lang';
import { renderToStaticMarkup } from 'react-dom/server';
import { initialize, addTranslationForLanguage } from 'react-localize-redux';

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  // eslint-disable-next-line no-useless-escape
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// 这里面的import是异步的
export function initLanguage(store) {
  let languagePack, packName;
  try {
    packName = getParameterByName('lang');
    if (!packName) {
      packName = Language.defaultLanguage;
    }
    languagePack = getLanguage(packName);
  } catch (e) {
    console.log(e);
    packName = Language.defaultLanguage;
    languagePack = getLanguage(packName);
  }

  store.dispatch(
    initialize({
      languages: [
        { name: 'English', code: 'en' },
        { name: 'Chinese', code: 'cn' },
      ],
      options: {
        renderToStaticMarkup,
        missingTranslationCallback: () => {
          console.log(111);
        },
        defaultLanguage: packName,
      },
    }),
  );

  languagePack.then(data => {
    store.dispatch(addTranslationForLanguage(data, packName));
  });
}

export function getLanguage(key) {
  return import('lang/' + key + '.json');
}

export function setLanguage(packName, dispatch) {
  const languagePack = getLanguage(packName);
  languagePack.then(data => {
    dispatch(addTranslationForLanguage(data, packName));
  });
}
