import { useState } from "react";
import AdminPanel from "./AdminPanel";
import './Profile.css'

interface UserData {
  email: string;
  name: string | null;
  role: 'USER' | 'ADMIN';
  id: string; 
}

function Profile({ userData }: { userData: UserData }) {
  const [activeTab, setActiveTab] = useState<'profile' | 'admin'>('profile');
  const [currentUserData, setCurrentUserData] = useState<UserData>(userData);
  const [loading, setLoading] = useState(false);

  const formatRole = (role: 'USER' | 'ADMIN') => {
    return role === 'ADMIN' ? 'Администратор' : 'Пользователь';
  };

  return (
    <div className="profile">
      <h2>Личный кабинет</h2>
      
      <div className="profile-tabs">
        <button 
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Профиль
        </button>
        
        {currentUserData.role === 'ADMIN' && (
          <button 
            className={activeTab === 'admin' ? 'active' : ''}
            onClick={() => setActiveTab('admin')}
          >
            Админ-панель
          </button>
        )}
      </div>

      {activeTab === 'profile' ? (
        <div className="profile-info">
          <h3>Профиль пользователя</h3>
          
          <div className="profile-field">
            <span className="field-label">Email:</span>
            <span className="field-value">{currentUserData.email}</span>
          </div>
          
          {currentUserData.name && (
            <div className="profile-field">
              <span className="field-label">Имя:</span>
              <span className="field-value">{currentUserData.name}</span>
            </div>
          )}
          
          <div className="profile-field">
            <span className="field-label">Роль:</span>
            <span className="field-value">
              {formatRole(currentUserData.role)}
              {loading && <span className="loading-indicator"> (обновление...)</span>}
            </span>
          </div>

        </div>
      ) : (
        <div className="admin-section">
          <AdminPanel />
        </div>
      )}
    </div>
  );
}

export default Profile;