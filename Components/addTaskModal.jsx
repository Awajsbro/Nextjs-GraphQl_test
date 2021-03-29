import { useState } from "react"
import styles from '../styles/Home.module.css'
import { gql, useMutation } from '@apollo/client'

const AddTask = gql`
  mutation AddTask($title: String!, $description: String) {
    addTask(task: {title: $title, description: $description}) {
      id
    }
  }
`

const AddTaskModal = ({ newTaskHandler }) => {
    const [addTask] = useMutation(AddTask)
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")

    const validateInTitle = (e) => {
        if (e.key == "Enter")
            sendNewEntry()
    }

    const sendNewEntry = () => {
        console.log(newTitle, "a envoyer")
        if (newTitle !== "")
            addTask({
                variables: {
                    title: newTitle,
                    description: newDescription ?? null
                }
            })
                .then(res => {
                    if (res.data.addTask) {
                        newTaskHandler({
                            id: res.data.addTask.id,
                            title: newTitle,
                            description: newDescription ?? null
                        })
                    } else
                        alert("Echec de l'ajout de la tache")
                })
    }

    return <div className={styles.modalAddTask}>
        <input
            className={styles.titleTaskInput}
            placeholder="titre de la nouvelle tache"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            autoFocus
            onKeyPress={e => validateInTitle(e)}
        />
        <textarea
            className={styles.descriptionTaskArea}
            placeholder="description de la nouvelle tache"
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
        />
        <button
            onClick={sendNewEntry}>
            cliquer pour ajouter la tache
             </button>
    </div>
}

export default AddTaskModal