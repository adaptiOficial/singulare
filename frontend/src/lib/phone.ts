const MAX_PHONE_DIGITS = 11

export function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, MAX_PHONE_DIGITS)
    if (digits.length <= 2) {
        return digits ? `(${digits}` : ''
    }
    if (digits.length <= 7) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function getPhoneDigits(value: string): string {
    return value.replace(/\D/g, '').slice(0, MAX_PHONE_DIGITS)
}