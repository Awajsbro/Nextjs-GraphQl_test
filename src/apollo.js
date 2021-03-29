import { ApolloClient, InMemoryCache } from "@apollo/client"
import { useMemo } from "react"

let apolloClient

function createIsomorphicLink() {
    if (typeof window === "undefined") {
        // server
        const { SchemaLink } = require("@apollo/client/link/schema")
        const { schema } = require("./shema")
        return new SchemaLink({ schema })
    } else {
        // client 
        const { HttpLink } = require("@apollo/client/link/http")
        return new HttpLink({ uri: "/api/graphql" })
    }
}

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: createIsomorphicLink(),
        cache: new InMemoryCache({
            addTypename: false
        }),
    })
}

export function intializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient()

    if (initialState) {
        _apolloClient.cache.restore(initialState)
    }

    if (typeof window === "undefined")
        return _apolloClient

    apolloClient = apolloClient ?? _apolloClient

    return apolloClient
}

export function useApollo(initialState) {
    const store = useMemo(() => intializeApollo(initialState), [initialState])
    return store
}