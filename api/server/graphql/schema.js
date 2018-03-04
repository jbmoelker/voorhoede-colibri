const dataLoader = require('../data-loader')
const {
  graphql,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLUnionType,
} = require('graphql')

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
        slug: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_, args) => dataLoader.load('posts')
        .then(posts => posts.find(item => item.slug === args.slug))
      ,
    },
  },
})

const schema = new GraphQLSchema({
  query: queryType,
})

module.exports = schema
