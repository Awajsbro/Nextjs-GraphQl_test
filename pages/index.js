import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { gql, useMutation } from '@apollo/client'
import { useState } from "react"
import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import AddTaskModal from "../Components/addTaskModal"


const DeleteTask = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`

export default function Home({ initialTasks }) {
  const [deleteTask] = useMutation(DeleteTask)
  const [tasks, setTasks] = useState(initialTasks)
  const [modal, setModal] = useState(false)

  const newTaskHandler = (task) => {
    setTasks([
      task,
      ...tasks,
    ])
    setModal(false)
  }

  const removeEntry = (id, e) => {
    e.stopPropagation()
    deleteTask({
      variables: {
        id: id
      }
    }).then(res => {
      if (res.data.deleteTask)
        setTasks(tasks.filter(task => task.id !== id))
      else
        alert("Echec de la suppression de la tache")
    })
  }

  return (
    <>
      <Head>
        <title>TodoList</title>
      </Head>
      <main
        className={modal ? styles.mainWithBlur : styles.main}
        onClick={modal ? () => setModal(false) : null}>
        <h1 className={styles.title}>Todo List</h1>

        <div className={styles.container}>

          <div className={styles.grid}>
            <div
              className={styles.card}
              onClick={() => setModal(true)}
            >
              <h3>Nouvelle tache</h3>
              <p>...</p>
            </div>

            {tasks ? tasks.map(task => {
              return (
                <Link
                  href={`/${task.id}`}
                  key={task.id}
                >
                  <div className={styles.card}>
                    <div>
                      <h3>{task.title}</h3>
                      <div style={{ height: "10px", width: "10px", backgroundColor: "red" }} onClick={!modal ? e => removeEntry(task.id, e) : null} />
                    </div>
                    <p>{task.description.length > 40 ? task.description.slice(0, 40) + "..." : task.description ?? null}</p>
                  </div>
                </Link>)
            }) : null}

          </div>

        </div>

      </main>
      {modal ? <AddTaskModal
        newTaskHandler={newTaskHandler}
      />
        : null}
    </>
  )
}


export async function getServerSideProps({ params }) {
  const prisma = new PrismaClient()
  const initData = await prisma.tasks.findMany()

  return {
    props: {
      initialTasks: initData.reverse()
    }
  }
}