export type User = {
    _id: string,
    fullName: string,
    email: string,
    password: string,
    profilePic: string
}

export type Message = {
    _id: string,
    senderId: string,
    recieverId: string,
    text?: string,
    image?: string,
    createdAt: string,
}


export type AuthResponse = {
  _id: string
  fullName: string
  email: string
  profilePic?: string
}