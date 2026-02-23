import { createRestaurant } from '@/app/lib/commands';
import Breadcrumbs from '@/app/ui/breadcrumb';
import Form from '@/app/ui/dashboard/form/form';

export default async function Page() {
  const initialData: any = {
    level: 0, openingHours:
      [{ day: 0 }, { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }]
  };
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Restaurants', href: '/dashboard' },
          {
            label: 'new',
            href: '/dashboard/create',
            active: true,
          },
        ]}
      />
      <Form initialValues={initialData} onSubmit={createRestaurant}></Form>
      <div className="form-footer h-28"> 
      </div>
    </main>
  );
}