const { ApolloServer, UserInputError, gql } = require('apollo-server')


const authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky',
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz',
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]


const books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const count = () => {
    const arr = [];
    for(const i of authors) {
        let booksCount = 0;

        for(const j of books) {
            if(i.name === j.author) {
                booksCount += 1;
            }
        }

        arr.push({
            name: i.name,
            bookCount: booksCount
        })
    }
    return arr;
}


const typeDefs = gql`
    type Mutation {
        addBook(
            title: String!,
            author: String!,
            published: Int!,
            genres: [String]!
        ): Book!,

        editAuthor(
            name: String!,
            setBornTo: Int!
        ): Author
    }

    type Author {
        name: String!,
        bookCount: Int!,
        born: Int
    },

    type Book {
        title: String!,
        author: String!,
        published: Int!,
        genres: [String]!
    },

    type Query {
        booksCount: Int!,
        authorCount: Int!,
        allBooks(author: String, genre: String): [Book]!,
        allAuthors: [Author!]!
    },
`

// Filtering data with both: author and genre args
const filterData = (data) => {
    const arr = [], args = Object.keys(data);

    if(args.length === 1) {
        if(args[0] === 'author') {
            return books.filter(book => book.author === data.author);
        } else if (args[0] === 'genre') {
            return books.filter(book => book.genres.includes(data.genre));
        }
    } else {  // If both arg is provided, then filter the data with both of them
        for(let i = 0; i < books.length; i++) {
            if(data.author === books[i].author) {
                for(let j = 0; j < books[i].genres.length; j++) {
                    if(data.genre === books[i].genres[j]) {
                        arr.push(books[i]);
                    }
                }
            }
        }
    }
    return arr;
}

const resolvers = {
    Query: {
        booksCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => filterData(args),
        allAuthors: () => count()
    },

    Mutation: {
        addBook: (root, args) => {
            books.push(args);
            return books;
        },

        editAuthor: (root, args) => {
            try {
                for(const i of authors) {
                    if(i.name === args.name) {
                        i.born === args.setBornTo;
                        return authors;
                    }
                }
            } catch(error) {
                throw new UserInputError("Author with this name doesn't exist in the db", {
                    invalidArgs: args.name
                })
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
