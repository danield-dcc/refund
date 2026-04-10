import { BrowserRouter, Route, Routes } from "react-router";
import LayoutMain from "./pages/layput-main";
import PageComponents from "./pages/page-components";
import PageConfirmation from "./pages/page-confirmation";
import PageHome from "./pages/page-home";
import PageNewRefund from "./pages/page-new-refund";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageRefundDetails from "./pages/page-refund-details";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutMain />}>
              <Route index element={<PageHome />} />
              <Route path={"/components"} element={<PageComponents />} />
              <Route path={"/new-refund"} element={<PageNewRefund />} />
              <Route path={"/confirmation"} element={<PageConfirmation />} />
              <Route path={"/details"} element={<PageRefundDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
