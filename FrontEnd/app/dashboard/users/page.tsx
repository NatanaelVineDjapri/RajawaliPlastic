'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MessageSquare, UserX } from 'lucide-react';

type UserData = { id: number; name: string; role: string; avatar: string; };

const initialAdminList: UserData[] = [
    { id: 1, name: 'Admin 001', role: 'Owner', avatar: '/images/avatarplaceholder.png' },
    { id: 2, name: 'Admin 002', role: 'Admin', avatar: '/images/avatarplaceholder.png' },
    { id: 3, name: 'Admin 003', role: 'Admin', avatar: '/images/avatarplaceholder.png' },
];

const initialUserList: UserData[] = [
    { id: 101, name: 'User_001', role: 'User', avatar: '/images/avatarplaceholder.png' },
    { id: 102, name: 'User_002', role: 'User', avatar: '/images/avatarplaceholder.png' },
    { id: 103, name: 'User_003', role: 'User', avatar: '/images/avatarplaceholder.png' },
];

const UserListItem = ({
    user,
    isAdmin,
    onRemove,
}: {
    user: UserData;
    isAdmin: boolean;
    onRemove?: (id: number) => void;
}) => {
    const router = useRouter();
    const baseBgColor = '#ffffff';

    return (
        <div
            className="d-flex align-items-center p-3 rounded-3 mb-2 border-0"
            style={{
                backgroundColor: baseBgColor,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                transition: 'background-color 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = baseBgColor;
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
            }}
        >
            <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="rounded-circle object-fit-cover me-3"
            />
            <span className={`fw-medium ${isAdmin ? 'text-dark' : 'text-primary'}`}>
                {user.name}
            </span>
            {!isAdmin && (
                <div className="ms-auto d-flex gap-2">
                    <button
                        className="btn btn-sm rounded-circle p-1"
                        style={{ backgroundColor: '#e0e9ff', borderColor: '#d1e7ff', width: '32px', height: '32px' }}
                        onClick={() => router.push(`chat`)}
                    >
                        <MessageSquare size={20} className="text-primary" />
                    </button>
                    <button
                        className="btn btn-sm btn-danger px-3 py-1 fw-bold rounded-3"
                        onClick={() => onRemove && onRemove(user.id)}
                    >
                        Ban
                    </button>
                    <button
                        className="btn btn-sm rounded-circle p-1"
                        style={{ backgroundColor: '#f8d7da', borderColor: '#f5c6cb', width: '32px', height: '32px' }}
                        onClick={() => onRemove && onRemove(user.id)}
                    >
                        <UserX size={20} className="text-danger" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default function UserRolePage() {
    const [adminList] = useState(initialAdminList);
    const [userList, setUserList] = useState(initialUserList);

    const handleRemoveUser = (id: number) => {
        setUserList((prev) => prev.filter((user) => user.id !== id));
    };

    const backgroundStyle = {
        backgroundColor: '#C0FBFF',
        overflow: 'hidden',
        minHeight: '100vh',
        backgroundImage: `
            radial-gradient(circle at 35% 30%, rgba(135, 206, 250, 0.6) 200px, transparent 200px), 
            radial-gradient(circle at 65% 30%, rgba(192, 164, 255, 0.6) 200px, transparent 200px),
            radial-gradient(circle at 50% 65%, rgba(150, 200, 255, 0.6) 200px, transparent 200px)
        `,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div className="w-100 position-relative p-4" style={backgroundStyle}>
            <h1 className="fs-3 fw-bold text-dark mb-4">User & Role</h1>

            <div className="bg-white rounded-3 shadow p-4 mb-5" style={{ position: 'relative', zIndex: 10 }}>
                <h2 className="fs-5 fw-semibold text-dark mb-3">Admin List</h2>
                <div className="mb-4">
                    {adminList.map((admin) => (
                        <UserListItem key={admin.id} user={admin} isAdmin={true} />
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-3 shadow p-4" style={{ position: 'relative', zIndex: 10 }}>
                <h2 className="fs-5 fw-semibold text-dark mb-3">User settings</h2>
                <div>
                    {userList.map((user) => (
                        <UserListItem key={user.id} user={user} isAdmin={false} onRemove={handleRemoveUser} />
                    ))}
                </div>
            </div>
        </div>
    );
}