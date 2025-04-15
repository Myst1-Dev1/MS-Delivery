

export function DishesSkeleton() {
    return (
        <>
            <div className="flex-shrink-0 flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2">
                <div className="animate-pulse bg-gray-200 w-20 flex-shrink-0 h-28 rounded-md" />
                <div className="flex flex-col gap-1 w-full">
                    <div className="h-5 bg-gray-200 animate-pulse" />
                    <div className="h-5 bg-gray-200 animate-pulse" />
                    <p className="h-5 bg-gray-200 animate-pulse"></p>
                    <div className="flex gap-3">
                        <div className="rounded-md w-7 h-7 bg-gray-200 animate-pulse"/>
                        <div className="rounded-md w-7 h-7 bg-gray-200 animate-pulse" />
                    </div>
                </div>
            </div>
        </>
    )
}