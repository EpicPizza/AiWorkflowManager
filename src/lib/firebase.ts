import { goto, invalidateAll } from "$app/navigation";
import { initializeApp, type FirebaseApp } from "firebase/app";
import { type Auth, getAuth as getFirebaseAuth, GoogleAuthProvider, onAuthStateChanged, signInWithCredential, browserLocalPersistence, initializeAuth, browserPopupRedirectResolver, type User, signInWithRedirect, signInWithPopup } from "firebase/auth";
import { get, writable, type Unsubscriber, type Writable } from "svelte/store";
import { getFirestore as getFirebaseFirestore, type Firestore, type Unsubscribe, doc, getDoc, onSnapshot, DocumentReference } from "firebase/firestore";
import { navigating } from "$app/stores";
import { browser } from "$app/environment";
import { deleteToken, getMessaging as getMessagingFirebase, getToken, type Messaging } from "firebase/messaging";

interface Preload {
    photoURL: string | undefined,
    email: string | undefined,
    displayName: string | undefined,
    uid: string,
    preload: boolean,
}

export function firebaseClient() {
    let app: FirebaseApp | undefined = undefined;
    let auth: Auth | undefined = undefined;
    let user: Writable<Preload | User | undefined> = writable(undefined);
    let provider: GoogleAuthProvider | undefined = undefined;
    let messaging: Messaging | undefined = undefined;
    let firestore: Firestore | undefined = undefined;
    let firestoreEntry: any | undefined = undefined;

    const getApp = (): FirebaseApp => {
        if(!browser) return undefined as any;

        if(app == undefined) {
            const firebaseConfig = {
                apiKey: "AIzaSyAC3lPSYs7egALijb4ZIcI2cz9JLjYPiJM",
                authDomain: "krasaba-workflow.firebaseapp.com",
                projectId: "krasaba-workflow",
                storageBucket: "krasaba-workflow.appspot.com",
                messagingSenderId: "208024603017",
                appId: "1:208024603017:web:d7f5f7f6d725c7b8df3958"
            };              
    
            app = initializeApp(firebaseConfig);
        }

        return app;
    }

    const getAuth = (): Auth => {
        if(auth == undefined) {
            auth = getFirebaseAuth(getApp());
        }

        return auth;
    }

    const getAuthUser = (): (ReturnType<typeof getAuth>)["currentUser"] | null => {
        return getAuth().currentUser;
    }

    const getFirestoreEntry = (): any => {
        return firestoreEntry;
    }

    const getProvider = (): GoogleAuthProvider => {
        if(provider == undefined) {
            provider = new GoogleAuthProvider();
        }

        return provider;
    }

    const getFirestore = (): Firestore => {
        if(firestore == undefined) {
            firestore = getFirebaseFirestore(getApp());
        }

        return firestore;
    }

    const getMessaging = (): Messaging => {
        if(messaging == undefined) {
            messaging = getMessagingFirebase(app);
            getToken(messaging, {vapidKey: "BGasd9c5rz_5NLtyZv5ZjF5t7K3HO30UBgdP5XwQkwyD5c0gCAQdTVWH76D3LIrorlKTNRfklPT0gioXxieHXIo"}).then((currentToken) => {
                console.log("Token", currentToken);
            })
        }

        return messaging;
    }

    const serverInit = (preload: Preload | undefined) => {
        if(preload == undefined) {
            user.set(undefined)
        } else {
            user.set(preload);
        }
    }

    const clientInit = () => {
        getApp();

        getMessaging();

        disableNotifications();

        onAuthStateChanged(getAuth(), async (currentUser) => {
            if(currentUser == null && get(user) != undefined && !('preload' in (get(user) as any))) {
                user.set(undefined);

                invalidateAll();
                
                return;
            } else if(currentUser == null && get(user) != undefined && 'preload' in (get(user) as any)) {
                await fetch('/session/logout', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    }
                });

                user.set(undefined);

                invalidateAll();
            }

            if(currentUser != null && get(user) == undefined) {
                const token = await currentUser.getIdToken();

                const result = await fetch("/session/login", {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                if(result.status == 401) {
                    signOut();
                    return;
                }

                user.set(currentUser);

                invalidateAll();
            } else if(currentUser != null) {
                user.set(currentUser);
            }
        })
    }

    const signIn = async () => {
        getAuth().signOut();
    

        signInWithRedirect(getAuth(), getProvider())
            .catch((error) => {
                console.log(error);
            });
    }

    const signOut = async () => {
        await fetch('/session/logout', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            }
        });

        getAuth().signOut();
    }

    const reset = async () => {
        await fetch('/session/reset', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            }
        });

        getAuth().signOut();
    }

    const disableNotifications = () => {
            deleteToken(getMessaging()).then(() => {
                
            }).catch((err) => {
                console.log('Unable to delete token. ', err);
            });
    }

    return {
        subscribe: user.subscribe,
        set: user.set,
        update: user.update,
        clientInit: clientInit,
        signIn: signIn,
        signOut: signOut,
        reset: reset,
        serverInit: serverInit,
        getFirestore: getFirestore,
        getApp: getApp,
        debug: {
            getUser: getAuthUser,
            getEntry: getFirestoreEntry,
        },
    }
}