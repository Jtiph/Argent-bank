import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json(); //on stocke la réponse dans une variable data pour la traiter
      if (!response.ok) throw new Error(data.message); // Si la réponse n'est pas ok, on renvoie une erreur
      return data.body; // si la réponse est ok, on renvoie le body de la réponse donc les infos de l'utilisateur
    } catch (error) {
      return rejectWithValue(error.message); // si la requête échoue, on renvoie un message d'erreur avec rejectWithValue pour le stocker dans le state
    }
  }
);

// Action pour modifier le username
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ token, newUsername }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT", // On utilise la méthode PUT pour modifier les données
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: newUsername }), // On passe le nouveau username dans le body pour l'envoyer au serveur
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.body; // Retourne les nouvelles infos utilisateur
    } catch (error) {
      console.error("Erreur API:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null, // stocke les infos de l'utilisateur
    status: "idle", // idle = au repos, loading = en cours, succeeded = réussi, failed = erreur. ici on uytilise idle pour dire que l'état initial est au repos car on n'a pas encore fait de requête
    error: null, // stocke les messages d'erreur
  },
  reducers: { // Reducer pour effacer le profil
    clearProfile: (state) => {
      state.profile = null; 
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => { 
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading"; // Indique qu'on est en train de charger le profil
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded"; // Indique que le chargement est terminé avec succès
        state.profile = action.payload; // Indique une erreur
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload; // Met à jour Redux avec le nouveau username
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Nouvelle action pour récupérer le profil au démarrage
export const autoFetchUserProfile = () => async (dispatch) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token"); // On vérifie si le token est stocké dans le local storage ou le session storage. 

  if (token) {
    dispatch(fetchUserProfile(token));
  }
};

export const { clearProfile } = userSlice.actions;
export default userSlice.reducer;
