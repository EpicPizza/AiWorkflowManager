export const ssr = true;

export async function load({cookies, request, locals}) {
    let user;

    if(locals.user != undefined) {
        user = {
            photoURL: locals.user.photoURL,
            displayName: locals.user.displayName,
            email: locals.user.email,
            uid: locals.user.uid,
            preload: true, //only exists for sake of comparing to real user object
        };
    } else {
        user = undefined;
    }


    return { preload: user }; //do not use any of these directly, this layout load consistenly only runs on initial page load, instead used associated stores
}