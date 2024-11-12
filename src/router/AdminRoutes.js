import { Routes, Route } from "react-router-dom";
// import AboutDashboard from "../adminPanel/pages/AboutDashboard";

import Home from "../adminPanel/pages/Dashboard";
import Donors from "../adminPanel/pages/adminPages/Donors";
import DonorDetail from "../adminPanel/pages/adminPages/DonorDetail";
import Recipient from "../adminPanel/pages/adminPages/Recipient";
import RecipientDetail from "../adminPanel/pages/adminPages/RecipitentDetail";
import Company from "../adminPanel/pages/adminPages/Company";
import CompanyDetail from "../adminPanel/pages/adminPages/CompanyDetail";
import CompanyAddMedicine from "../adminPanel/pages/adminPages/CompanyAddMedicine";
import CompanyUpdateMedicine from "../adminPanel/pages/adminPages/CompanyUpdateMedicine";
import CompanyForm from "../adminPanel/pages/adminPages/CompanyForm";
// import UserFeedback from "../adminPanel/pages/UserFeedback";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/donors" element={<Donors />} />
      <Route path="/donors/:id" element={<DonorDetail />} />
      <Route path="/recipient" element={<Recipient />} />
      <Route path="/recipient/:id" element={<RecipientDetail />} />
      <Route path="/company" element={<Company />} />
      <Route path="/company/:id" element={<CompanyDetail />} />
      <Route path="/companies/add" element={<CompanyForm />} />
      <Route path="/companies/edit/:id" element={<CompanyForm />} />
      <Route path="/company/:id/add" element={<CompanyAddMedicine />} />
      <Route
        path="/company/:companyId/medicine/:medicineId"
        element={<CompanyUpdateMedicine />}
      />
      {/* <Route path="/account" element={<Account />} />
      <Route path="/feedback" element={<UserFeedback />} /> */}
    </Routes>
  );
};

export default AdminRoutes;
