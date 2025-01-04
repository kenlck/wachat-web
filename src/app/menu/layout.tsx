import MobileSidebar from "./_components/mobileSidebar";
import Sidebar from "./_components/sidebar";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="grid w-screen grid-cols-5 items-start gap-2 px-4">
      <div className="hidden sm:block">
        <Sidebar />
      </div>
      <MobileSidebar />
      <div className="col-span-4">{props.children}</div>
    </div>
  );
}
