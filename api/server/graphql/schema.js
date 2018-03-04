const dataLoader = require('../data-loader')
const {
  graphql,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLUnionType,
} = require('graphql')

const LanguageType = new GraphQLEnumType({
  name: 'Language',
  values: {
    en: { value: "en" },
    nl: { value: "nl" },
  }
})

const ImageType = new GraphQLObjectType({
  name: 'Image',
  description: '',
  fields: {
    format: { type: GraphQLString },
    size: { type: GraphQLInt },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    title: { type: GraphQLString },
    alt: { type: GraphQLString },
    url: { type: GraphQLString },
  }
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: '',
  fields: {
    image: { type: ImageType },
    slug: { type: GraphQLString },
    lastName: { type: GraphQLString },
    name: { type: GraphQLString }
  }
})

const BlogType = new GraphQLObjectType({
  name: 'Blog',
  description: '',
  fields: {
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    description: { type: GraphQLString },
    keywords: { type: GraphQLString },
  }
})

const HtmlItemType = new GraphQLObjectType({
    name: 'HtmlItem',
    description: '',
    fields: {
      type: { type: GraphQLString },
      html: { type: GraphQLString },
    }
})

const ImageItemType = new GraphQLObjectType({
  name: 'ImageItem',
  description: '',
  fields: {
    type: { type: GraphQLString },
    alt: { type: GraphQLString },
    title: { type: GraphQLString },
    src: { type: GraphQLString },
    format: { type: GraphQLString },
    height: { type: GraphQLInt },
    width: { type: GraphQLInt },
  }
})

const BodyItemType = new GraphQLUnionType({
  name: 'BodyItem',
  description: '',
  types: [HtmlItemType, ImageItemType],
  resolveType(value) {
    if (value.type === 'html') {
      return HtmlItemType;
    }
    if (value.type === 'image') {
      return ImageItemType;
    }
  }
})

const SocialType = new GraphQLObjectType({
  name: 'Social',
  description: '',
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: ImageType },
  }
})

const NavItemType = new GraphQLObjectType({
  name: 'NavItem',
  description: '',
  fields: {
    id: { type: GraphQLString },
    html: { type: GraphQLString },
    level: { type: GraphQLInt },
  }
})

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: '',
  fields: {
    body: { type: GraphQLString },
    bodyItems: { type: new GraphQLList(BodyItemType) },
    images: { type: new GraphQLList(ImageType) },
    teaser: { type: GraphQLString },
    authors: { type: new GraphQLList(AuthorType) },
    social: { type: SocialType },
    publishDate: { type: GraphQLString },
    published: { type: GraphQLBoolean },
    slug: { type: GraphQLString },
    title: { type: GraphQLString },
    navItems: { type: new GraphQLList(NavItemType) },
  }
})


const ProjectType = new GraphQLObjectType({
  name: 'Project',
  description: '',
  fields: {
    body: { type: GraphQLString },
    bodyItems: { type: new GraphQLList(BodyItemType) },
    images: { type: new GraphQLList(ImageType) },
    social: { type: SocialType },
    published: { type: GraphQLBoolean },
    slug: { type: GraphQLString },
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    excerpt: { type: GraphQLString },
    navItems: { type: new GraphQLList(NavItemType) },
    isExternalLink: { type: GraphQLBoolean },
    linkText: { type: GraphQLString },
    linkUrl: { type: GraphQLString },
    // contact: { type: ... },
    // service: { type: ... },
    // summary: { type: ... },
    // techniques: { type: ... },
  }
})

const queryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    blog: {
      type: BlogType,
      resolve: (_, args) => dataLoader.load('blog')
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (_, args) => dataLoader.load('posts')
    },
    post: {
      type: PostType,
      args: {
        slug: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => dataLoader.load('posts')
        .then(items => items.find(item => item.slug === args.slug))
      ,
    },
    projects: {
      type: new GraphQLList(ProjectType),
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
      },
      resolve: (_, args) => dataLoader.load('projects')
        .then(itemsI18n => itemsI18n[args.language])
    },
    project: {
      type: ProjectType,
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
        slug: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => dataLoader.load('projects')
        .then(itemsI18n => itemsI18n[args.language])
        .then(items => items.find(item => item.slug === args.slug))
      ,
    },
  },
})

const schema = new GraphQLSchema({
  query: queryType,
})

module.exports = schema
