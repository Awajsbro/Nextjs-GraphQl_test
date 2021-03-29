import { ApolloServer } from "apollo-server-micro"
import { schema } from "../../src/shema"

const server = new ApolloServer({
  schema,
  context(ctx) {
    return ctx
  }
})
const handler = server.createHandler({ path: "/api/graphql" })

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler