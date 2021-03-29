
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const resolvers = {
    Query: {
        async getTasks(_parent, _args, _context, _info) {
            const tasks = await prisma.tasks.findMany()
            console.log(tasks)
            return tasks
        },
        async getTask(_parent, args, _context, _info) {
            const task = await prisma.tasks.findUnique({ where: { id: args.id } })
            return task
        }
    },
    Mutation: {
        async addTask(_parent, args, _context, _info) {
            console.log("ajout d'une tache", args)
            const newTask = await prisma.tasks.create({
                data: args.task
            })
            return newTask
        },
        async deleteTask(_parent, args, _cxt, _info) {
            console.log("suppression d'un tache")

            const deleted = await prisma.tasks.delete({ where: { id: args.id } })
            console.log(deleted)
            return true
        },
    },
}


let data = {
    "tasks": [
        {
            "id": 0,
            "title": "apprendre nextJS"
        },
        {
            "id": 1,
            "title": "apprendre grapql"
        },
        {
            "id": 2,
            "title": "penser a installer MHrise d'ici vendredi 00:00"
        }
    ]
}