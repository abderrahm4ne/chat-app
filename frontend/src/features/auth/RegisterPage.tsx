import InputField from '../../components/ui/Field'
import { useState } from 'react'
import SubmitButton from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import google from '../../assets/googl.png'
import facebook from '../../assets/facebook.png'
import { useRegisterMutation } from '../../store/api/authApi'
import registerMiddleware from '../../components/middleware/registerMiddleware'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../components/hooks/useTheme'

import toast from 'react-hot-toast'
const toastStyle = {
    className: 'text-xl font-semibold'
}

type FormState = {
    fullName: string
    email: string
    password: string
}

function RegisterPage() {
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" })
    const [register, { isLoading }] = useRegisterMutation()
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()

    const set = (key: keyof FormState) => (v: string) => {
        setFormData(f => ({ ...f, [key]: v }))
    }

    const handleSubmit = async () => {
        setError(null)
        try {
            registerMiddleware(formData)
            await register(formData).unwrap()
            toast('Registration successful!', toastStyle)
            navigate('/setup-profile')
        } catch (error: any) {
            toast.error('Registration failed!', toastStyle)
            setError(error.message || "An unknown error occurred. Check Network tab.")
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen px-4 bg-linear-to-br from-bg to-bg2">
            <div className="bg-linear-to-b from-primary to-secondary rounded-xl shadow-lg shadow-shadow/50 flex flex-row h-[85%] w-[65%] overflow-hidden">

                {/* left side */}
                <div className="flex flex-col w-[42%] p-10 justify-center mb-20">

                    {/* title */}
                    <div className='mb-6 mt-[45%]'>
                        <h1 className="text-4xl font-text-landing-title">
                            <span className="text-dark-body-text">Qwik</span>
                            <span className="text-primary-text">Chat</span>
                        </h1>
                    </div>

                    {/* center text */}
                    <div className="flex flex-col space-y-3 ">
                        <h2 className="text-4xl font-text-landing-title text-primary-text leading-tight">
                            Start chatting today,
                        </h2>
                        <p className="text-dark-body-text text-lg w-[80%]">
                            Join thousands of people already using QwikChat.
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
                        Create an account
                    </h1>
                    <p className="text-dark-body-text/60 text-sm mb-8">
                        Fill in your details to get started
                    </p>

                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}

                    <div className="flex flex-col space-y-4 mb-6">
                        <InputField name="fullname" placeholder="Full Name" value={formData.fullName} onChange={set('fullName')} />
                        <InputField name="email" placeholder="Email" value={formData.email} onChange={set('email')} />
                        <InputField name="password" placeholder="Password" value={formData.password} onChange={set('password')} />
                    </div>

                    <div className="mb-5">
                        <SubmitButton loading={isLoading} onClick={handleSubmit}>
                            SIGN UP
                        </SubmitButton>
                    </div>

                    <p className="text-center text-sm text-dark-body-text mb-6">
                        Already have an account?{' '}
                        <span
                            className="font-semibold text-button-background hover:cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => navigate('/login')}>
                            Log in
                        </span>
                    </p>

                    <div className="flex items-center space-x-4 mb-5">
                        <div className="border-b border-card-background/40 w-full" />
                        <p className="text-nowrap text-sm text-dark-body-text/60">or signup with</p>
                        <div className="border-b border-card-background/40 w-full" />
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

export default RegisterPage