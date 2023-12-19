<script lang=ts>
    import '../app.css';

    import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";

    import { firebaseClient } from "$lib/firebase";
    import { onMount, setContext } from 'svelte';

    import '@material/web/button/filled-button.js';
    import '@material/web/button/outlined-button.js';
    import '@material/web/checkbox/checkbox.js';
    import '@material/web/iconbutton/icon-button';
    import '@material/web/iconbutton/filled-icon-button';
    import '@material/web/iconbutton/outlined-icon-button';
    import '@material/web/iconbutton/filled-tonal-icon-button';
    import '@material/web/icon/icon';
    import '@material/web/tabs/primary-tab';
    import '@material/web/tabs/secondary-tab';
    import '@material/web/tabs/tabs';
    import '@material/web/progress/circular-progress';
    import '@material/web/fab/fab'
    import '@material/web/dialog/dialog'
    import '@material/web/button/text-button';
    import '@material/web/list/list';
    import '@material/web/list/list-item';
    import '@material/web/switch/switch';
    import '@material/web/ripple/ripple';
    import '@material/web/textfield/outlined-text-field';

    export let data;

    let client = firebaseClient();
    client.serverInit(data.preload);
    setContext('client', client);

    import { page } from '$app/stores';
    import { tasks } from '$lib/stores';

    $: console.log($tasks);

    $: current = (() => {
        console.log($page.url.pathname);

        if($page.url.pathname.startsWith("/focus")) {
            return 2;
        } else if($page.url.pathname.startsWith("/schedule")) {
            return 1;
        } else if($page.url.pathname == "/" || $page.url.pathname.startsWith("/add")) {
            return 0;
        } else {
            return -1;
        }
    })(); 

    $: console.log(current);

    onMount(() => {
        client.clientInit();

        const theme = themeFromSourceColor(argbFromHex('#f82506'));

        console.log(JSON.stringify(theme, null, 2));

        const systemDark = false;

        applyTheme(theme, {target: document.body, dark: systemDark});
    });
</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Rounded" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Sharp" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</svelte:head>

<div class="bg-white">
    <nav class="h-20 bg-[var(--md-sys-color-surface-variant)] flex items-center gap-4 px-5">
        <md-icon class="text-primary-color w-9 h-10 text-4xl">terminal</md-icon>
        <div class="grow -translate-y-0.5">
            <h1 class="text-primary-color font-main text-xl">Krasaba Workflow</h1>
            <h2 class="text-primary-color text-opacity-75 text-xs font-main">Powered by JEROME AI</h2>
        </div>  
        {#if $client == undefined}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <md-filled-button on:click={() => { client.signIn(); }}>Sign In</md-filled-button>
        {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <md-outlined-button on:click={() => { client.signOut(); }}>Sign Out</md-outlined-button>
            <div class="block md:hidden">
                <md-filled-icon-button href="/settings">
                    <md-icon>settings</md-icon>
                </md-filled-icon-button>
            </div>
        {/if}
    </nav>
    
    <div class="min-h-[calc(100dvh-9rem)] md:min-h-[calc(100dvh-5rem)] md:w-[calc(100%-6rem)] ml-auto">
        <slot></slot>
    </div>

    <div class="hidden md:block w-6 h-6 overflow-hidden absolute top-20 left-24">
        <div class="h-12 w-12 bg-[var(--md-sys-color-surface-variant)]">
            <div class="w-full h-full bg-white rounded-full">
    
            </div>
        </div>
    </div>
    
    <footer class="sticky md:absolute bg-[var(--md-sys-color-surface-variant)] left-0 w-full h-16 md:w-24 md:h-[calc(100dvh-5rem)] bottom-0 flex items-center md:flex-col  text-black text-opacity-80 font-main z-10">
        <a href="/" class="w-full h-full md:h-20 relative flex flex-col items-center justify-around">
            <div class="flex flex-col items-center">
                <div class="bg-red-500 transition {current == 0 ? "bg-opacity-20 text-primary-color" : "bg-opacity-0"} h-[1.75rem] w-16 rounded-full flex items-center justify-around">
                    <md-icon class="text-xl w-5 h-6 -translate-y-0.5">rebase_edit</md-icon>
                </div>
                <p class="text-sm transition {current == 0 ? "text-primary-color font-bold" : ""}">Workflow</p>
            </div>
            <md-ripple></md-ripple>
        </a>
        <a href="/schedule" class="w-full h-full md:h-20 relative flex flex-col items-center justify-around">
            <div class="flex flex-col items-center">
                <div class="bg-red-500 transition {current == 1 ? "bg-opacity-20 text-primary-color" : "bg-opacity-0"} h-[1.75rem] w-16 rounded-full flex items-center justify-around">
                    <md-icon class="text-xl w-5 h-6 -translate-y-0.5">event_not</md-icon>
                </div>
                <p class="text-sm transition {current == 1 ? "text-primary-color font-bold" : ""}">Schedule</p>
            </div>
            <md-ripple></md-ripple>
        </a>
        <a href="/focus" class="w-full h-full md:h-20 relative flex flex-col items-center justify-around">
            <div class="flex flex-col items-center">
                <div class="bg-red-500 transition {current == 2 ? "bg-opacity-20 text-primary-color" : "bg-opacity-0"} h-[1.75rem] w-16 rounded-full flex items-center justify-around">
                    <md-icon class="text-xl w-5 h-6 -translate-y-0.5">do_not_disturb_on</md-icon>
                </div>
                <p class="text-sm transition {current == 2 ? "text-primary-color font-bold" : ""}">Focus</p>
            </div>
            <md-ripple></md-ripple>
        </a>
        <div class="mt-auto mb-6 hidden md:block {$client == undefined ? "opacity-25" : ""}">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <md-filled-icon-button on:click={() => { if($client == undefined) client.signIn(); }} href={$client == undefined ? "" : "/settings"}>
                <md-icon>settings</md-icon>
            </md-filled-icon-button>
        </div>
    </footer>
</div>

<style>
    md-tabs {
        --md-sys-color-surface: var(--md-sys-color-surface-variant);
    }
</style>