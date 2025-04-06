import React from 'react';
import { useUser } from '@clerk/clerk-react'; 

const ProfilePage = () => {
  const { user } = useUser(); 

  return (
    <div className="container mt-4">
      <h2>Your Profile</h2>
      {user ? (
        <div className="profile-card">
          <img
            src={user.imageUrl}
            alt="User"
            className="rounded-circle mb-3"
            width="100"
          />
          <h4>{user.fullName || user.username}</h4>
          <p>Email: {user.primaryEmailAddress.emailAddress}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default ProfilePage;
