import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema/typeDefs';
import trackResolvers from './resolvers/trackResolvers';

const server = new ApolloServer({
    typeDefs,
    resolvers: trackResolvers,
});


async function startServer() {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 }, 
    });
    console.log(`Server running at ${url}`);
}

startServer();
