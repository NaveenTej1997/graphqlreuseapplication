const { GraphQLServer } =  require('graphql-yoga')
const knex = require('knex')({
        client: 'mysql',
        connection: {
          host : 'localhost',
          user : 'root',
          password : 'naveen',
          database : 'employeedb'
        }
      });

      const typeDefs=`

      type Book{
              id:ID!,
              name:String!,
              genre:String!
              authorname:String!
             author:Author
             
      }
      type Author{
              id:ID!,
              name:String!
              age:Int!
              books: [Book!]!
      }
      type Query{
              books:[Book],
              book(id:ID!):Book,
              authors:[Author],
              author(id:ID!):Author
      }
      type Mutation{
              createBook(name:String!,
                genre:String!,authorname:String!):Book
                

                createAuthor(name:String!,age:Int!):Author

                deleteBook(id: ID!) : Boolean

                deleteAuthor(id: ID!) : Boolean

                updateBook(id:ID!,name:String,genre: String,authorname:String): Boolean

                updateAuthor(id:ID!,name:String,authorname:String): Boolean
      }
       `
       const resolvers={
               Query:{
                books:()=>knex("books").select("*"),
                book: async(_,{id})=>{return await knex("books").where({id}).first().select("*")},
               authors:()=>knex("authors").select("*"),
               author:async(_,{id})=>{return await knex("authors").where({id}).first().select("*")},
               },

               Book: {
                author: root => {
                  return Author.findOne({ bookIds: root.id });
                }
              },

              Author: {
                books: root => {
                  return knex("books")
                    .whereIn("id", root.bookIds)
                    .select("*");
                }
            },


        
       Mutation:{
                createBook:async(_,{name,genre,authorname})=>{
                        const [book] = await knex("books")
                .returning("*")
                .insert({ name, genre,authorname});
            return book;
                },
                
                
                createAuthor:async(_,{name,age})=>{
                        const [author] = await knex("authors")
                .returning("*")
                .insert({ name,age});
            return author;
                },
                deleteBook: async(_,{id}) => {
                        const isDeleted = await knex("books")
                          .where({id})
                          .del();
                        return isDeleted;
                      },
                      deleteAuthor: async(_, {id}) => {
                        
                         const isDeleted= await knex("authors")
                          .where({id})
                          .del();
                          return isDeleted
                        
                      },
                      updateBook: async(_,{id,name, genre,authorname}) => {
                        return (
                          await knex("books")
                          .where({id})
                          .update({name,genre,authorname})
                        );
                      },
                      updateAuthor: async(_,{id,name,age}) => {
                        return (
                          await knex("authors")
                          .where({id})
                          .update({name,age})
                        );
                      }
        }

   }
   const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))


