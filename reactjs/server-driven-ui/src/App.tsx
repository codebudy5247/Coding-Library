import { SDUIRenderer } from "./sdui/Renderer";
import { useDashboardState } from "./hooks/useDashboardState";
import { createDashboardLayout } from "./layouts/dashboardLayout";

function App() {
  const dashboardState = useDashboardState();
  const layout = createDashboardLayout(dashboardState);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        width: "100%",
        padding: "40px 20px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <SDUIRenderer layout={layout} />
    </div>
  );
}

export default App;
