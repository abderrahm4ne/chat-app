import { useState, useRef } from 'react'
import { Search, MoreVertical, LoaderCircle, MoreHorizontal, Upload, Send } from 'lucide-react'
import { useGetUsersQuery } from '../../store/api/userApi'
import type { AuthResponse, Message } from '../../../types/types'

import toast from 'react-hot-toast'
const toastStyle = {
    className: 'text-xl font-semibold'
}

import { useSendMessageMutation, useGetMessagesQuery } from '../../store/api/messageApi'

const exampleUsers: AuthResponse[] = [
    { _id: '1', email: 'john.doe@qwik.io', fullName: 'John Doe', profilePic: 'a'},
    { _id: '2', email: 'jane.smith@qwik.io', fullName: 'Jane Smith', profilePic: 'a'},
    { _id: '3', email: 'michel.jackson@qwik.io', fullName: 'Michel Jackson', profilePic: 'a'},
]

const selectedExampleUser: AuthResponse = exampleUsers[0]

const exampleMessages: Message[] = [
    { _id: '1', senderId: '1', recieverId: '2', text: 'Hello, how are you?', createdAt: '2023-01-01T00:00:00Z' },
    { _id: '2', senderId: 'me', recieverId: '1', text: "I'm good, thanks!", createdAt: '2023-01-01T00:01:00Z' },
]

const dateFormatter = (date: string) => {
    return new Date(date).toDateString() + ' ' + new Date(date).toLocaleTimeString()
}


function ChatPage() {
    const { data: users, isLoading } = useGetUsersQuery()
    const displayUsers = users ? users : exampleUsers
    const [search, setSearch] = useState<string>('')
    const [selectedUser, setSelectedUser] = useState<AuthResponse>(selectedExampleUser)
    const [messages, setMessage] = useState<Message[] | null>(null)
    const [file, setFile] = useState<string | null>(null)
    const [input, setInput] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement>(null)


    // functions
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length === 1) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFile(reader.result as string)
                toast.success('Image selected', toastStyle)
            }
            reader.readAsDataURL(e.target.files[0])
        }
        handleSendPicture();
    }

    const handleSendMessage = () => {
        if(!input.trim()) {
            toast.error('Message cannot be empty')
        }
        useSendMessageMutation({ userId: selectedUser._id, text: input.trim() })

    }

    const handleSendPicture = () => {
        useSendMessageMutation({ userId: selectedUser._id, image: file})
    }


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }
    

    return (
        <div className='flex items-center justify-center h-screen w-screen px-4'>
            <div className="flex w-[90%] h-[90%] bg-secondary overflow-hidden rounded-xl shadow-lg shadow-black/50 ">

                {/* SIDEBAR */}
                <div className="flex flex-col w-[34%] min-w-65 bg-primary py-4 px-4">

                    {/* header */}
                    <div className=" mb-4">
                        <h1 className="text-3xl font-text-landing-title mb-4">
                            <span className="text-dark-body-text">Qwik</span>
                            <span className="text-primary-text">Chat</span>
                        </h1>

                        {/* search */}
                        <div className="flex items-center gap-2 bg-card-background/20 border border-card-background/30 rounded-lg pl-2 pr-3 py-2">
                            <Search size={19} className="text-dark-body-text shrink-0" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="bg-transparent text-lg text-dark-body-text placeholder:text-dark-body-text/40 outline-none w-full "
                            />
                        </div>
                    </div>

                    {/* friends list */}
                    <div className="flex flex-col overflow-y-auto flex-1 space-y-1  p-1">
                        {isLoading ? <div className='self-center'>
                            <LoaderCircle size={30} className='animate-spin'/>
                        </div> : displayUsers?.map((user: AuthResponse) => (
                            <div
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-150 text-primary-text/80 hover:text-primary-text ${
                                selectedUser?._id === user._id
                                    ? 'bdg-button-background/20 border border-button-background/30'
                                    : 'hover:bg-card-background/20'
                            }`}
                        >
                            {/* avatar */}
                            <div className="relative shrink-0">
                                    <img src={user?.profilePic} className='w-11 h-11 object-cover border rounded-full' alt='img'/>
                            </div>

                            <h2 className='font-semibold '>
                                {user?.fullName}
                            </h2>

                            <MoreHorizontal size={20} className='hover:cursor-pointer text-primary-text/70 hover:text-primary-text ml-auto ' />

                        </div>
                        ))}
                    </div>
                    
                </div>


                {/* DIVIDER */}
                <div className='border border-card-background h-full self-center' />


                {/* MAIN CHAT  */}

                <div className='w-full py-4 px-2 border-l-0 flex flex-col'>
                    {selectedUser && (

                        <div className="flex items-center justify-between px-6 py-4 border-b border-card-background/60">

                            {/* chat header */}
                            <div className="flex items-center gap-3">
                                <img src={selectedUser?.profilePic} className="w-13 h-13 rounded-full bg-card-background flex items-center justify-center text-white text-sm font-semibold text-center" alt="pic" />
                                    
                                <div className="flex flex-col">
                                    <span className="text-md font-semibold text-primary-text">{selectedUser?.fullName}</span>
                                </div>
                            </div>
                            <MoreVertical size={20} className="text-dark-body-text/80 cursor-pointer hover:text-dark-body-text transition-colors" />
                        </div>
                    )}

                    <div className="flex flex-col flex-1 overflow-y-auto px-6 py-4 space-y-2.5">
                        {exampleMessages?.map(msg => (
                            <div key={msg._id} className={`flex flex-col max-w-[60%] ${msg.senderId === 'me' ? 'self-end items-end' : 'self-start items-start'}`}>
                                <div className={`px-4 py-2 rounded-2xl text-md text-white ${
                                    msg.senderId === 'me'
                                        ? 'bg-button-background rounded-br-sm'
                                        : 'bg-card-background rounded-bl-sm'
                                }`}>
                                    {msg.text}
                                </div>
                                <span className="text-[0.65rem] text-dark-body-text/60 mt-1 px-1">{dateFormatter(msg.createdAt)}</span>
                            </div>
                        ))}
                    </div>

                    {/* input bar */}
                    <div className="flex items-center gap-2 px-6 py-4 border-t border-card-background/30">
                        <button className="p-2 rounded-lg bg-card-background/30 hover:bg-card-background/50 transition-colors cursor-pointer border border-card-background/30" onClick={() => fileInputRef.current?.click()}>
                            <Upload size={18} className="text-dark-body-text/60" />
                        </button>
                        <input
                            ref={fileInputRef}
                            type='file'
                            className='hidden'
                            onChange={handleImageChange}
                        />

                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                            className="flex-1 bg-card-background/20 border border-card-background/30 rounded-lg px-4 py-2.5 text-sm text-dark-body-text placeholder:text-dark-body-text/40 outline-none"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="p-2.5 rounded-lg bg-button-background hover:bg-button-hover-background transition-colors cursor-pointer"
                        >
                            <Send size={18} className="text-white" />
                        </button>
                    </div>
                    
                    
                </div>

            </div>

            
        </div>
    )
}


export default ChatPage