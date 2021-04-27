const { ApolloServer, gql } = require('apollo-server');

const users = [
	{
		name: 'Alex gadaix',
		email: 'alex@alex.com',
		projects: [
			{
				title: 'site upgrade - summer 2021',
			},
		],
	},
	{
		name: 'Aristote',
		author: 'aristote@aristote.com',
		projects: [
			{
				title: 'API upgrade - summer 2021',
			},
			{
				title: 'site upgrade - summer 2021',
			},
		],
	},
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
	# This "Book" type defines the queryable fields for every book in our data source.
	type User {
		name: String
		email: String
		projects: [Project]
	}

	type Project {
		title: String
		active: Boolean
		members: [User]
	}

	# The "Query" type is special: it lists all of the available queries that
	# clients can execute, along with the return type for each. In this
	# case, the "books" query returns an array of zero or more Books (defined above).
	type Query {
		users: [User]
	}
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
	Query: {
		users: () => users,
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Server listening at ${url}`);
});
