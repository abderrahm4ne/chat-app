type formDataMiddlewareProps = {
    fullName?: string;
    email: string;
    password: string;
}


export default function formDataMiddleware({ fullName, email, password }: formDataMiddlewareProps) {
    if (!email || !email.includes('@')) {
        throw new Error("A valid email is required.");
    }

    if (!password || password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }

    return false
}