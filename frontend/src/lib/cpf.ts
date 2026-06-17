export function getCpfDigits(value: string): string {
    return value.replace(/\D/g, '').slice(0, 11)
}

export function getCnpjDigits(value: string): string {
    return value.replace(/\D/g, '').slice(0, 14)
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

export function formatCnpj(value: string): string {
    const digits = getCnpjDigits(value);

    if (digits.length <= 2) return digits;
    if (digits.length <= 5)
        return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    if (digits.length <= 8)
        return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
    if (digits.length <= 12)
        return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;

    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
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

export function isValidCnpj(value: string): boolean {
    const cnpj = getCnpjDigits(value)

    if (cnpj.length !== 14) return false
    if (/^(\d)\1{13}$/.test(cnpj)) return false

    const calculateDigit = (base: string, weights: number[]) => {
        let sum = 0

        for (let i = 0; i < weights.length; i += 1) {
            sum += Number(base[i]) * weights[i]
        }

        const remainder = sum % 11

        return remainder < 2 ? 0 : 11 - remainder
    }

    const digit1 = calculateDigit(
        cnpj.slice(0, 12),
        [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    )

    if (digit1 !== Number(cnpj[12])) return false

    const digit2 = calculateDigit(
        cnpj.slice(0, 13),
        [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    )

    if (digit2 !== Number(cnpj[13])) return false

    return true
}