const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
    return (
        <div className={`${shimmer} grid grid-cols-2 border-stone-100 rounded-xl border-solid border-2 p-2 min-w-80 bg-purple-50 h-12`}>
        </div>
    );
}

export default function DashboardSkeleton() {
    return (
        <>
            <div className={`${shimmer} flex flex-wrap gap-1 m-4 flex-row justify-center md:justify-start`}> 
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </>
    );
}
