import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk pour la connexion
export const loginUser = createAsyncThunk(
  'auth/loginUser', // url de la requête
  async ({ email, password, rememberMe }, { rejectWithValue }) => { // paramètres de la requête
    try { // requête POST pour la connexion
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, password }) // corps de la requête
      });
      const data = await response.json(); // réponse de la requête

      if (!response.ok) throw new Error(data.message || 'Login failed'); // si la requête est falsy, on renvoie une erreur

      if (rememberMe) { // si rememberMe est true, on stocke le token dans le localStorage
        localStorage.setItem('token', data.body.token); // le localStorage est conservé même après la fermeture du navigateur
        } 

      return data.body; // on renvoie le token
    } catch (error) {
      return rejectWithValue(error.message); // on rejette la requête avec le message d'erreur
    }
  }
);

// Création du slice Redux
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => { // state pour la déconnexion
      state.user = null; // on remet l'utilisateur à null car il n'est plus connecté
      state.token = null; // on remet le token à null car il n'est plus valide
      localStorage.removeItem('token'); // on supprime le token du localStorage    
      sessionStorage.removeItem('token'); // on supprime le token du sessionStorage
  },
  extraReducers: (builder) => { // builder c'est le constructeur de l'action qui ici est loginUser
    builder 
      .addCase(loginUser.pending, (state) => { // 
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
