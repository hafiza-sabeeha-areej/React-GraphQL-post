const graphql = require("graphql");
const User = require("../models/user");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
  },
});
//Now We are going to Add Mutation to add Data
const Mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addUser:{
            type:UserType,
            args:{
                name:{ type: GraphQLString },
                age:{ type: GraphQLInt }
            },
            resolve(parent,args){
                let user=new User({
                    name:args.name,
                    age:args.age,
                })
                return user.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:Mutation
});
