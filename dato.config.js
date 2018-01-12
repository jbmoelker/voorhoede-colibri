const markdownToHtml = require('./lib/markdown-to-html')
const listHeadings = require('./lib/list-headings')

const languages = ['nl', 'en']

module.exports = (dato, root, i18n) => {
  root.createDataFile('data/home.json', 'json', itemToJsonI18n(dato.home, i18n))
  root.createDataFile('data/work.json', 'json', itemToJsonI18n(dato.work, i18n))
  root.createDataFile('data/projects.json', 'json', itemsToJsonI18n(dato.projects, i18n))
  root.createDataFile('data/blog.json', 'json', itemToJson(dato.blog))
  root.createDataFile('data/posts.json', 'json', itemsToJson(dato.blogPosts))
  root.createDataFile('data/team.json', 'json', itemToJsonI18n(dato.team, i18n))
  root.createDataFile('data/contact.json', 'json', itemToJsonI18n(dato.contact, i18n))
}

function itemsToJsonI18n (items, i18n) {
  return languages.reduce((itemsI18n, language) => {
    i18n.locale = language
    itemsI18n[language] = itemsToJson(items)
    return itemsI18n
  }, {})
}

function itemsToJson (items) {
  return items.map(itemToJson)
}

function itemToJsonI18n (item, i18n) {
  return languages.reduce((itemI18n, language) => {
    i18n.locale = language
    itemI18n[language] = itemToJson(item)
    // if (itemI18n[language].slug) {
    //   itemI18n[language].slugI18n = languages.reduce((slugI18n, language) => {
    //     slugI18n[language] = i18n.withLocale(language, () => item.slug)
		// 	}, {})
    // }
    return itemI18n
  }, {})
}

function itemToJson (item) {
  const itemJson = item.toMap()
  itemJson.body = markdownToHtml(item.body)
  itemJson.navItems = listHeadings(itemJson.body)
  return removeSeoMetaTags(itemJson)
}

function removeSeoMetaTags (item) {
  if (item && item.seoMetaTags) {
    delete item.seoMetaTags
  }
  if (typeof item === 'object') {
    Object.keys(item).forEach(key => {
      if (Array.isArray(item[key])) {
        item[key].forEach(removeSeoMetaTags)
      } else if (item[key] && typeof item[key] === 'object') {
        removeSeoMetaTags(item[key])
      }
    })
  }
  return item
}
