import logo from '../../assets/logo.png'
import InputField from '../../components/ui/Field'
import { useState } from 'react'
import SubmitButton from '../../components/ui/Button'

type FormState = {
    fullName: string
    email: string
    password: string
}

function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    
    const set = (key: keyof FormState) => (v: string) => {
        setFormData(f => ({ ...f, [key]: v }));
    };

    const handleSubmit = () => {

    }

  return (
    <div className="flex flex-row bg-primary min-w-[90vw] rounded-xl px-6 py-3" style={{boxShadow: "0 2px 5px rgba(0, 59, 255, 0.8)"}}>
        { /* LEFT SIDE */}
        <div className="flex flex-col space-y-10 w-[50%] ">

            { /* LOGO */}
            <div className="flex space-x-3 items-center">
                <img src={logo} alt="logo" className='w-7 h-7' />
                <h1 className="font-bold md:text-xl sm:text-md">
                    QwikChat
                </h1>
            </div>

            { /* */}
            <div className='flex flex-col place-self-center'>
                <h1 className='md:text-3xl text-xl font-semibold text-center'>
                    Create an Account
                </h1>
                <h4 className='md:text-xl sm:text-2xl text-md text-gray-400 text-center'>
                    Join our qwikChat and chat with friends
                </h4>
            </div>

            {/* Fields */}
            <div className='flex flex-col items-center self-center w-[67%] space-y-4'>
                <InputField name='fullname' placeholder='Full Name' value={formData.fullName} onChange={set('fullName')}/>
                <InputField name='email' placeholder='Email' value={formData.email} onChange={set('email')}/>
                <InputField name='password' placeholder='Password' value={formData.password} onChange={set('password')}/>
            </div>

            <SubmitButton loading={loading} onClick={handleSubmit}>
                SIGN UP
            </SubmitButton>

        </div>

        { /* RIGHT SIDE */}
        <div className='grid grid-cols-4 grid-rows-5'>
            
        </div>
    </div>
  )
}

export default RegisterPage