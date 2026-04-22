import InputField from '../../components/ui/Field'
import { useState } from 'react'
import SubmitButton from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import google from '../../assets/googl.png'
import facebook from '../../assets/facebook.png'
import { useLoginMutation } from '../../store/api/authApi'
import LoginMiddleware from '../../components/middleware/loginMiddleware.ts'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../components/hooks/useTheme'

import toast from 'react-hot-toast'
const toastStyle = {
    className: 'text-xl font-semibold'
}

type FormState = {
    email: string
    password: string
}

function LoginPage() {
    const [login, { isLoading }] = useLoginMutation()
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()
    

    const set = (key: keyof FormState) => (v: string) => {
        setFormData(f => ({ ...f, [key]: v }))
    }

    const handleSubmit = async () => {
        setError(null)
        try {
            LoginMiddleware(formData)
            await login(formData).unwrap()
            toast('Login successful!', toastStyle)
            navigate('/chat')
        } catch (error: any) {
            toast.error('Login failed!', toastStyle)
            setError(error.message || "An unknown error occurred. Check Network tab.")
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen px-4 bg-linear-to-br from-bg to-bg2">
            <div className="bg-linear-to-b from-primary to-secondary rounded-xl shadow-lg shadow-shadow/50 flex flex-row h-[80%] w-[65%] overflow-hidden">

                {/* left side*/}
                <div className="flex flex-col w-[42%] p-10 justify-center mb-20 mt-[15%]">

                    {/* title */}
                    <div className='mb-6'>
                        <h1 className="text-4xl font-text-landing-title">
                            <span className="text-dark-body-text">Qwik</span>
                            <span className="text-primary-text">Chat</span>
                        </h1>
                    </div>

                    {/* center text */}
                    <div className="flex flex-col space-y-3">
                        <h2 className="text-4xl font-text-landing-title text-primary-text leading-tight">
                            Welcome back,
                        </h2>
                        <p className="text-dark-body-text text-lg w-[80%]">
                            Real-time messaging built for speed. End-to-End encrypted.
                        </p>
                    </div>

                    <div className='mt-auto'>
                        {theme === 'dark' ? <Moon color='white' size={30} onClick={toggleTheme} className='cursor-pointer'/> : <Sun size={30} onClick={toggleTheme} className='cursor-pointer'/>}
                    </div>


                </div>

                {/* DIVIDER */}
                <div className="border border-card-background/60 h-[80%] self-center" />

                {/* right side */}
                <div className="flex flex-col justify-center w-[58%] px-12 py-10">

                    <h1 className="text-3xl font-text-landing-title text-dark-body-text mb-1">
                        Log in
                    </h1>
                    <p className="text-dark-body-text/60 text-sm mb-8">
                        Enter your credentials to continue
                    </p>

                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}

                    <div className="flex flex-col space-y-4 mb-6">
                        <InputField name="email" placeholder="Email" value={formData.email} onChange={set('email')} />
                        <InputField name="password" type="password" placeholder="Password" value={formData.password} onChange={set('password')} />
                    </div>

                    <div className="mb-5">
                        <SubmitButton loading={isLoading} onClick={handleSubmit}>
                            LOG IN
                        </SubmitButton>
                    </div>

                    <p className="text-center text-sm text-dark-body-text mb-6">
                        Don't have an account?{' '}
                        <span
                            className="font-semibold text-primary-text hover:cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => navigate('/register')}>
                            Sign up
                        </span>
                    </p>

                    <div className="flex items-center space-x-4 mb-5">
                        <div className="border-b border-card-background/60 w-full" />
                        <p className="text-nowrap text-sm text-dark-body-text">or login with</p>
                        <div className="border-b border-card-background/60 w-full" />
                    </div>

                    <div className="flex space-x-6 items-center justify-center">
                        <img src={google} alt="google" className="w-9 h-9 p-1 hover:cursor-pointer transition-all duration-200 hover:scale-110" />
                        <img src={facebook} alt="facebook" className="w-9 h-9 p-1 hover:cursor-pointer transition-all duration-200 hover:scale-110" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginPage