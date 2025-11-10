// Path: src/components/layouts/Layout.tsx
import Sidebar from "../Dashboard/investor/sidebar/Sidebar"; // Import Sidebar component

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar component */}
      <main className="flex-1 p-6">{children}</main> {/* Main content area */}
    </div>
  );
};

export default Layout;
