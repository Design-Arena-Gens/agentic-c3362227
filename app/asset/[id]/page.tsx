import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import AssetDetailClient from './sclient';

export const dynamic = 'force-dynamic';

export default function AssetDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen">
      <div className="flex h-screen">
        <Sidebar />
        <section className="flex-1">
          <Topbar />
          <div className="p-4">
            <AssetDetailClient id={params.id} />
          </div>
        </section>
      </div>
    </main>
  );
}
