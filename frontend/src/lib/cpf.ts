export function getCpfDigits(value: string): string {
    return value.replace(/\D/g, '').slice(0, 11)
}

export function formatCpf(value: string): string {
    const digits = getCpfDigits(value)

    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
    if (digits.length <= 9) {
        return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
    }

    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

export function isValidCpf(value: string): boolean {
    const cpf = getCpfDigits(value)

    if (cpf.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cpf)) return false

    for (let t = 9; t < 11; t += 1) {
        let sum = 0

        for (let i = 0; i < t; i += 1) {
            sum += Number(cpf[i]) * (t + 1 - i)
        }

        const digit = ((10 * sum) % 11) % 10

        if (Number(cpf[t]) !== digit) return false
    }

    return true
}