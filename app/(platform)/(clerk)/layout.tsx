const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center dark:bg-[#020D1A]  dark:text-dark-6">
      {children}
    </div>
  );
};

export default ClerkLayout;
