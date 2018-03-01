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

// const BodyItemType = new GraphQLObjectType({
//   name: 'BodyItem',
//   description: '',
//   fields: {

//   }
// })

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
    //bodyItems: { type: new GraphQLList(...) },
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
