const loadAll = true;
const defaultLanguage = 'en';
const otherLang = ['cn', 'kr', 'vi'];

const supportLanguage = [defaultLanguage, ...otherLang];

const defaultAndActive = [defaultLanguage, 'active'];
export default { supportLanguage, defaultLanguage, loadAll, defaultAndActive, otherLang };
