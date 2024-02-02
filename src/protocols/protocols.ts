
export type CreateClient = {
    username: string,
    email: string,
    phone: number,
    addresscoordinates: any
}

export type ApplicationError = {
    name: string,
    message: string
}