import { useNavigate } from 'react-router-dom'
import landingData from '../../components/data/landingData';
import type { Message } from '../../components/data/landingData';
import { Upload, Send } from 'lucide-react';
import { useTheme } from '../../components/hooks/useTheme';
import { Moon, Sun } from 'lucide-react'

function LandingPage() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme()

    return (
    <div className="flex items-center justify-center min-h-screen w-screen px-12 bg-linear-to-br from-bg to-bg2">
        <div className="flex flex-row items-stretch justify-center w-full max-w-6xl h-[600px] gap-6">

            {/* left side */}
            <div className='bg-linear-to-b from-primary to-secondary rounded-2xl shadow-xl shadow-shadow/30 flex flex-col items-start p-8 gap-6 flex-1 h-full'>

                {/* title + BETA tag */}
                <div className='flex flex-col gap-4'>
                    <div className='font-text-landing-title'>
                        <h1 className='text-4xl tracking-tight'>
                            <span className='text-dark-body-text'>Qwik</span>
                            <span className='text-primary-text font-bold'>Chat</span>
                        </h1>
                    </div>

                    <div className='bg-card-background/30 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/5 flex flex-row items-center gap-2.5 w-fit shadow-sm'>
                        <div className='relative flex h-1.5 w-1.5'>
                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-text opacity-75'></span>
                            <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-text'></span>
                        </div>
                        <h2 className='text-white/90 font-mono text-[9px] font-bold tracking-[0.2em] uppercase'>V1.0.2 BETA</h2>
                    </div>
                </div>

                {/* Description + BUTTONS */}
                <div className='flex flex-col gap-6 mt-auto'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-primary-text text-3xl font-text-landing-title leading-tight'>Fast Chatting with Friends,</h2>
                        <h3 className='text-dark-body-text text-base max-w-sm opacity-75 font-light leading-relaxed'>Real-time messaging built for speed. End-to-End encrypted and ready for scale.</h3>
                    </div>

                    <div className='flex flex-row gap-4'>
                        <button
                            onClick={() => navigate('/register')}
                            className='bg-button-background hover:bg-button-hover-background text-white px-8 py-3 rounded-lg transition-all hover:cursor-pointer hover:scale-[1.02] active:scale-95 duration-200 text-base font-bold shadow-lg shadow-button-background/10'>
                            Get Started
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className='border border-button-background/40 hover:border-button-background hover:bg-button-background/5 text-button-background px-8 py-3 rounded-lg hover:cursor-pointer transition-all hover:scale-[1.02] active:scale-95 duration-200 text-base font-bold'>
                            Log In
                        </button>
                    </div>
                </div>

                {/* DIVIDER & MORE ABOUT */}
                <div className='mt-auto w-full flex flex-col gap-6'>
                    <div className='w-full border-t border-sidebar-background/10'/>
                    
                    <div className='flex flex-row items-center justify-between font-text-card w-full text-primary-text'>
                        <div className='flex gap-10'>
                            <div className='flex flex-col gap-0.5'>
                                <h2 className='text-2xl font-black'>12ms</h2>
                                <p className='text-[9px] opacity-50 uppercase font-bold tracking-[0.2em]'>latency</p>
                            </div>
                            <div className='flex flex-col gap-0.5'>
                                <h2 className='text-2xl font-black'>E2E</h2>
                                <p className='text-[9px] opacity-50 uppercase font-bold tracking-[0.2em]'>secured</p>
                            </div>
                            <div className='flex flex-col gap-0.5'>
                                <h2 className='text-2xl font-black'>99.9%</h2>
                                <p className='text-[9px] opacity-50 uppercase font-bold tracking-[0.2em]'>uptime</p>
                            </div>
                        </div>
                        
                        <div className='p-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer' onClick={toggleTheme}>
                            {theme === 'dark' ? 
                                <Moon color='white' size={20} /> : 
                                <Sun size={20} />
                            }
                        </div>
                    </div>
                </div>
            </div>

            { /* right side */}
            <div className='flex flex-col rounded-2xl w-[340px] bg-primary shadow-xl shadow-shadow/30 p-6 gap-5 relative overflow-hidden h-full'>
                
                { /* USER */}
                <div className='flex flex-row items-center gap-3'>
                    <div className='bg-linear-to-br from-pink-500 to-purple-400 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-md'> 
                        <span className='text-xl'>Y</span>
                    </div>
                    <div className='flex flex-col'>
                        <h4 className='font-bold text-primary-text text-base'>Ysf</h4>
                        <div className='flex items-center gap-1.5'>
                            <div className='relative flex h-2 w-2'>
                                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75'></span>
                                <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500'></span>
                            </div>
                            <h4 className='text-xs text-green-500 font-semibold'>Online</h4>
                        </div>
                    </div>
                </div>

                <div className='w-full border-b border-card-background/10' />

                { /* CHAT MESSAGES */}
                <div className='flex flex-col w-full gap-3 overflow-y-auto flex-1 pr-1 custom-scrollbar'>
                    {landingData.map((msg: Message) => (
                        <div
                            key={msg.id}
                            className={`text-white text-xs px-4 py-2.5 rounded-xl max-w-[85%] shadow-sm leading-relaxed ${
                                msg.sender === 'ysf' ? 'self-start bg-card-background rounded-tl-none' : 'self-end bg-button-background rounded-tr-none'
                            }`}
                        >
                            <p>{msg.text}</p>
                            <p className={`text-[9px] mt-1 opacity-40 font-medium ${msg.sender === 'ysf' ? 'text-left' : 'text-right'}`}>
                                {msg.time}
                            </p>
                        </div>
                    ))}
                </div>

                <div className='w-full border-t border-card-background/10 pt-5 mt-auto' />

                { /* INPUT FIELD AREA */}
                <div className='flex flex-row items-center w-full gap-2.5'>
                    <input 
                        placeholder='Type your message...'
                        className='bg-input-field-background text-primary-text placeholder:text-secondary-text/30 outline-none px-4 py-3 border border-card-background/30 rounded-xl text-xs flex-1 transition-all focus:border-button-background/30'
                    />
                    <button className='bg-card-background text-primary-text p-3 rounded-xl hover:bg-card-background/80 transition-all border border-card-background'>
                        <Upload size={16} />
                    </button>
                    <button className='bg-button-background text-white p-3 rounded-xl hover:opacity-90 transition-all shadow-md shadow-button-background/10'>
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage