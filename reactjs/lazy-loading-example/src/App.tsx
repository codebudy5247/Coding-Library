import React, { lazy, Suspense, useState, useTransition } from "react";

// Simulate lazy loading with delay (in real apps, these would be actual file imports)
const Dashboard = lazy(
  () =>
    new Promise<{ default: React.ComponentType }>((resolve) => {
      setTimeout(() => {
        resolve({
          default: () => {
            const [data] = useState([
              { id: 1, title: "Total Users", value: "12,543", trend: "+12%" },
              { id: 2, title: "Revenue", value: "$45,231", trend: "+8%" },
              {
                id: 3,
                title: "Active Sessions",
                value: "1,234",
                trend: "+23%",
              },
              { id: 4, title: "Conversion Rate", value: "3.24%", trend: "+5%" },
            ]);

            return (
              <div className="component-content">
                <h2>Dashboard</h2>
                <div className="stats-grid">
                  {data.map((stat) => (
                    <div key={stat.id} className="stat-card">
                      <h3>{stat.title}</h3>
                      <p className="stat-value">{stat.value}</p>
                      <span className="stat-trend">{stat.trend}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          },
        });
      }, 1000);
    })
);

const UserProfile = lazy(
  () =>
    new Promise<{ default: React.ComponentType }>((resolve) => {
      setTimeout(() => {
        resolve({
          default: () => {
            const [user] = useState({
              name: "John Doe",
              email: "john.doe@example.com",
              role: "Senior Developer",
              joined: "January 2023",
            });

            return (
              <div className="component-content">
                <h2>User Profile</h2>
                <div className="profile-card">
                  <div className="profile-avatar">{user.name.charAt(0)}</div>
                  <div className="profile-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <p className="role">{user.role}</p>
                    <p className="joined">Joined: {user.joined}</p>
                  </div>
                </div>
              </div>
            );
          },
        });
      }, 1000);
    })
);

const Analytics = lazy(
  () =>
    new Promise<{ default: React.ComponentType }>((resolve) => {
      setTimeout(() => {
        resolve({
          default: () => {
            const [metrics] = useState([
              { month: "Jan", visitors: 4000, sales: 2400 },
              { month: "Feb", visitors: 3000, sales: 1398 },
              { month: "Mar", visitors: 2000, sales: 9800 },
              { month: "Apr", visitors: 2780, sales: 3908 },
              { month: "May", visitors: 1890, sales: 4800 },
              { month: "Jun", visitors: 2390, sales: 3800 },
            ]);

            return (
              <div className="component-content">
                <h2>Analytics</h2>
                <div className="analytics-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Visitors</th>
                        <th>Sales</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.map((m) => (
                        <tr key={m.month}>
                          <td>{m.month}</td>
                          <td>{m.visitors.toLocaleString()}</td>
                          <td>${m.sales.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          },
        });
      }, 1000);
    })
);

const Settings = lazy(
  () =>
    new Promise<{ default: React.ComponentType }>((resolve) => {
      setTimeout(() => {
        resolve({
          default: () => {
            const [settings, setSettings] = useState({
              notifications: true,
              darkMode: false,
              autoSave: true,
            });

            const toggleSetting = (key: keyof typeof settings) => {
              setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
            };

            return (
              <div className="component-content">
                <h2>Settings</h2>
                <div className="settings-list">
                  {Object.entries(settings).map(([key, value]) => (
                    <div key={key} className="setting-item">
                      <label>
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (s) => s.toUpperCase())}
                      </label>
                      <button
                        className={`toggle ${value ? "active" : ""}`}
                        onClick={() =>
                          toggleSetting(key as keyof typeof settings)
                        }
                      >
                        {value ? "ON" : "OFF"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          },
        });
      }, 1000);
    })
);

// Loading fallback component
const LoadingSpinner: React.FC = () => (
  <div className="loading-container">
    <div className="spinner"></div>
    <p>Loading component...</p>
  </div>
);

// Main App Component
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tab: string) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <UserProfile />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      {/* <style>{`
      `}</style> */}

      <div className="header">
        <h1>React Lazy Loading & Code Splitting Demo</h1>
        <div className="info-banner">
          <strong>Key Concepts Demonstrated:</strong>• React.lazy() for dynamic
          imports • Suspense with fallback UI • useTransition for non-blocking
          updates • Code splitting for optimized bundle size • Each tab loads
          its component on-demand
        </div>
      </div>

      <nav className="navigation">
        <button
          className={`nav-button ${activeTab === "dashboard" ? "active" : ""} ${
            isPending ? "pending" : ""
          }`}
          onClick={() => handleTabChange("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`nav-button ${activeTab === "profile" ? "active" : ""} ${
            isPending ? "pending" : ""
          }`}
          onClick={() => handleTabChange("profile")}
        >
          User Profile
        </button>
        <button
          className={`nav-button ${activeTab === "analytics" ? "active" : ""} ${
            isPending ? "pending" : ""
          }`}
          onClick={() => handleTabChange("analytics")}
        >
          Analytics
        </button>
        <button
          className={`nav-button ${activeTab === "settings" ? "active" : ""} ${
            isPending ? "pending" : ""
          }`}
          onClick={() => handleTabChange("settings")}
        >
          Settings
        </button>
      </nav>

      <div className="content-area">
        <Suspense fallback={<LoadingSpinner />}>{renderContent()}</Suspense>
      </div>
    </div>
  );
};

export default App;
