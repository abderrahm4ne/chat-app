import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const navigate = useNavigate();

    return (
    <div className="flex items-center justify-center h-screen w-screen px-4">

        { /* left side */}
        <div className='bg-linear-to-b from-primary to-secondary rounded-xl p-10 shadow-lg shadow-gray-400/50 flex flex-col items-start h-[80%] w-xl justify-center'>

            { /* title */}
            <div className='mb-4 font-text-landing-title'>
                <h1 className='text-4xl'><span className='text-dark-body-text'>Qwik</span><span className='text-primary-text'>Chat</span></h1>
            </div>


            { /* BETA tag */}
            <div className='bg-card-background rounded-full px-4 py-1.5 mb-10 border border-primary flex flex-row items-center space-x-2.5'>
                <div className='h-2 w-2 bg-white rounded-full' />
                <h2 className='text-[#FFFFFF] font-text-card'> Now Open in BETA </h2>
            </div>


            { /* Description */}
            <div className='mb-5 flex flex-col space-y-3'>
                <h2 className='text-primary-text text-4xl font-text-description'>Fast Chatting with Friends, </h2>
                <h3 className='text-dark-body-text text-lg text-wrap w-[73%]'>Real-time messaging built for speed. End-to-End encrypted</h3>
            </div>


            { /* BUTTONS */}
            <div className='flex flex-row space-x-5 mb-5'>

                <button className='bg-button-background hover:bg-button-hover-background hover:cursor-pointer text-white px-6 py-2 rounded-lg transition-all hover:scale-[1.02] duration-200 text-xl whitespace-nowrap'>
                    Getting Started
                </button>

                <button className='bg-button-background hover:bg-button-hover-background hover:cursor-pointer text-white px-6 py-2 rounded-lg transition-all hover:scale-[1.02] duration-200 text-xl whitespace-nowrap'>
                    Continue To Your Account
                </button>

            </div>


            { /* DIVIDER */}
            <div className='w-full border border-sidebar-background mb-6'/>

            { /* MORE ABOUT */}
            <div className='flex flex-row space-x-10 items-center font-text-card px-2 w-full'>

                <div className='flex flex-col space-y-1 items-center'>
                    <h2 className='text-2xl'>12ms</h2>
                    <p className='text-[0.8rem]'>avg. latency</p>
                </div>

                <div className='flex flex-col space-y-1 items-center'>
                    <h2 className='text-2xl'>E2E</h2>
                    <p className='text-[0.9rem]'>fully secured</p>
                </div>

                <div className='flex flex-col space-y-1 items-center'>
                    <h2 className='text-2xl'>99.9</h2>
                    <p className='text-[0.8rem]'>up time</p>
                </div>
            </div>
        </div>

        { /* right side */}
        <div className='h-[80%] flex flex-col rounded-2xl px-6 py-3 ml-10 w-[25%] items-center justify-center bg-primary shadow-lg shadow-gray-400/50'>
            
            { /* USER */}
            <div className='flex flex-row space-x-3 mb-4 self-start px-4'>
                <div className='bg-linear-to-br from-pink-500 to-purple-400 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold'> <h1>Y</h1></div>
                <div className='flex flex-col'>
                    <h4 className='font-semibold'>Ysf</h4>
                    <h4 className='text-green'>Online</h4>
                </div>
            </div>

            { /* DIVIDER */}
            <div className='w-full border border-card-background' />
        </div>
        
    </div>
  )
}

export default LandingPage