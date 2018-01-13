function fetchJson(request) {
  return fetch(`/api${request}`).then(response => response.json())
}

function getItem({ collection, slug, language, fields }) {
  return fetchJson(`/${collection}/${slug}?language=${language}&fields=${fields.join(',')}`)
}

function getItems({ collection, language, fields, limit }) {
  return fetchJson(`/${collection}?language=${language}&fields=${fields.join(',')}&limit=${limit}`)
}

function getPage({ name, language }) {
  return fetchJson(`/${name}?language=${language}`)
}

export default { fetchJson, getItem, getItems, getPage }
