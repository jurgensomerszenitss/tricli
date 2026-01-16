import { createRestaurant } from '@/app/lib/commands'; 
import Breadcrumbs from '@/app/ui/breadcrumb';
import Form from '@/app/ui/dashboard/form';

export default async function Page() {  
  const initialData:any = {level:0};
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
    </main>
  );
}