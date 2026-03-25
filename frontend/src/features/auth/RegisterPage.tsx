import logo from '../../assets/logo.png'
import InputField from '../../components/ui/Field'
import { useState } from 'react'
import SubmitButton from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import google from '../../assets/googl.png'
import facebook from '../../assets/facebook.png'


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
    const navigate = useNavigate()

    const handleSubmit = () => {

    }

  return (
    <div className="flex flex-row bg-primary min-w-[95vw] min-h-[90vh] rounded-xl px-6 py-3" style={{boxShadow: "0 1px 3px darkgreen"}}>
        { /* LEFT SIDE */}
        <div className="flex flex-col  w-[50%] place-self-center px-10">

            { /* LOGO */}
            <div className="flex space-x-3 items-center mb-14">
                <img src={logo} alt="logo" className='w-12 h-12' />
                <h1 className="font-bold md:text-3xl sm:text-md">
                    QwikChat
                </h1>
            </div>

            { /* */}
            <div className='flex flex-col place-self-center mb-7'>
                <h1 className='md:text-3xl text-xl font-semibold text-center'>
                    Create an Account
                </h1>
                <h4 className='md:text-xl sm:text-2xl text-md text-gray-400 text-center'>
                    Join our qwikChat and chat with friends
                </h4>
            </div>

            {/* Fields */}
            <div className='flex flex-col items-center self-center w-[67%] space-y-4 mb-10'>
                <InputField name='fullname' placeholder='Full Name' value={formData.fullName} onChange={set('fullName')}/>
                <InputField name='email' placeholder='Email' value={formData.email} onChange={set('email')}/>
                <InputField name='password' placeholder='Password' value={formData.password} onChange={set('password')}/>
            </div>
            
            <div className='mb-5 w-[67%] self-center'>
                <SubmitButton loading={loading} onClick={handleSubmit} >
                    SIGN UP
                </SubmitButton>
            </div>
            

            <div className='place-self-center mb-7'>
                <h2>Already have an Account? <span className='font-semibold text-[#27AE60] hover:cursor-pointer hover:text-lime-500' onClick={() => navigate('/login')}>Log in</span></h2>
            </div>
            
            <div className='flex items-center space-x-4 self-center w-[60%] mb-4'>
                <div className='border-0 border-b border-b-lime-600 w-full'/>
                <h2 className='self-center text-nowrap'>or Signup with</h2>
                <div className='border-0 border-b border-b-lime-600 w-full'/>
            </div>

            <div className='flex space-x-8 items-center self-center'>
                <img src={google} alt="google" className='w-10 h-10 p-1 hover:cursor-pointer transition-all duration-200 hover:scale-[1.02]'/>
                <img src={facebook} alt="facebook" className='w-10 h-10 p-1 hover:cursor-pointer transition-all duration-200 hover:scale-[1.02]' />
            </div>

        </div>
        

        { /* RIGHT SIDE */}
        <div className='grid grid-cols-4 grid-rows-5'>
            
        </div>
    </div>
  )
}

export default RegisterPage