import { useState, useRef, useEffect } from 'react'
import { Search, MoreVertical, LoaderCircle, Upload, Send, MessageCircle, ArrowLeft } from 'lucide-react'
import { useGetUsersQuery } from '../../store/api/userApi'
import type { AuthResponse } from '../../../types/types'
import { setSelectedUser } from '../../store/slices/chatSlice'
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../components/hooks/useTheme.tsx'
import { Moon, Sun, User, Trash2, Ban, X } from 'lucide-react'

import toast from 'react-hot-toast'
const toastStyle = { className: 'text-xl font-semibold' }

import { useLogoutMutation } from '../../store/api/authApi'
import { useSendMessageMutation, useGetMessagesQuery } from '../../store/api/messageApi'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'

import { socket } from '../../store/socket'
import type { Message } from '../../../types/types.ts'
import { messageApi } from '../../store/api/messageApi'
import { incrementUnread } from '../../store/slices/chatSlice'

const dateFormatter = (date: string) => {
    if(!date) return 'No Date'
    const d = new Date(date)
    if (isNaN(d.getTime())) return 'Invalid Date'
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
}

const menuActions = [
    { label: 'View Profile', icon: User },
    { label: 'Clear Chat',   icon: Trash2 },
    { label: 'Block User',   icon: Ban },
    { label: 'Close Chat',   icon: X },
]

