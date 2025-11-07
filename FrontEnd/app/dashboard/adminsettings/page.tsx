'use client';

import React, { useState } from 'react';
import { Camera, Edit2, Check, X } from 'lucide-react'; 

export default function AdminSettingsPage() {
  const [username, setUsername] = useState('MoniRoy67');
  const [isUsernameEditing, setIsUsernameEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState('MoniRoy67'); 
  const [email, setEmail] = useState('moniroy67@gmail.com');
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [tempEmail, setTempEmail] = useState('moniroy67@gmail.com');
  const [password, setPassword] = useState('*********');
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [tempPassword, setTempPassword] = useState('*********');

  const handleEdit = (type: 'username' | 'email' | 'password') => {
    if (type === 'username') {
      setTempUsername(username);
      setIsUsernameEditing(true);
    } else if (type === 'email') {
      setTempEmail(email);
      setIsEmailEditing(true);
    } else if (type === 'password') {
      setTempPassword(password);
      setIsPasswordEditing(true);
    }
  };

  const handleSave = (type: 'username' | 'email' | 'password') => {
    if (type === 'username') {
      setUsername(tempUsername);
      setIsUsernameEditing(false);
    } else if (type === 'email') {
      setEmail(tempEmail);
      setIsEmailEditing(false);
    } else if (type === 'password') {
      setPassword(tempPassword);
      setIsPasswordEditing(false);
    }
  };

  const handleCancel = (type: 'username' | 'email' | 'password') => {
    if (type === 'username') {
      setTempUsername(username);
      setIsUsernameEditing(false);
    } else if (type === 'email') {
      setTempEmail(email);
      setIsEmailEditing(false);
    } else if (type === 'password') {
      setTempPassword(password);
      setIsPasswordEditing(false);
    }
  };

  const ActionButtons = ({ isEditing, onEdit, onSave, onCancel }: {
    type: 'username' | 'email' | 'password',
    isEditing: boolean,
    onEdit: () => void,
    onSave: () => void,
    onCancel: () => void
  }) => {
    if (isEditing) {
      return (
        <>
          <span 
            className="input-group-text bg-white border-start-0" 
            style={{ height: '45px', cursor: 'pointer' }}
            onClick={onSave}
          >
            <Check size={18} className="text-success" />
          </span>
          <span 
            className="input-group-text bg-white border-start-0 rounded-end-3" 
            style={{ height: '45px', cursor: 'pointer' }}
            onClick={onCancel}
          >
            <X size={18} className="text-danger" />
          </span>
        </>
      );
    } else {
      return (
        <span 
          className="input-group-text bg-white border-start-0 rounded-end-3" 
          style={{ height: '45px', cursor: 'pointer' }}
          onClick={onEdit}
        >
          <Edit2 size={18} className="text-secondary" />
        </span>
      );
    }
  };


  return (
    <div className="container-fluid p-0">
      <h1 className="fs-3 fw-bold text-dark mb-4">Manage Your Account</h1>
      <div className="bg-white rounded-3 shadow p-5">
        <div className="d-flex gap-5">
          <div className="d-flex flex-column align-items-center gap-2" style={{ flex: '0 0 250px' }}>
            <div
              className="d-flex align-items-center justify-content-center bg-light rounded-3"
              style={{ width: '300px', height: '300px', cursor: 'pointer', border: '1px solid #dee2e6' }}
            >
              <Camera size={72} className="text-secondary" />
            </div>
          </div>

          <div className="flex-grow-1 d-flex flex-column gap-4 pt-4">
            <div className="d-flex flex-column">
              <label className="form-label fw-semibold small text-dark mb-1">Username</label>
              <div className="input-group" style={{ maxWidth: '400px' }}>
                <input
                  type="text"
                  className={`form-control ${isUsernameEditing ? 'bg-white' : 'bg-light'} rounded-start-3 text-secondary`}
                  value={isUsernameEditing ? tempUsername : username}
                  readOnly={!isUsernameEditing}
                  onChange={(e) => setTempUsername(e.target.value)}
                  style={{ height: '45px' }}
                />
                <ActionButtons 
                    type="username" 
                    isEditing={isUsernameEditing}
                    onEdit={() => handleEdit('username')}
                    onSave={() => handleSave('username')}
                    onCancel={() => handleCancel('username')}
                />
              </div>
            </div>

            {/* 2. Email */}
            <div className="d-flex flex-column">
              <label className="form-label fw-semibold small text-dark mb-1">Email</label>
              <div className="input-group" style={{ maxWidth: '400px' }}>
                <input
                  type="email"
                  className={`form-control ${isEmailEditing ? 'bg-white' : 'bg-light'} rounded-start-3 text-secondary`}
                  value={isEmailEditing ? tempEmail : email}
                  readOnly={!isEmailEditing}
                  onChange={(e) => setTempEmail(e.target.value)}
                  style={{ height: '45px' }}
                />
                <ActionButtons 
                    type="email" 
                    isEditing={isEmailEditing}
                    onEdit={() => handleEdit('email')}
                    onSave={() => handleSave('email')}
                    onCancel={() => handleCancel('email')}
                />
              </div>
            </div>

            {/* 3. Password */}
            <div className="d-flex flex-column">
              <label className="form-label fw-semibold small text-dark mb-1">Password</label>
              <div className="input-group" style={{ maxWidth: '400px' }}>
                <input
                  type={isPasswordEditing ? 'text' : 'password'}
                  className={`form-control ${isPasswordEditing ? 'bg-white' : 'bg-light'} rounded-start-3 text-secondary`}
                  value={isPasswordEditing ? tempPassword : password}
                  readOnly={!isPasswordEditing}
                  onChange={(e) => setTempPassword(e.target.value)}
                  style={{ height: '45px' }}
                />
                <ActionButtons 
                    type="password" 
                    isEditing={isPasswordEditing}
                    onEdit={() => handleEdit('password')}
                    onSave={() => handleSave('password')}
                    onCancel={() => handleCancel('password')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-end gap-5 mt-4">
            <div style={{ flex: '0 0 250px' }}>
                 <label className="form-label small text-muted mb-1">Role (can only be configured by owner)</label>
                 <div className="py-2 px-3 border rounded-3 bg-light text-secondary fw-medium">Admin</div>
            </div>
            <div className="flex-grow-1 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary px-4 py-2 rounded-3 fw-semibold">
                    Apply
                </button>
            </div>
        </div>
        
      </div>
    </div>
  );
}