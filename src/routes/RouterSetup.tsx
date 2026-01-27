import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/pages/Layout";
import { HomePage } from "@/pages";


// 1. Setup Router url:
const router = createBrowserRouter([

    // Dashboard Route:
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },

        ],
    },
]);

export default function RouterSetup() {
    return <RouterProvider router={router} />;
}

