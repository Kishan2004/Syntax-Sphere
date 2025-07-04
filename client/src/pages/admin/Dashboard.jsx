import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const Dashboard = () => {
  return (
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-700">
            Total sales
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Dashboard;
