import firebase from 'firebase/app'

/**
 * @param {CollectionReference} ref - a ref to a firestore collection
 * @return {string} class link - a random generated string of 7 characters, exempla 'djAq1k8'
 */

export const generateNewLink = async (
    ref: firebase.firestore.CollectionReference
): Promise<string> => {
    const LINK_LENGTH = 7 // length of link
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'

    const upperCaseAlphabet: string = alphabet // converts it into uppercase
        .split('')
        .map((c) => c.toUpperCase())
        .join('')
    const numbers = '0123456789-_'
    const characters = alphabet + upperCaseAlphabet + numbers // combine all of them into one string

    let link = ''
    let newLink = false
    let fails = 0

    while (!newLink) {
        ++fails
        link = ''

        // if we failed 3 times we increment the link length with +1
        for (let i = 0; i < (fails > 3 ? LINK_LENGTH + 1 : LINK_LENGTH); i++) {
            const n = Math.floor(Math.random() * characters.length)
            link += characters[n]
        }

        await ref
            .where('classJoinLink', '==', link)
            .get()
            // eslint-disable-next-line no-loop-func
            .then((snapshot: firebase.firestore.DocumentData) => {
                if (snapshot.empty) newLink = true
            })
    }
    return link
}
