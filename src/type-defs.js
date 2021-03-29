import { gql } from '@apollo/client'

export const typeDefs = gql`
    type Task {
        id: ID!
        title: String!
        description: String
    }
    input TaskInput {
        title: String!
        description: String
    }              
    type User {
        id: ID!
        email: String!
        createdAt: Int!
    }
    input SignUpInput {
        email: String!
        password: String!
    }
    input SignInInput {
        email: String!
        password: String!
    }
    type SignUpPayload {
        user: User!
    }
    type SignInPayload {
        user: User!
    }
    type Query {
        user(id: ID!): User!
        users: [User]!
        viewer: User
        getTasks: [Task]
        getTask(id: ID!): Task
    }
    type Mutation {
        addTask(task: TaskInput!): Task!
        deleteTask(id: ID!): Boolean!
        signUp(input: SignUpInput!): SignUpPayload!
        signIn(input: SignInInput!): SignInPayload!
        signOut: Boolean!
    }
    `
