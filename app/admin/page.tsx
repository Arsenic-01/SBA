import { StatCard } from '@/components/StatCard';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/DataTable';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import * as Sentry from '@sentry/nextjs';

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();
  Sentry.metrics.set('user_view_admin', 'client');

  
  return (
    <div className='w-full h-full  bg-black'>
      <div className='mx-auto flex max-w-7xl flex-col space-y-20'>
        <main className='admin-main mt-20 md:py-10'>
          <section className='w-full space-y-4'>
            <h1 className='header mt-2'>Welcome 👋</h1>
            <p className='text-dark-700'>
             Manage your appointments. 
            </p>
          </section>

          <section className='admin-stat'>
            <StatCard
              type='appointments'
              count={appointments.scheduledCount}
              label='Scheduled appointments'
              icon={'/assets/icons/appointments.svg'}
            />
            <StatCard
              type='pending'
              count={appointments.pendingCount}
              label='Pending appointments'
              icon={'/assets/icons/pending.svg'}
            />
            <StatCard
              type='cancelled'
              count={appointments.cancelledCount}
              label='Cancelled appointments'
              icon={'/assets/icons/cancelled.svg'}
            />
          </section>

          <DataTable columns={columns} data={appointments.documents} />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
