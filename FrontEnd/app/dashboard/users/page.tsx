'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2'; 
import { UserData, fetchAllUsers, deleteUser } from '@/services/UserService'; 

const UserListItem = ({
    user,
    onRemove,
}: {
    user: UserData;
    onRemove?: (id: string) => void; 
}) => {
    const baseBgColor = '#ffffff';
    const avatarSrc = user.image || '/images/avatarplaceholder.png'; 

    return (
        <div
            className="d-flex flex-column flex-md-row align-items-center p-3 rounded-3 mb-3"
            style={{
                backgroundColor: baseBgColor,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
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
                src={avatarSrc}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-circle object-fit-cover me-3 mb-2 mb-md-0"
            />
            <span className={`fw-medium text-primary mb-2 mb-md-0`}>
                {user.name} ({user.email})
            </span>
            <div className="ms-md-auto d-flex gap-2 flex-wrap">
                <button
                    className="btn btn-sm btn-danger px-3 py-1 fw-bold rounded-3"
                    onClick={() => onRemove && onRemove(user.id)} 
                >
                    Delete User
                </button>
            </div>
        </div>
    );
};

export default function UserRolePage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const fetchedUsers = await fetchAllUsers();
            setUsers(fetchedUsers); 
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal Memuat Data',
                text: `Error fetching user ${error instanceof Error ? error.message : 'Problem unknown'}`,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleRemoveUser = async (id: string) => { 
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Deleting user id : ${id}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            await deleteUser(id); 
            
            setUsers((prev) => prev.filter((user) => user.id !== id));
            
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'User deleted Successfully!',
                timer: 2000,
                showConfirmButton: false
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Delete',
                text: `Failed to delete : ${error instanceof Error ? error.message : 'Problem Unknown'}`,
            });
        }
    };

    const customerList = users.filter(user => user.role === 'customer');

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

    if (loading) {
        return (
            <div className="w-100 position-relative d-flex justify-content-center align-items-center" style={{ ...backgroundStyle, minHeight: '100vh' }}>
                <div 
                    className="p-5 text-center rounded-3 shadow-lg"
                    style={{ backgroundColor: 'white' }}
                >
                    <h1 className="fs-3 fw-bold text-dark">Loading Customer Data...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="w-100 position-relative p-3 p-md-4" style={backgroundStyle}>
            <h1 className="fs-3 fw-bold text-dark mb-4">User Settings</h1>
            
            <div className="bg-white rounded-3 shadow p-3 p-md-4">
                <h2 className="fs-5 fw-semibold text-dark mb-3">Customer List</h2>
                <div className="d-flex flex-column flex-md-row flex-wrap gap-2">
                    {customerList.map((user) => (
                        <div key={user.id} className="flex-fill">
                            <UserListItem user={user} onRemove={handleRemoveUser} />
                        </div>
                    ))}
                </div>
                {customerList.length === 0 && <p className="text-muted text-center mt-3">No customer found</p>}
            </div>
        </div>
    );
}