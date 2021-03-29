import { PrismaClient } from "@prisma/client"
import { gql, useQuery } from '@apollo/client'
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const GetTask = gql`
    query GetTask($id: ID!) {
        getTask(id: $id) {
        title
        description
        }
    }
`
const GetTasks = gql`
    query GetTasks {
        getTasks {
        title
        description
        }
    }
`


const Task = ({ initTask }) => {
    const router = useRouter()
    const [task, setTask] = useState(initTask)
    const { data, error, loading } = useQuery(GetTask, {
        variables: { id: router.query.id },
        skip: initTask
    })


    useEffect(() => {
        if (!task && !loading) {
            console.log(data.getTask, "data")
            setTask(data.getTask)
        }
    }, [data])

    if (!task)
        return <div>Loading ...</div>

    return <main>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
    </main>
}


export default Task

Task.getInitialProps = async (ctx) => {
    if (typeof window === "undefined") {
        const prisma = new PrismaClient()
        const { title, description } = await prisma.tasks.findUnique({ where: { id: ctx.query.id } })
        return { initTask: { title, description } }
    }
    return { initTask: null }
}