function ChatPage() {
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()
    const dispatch = useAppDispatch()

    const authUser      = useAppSelector(s => s.auth.user)
    const selectedUser  = useAppSelector(s => s.chat.selectedUser)
    const onlineUsers   = useAppSelector(s => s.chat.onlineUsers)
    const unReadMessages = useAppSelector(s => s.chat.unReadMessages)

    const { data: users, isLoading: usersIsLoading } = useGetUsersQuery()
    const displayUsers = usersIsLoading ? [] : (users ?? [])

    const [isTyping,      setIsTyping]      = useState(false)
    const [search,        setSearch]        = useState('')
    const [input,         setInput]         = useState('')
    const [hiddenLogOut,  setHiddenLogOut]  = useState(true)
    const [showUserMenu,  setShowUserMenu]  = useState(false)
    
    // mobile: 'sidebar' | 'chat'
    const [mobileView,    setMobileView]    = useState<'sidebar' | 'chat'>('sidebar')

    const fileInputRef  = useRef<HTMLInputElement>(null)
    const logOutRef     = useRef<HTMLDivElement>(null)
    const userMenuRef   = useRef<HTMLDivElement>(null)
    const messageEndRef = useRef<HTMLDivElement>(null)
    const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    // swipe state
    const touchStartX = useRef<number | null>(null)

    const [logout]      = useLogoutMutation()
    const [sendMessage] = useSendMessageMutation()
    const { data: messages, isLoading } = useGetMessagesQuery(
        selectedUser?._id ?? '', { skip: !selectedUser }
    )

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const filteredUsers = displayUsers.filter(u =>
        u.fullName.toLowerCase().includes(search.toLowerCase())
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        socket.emit('typing', { receiverId: selectedUser?._id })
        if (typingTimeout.current) clearTimeout(typingTimeout.current)
        typingTimeout.current = setTimeout(() => {
            socket.emit('stopTyping', { receiverId: selectedUser?._id })
        }, 1000)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedUser) return
        if (e.target.files && e.target.files.length === 1) {
            const reader = new FileReader()
            reader.onloadend = () => {
                sendMessage({ receiverId: selectedUser._id, image: reader.result as string })
                toast.success('Image selected', toastStyle)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSendMessage = () => {
        if (!selectedUser) return
        if (!input.trim()) { toast.error('Message cannot be empty'); return }
        sendMessage({ receiverId: selectedUser._id, text: input.trim() })
        setInput('')
    }

    const handleLogOut = () => {
        logout()
        navigate('/')
        toast.success('Logged out successfully', toastStyle)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSendMessage()
    }

    const handleSelectUser = (user: AuthResponse) => {
        dispatch(setSelectedUser(user))
        setMobileView('chat')
    }

    const handleMenuAction = (label: string) => {
        if (label === 'Close Chat') {
            dispatch(setSelectedUser(null))
            setMobileView('sidebar')
        }
        setShowUserMenu(false)
    }

    // swipe right → back to sidebar
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return
        const diff = e.changedTouches[0].clientX - touchStartX.current
        if (diff > 60) setMobileView('sidebar')
        touchStartX.current = null
    }

    useEffect(() => {
        if (!selectedUser) return
        const handleNewMessage = (message: Message) => {
            if (message.senderId === selectedUser._id) {
                dispatch(messageApi.util.updateQueryData('getMessages', selectedUser._id, draft => { draft.push(message) }))
            } else {
                dispatch(incrementUnread(message.senderId))
            }
        }
        socket.on('newMessage', handleNewMessage)
        return () => { socket.off('newMessage', handleNewMessage) }
    }, [selectedUser?._id])

    useEffect(() => {
        const h = () => setIsTyping(true)
        const s = () => setIsTyping(false)
        socket.on('typing', h)
        socket.on('stopTyping', s)
        return () => { socket.off('typing', h); socket.off('stopTyping', s) }
    }, [])

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (logOutRef.current && !logOutRef.current.contains(e.target as Node)) setHiddenLogOut(true)
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    /* ── SIDEBAR ── */
    const Sidebar = (
        <div className={`
            flex flex-col bg-primary py-4 px-4
            md:w-[34%] md:min-w-65 md:flex md:relative md:translate-x-0
            absolute inset-0 z-10 w-full transition-transform duration-300
            ${mobileView === 'sidebar' ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
        `}>
            {/* Header row */}
            <div className="flex items-center justify-between mb-3 bg-card-background/20 px-3 py-2 rounded-xl">
                <h1 className="text-2xl font-text-landing-title">
                    <span className="text-dark-body-text">Qwik</span>
                    <span className="text-primary-text">Chat</span>
                </h1>
                <div className="flex items-center gap-3">
                    {theme === 'dark'
                        ? <Moon size={18} onClick={toggleTheme} className="cursor-pointer text-primary-text/70 hover:text-primary-text transition-colors" />
                        : <Sun  size={18} onClick={toggleTheme} className="cursor-pointer text-primary-text/70 hover:text-primary-text transition-colors" />
                    }
                    <div className="relative" ref={logOutRef}>
                        <LogOut
                            size={18}
                            className="cursor-pointer text-primary-text/70 hover:text-primary-text transition-colors"
                            onClick={() => setHiddenLogOut(p => !p)}
                        />
                        <div
                            onClick={handleLogOut}
                            className={`absolute top-7 right-0 w-24 px-2 py-1 flex items-center justify-center text-sm
                            bg-button-background/80 rounded-md hover:bg-button-background cursor-pointer
                            transition-all duration-300 ease-in-out z-50
                            ${hiddenLogOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        >
                            Log Out
                        </div>
                    </div>
                </div>
            </div>

            {/* Current user */}
            <div className="flex items-center gap-2 mb-4 px-1">
                <img
                    src={authUser?.profilePic || '/default-avatar.png'}
                    className="w-8 h-8 rounded-full object-cover border border-card-background/40"
                    alt="you"
                />
                <span className="text-sm font-semibold text-primary-text truncate">{authUser?.fullName}</span>
                <div className="w-2 h-2 bg-green-700 rounded-full shrink-0" />
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-card-background/20 border border-card-background/30 rounded-lg pl-2 pr-3 py-2 mb-4">
                <Search size={19} className="text-dark-body-text shrink-0" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="bg-transparent text-lg text-dark-body-text placeholder:text-dark-body-text/40 outline-none w-full"
                />
            </div>

            {/* Users list */}
            <div className="flex flex-col overflow-y-auto flex-1 space-y-1 p-1">
                {usersIsLoading ? (
                    <div className="self-center"><LoaderCircle size={30} className="animate-spin" /></div>
                ) : filteredUsers.length === 0 ? (
                    <p className="self-center text-sm text-dark-body-text/40">No users found</p>
                ) : filteredUsers.map((user: AuthResponse) => (
                    <div
                        key={user._id}
                        onClick={() => handleSelectUser(user)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-150
                        text-primary-text/80 hover:text-primary-text font-text-rubik ${
                            selectedUser?._id === user._id
                                ? 'bg-button-background/20 border border-button-background/30'
                                : 'hover:bg-card-background/20'
                        }`}
                    >
                        <div className="relative shrink-0">
                            <img src={user.profilePic} className="w-11 h-11 object-cover border rounded-full" alt="img" />
                        </div>
                        <span className="font-semibold truncate flex-1">{user.fullName}</span>
                        {onlineUsers?.includes(user._id) && <div className="w-2.5 h-2.5 bg-green-700 rounded-full shrink-0" />}
                        {unReadMessages[user._id] > 0 && (
                            <div className="bg-button-background text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                                {unReadMessages[user._id]}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )

    /* ── CHAT PANEL ── */
    const ChatPanel = (
        <div
            className={`
                flex flex-col w-full
                absolute inset-0 z-10 transition-transform duration-300
                ${mobileView === 'chat' ? 'translate-x-0' : 'translate-x-full'}
                md:relative md:translate-x-0
            `}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {!selectedUser && (
                <div className="flex flex-col items-center justify-center w-full h-full space-y-3 text-dark-body-text/60">
                    <MessageCircle size={48} strokeWidth={1} />
                    <p className="text-lg select-none">Select a conversation to start chatting</p>
                </div>
            )}

            {selectedUser && (
                <>
                    {/* Chat header */}
                    <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-card-background/60">
                        <div className="flex items-center gap-3">
                            {/* Back button — mobile only */}
                            <button
                                className="md:hidden p-1 text-dark-body-text/70 hover:text-dark-body-text transition-colors"
                                onClick={() => setMobileView('sidebar')}
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <img src={selectedUser.profilePic} className="w-11 h-11 rounded-full object-cover" alt="pic" />
                            <div className="flex flex-col">
                                <span className="text-md font-semibold text-primary-text">{selectedUser.fullName}</span>
                                {isTyping
                                    ? <span className="text-xs text-dark-body-text/50 animate-pulse">typing...</span>
                                    : <span className="text-xs text-dark-body-text/40">{onlineUsers?.includes(selectedUser._id) ? 'Online' : 'Offline'}</span>
                                }
                            </div>
                        </div>

                        {/* 3-dot menu */}
                        <div className="relative" ref={userMenuRef}>
                            <MoreVertical
                                size={20}
                                className="text-dark-body-text/80 cursor-pointer hover:text-dark-body-text transition-colors"
                                onClick={() => setShowUserMenu(p => !p)}
                            />
                            <div className={`absolute top-8 right-0 w-44 bg-secondary border border-card-background/30
                                rounded-xl shadow-lg shadow-black/20 overflow-hidden z-50
                                transition-all duration-300 ease-in-out
                                ${showUserMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                            >
                                {menuActions.map(({ label, icon: Icon }) => (
                                    <div
                                        key={label}
                                        onClick={() => handleMenuAction(label)}
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-dark-body-text
                                        hover:bg-card-background/20 cursor-pointer transition-colors"
                                    >
                                        <Icon size={15} className="shrink-0" />
                                        <span>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    {isLoading ? (
                        <div className="flex flex-col flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={`h-10 w-48 bg-card-background/30 rounded-lg animate-pulse ${i % 2 === 0 ? 'self-start' : 'self-end'}`} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-2">
                            {messages?.map(msg => (
                                <div
                                    key={msg._id}
                                    className={`group relative flex flex-col max-w-[80%] md:max-w-[60%]
                                    ${msg.senderId === authUser?._id ? 'self-end items-end' : 'self-start items-start'}`}
                                >
                                    {msg.text ? (
                                        <div className={`px-4 py-2 rounded-lg text-base md:text-lg text-white ${
                                            msg.senderId === authUser?._id
                                                ? 'bg-button-background rounded-br-sm'
                                                : 'bg-card-background rounded-bl-sm'
                                        }`}>
                                            {msg.text}
                                        </div>
                                    ) : (
                                        <img src={msg.image} alt="sent-img" className="w-48 md:w-100 h-auto rounded-lg" />
                                    )}
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[0.65rem] text-dark-body-text/80 mt-1 px-1">
                                        {msg?.createdAt && dateFormatter(msg.createdAt)}
                                    </span>
                                </div>
                            ))}
                            <div ref={messageEndRef} />
                        </div>
                    )}

                    {/* Input bar */}
                    <div className="flex items-center gap-2 px-4 md:px-6 py-4 border-t border-card-background/30 h-20">
                        <button
                            className="px-3 md:px-5 py-3 rounded-lg bg-input-field-background/60 hover:bg-input-field-background
                            transition-all cursor-pointer border border-card-background/30 active:scale-[1.04] shrink-0"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload size={20} className="text-dark-body-text/60" />
                        </button>
                        <input ref={fileInputRef} type="file" className="hidden" onChange={handleImageChange} />
                        <input
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                            className="flex-1 bg-input-field-background/60 border border-card-background/30 rounded-lg
                            px-4 py-2.5 text-base md:text-lg text-dark-body-text placeholder:text-dark-body-text/40 outline-none h-full"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="py-3 px-3 md:px-5 rounded-lg bg-button-background hover:bg-button-hover-background
                            transition-all cursor-pointer active:scale-[1.04] shrink-0"
                        >
                            <Send size={20} className="text-white" />
                        </button>
                    </div>
                </>
            )}
        </div>
    )

    return (
        <div className="flex items-center justify-center h-screen w-screen px-0 md:px-4 bg-linear-to-br from-bg to-bg2">
            <div className="relative flex w-full md:w-[90%] h-full md:h-[90%] bg-secondary overflow-hidden md:rounded-xl shadow-lg shadow-black/50">
                {Sidebar}
                {/* Divider — desktop only */}
                <div className="hidden md:block border border-card-background h-full self-center" />
                {ChatPanel}
            </div>
        </div>
    )
}

export default ChatPage