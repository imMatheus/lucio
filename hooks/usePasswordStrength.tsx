import { useState, useEffect, useRef } from 'react'

type Strengths = 'weak' | 'medium' | 'strong'

function hasLowerCase(str: string) {
    return /[a-z]/.test(str)
}

function hasUpperCase(str: string) {
    return /[A-Z]/.test(str)
}

function hasNumbers(str: string) {
    return /[0-9]/.test(str)
}

function hasSpecialCharacter(str: string) {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    return format.test(str)
}

export default function usePasswordStrength(password: string): Strengths {
    const [strength, setStrength] = useState<Strengths>('medium')

    useEffect(() => {
        const length = password.length
        const hasLower = hasLowerCase(password) ? 1 : 0
        const hasUpper = hasUpperCase(password) ? 1 : 0
        const _hasNumbers = hasNumbers(password) ? 1 : 0
        const hasSpecial = hasSpecialCharacter(password) ? 1 : 0

        const types = hasLower + hasUpper + _hasNumbers + hasSpecial

        if (types < 2) return setStrength('weak')
        if (length < 6) return setStrength('weak')
        if (length >= 10 && types >= 3) return setStrength('strong')
        if (length >= 8 && types >= 4) return setStrength('strong')

        return setStrength('medium')
    }, [password])

    return strength
}
