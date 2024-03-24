import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router";
import { fetchUser } from "../calls/mongo/user";

const customModalStyle = {
  content: {
    backgroundColor: "#f0f8f0",
    border: "none",
    borderRadius: "10px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
  },
};

interface UserInfosProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserInfos: React.FC<UserInfosProps> = ({ isOpen, onClose }) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const userId = localStorage.getItem("userId");
  const [showMyInfo, setShowMyInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showRecipes, setShowRecipe] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (isOpen && userId !== null) {
      try {
        fetchUser(userId).then(setUserInfo).catch(console.error);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur:",
          error
        );
      }
    }
  }, [isOpen]);

  const handleMyInfoClick = () => {
    setShowMyInfo(true);
    setShowSettings(false);
    setShowRecipe(false);
  };

  const handleMyRecipesClick = () => {
    setShowMyInfo(false);
    setShowSettings(false);
    setShowRecipe(true);
  };

  const handleSettingsClick = () => {
    setShowMyInfo(false);
    setShowSettings(true);
    setShowRecipe(false);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Enregistrer les modifications de l'utilisateur
    setEditing(false);
  };
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customModalStyle}>
        <h2>Informations Utilisateur</h2>
        <button onClick={handleMyInfoClick}>Mes informations</button>
        <button onClick={handleMyRecipesClick}>Mes recettes</button>
        <button onClick={handleSettingsClick}>Paramètres</button>
        {showMyInfo && (
          <div>
            {/* Contenu pour afficher les informations de l'utilisateur */}
            <p>Informations de l'utilisateur</p>
            <div>
              <div>
                <label>Email:</label>
                <input type="text" value={userInfo.email} readOnly={!editing} />
              </div>
              <div>
                <label>Nom:</label>
                <input type="text" value={userInfo.nom} readOnly={!editing} />
              </div>
              <div>
                <label>Prénom:</label>
                <input
                  type="text"
                  value={userInfo.prenom}
                  readOnly={!editing}
                />
              </div>
              <div>
                <label>Âge:</label>
                <input type="text" value={userInfo.age} readOnly={!editing} />
              </div>
              <div>
                <label>Poids:</label>
                <input type="text" value={userInfo.poids} readOnly={!editing} />
              </div>
              <div>
                <label>Taille:</label>
                <input
                  type="text"
                  value={userInfo.taille}
                  readOnly={!editing}
                />
              </div>
              {!editing ? (
                <button onClick={handleEditClick}>Modifier</button>
              ) : (
                <button onClick={handleSaveClick}>Enregistrer</button>
              )}
            </div>
          </div>
        )}
        {showRecipes && (
          <div>
            {/* Contenu pour afficher les recettes de l'utilisateur */}
            <p>Recettes de l'utilisateur</p>
          </div>
        )}
        {showSettings && (
          <div>
            {/* Contenu pour afficher les paramètres de l'utilisateur */}
            <p>Paramètres de l'utilisateur</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserInfos;
