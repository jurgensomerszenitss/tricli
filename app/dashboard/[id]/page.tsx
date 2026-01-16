import { updateRestaurant } from '@/app/lib/commands';
import { getRestaurant } from '@/app/lib/queries';
import Breadcrumbs from '@/app/ui/breadcrumb';
import Form from '@/app/ui/dashboard/form';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    const data = await getRestaurant(id); 
    const updateRestaurantWithId = updateRestaurant.bind(null, id); 
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Restaurants', href: '/dashboard' },
                    {
                        label: data.name,
                        href: `/dashboard/${id}`,
                        active: true,
                    },
                ]}
            />
            <Form initialValues={data}  onSubmit={updateRestaurantWithId}></Form>  
        </main>
    );
}