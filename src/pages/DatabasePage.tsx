import React from 'react';
import UserForm from '../components/UserForm';
import ActivityForm from '../components/ActivityForm';
import UserList from '../components/UserList';
import ActivityList from '../components/ActivityList';

export default function DatabasePage() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <section>
        <h2>Users</h2>
        <UserForm />
        <UserList />
      </section>
      <section>
        <h2>Activities</h2>
        <ActivityForm />
        <ActivityList />
      </section>
    </div>
  );
}
