<script lang=ts>
    import { getContext } from "svelte";
    import type { firebaseClient } from "$lib/firebase";

    const client = getContext('client') as ReturnType<typeof firebaseClient>;
</script>

<div class="p-8 max-w-xl ml-auto mr-auto">
    <p class="text-black text-opacity-50 mb-4 font-main">Your Account:</p>
    {#if $client != undefined}
        <div class="flex items-center border p-4 rounded-2xl shadow-lg">
            <img src={$client.photoURL} referrerpolicy="no-referrer" alt="{$client.photoURL}'s profile" class="rounded-full w-16 h-16 overflow-hidden shadow-md">
            <div class="pl-4 flex flex-col gap-1 grow">
                <h1 class="text-black font-main text-xl">{$client.displayName}</h1>
                <h2 class="text-black font-main opacity-75">{$client.email}</h2>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <md-outlined-button on:click={() => { client.signOut(); }}>Sign Out</md-outlined-button>
        </div>
    {/if}
    <p class="text-black text-opacity-50 mb-6 mt-8 font-main">Settings:</p>
    <div class="flex items-center justify-between">
        <p class="font-main text-black text-lg">Push Notifications</p>
        <md-switch></md-switch>
    </div>
    <div class="flex items-center justify-between mt-8">
        <p class="font-main text-black text-lg">Usage Analytics</p>
        <md-switch></md-switch>
    </div>
    <div class="flex items-center justify-between mt-8">
        <p class="font-main text-black text-lg">JEROME</p>
        <md-switch></md-switch>
    </div>
</div>