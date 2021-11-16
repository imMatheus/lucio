import {
    CollectionReference,
    DocumentData,
    getDocs,
    where,
    query,
} from 'firebase/firestore'

/**
 * @param {CollectionReference} ref - a ref to a firestore collection
 * @return {string} class link - a random generated string of 6 characters, exempla 'djA1k8'
 */

export const generateNewLink = async (
    ref: CollectionReference,
    FieldValue = 'code'
): Promise<string> => {
    const LINK_LENGTH = 7 // length of link
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const numbers = '0123456789'
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
        const querySnapshot = await getDocs(
            query(ref, where(FieldValue, '==', link))
        )
        if (querySnapshot.empty) newLink = true
    }
    return link
}
