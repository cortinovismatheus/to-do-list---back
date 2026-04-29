import fs from "fs/promises"
import { Task } from "./readdb"

const path = "src/database/db.csv"

export async function saveDb(data: Array<Task>): Promise<void> {

    if (!data) {
        throw new Error("data está undefined")
    }

    const header = "id;name;description;status;created_at;updated_at\n"


    const rows = data.map(task => {
        return [
            task.id,
            task.name,
            task.description,
            task.status,
            task.created_at.toISOString(),
            task.updated_at ? task.updated_at.toISOString() : ""
        ].join(";")
    })

    const csv = header + rows.join("\n")

    await fs.writeFile(path, csv, "utf-8")
}   