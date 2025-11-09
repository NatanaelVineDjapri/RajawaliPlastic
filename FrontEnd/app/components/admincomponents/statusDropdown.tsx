import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type StatusType = 'Unpaid' | 'Paid' | 'Processing' | 'Rejected' | 'Completed';

interface StatusOption {
  value: StatusType;
  label: string;
  color: 'red' | 'green' | 'orange' | 'blue';
}

interface StatusDropdownProps {
  statusType: 'transaction' | 'delivery';
  currentStatus: StatusType;
  orderId: number;
  onStatusChange: (
    orderId: number,
    type: 'transaction' | 'delivery',
    newStatus: StatusType
  ) => void;
}

const COLOR_MAP = {
  red: { bg: '#fee2e2', text: '#ef4444' },
  green: { bg: '#dcfce7', text: '#22c55e' },
  orange: { bg: '#fff7ed', text: '#f97316' },
  blue: { bg: '#c6f6d5', text: '#3b82f6' },
};

const TRANSACTION_OPTIONS: StatusOption[] = [
  { value: 'Unpaid', label: 'Unpaid', color: 'red' },
  { value: 'Paid', label: 'Paid', color: 'green' },
  { value: 'Processing', label: 'Processing', color: 'orange' },
];

const DELIVERY_OPTIONS: StatusOption[] = [
  { value: 'Rejected', label: 'Rejected', color: 'red' },
  { value: 'Completed', label: 'Completed', color: 'blue' },
  { value: 'Processing', label: 'Processing', color: 'orange' },
];

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  statusType,
  currentStatus,
  orderId,
  onStatusChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options =
    statusType === 'transaction' ? TRANSACTION_OPTIONS : DELIVERY_OPTIONS;
  const activeOption = options.find((opt) => opt.value === currentStatus);
  const { bg, text } =
    activeOption && COLOR_MAP[activeOption.color]
      ? COLOR_MAP[activeOption.color]
      : { bg: '#e5e7eb', text: '#374151' };

  const handleSelect = (newStatus: StatusType) => {
    onStatusChange(orderId, statusType, newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-[120px] sm:w-[100px] xs:w-[90px] mb-2 mr-4">
      <button
        type="button"
        className="flex justify-between items-center w-full px-2 py-1 text-xs font-semibold rounded-full border border-gray-300 transition-colors"
        style={{ backgroundColor: bg, color: text }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{currentStatus}</span>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`block px-3 py-1 text-xs cursor-pointer hover:bg-gray-100 ${
                  option.value === currentStatus ? 'bg-gray-100 font-bold' : ''
                }`}
                style={{ color: COLOR_MAP[option.color].text }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
      <style jsx>{`
        @media (max-width: 768px) {
          div {
            width: 100px;
          }
          button {
            font-size: 0.7rem;
            padding: 4px 6px;
          }
        }
        @media (max-width: 480px) {
          div {
            width: 90px;
          }
          button {
            font-size: 0.65rem;
            padding: 3px 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default StatusDropdown;