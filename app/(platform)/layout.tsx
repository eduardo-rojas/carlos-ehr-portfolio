import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import StreamVideoProvider from "@/components/providers/stream-client-provider";
import "react-datepicker/dist/react-datepicker.css";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ClerkProvider>

    <ConvexClientProvider>
      <EdgeStoreProvider>
        <QueryProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </QueryProvider>
      </EdgeStoreProvider>
    </ConvexClientProvider>

    // </ClerkProvider>
  );
};

export default PlatformLayout;
