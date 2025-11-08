interface BubbleTextProps {
  message: string;
  isSender: boolean;
  time: string;
}

export default function BubbleText({ message, isSender, time }: BubbleTextProps) {
  const alignmentClass = isSender ? 'justify-content-end' : 'justify-content-start';
  const bubbleClass = isSender ? 'bg-primary text-white' : 'bg-white text-dark border';

  return (
    <div className={`d-flex ${alignmentClass} mb-1`}>
      <div 
        className={`p-2 rounded-3 shadow-sm ${bubbleClass}`}
        style={{ maxWidth: '75%', minWidth: '100px' }}
      >
        <p className="mb-1 small">{message}</p>
        <span 
          className={`d-block text-end ${isSender ? 'text-white-50' : 'text-muted'}`} 
          style={{ fontSize: '0.65rem' }}
        >
          {time}
        </span>
      </div>
    </div>
  );
}