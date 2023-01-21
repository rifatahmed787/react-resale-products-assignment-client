import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./Routes/Routes";

function App() {
  return (
    <div className="max-w-[1440px] mx-auto bg-[#EBEBEB] dark:bg-black min-h-screen">
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
