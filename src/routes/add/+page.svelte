<script lang=ts>
    import { getContext } from "svelte";
    import type { firebaseClient } from "$lib/firebase";
    import { tasks } from "$lib/stores";
    import { goto } from "$app/navigation";

    const client = getContext('client') as ReturnType<typeof firebaseClient>;

    let title = "";
    let description = "";
    let link = "";
    let duedate = new Date();
    let label = "";

    function change(e: any) {
        duedate = e.target.valueAsDate;
    }

    function changeTitle(e: any) {
        title = e.target.value;
    }

    function changeLink(e: any) {
        link = e.target.value;
    }

    function changeDescription(e: any) {
        description = e.target.value;
    }

    function changeLabel(e: any) {
        label = e.target.value;
    }
</script>

<div class="p-8 max-w-lg ml-auto mr-auto">
    <md-list class="rounded-xl border">
        <md-list-item>
            <h1 class="text-xl px-2 pb-2">Add Task</h1>
        </md-list-item>
        <md-divider></md-divider>
        <md-list-item>
            <div class="flex items-center gap-5 p-2 pb-0">
                <md-icon>title</md-icon>
                <md-outlined-text-field on:input={changeTitle}  class="w-full" label="Title"></md-outlined-text-field>
            </div>
        </md-list-item>
        <md-list-item>
            <div class="flex items-start gap-5 p-2 pt-1 pb-0 overflow-hidden">
                <md-icon class="mt-4">description</md-icon>
                <md-outlined-text-field on:input={changeDescription} rows=6 class="w-full resize-y" type="textarea" label="Description"></md-outlined-text-field>
            </div>
        </md-list-item>
        <md-list-item>
            <div class="flex items-start gap-5 p-2 pt-1 pb-0 overflow-hidden">
                <md-icon class="mt-4">Link</md-icon>
                <md-outlined-text-field on:input={changeLink} class="w-full resize-y" type="url" label="Link"></md-outlined-text-field>
            </div>
        </md-list-item>
        <md-list-item>
            <div class="flex items-start gap-5 p-2 pt-1 pb-0 overflow-hidden">
                <md-icon class="mt-4">Schedule</md-icon>
                <md-outlined-text-field on:input={change} type="date" class="w-full resize-y" label="Due Date">
                </md-outlined-text-field>
            </div>
        </md-list-item>
        <md-list-item>
            <div class="flex items-center gap-5 p-2 pt-1">
                <md-icon>label</md-icon>
                <md-outlined-text-field on:input={changeLabel} class="w-full" label="Label"></md-outlined-text-field>
            </div>
        </md-list-item>
        <md-divider></md-divider>
        <md-list-item class="px-2 pt-2">
            <div class="flex gap-4">
                <div class="grow"></div>
                <md-outlined-button href="/">Cancel</md-outlined-button>
                <md-filled-button on:click={() => { tasks.addTask({ title, link, description, date: duedate, label: Array.from(label.split(","), (i) => i.trim().toLowerCase())}); goto("/") }}>Add</md-filled-button>
            </div>
        </md-list-item>
    </md-list>
</div>