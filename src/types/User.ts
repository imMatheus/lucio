import firebase from 'firebase/app'

export default interface User extends firebase.User {
    displayName: string
    userUID: string
    email: string
    profileImage: string
    score?: number
    targets?: number
}
