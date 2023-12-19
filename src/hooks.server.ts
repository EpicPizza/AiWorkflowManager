import { firebaseAdmin, getUser } from "$lib/firebase.server";
import type { Handle, RequestHandler } from "@sveltejs/kit";
import type { DocumentReference } from "firebase-admin/firestore";

export const handle = (async ({ event, resolve }) => {
    const user = await getUser(event.cookies.get("__session") != undefined ? event.cookies.get("__session") as string : "");

    event.locals.user = user;

	const response = await resolve(event);
    
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
    response.headers.set('Cross-Origin-Embedder-Policy', 'same-origin');
    response.headers.set('Cache-Control', 'no-cache, private');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');

    return response;
}) satisfies Handle;