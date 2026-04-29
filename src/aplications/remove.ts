import fs from "fs";
import path from "path";
import { readDb, Task } from "../database/readdb";

const db_path = path.resolve("src/database/db.csv")

async function remove(id: number): Promise<void> {
    const dados: Task[] = await readDb();

    const idExistente = dados.some((item) => item.id === id)

    if (!idExistente) {
        throw new Error(`ID ${id} não encontrado`)
    }

    const novosDados = dados.filter((item) => item.id !== id)

    const rows = novosDados.map((item) =>
        [
            item.id,
            item.name,
            item.status,
            item.created_at,
            item.updated_at
        ].join(";")
    )

    const header = "id;name;status;created_at;updated_at";

    const conteudo = [header, ...rows].join("\n");

    fs.writeFileSync(db_path, conteudo, "utf-8")
}

export { remove };