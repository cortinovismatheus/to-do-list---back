import { promises } from "dns"
import fs from "fs"

export type TaskStatus = "TODO" | "DONE"

export interface Task {
    id: number
    name: string
    description: string
    status: TaskStatus
    created_at: Date
    updated_at?: Date  
}


async function readDb(): Promise<Array<Task>> {
    const conteudo = fs.readFileSync("src/database/db.csv", "utf-8"); 
    const linhas = conteudo.split("\n").slice(1);

    const tasks: Array<Task> = []
    

    linhas.forEach((linha) => {
        if (!linha.trim()) return;

        const colunas = linha.split(";") 
        
        tasks.push({
            id: Number(colunas[0]),
            name: colunas[1],
            description: colunas[2],
            status: colunas[3] as TaskStatus,
            created_at: colunas[4] ? new Date(colunas[4]) : new Date(),
            updated_at: colunas[5] ? new Date(colunas[5]) : undefined
        })
    }); 

    return tasks;
}

export{readDb}