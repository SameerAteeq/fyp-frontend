import { Routes, Route } from "react-router-dom";
import Ask from "../main/Ask";
import DonateForm from "../main/DonateForm";
import AddMedicine from "../main/medicine/AddMedicine";
import UpdateMedicine from "../main/medicine/UpdateMedicine";
import MedicineDetail from "../main/medicine/MedicineDetail";
import MedicinePrescibe from "../main/medicine/MedicinePrescribe";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/medicine/add" element={<AddMedicine />} />
      <Route path="/medicine/update/:id" element={<UpdateMedicine />} />
      <Route path="/medicine/prescribe/:id" element={<MedicinePrescibe />} />
      <Route path="/medicine/detail/:id" element={<MedicineDetail />} />
      <Route path="/ask" element={<Ask />} />
      <Route path="/donate" element={<DonateForm />} />
    </Routes>
  );
};

export default UserRoutes;
