import { Player } from '@lottiefiles/react-lottie-player';
import guestAnimation from '../assets/lottie/guest.json';
import adminAnimation from '../assets/lottie/admin.json';
import userAnimation from '../assets/lottie/user.json';

export default function Info() {

  return (
    <>
      <div className="card_container">

        <div className="card guest blur">
          <div className="role-icon">
             <Player autoplay loop src={guestAnimation} style={{ height: '220px', width: '220px' }}/>
          </div>
          <h2 className="role">Guest</h2>
          <p className="role-subtitle">Unregistered</p>
          <div className="permissions">
            <h3>🔓 Permissions:</h3>
            <div className="permission-item">
              <span className="permission-icon check">✔</span>
              <span className="permission-text">View public data</span>
            </div>
            <div className="permission-item">
              <span className="permission-icon check">✔</span>
              <span className="permission-text">View record details (read-only)</span>
            </div>
            <h3>🔒 Restrictions:</h3>
            <div className="permission-item">
              <span className="permission-icon cross">✘</span>
              <span className="permission-text">Creating records not available</span>
            </div>
            <div className="permission-item">
              <span className="permission-icon cross">✘</span>
              <span className="permission-text">Editing data not allowed</span>
            </div>
            <div className="permission-item">
              <span className="permission-icon cross">✘</span>
              <span className="permission-text">Deleting records forbidden</span>
            </div>
          </div>
          <span className="badge">VIEW ONLY</span>
        </div>


        <div className="card user blur">
          <div className="role-icon">
            <Player autoplay loop src={userAnimation} style={{ height: '400px', width: '400px', marginRight: '35px'}}/>
          </div>
          <h2 className="role">User</h2>
          <p className="role-subtitle">Registered</p>

          <div className="permissions">
            <h3>🔓 Permissions:</h3>
            <div className="permission-item">
              <span className="permission-icon check">✔</span>
              <span className="permission-text">View all public data</span>
            </div>
            <div className="permission-item">
              <span className="permission-icon check">✔</span>
              <span className="permission-text">Create personal records</span>
            </div>
            <div className="permission-item">
              <span className="permission-icon check">✔</span>
              <span className="permission-text">Edit personal records</span>
            </div>
            <h3>🔒 Restrictions:</h3>
            <div className="permission-item">
              <span className="permission-icon cross">✘</span>
              <span className="permission-text">Deleting records is forbidden</span>
            </div>
            <div className="permission-item">
              <span className="permission-icon cross">✘</span>
              <span className="permission-text">Editing others' records is not allowed</span>
            </div>
          </div>
          <span className="badge">PERSONAL SPACE</span>
        </div>


        <div className="card admin blur">
          <div className="role-icon">
             <Player autoplay loop src={adminAnimation} style={{ height: '320px', width: '320px' }}/>
          </div>
          <h2 className="role">Admin</h2>
          <p className="role-subtitle">Full control</p>

          <div className="permissions">
            <h3>🔓 Permissions:</h3>
            <div className="permission-item">
              <span className="permission-icon check">✔</span>
              <span className="permission-text">View all data</span>
            </div>
            <div className="permission-item">
              <span className="permission-icon check">✔</span>
              <span className="permission-text">Create records</span>
            </div>
            <div className="permission-item">
              <span className="permission-icon check">✔</span>
              <span className="permission-text">Edit any records</span>
            </div>
            <div className="permission-item">
              <span className="permission-icon check">✔</span>
              <span className="permission-text">Delete any records</span>
            </div>
            <div className="permission-item">
              <span className="permission-icon check">✔</span>
              <span className="permission-text">Manage users and their permissions</span>
            </div>
            <div className="permission-item">
              <span className="permission-icon check">✔</span>
              <span className="permission-text">Access system settings</span>
            </div>
          </div>
          <span className="badge">UNLIMITED ACCESS</span>
        </div>

      </div>
    </>
  );
}