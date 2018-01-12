function link({
  $language,
  $section,
  $slug,
  language = $language,
  section = $section,
  slug = $slug
}) {
  if (section === 'blog') {
    return `/${language}`
  }
  return `/${ [language, section, slug].filter(Boolean).join('/') }`
}

export default {
  link
}
