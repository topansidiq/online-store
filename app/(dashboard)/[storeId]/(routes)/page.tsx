import database from '@/lib/database';
import React from 'react'

interface DashboardPageProps {
    params: {storeId: string}
}

async function DashboardPage({params}: DashboardPageProps) {
    const store = await database.store.findFirst({
        where: {
            id: params.storeId
        }
    })
    return (
        <>
            <div>
                <p>Active Store: {store?.name}</p>
            </div>
        </>
    )
}

export default DashboardPage