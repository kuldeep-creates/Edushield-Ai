import AIChatbot from "@/components/AIChatbot";

export default function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <AIChatbot />
        </>
    );
}
