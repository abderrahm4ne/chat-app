import { useState } from 'react'
import { Search} from 'lucide-react'
import { useGetUsersQuery } from '../../store/api/userApi'


import type { User } from '../../../types/types'

function ChatPage() {
    const { data: users } = useGetUsersQuery()

    const [search, setSearch] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    

    return (
        <div className='flex items-center justify-center h-screen w-screen px-4'>
            <div className="flex w-[90%] h-[90%] bg-secondary overflow-hidden rounded-xl shadow-lg shadow-black/50 ">

                {/* SIDEBAR */}
                <div className="flex flex-col w-[27%] min-w-65 bg-primary py-4 px-2">

                    {/* header */}
                    <div className="px-5 mb-4">
                        <h1 className="text-2xl font-text-landing-title mb-4">
                            <span className="text-dark-body-text">Qwik</span>
                            <span className="text-primary-text">Chat</span>
                        </h1>

                        {/* search */}
                        <div className="flex items-center gap-2 bg-card-background/20 border border-card-background/30 rounded-lg px-3 py-2">
                            <Search size={15} className="text-dark-body-text/50 shrink-0" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="bg-transparent text-sm text-dark-body-text placeholder:text-dark-body-text/40 outline-none w-full"
                            />
                        </div>
                    </div>

                    {/* friends list */}
                    <div className="flex flex-col overflow-y-auto flex-1 px-2">
                        {users?.map((user: User) => (
                            <div
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-150 ${
                                selectedUser?._id === user._id
                                    ? 'bg-button-background/20 border border-button-background/30'
                                    : 'hover:bg-card-background/20'
                            }`}
                        >
                            {/* avatar */}
                            <div className="relative shrink-0">
                                <div className="w-11 h-11 rounded-full bg-card-background flex items-center justify-center text-white text-sm font-semibold">
                                    {user?.profilePic}
                                </div>
                            </div>

                        </div>
                        ))}
                    </div>
                    
                </div>


                {/* DIVIDER */}
                <div className='border border-card-background/60 h-full self-center' />


                {/* MAIN CHAT  */}
                <div className='w-full'>
                    ad
                </div>

            </div>

            
        </div>
    )
}


export default ChatPage