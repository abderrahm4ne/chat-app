import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const navigate = useNavigate();

    return (
    <div className="flex items-center justify-center min-h-screen px-4">
        { /* left side */}
        <div className='bg-linear-to-b from-primary to-secondary rounded-xl p-10 shadow-lg shadow-gray-400/50 flex flex-col items-center max-w-lg w-full'>
            <div className='mb-3'>
                <h1 className='text-3xl'><span className='text-dark-body-text'>Qwik</span><span className='text-primary-text'>Chat</span></h1>
            </div>
            <div className='bg-card-background rounded-full px-4 py-1.5 mb-6 border border-primary flex flex-row items-center space-x-2.5'>
                <div className='h-2 w-2 bg-white rounded-full' />
                <h2 className='text-[#FFFFFF] font-text-card'> Now Open in BETA </h2>
            </div>
        </div>
        
    </div>
  )
}

export default LandingPage