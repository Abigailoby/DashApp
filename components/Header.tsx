import { Menu, Bell, User } from "lucide-react";

export default function Header({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="p-2 text-black hover:bg-gray-100 rounded-md transition-colors hover:cursor-pointer"
            title="Open Sidebar"
          >
            <Menu size={24} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700 relative hover:cursor-pointer">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User size={18} />
          </div>
          <span className="text-sm font-medium hidden text-gray-700 sm:block">
            Admin User
          </span>
        </div>
      </div>
    </header>
  );
}