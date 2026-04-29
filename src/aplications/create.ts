import { readDb, Task } from "../database/readdb"
import { saveDb } from "../database/writedb"
export { readDb } from "../database/readdb"

interface DataToCreate {
    name: string
    description?: string
}

async function create(data: DataToCreate) {

    const dados = await readDb()

    const list: Task[] = dados || []

    const id = list.length > 0 ? Number(list[list.length - 1].id) + 1 : 1

    const novosDados: Task = {
        id: id,
        name: data.name,
        description: data.description || "",
        status: "TODO",
        created_at: new Date(),
        updated_at: undefined
    }

    list.push(novosDados)

    await saveDb(list)

    return novosDados
}

export { create }