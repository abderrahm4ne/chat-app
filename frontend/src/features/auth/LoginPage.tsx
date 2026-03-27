import logo from '../../assets/logo.png'
import InputField from '../../components/ui/Field'
import { useState } from 'react'
import SubmitButton from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import google from '../../assets/googl.png'
import facebook from '../../assets/facebook.png'

//
import { useLoginMutation } from '../../store/api/authApi'
import formDataMiddleware from '../../components/ui/formDataMiddleware'

type FormState = {
    email: string
    password: string
}

function LoginPage() {
    const [login, { isLoading }] = useLoginMutation()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    
    const set = (key: keyof FormState) => (v: string) => {
        setFormData(f => ({ ...f, [key]: v }));
    };

    const handleSubmit = async () => {
        setError(null)
        try{
            formDataMiddleware(formData)
            await login(formData).unwrap()
            navigate('/chat')
        }
        catch (error: any){
            if (error.data && error.data.message) {
                setError(error.data.message);
            } 
            else if (error.message) {
                setError(error.message);
            } 
            else {
                setError("An unknown error occurred. Check Network tab.");
            }
        }
    }

  return (
    <div className="relative flex flex-row items-center bg-primary min-w-[95vw] min-h-[90vh] rounded-xl px-6 py-8 " style={{boxShadow: "0 1px 3px darkgreen"}}>
        { /* LEFT SIDE */}
        <div className="flex flex-col w-[50%] px-10 mr-auto ">

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
                    Continue to your Account
                </h1>
            </div>

            {error && (
                <p className='text-red-500 text-sm text-center mb-3'>
                    {error}
                </p>
            )}

            {/* Fields */}
            <div className='flex flex-col items-center self-center w-[67%] space-y-4 mb-10'>
                <InputField name='email' placeholder='Email' value={formData.email} onChange={set('email')}/>
                <InputField name='password' type='password' placeholder='Password' value={formData.password} onChange={set('password')}/>
            </div>
            
            <div className='mb-5 w-[67%] self-center'>
                <SubmitButton loading={isLoading} onClick={handleSubmit} >
                    LOG IN
                </SubmitButton>
            </div>
            

            <div className='place-self-center mb-7'>
                <h2>Don't have an Account? <span className='font-semibold text-[#27AE60] hover:cursor-pointer hover:text-lime-500' onClick={() => navigate('/register')}>Sign up</span></h2>
            </div>
            
            <div className='flex items-center space-x-4 self-center w-[60%] mb-4'>
                <div className='border-0 border-b border-b-lime-600 w-full'/>
                <h2 className='self-center text-nowrap'>or Login with</h2>
                <div className='border-0 border-b border-b-lime-600 w-full'/>
            </div>

            <div className='flex space-x-8 items-center self-center'>
                <img src={google} alt="google" className='w-10 h-10 p-1 hover:cursor-pointer transition-all duration-200 hover:scale-[1.1]'/>
                <img src={facebook} alt="facebook" className='w-10 h-10 p-1 hover:cursor-pointer transition-all duration-200 hover:scale-[1.1]' />
            </div>

        </div>
        
        <div className='border-0 border-r border-black absolute left-1/2 -translate-x-1/2 h-[70vh]' />

        { /* RIGHT SIDE */}
            <div className='grid grid-cols-4 grid-rows-5 ml-auto'>
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="skeleton h-32 w-32"></div>
                ))}
            </div>
    </div>
  )
}

export default LoginPage