import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationsSection } from "@/components/settings/NotificationsSection";
import { PersonalInfoSection } from "@/components/settings/PersonalInfoSection";
import { PreferencesSection } from "@/components/settings/PreferencesSection";
import { SecuritySection } from "@/components/settings/SecuritySection";

export default function SettingsPage() {
  return (
    <AppShell title="Settings">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Settings"
          subtitle="Manage your personal information, notifications, security and preferences."
        />

        <Tabs defaultValue="personal">
          <div className="overflow-x-auto">
            <TabsList>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="personal" className="mt-4">
            <PersonalInfoSection />
          </TabsContent>
          <TabsContent value="notifications" className="mt-4">
            <NotificationsSection />
          </TabsContent>
          <TabsContent value="security" className="mt-4">
            <SecuritySection />
          </TabsContent>
          <TabsContent value="preferences" className="mt-4">
            <PreferencesSection />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
