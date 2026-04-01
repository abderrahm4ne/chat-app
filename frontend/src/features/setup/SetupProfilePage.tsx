import InputField from '../../components/ui/Field'
import SubmitButton from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { Camera } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'

// lucide-react
import { LoaderCircle } from 'lucide-react';
const toastStyle = {
    className: 'text-xl font-semibold'
}

import { useGetMeQuery, useSetupProfileMutation } from '../../store/api/authApi'
import toast from 'react-hot-toast'

function SetupProfilePage() {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)

    const user = useSelector((state: RootState) => state.auth.user)
    const [setupProfile] = useSetupProfileMutation()
    const { isLoading } = useGetMeQuery()

    const [preview, setPreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [originalImage, setOriginalImage] = useState<string | null>(user?.profilePic || null)

    useEffect(() => {
        setPreview(user?.profilePic || null);
        setOriginalImage(user?.profilePic || null)
    }, [user?.profilePic])



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string)
                toast.success('Image uploaded successfully!', toastStyle)
            }
            reader.readAsDataURL(file);
        }
    }

    const handleSave = async () => {
        try {
            if(preview === originalImage) {
                toast('No changes to save!', toastStyle);
                navigate('/chat');
                return;
            }
            await setupProfile({ profilePic: preview }).unwrap();
            setError(null)
            toast('Profile saved successfully!', toastStyle)
            setTimeout(() => navigate('/chat'), 1300)
        }
        catch (error) {
            setError("Failed to save profile");
            console.error("Error saving profile:", error);
            toast.error('Failed to save profile!', toastStyle)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen px-4">
            <div className="bg-linear-to-b from-primary to-secondary rounded-xl shadow-lg shadow-gray-400/50 flex flex-row h-[80%] w-[65%] overflow-hidden">

                {/* left side */}
                <div className="flex flex-col w-[42%] p-10 justify-center mb-20">

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
                            Setup Your Profile
                        </h2>
                        <p className="text-dark-body-text text-lg w-[80%]">
                            Complete this step so your friends can find you.
                        </p>
                    </div>


                </div>

                {/* DIVIDER */}
                <div className="border border-card-background/60 h-[80%] self-center" />

                {/* right side */}
                <div className="flex flex-col justify-center w-[58%] px-12 py-10">

                    <h1 className="text-3xl font-text-landing-title text-dark-body-text mb-1">
                        Setup your profile
                    </h1>
                    <p className="text-dark-body-text text-sm mb-10">
                        Complete this step so your friends find you.
                    </p>

                    {/* avatar upload */}
                    {isLoading ? (<div className='self-center text-4xl'><LoaderCircle className='animate-spin' /></div>) :
                    <div className="flex flex-col items-center mb-10">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="relative w-24 h-24 rounded-full bg-card-background/40 border-2 border-dashed border-card-background hover:border-primary-text hover:cursor-pointer transition-all duration-200 flex items-center justify-center overflow-hidden group"
                        >
                            {preview ? (
                                <img src={preview} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                                <Camera className="text-dark-body-text/50 group-hover:text-primary-text transition-colors" size={28} />
                            )}

                            {/* overlay on hover */}
                            {preview && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="text-white" size={22} />
                                </div>
                            )}
                        </div>

                        <p className="text-dark-body-text text-sm mt-3">
                            Click to upload profile picture
                        </p>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                    }
                    

                    {/* disabled fields */}
                    <div className="flex flex-col space-y-4 mb-8">
                        <div className="opacity-50 cursor-not-allowed">
                            <InputField
                                name="fullName"
                                placeholder="Full Name"
                                value={user?.fullName ?? ''}
                                onChange={() => {}}
                                disabled={true}
                            />
                        </div>
                        <div className="opacity-50 cursor-not-allowed">
                            <InputField
                                name="email"
                                placeholder="Email"
                                value={user?.email ?? ''}
                                onChange={() => {}}
                                disabled={true}
                            />
                        </div>
                    </div>

                    <SubmitButton onClick={handleSave}>
                        Save & Continue
                    </SubmitButton>

                    {error && <p className='text-xl mt-10 text-red-700'>{error}</p>}

                </div>
            </div>
        </div>
    )
}

export default SetupProfilePage