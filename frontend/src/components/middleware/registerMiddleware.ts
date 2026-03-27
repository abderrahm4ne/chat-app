type registerMiddlewareProps = {
    fullName: string;
    email: string;
    password: string;
}


export default function registerMiddleware({ fullName, email, password }: registerMiddlewareProps) {
    const trimmedName = fullName.trim()
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || trimmedEmail === '') {
        throw new Error("Full Name is required field");
    }
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
        throw new Error("Please enter a valid email address.");
    }
    if (!password || password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }

    return true
}