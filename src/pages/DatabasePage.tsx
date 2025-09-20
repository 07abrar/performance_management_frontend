import UserForm from 'src/components/UserForm';
import ActivityForm from 'src/components/ActivityForm';
import UserList from 'src/components/UserList';
import ActivityList from 'src/components/ActivityList';

export default function DatabasePage() {
  return (
    <div className="page">
      <div className="page-header">
        <h2>Database</h2>
        <p className="page-subtitle">
          Manage users and activities list.
        </p>
      </div>

      <div className="dashboard-grid">
        <section className="card data-card">
          <div className="card-header">
            <h3 className="section-title">Users</h3>
            <p className="card-subtitle">User name to be tracked.</p>
          </div>
          <UserForm />
          <div className="card-divider" />
          <UserList />
        </section>

        <section className="card data-card">
          <div className="card-header">
            <h3 className="section-title">Activities</h3>
            <p className="card-subtitle">Activity name to be tracked.</p>
          </div>
          <ActivityForm />
          <div className="card-divider" />
          <ActivityList />
        </section>
      </div>
    </div>
  );
}