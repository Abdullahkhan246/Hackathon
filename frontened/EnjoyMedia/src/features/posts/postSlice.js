import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// CREATE post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, thunkAPI) => {
    try {
      const res = await api.post('/posts', postData); // backend route will be /api/posts
      return res.data; // expect { post: {...} }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// GET all posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/posts');
      return res.data; // expect { posts: [...] }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// UPDATE post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, updates }, thunkAPI) => {
    try {
      const res = await api.put(`/posts/${id}`, updates);
      return res.data; // expect { post: {...} }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// DELETE post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/posts/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload.post);
      })
      // FETCH
      .addCase(fetchPosts.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchPosts.fulfilled, (s, a) => {
        s.loading = false;
        s.posts = a.payload.posts;
      })
      .addCase(fetchPosts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload?.message || a.error.message;
      })
      // UPDATE
      .addCase(updatePost.fulfilled, (s, a) => {
        const index = s.posts.findIndex(p => p._id === a.payload.post._id);
        if (index !== -1) s.posts[index] = a.payload.post;
      })
      // DELETE
      .addCase(deletePost.fulfilled, (s, a) => {
        s.posts = s.posts.filter(p => p._id !== a.payload);
      });
  },
});

export default postSlice.reducer;
