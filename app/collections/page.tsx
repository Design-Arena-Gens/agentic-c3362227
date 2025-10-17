import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import CollectionsClient from './sclient';

export const dynamic = 'force-dynamic';

export default function CollectionsPage() {
  return (
    <main className="min-h-screen">
      <div className="flex h-screen">
        <Sidebar />
        <section className="flex-1">
          <Topbar />
          <div className="p-4">
            <CollectionsClient />
          </div>
        </section>
      </div>
    </main>
  );
}
