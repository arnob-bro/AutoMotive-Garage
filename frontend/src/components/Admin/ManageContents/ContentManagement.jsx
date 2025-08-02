// ContentManagement.jsx
import { Outlet } from 'react-router-dom';

const ContentManagement = () => {
  return (
    <div className="content-management">
      <Outlet />
    </div>
  );
};

export default ContentManagement;