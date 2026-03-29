import { useNavigate } from 'react-router-dom'
import landingData from '../../components/data/landingData';
import type { Message } from '../../components/data/landingData';
import { Upload, Send } from 'lucide-react';


function LandingPage() {
    const navigate = useNavigate();

    return (
    <div className="flex items-center justify-center h-screen w-screen px-4">

        {/* left side */}
        <div className='bg-linear-to-b from-primary to-secondary rounded-xl p-10 shadow-lg shadow-gray-400/50 flex flex-col items-start h-[80%] w-auto'>

            {/* title + BETA tag */}
            <div className='mt-20'>
                {/* title */}
                <div className='mb-4 font-text-landing-title'>
                    <h1 className='text-4xl'>
                        <span className='text-dark-body-text'>Qwik</span>
                        <span className='text-primary-text'>Chat</span>
                    </h1>
                </div>

                {/* BETA tag */}
                <div className='bg-card-background/60 rounded-full px-4 py-1.5 mb-6 border border-primary/30 flex flex-row items-center space-x-2.5'>
                    <div className='h-2 w-2 bg-white/50 rounded-full' />
                    <h2 className='text-white/60 font-text-card'>Now Open in BETA</h2>
                </div>
            </div>

            {/* Description + BUTTONS */}
            <div className='flex flex-col space-y-4 mt-6'>
                <h2 className='text-primary-text text-4xl font-text-landing-title'>Fast Chatting with Friends,</h2>
                <h3 className='text-dark-body-text text-lg w-[73%] font-'>Real-time messaging built for speed. End-to-End encrypted</h3>

                <div className='flex flex-row space-x-5 pt-2'>
                    <button
                        onClick={() => navigate('/register')}
                        className='bg-button-background hover:bg-button-hover-background text-white px-6 py-2 rounded-lg transition-all hover:cursor-pointer hover:scale-[1.02] duration-200 text-xl whitespace-nowrap'>
                        Getting Started
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className='border border-button-background hover:bg-button-background text-button-background hover:text-white px-6 py-2 rounded-lg hover:cursor-pointer transition-all hover:scale-[1.02] duration-200 text-xl whitespace-nowrap'>
                        Continue To Your Account
                    </button>
                </div>
            </div>

            {/* DIVIDER */}
            <div className='w-full border border-sidebar-background mb-6 mt-auto'/>

            {/* MORE ABOUT */}
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
        <div className='h-[80%] flex flex-col rounded-2xl px-6 py-4 ml-10 w-[21%] items-center bg-primary shadow-lg shadow-gray-400/90 -skew-z-1 '>
            
            { /* USER */}
            <div className='flex flex-row space-x-3 mb-4 self-start px-4 '>
                <div className='bg-linear-to-br from-pink-500 to-purple-400 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold'> <h1>Y</h1></div>
                <div className='flex flex-col'>
                    <h4 className='font-semibold'>Ysf</h4>
                    <h4 className='text-green'>Online</h4>
                </div>
            </div>

            { /* DIVIDER */}
            <div className='w-full border border-card-background/40 mb-4' />

            { /* BUTTONS */}
            <div className='flex flex-col space-y-2.5 w-full mb-4'>
                {landingData.map((msg: Message) => (
                    <div
                        key={msg.id}
                        className={` text-white text-md px-3 py-1.5 rounded-xl max-w-[80%] ${
                            msg.sender === 'ysf' ? 'self-start bg-card-background' : 'self-end bg-button-background'
                        }`}
                    >
                        <p>{msg.text}</p>
                        <p className={msg.sender === 'ysf' ? 'text-left' : 'text-right'}>
                            {msg.time}
                        </p>
                    </div>
                ))}
            </div>

            { /* DIVIDER */}
            <div className='w-full border border-card-background/40 mb-4 mt-auto' />

            { /* send message or image fields */}
            <div className='flex flex-row items-center w-full space-x-1'>

                <input 
                    placeholder='Type your message...'
                    className='bg-input-field-background text-primary-text placeholder:text-secondary-text outline-none px-3.5 py-2.5 border border-card-background rounded-lg text-sm w-full'
                />
                <div 
                    className='bg-secondary text-black px-3.5 py-2 rounded-md hover:cursor-pointer border   border-card-background'><Upload /></div>
                <div 
                    className='bg-secondary text-black px-3.5 py-2 rounded-md hover:cursor-pointer border border-card-background'>
                        <Send />
                </div>

            </div>
        </div>
        
    </div>
  )
}

export default LandingPage