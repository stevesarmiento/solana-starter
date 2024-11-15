import { docsConfig } from "@/config/docs"
import { DocsSidebarNav } from "@/app/docs/_components/sidebar-nav"
import { ScrollArea } from "@/components/ui/scroll-area"
import DashboardLayout from "@/app/docs/_components/DashboardLayout"


interface DocsLayoutProps {
    children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
    return (
        <DashboardLayout>
            <div className="border-b">
                <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] max-w-7xl mx-auto">
                    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
                        <ScrollArea className="h-full py-6 lg:py-8">
                            <DocsSidebarNav items={docsConfig.sidebarNav} />
                        </ScrollArea>
                    </aside>
                    {children}
                </div>
            </div>
        </DashboardLayout>

    )
}