import Navbar from "./_components/navbar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <Navbar />
      {children}
    </div>
  );
};
export default DashboardLayout;
