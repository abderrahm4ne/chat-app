export type User = {
    fullName: string,
    email: string,
    password: string,
    profilePic: string
}

export type Message = {
    senderId: string,
    recieverId: string,
    text?: string,
    image?: string
}

export type AuthResponse = {
  _id: string
  fullName: string
  email: string
  profilePic?: string
}