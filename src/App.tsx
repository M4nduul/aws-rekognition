import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./provider/authContext";
import { HomeScreen, SignIn, SignUp, Table } from "./screens";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </AuthProvider>
  );
}
