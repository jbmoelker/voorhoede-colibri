// todo: dedupe this file and src/routes/_core/api.js
//import axios from 'axios'

const baseUrl = 'http://localhost:2473/api'

function fetchJson(request) {
  //return axios.get(`${baseUrl}${request}`).then(response => response.data)
  return fetch(`${baseUrl}${request}`).then(response => response.json())
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

function requestQuery(query) {
  return fetch(`http://localhost:2473/graphql`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: null }),
  })
  .then(response => response.json())
  .then(json => json.data)
}

export default { fetchJson, getItem, getItems, getPage, requestQuery }
