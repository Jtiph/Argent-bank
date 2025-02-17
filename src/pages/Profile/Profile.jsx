import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../redux/slices/userSlice";
import "./profile.scss";

const Profile = () => {
  const user = useSelector((state) => state.user.profile);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [newUsername, setNewUsername] = useState(user?.userName || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    if (newUsername.trim() === "" || newUsername === user?.userName) return;

    try {
      const resultAction = await dispatch(
        updateUserProfile({ token, newUsername })
      );

      if (updateUserProfile.fulfilled.match(resultAction)) {
        setIsEditing(false);
      } else {
        console.error(" Erreur lors de la mise à jour :", resultAction.payload);
      }
    } catch (error) {
      console.error(" Erreur inattendue :", error);
    }
  };
  //  Fonction pour détecter "Entrée" et sauvegarder
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Évite le rafraîchissement de la page
      handleSave();
    }
  };
  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <div className="edit-container">
            <div className="input-group">
              <label>User name:</label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                onKeyDown={handleKeyDown} // Appelle la fonction pour détecter "Entrée"
                placeholder="Enter new username"
                className="edit-input"
              />
            </div>
            <div className="input-group">
              <label>First Name:</label>
              <input type="text" value={user?.firstName} disabled />
            </div>
            <div className="input-group">
              <label>Last Name:</label>
              <input type="text" value={user?.lastName} disabled />
            </div>
            <div className="button-group">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {user?.firstName} {user?.lastName}!
            </h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Profile;
