
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { execute, subscribe } from 'graphql';
import { useServer } from 'graphql-ws/lib/use/ws';
import express from "express"
import http from "http"
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws'
import cookieParser from "cookie-parser"
import cors from "cors"
import { typeDefs } from "./graphSchema"
import { resolvers } from "./routes/userResolvers"
import authMiddleware from "./middlewarres/authMiddleware";
const corsConfig = {
  credentials: true,
  origin: "http://localhost:3000",
}

async function startApolloServer(typeDefs: any, resolvers: any) {

  const app = express();
  app.use(cors(corsConfig))
  app.use(cookieParser());
  app.set("Access-Control-Allow-Credentials", true);
app.use(authMiddleware)


  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    context: ({ req, res, next }: any) => ({ req, res }),

  });

  const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:3000"
    }
  })

  io.on("connection", (socket: any) => {
    console.log("New user is connect")


    socket.on("Registered", (data: string) => {
      console.log(data);

      console.log("USER REGISTERED")
      io.emit("NewUserRegistered", data)

    })
    socket.on("disconnect", (id: string) => {
      console.log("disconnected")
    })
  })



  await server.start();
  server.applyMiddleware({
    app, cors: {
      credentials: true,
      origin: "http://localhost:3000",
      exposedHeaders: ["Set-Cookie", "connection"]
    }
  })
  //
  httpServer.listen(5000, () => console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`));


}
startApolloServer(typeDefs, resolvers)

//