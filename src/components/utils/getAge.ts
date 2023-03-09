export const getAge = (dateOfBirth: Date): number => {

    return Math.floor((new Date().valueOf() - dateOfBirth.valueOf()) / 31556952000)
}