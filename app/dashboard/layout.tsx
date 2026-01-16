import TopNav from "@/app/ui/dashboard/topnav";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <div className="w-full">
        <TopNav></TopNav>
      </div> 
      <div className="">{children}</div>
    </div>
  );
}