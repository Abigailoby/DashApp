"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DashboardCharts from "@/components/DashboardCharts";
import { AlertCircle, FileX, Search } from "lucide-react";


interface UserData {
  id: number;
  name: string;
  email: string;
  status: string;
  date: string;
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dataState, setDataState] = useState<
    "loading" | "error" | "empty" | "success"
  >("loading");
  const [apiData, setApiData] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataState("loading");
        const response = await fetch("https://dummyjson.com/users?limit=50");
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }

        const data = await response.json();

        const usersArray = data.users;

        if (!usersArray || usersArray.length === 0) {
          setDataState("empty");
          return;
        }

        const formattedData: UserData[] = usersArray.map((user: any, index: number) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email.toLowerCase(),
          status: index % 3 === 0 ? "Inactive" : "Active",
          date: "2026-09-27",
        }));

        setApiData(formattedData);
        setDataState("success");
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataState("error");
      }
    };

    fetchData();
  }, []);

  const filteredData = apiData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header
          toggleSidebar={() => setIsSidebarOpen(true)}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500">Welcome back, here is your latest data.</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { title: 'Total Users', value: 842 },
              { title: 'Active Sessions', value: 320 },
              { title: 'Total Sign up', value: 4500 }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                <p className="text-3xl text-black font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          <DashboardCharts />

          {/* Table Recent Activity */}
          <div className="bg-white rounded-xl border shadow-sm flex flex-col mb-8">
            <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="font-semibold text-lg text-gray-800">Recent Activity</h2>

              <div className="flex items-center bg-white border-2 border-blue-100 px-3 py-2 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all w-full sm:w-auto shadow-sm">
                <Search size={18} className="text-blue-500" />
                <input
                  type="text"
                  placeholder="Search name or email..."
                  className="bg-transparent border-none outline-none ml-2 text-sm w-full sm:w-56 text-gray-700 placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {dataState === "loading" && (
              <div className="p-12 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            {dataState === "error" && (
              <div className="p-12 flex flex-col items-center text-red-500">
                <AlertCircle size={48} className="mb-4" />
                <p>Failed to load data. Please check your connection.</p>
              </div>
            )}

            {dataState === "empty" && (
              <div className="p-12 flex flex-col items-center text-gray-400">
                <FileX size={48} className="mb-4" />
                <p>No activity found.</p>
              </div>
            )}

            {dataState === "success" && (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600 border-b">
                      <tr>
                        <th className="p-4">ID</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((item) => (
                          <tr key={item.id} className="border-b last:border-b-0 hover:bg-blue-50/50 transition-colors">
                            <td className="p-4 text-gray-500 font-medium">{item.id}</td>
                            <td className="p-4 font-medium text-gray-900">{item.name}</td>
                            <td className="p-4 text-gray-500">{item.email}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="p-4 text-gray-500">{item.date}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-gray-500">
                            No results match "{searchQuery}"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t flex items-center justify-between bg-gray-50/50">
                  <span className="text-sm text-gray-500 font-medium">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredData.length)}{" "}
                    of {filteredData.length} entries
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      className={`px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors shadow-sm ${currentPage === 1 || totalPages === 0 ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'} disabled:opacity-50 disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:shadow-none`}
                    >
                      Prev
                    </button>
                    <button
                      disabled={currentPage === totalPages || totalPages === 0}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      className={`px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors shadow-sm   ${currentPage === totalPages || totalPages === 0 ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'} disabled:opacity-50 disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:shadow-none`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}