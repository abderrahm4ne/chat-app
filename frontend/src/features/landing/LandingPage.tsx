import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const navigate = useNavigate();

    return (
    <div className="flex items-center justify-center min-h-screen px-4">
        <div className="flex items-center justify-center flex-col border border-[#27AE60] p-10 rounded-2xl shadow-sm bg-white max-w-md w-full">
            <div>
                <img src={logo} className='mb-5 w-52 h-52' alt="logo"  />
            </div>
            <div className="flex flex-col max-w-100">
                <h1
                    className="md:text-4xl sm:text-3xl text-2xl mb-3"
                    style={{ fontFamily: 'Iosevka Charon Mono' }}
                >
                    Chat#For#Y
                </h1>

                <p className="text-lg font-medium text-gray-800 mb-4">
                    Private messaging for friends and communities.
                </p>

                <ul className="text-sm md:text-base text-gray-700 space-y-2 mb-5">
                    <li>• End-to-end encrypted chats</li>
                    <li>• Talk with friends and new people</li>
                    <li>• Simple, fast, and private</li>
                </ul>

                <p className="text-sm text-gray-500 mb-6">
                    Talk freely. Stay private.
                </p>
            </div>
            <div className="w-full">
            <button
                className="py-3.5 bg-[#27AE60] w-full rounded-xl md:text-xl text-md text-white font-bold tracking-wide transition-all duration-200 shadow-md shadow-[#006e2e]/40 hover:cursor-pointer hover:bg-[#1a974e] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                onClick={() => navigate('/register')}
            >
                JOIN NOW!
            </button>

            <button
                className="w-full mt-3 text-[#27AE60] font-semibold hover:underline cursor-pointer"
                onClick={() => navigate('/login')}
            >
                Already have an account? Log in
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
                Private by ###
            </p>
            </div>
        </div>
    </div>
  )
}

export default LandingPage