'use client';

import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

const initialBlogs = [
  { id: 1, no: '00001', title: 'Cara membedakan antara biji plastik PS, PE, dan PP!', date: '02/11/25', status: 'Published' as 'Published' | 'Draft' },
  { id: 2, no: '00002', title: 'Tren mendaur ulang plastik 2025', date: '29/10/25', status: 'Draft' as 'Published' | 'Draft' },
  { id: 3, no: '00003', title: 'Mengapa biji plastik berkualitas bagus penting dalam produksi?', date: '24/10/25', status: 'Published' as 'Published' | 'Draft' },
  { id: 4, no: '00004', title: 'Ketahuilah Hal Berikut sebelum Membeli Biji Plastik!', date: '20/10/25', status: 'Published' as 'Published' | 'Draft' },
];

const StatusDropdown = ({
  initialStatus,
  blogId,
  onStatusChange,
}: {
  initialStatus: 'Published' | 'Draft';
  blogId: number;
  onStatusChange: (id: number, newStatus: 'Published' | 'Draft') => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newStatus: 'Published' | 'Draft') => {
    onStatusChange(blogId, newStatus);
    setIsOpen(false);
  };

  const getStatusClass = (status: 'Published' | 'Draft') => {
    return status === 'Published'
      ? 'bg-success-subtle text-success border border-success-subtle'
      : 'bg-warning-subtle text-warning border border-warning-subtle';
  };

  return (
    <div className="dropdown">
      <button
        className={`btn btn-sm dropdown-toggle ${getStatusClass(initialStatus)}`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {initialStatus}
      </button>
      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} style={{ minWidth: '6rem' }}>
        <li>
          <button className="dropdown-item small" onClick={() => handleSelect('Published')}>
            Published
          </button>
        </li>
        <li>
          <button className="dropdown-item small" onClick={() => handleSelect('Draft')}>
            Draft
          </button>
        </li>
      </ul>
    </div>
  );
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(initialBlogs);

  const handleStatusChange = (id: number, newStatus: 'Published' | 'Draft') => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === id ? { ...blog, status: newStatus } : blog))
    );
  };

  return (
    <div className="container-fluid p-4">
      <h1 className="fs-3 fw-semibold text-dark mb-4">Blogs</h1>
      <div className="text-dark fw-semibold px-4 py-3 rounded-top-3" style={{ backgroundColor: '#b3faffff' }}>
        Blogs
      </div>

      <div className="bg-white rounded-bottom-3 shadow-sm overflow-auto">
        <table className="table table-responsive table-striped align-middle mb-0">
          <thead className="text-secondary small">
            <tr>
              <th className="px-3 py-2">Blog No</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Published At</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td className="px-3 py-2 text-dark fw-medium">{blog.no}</td>
                <td className="px-3 py-2 text-dark">{blog.title}</td>
                <td className="px-3 py-2 text-secondary">{blog.date}</td>
                <td className="px-3 py-2">
                  <StatusDropdown initialStatus={blog.status} blogId={blog.id} onStatusChange={handleStatusChange} />
                </td>
                <td className="px-3 py-2 text-center">
                  <a href={`/dashboard/blogs/edit/${blog.id}`} className="btn btn-link text-secondary p-0">
                    <Edit2 size={18} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}