<script>
    import dnt from 'date-and-time';
    import meridiem from 'date-and-time/plugin/meridiem'
    import { goto } from "$app/navigation";
    import { tasks } from "$lib/stores";

    dnt.plugin(meridiem);

</script>
<div class="w-full min-h-[calc(100dvh-9rem)] md:min-h-[calc(100dvh-5rem)] relative pt-4">
    <md-list class="bg-white">
      {#each $tasks as task (task.id)} 
        <md-list-item class="break-words hyphens-auto overflow-hidden max-w-full border-b border-t">
          <div class="flex justify-between items-start">
            <p class="text-lg"><span class="font-bold">{task.title}</span> - Due { typeof task.date != 'object' ? () => { task.date = new Date(task.date); return dnt.format(task.date, "M/D/YYYY"); } : dnt.format(task.date, "M/D/YYYY")}</p>
            <p>{task.label.join(", ")}</p>
          </div>
          <p class="mt-2 mb-2">{task.description}</p>
          <!-- svelte-ignore missing-declaration -->
          <div class="flex items-end -mt-4 justify-between">
            <a class="text-blue-700 hover:underline" href={task.link}>{task.link}</a>
            <!-- svelte-ignore missing-declaration -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <md-outlined-button on:click={() => { tasks.removeTask(task.id); }}>Delete</md-outlined-button>
          </div>

        </md-list-item>
      {/each}
    </md-list>

    <!-- svelte-ignore missing-declaration -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <md-fab variant="tertiary" on:click={() => { goto("/add"); }} size="large" class="bottom-4 right-4 absolute font-main" aria-label="Add" label="Add Task">
        <md-icon slot="icon">add</md-icon>
    </md-fab>
</div>