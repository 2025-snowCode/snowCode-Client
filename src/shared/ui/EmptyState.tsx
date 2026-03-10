interface EmptyStateProps {
  children: React.ReactNode;
  className?: string;
}

export const EmptyState = ({children, className}: EmptyStateProps) => {
  return (
    <div
      className={`text-light-black text-base font-medium ${className ?? ''}`}>
      {children}
    </div>
  );
};
