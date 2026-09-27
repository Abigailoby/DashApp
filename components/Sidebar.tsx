import { LayoutDashboard, Users, Settings, Activity, X } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-sm transform transition-all duration-300 
        ${isOpen ? 'translate-x-0 lg:relative' : '-translate-x-full lg:absolute'}`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <span className="font-bold text-xl text-blue-600">DashApp</span>

          {/* Button Close Sidebar */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors hover:cursor-pointer"
            title="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
            <LayoutDashboard size={20} /> Dashboard
          </a>

          <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <Activity size={20} /> Activity
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <Users size={20} /> Users
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <Settings size={20} /> Settings
          </a>
        </nav>
      </aside>
    </>
  );
}