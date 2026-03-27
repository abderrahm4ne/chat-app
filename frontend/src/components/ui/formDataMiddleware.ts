type formDataMiddlewareProps = {
    fullName?: string;
    email: string;
    password: string;
}


export default function formDataMiddleware({ fullName, email, password }: formDataMiddlewareProps) {
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
        throw new Error("Please enter a valid email address.");
    }
    if (!password || password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }
}