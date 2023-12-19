import { persisted } from "svelte-persisted-store";
import { get, writable } from "svelte/store";

export const tasks = tasksWritable();

interface Task extends NewTask {
    id: string
}

interface NewTask {
    title: string,
    description: string,
    link: string,
    date: Date,
    label: string[],
}

function tasksWritable() {
    const { subscribe, set, update } = persisted<Task[]>("tasks", []);

    function addTask(task: NewTask) {
        console.log(task);

        let id = crypto.randomUUID();

        update(n => {
            n.push({ ...task, id: id });

            return n;
        })

        return id;
    }

    function removeTask(id: string) {
        let found = false;

        update(n => {
            for(let i = 0; i < n.length; i++) {
                if(n[i].id == id) {
                    n.splice(i, 1);
                    found = true;
                    return n;
                }
            }

            return n;
        });

        return found;
    }

    function getTask(id: string) {
        const current = get({ subscribe });

        for(let i = 0; i < current.length; i++) {
            if(current[i].id == id) {
                return current[i];
            }
        }

        return false;
    }

    function updateTask(task: NewTask, id: string) {
        let found = false;

        update(n => {
            for(let i = 0; i < n.length; i++) {
                if(n[i].id == id) {
                    n[i] == task;
                    found = true;
                    return n;
                }
            }

            return n;
        });

        return found;
    }

    return {
        addTask,
        removeTask,
        getTask,
        updateTask,
        subscribe
    }
}