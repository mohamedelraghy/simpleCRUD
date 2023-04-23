const axios =require('axios');
const { createPost } = require('../../../../../Self Study/web/JS/Nodejs - ( Max )/RestApi Project/controllers/feed');

const API_BASE_URL = 'http://localhost:3000/posts';

describe('Post API endpoints', () => {
  
  let createdPostId;

  test('GET / return a list of posts', async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Object);
  });

  test('POST /create-post creates a new post', async ()=> {
    const post = {
      title: "new Post",
      content: "new Post's Content",
      type: "techno"
    };

    const response = await axios.post(`${API_BASE_URL}/create-post`, post);
    expect(response.status).toBe(201);
    expect(response.data.post).toMatchObject(post);

    createdPostId = response.data.post.id;
  });

  test('GET /post/:id returns a specific post by ID', async () => {
    const response = await axios.get(`${API_BASE_URL}/${createdPostId}`);
    expect(response.status).toBe(200);
    expect(response.data.post.id).toBe(createdPostId);
  });

  test('PUT /:id update post with a give id', async ()=> {
    const updatedPost = {
      title: "Edited Post",
      content: "Edited Post's Content",
      type: "technologies"
    };

    const response = await axios.put(`${API_BASE_URL}/${createdPostId}`, updatedPost);
    expect(response.status).toBe(200);
    expect(response.data.post).toMatchObject(updatedPost)
  });

  test('DELETE /:id delete post with a given id', async() => {
    const response = await axios.delete(`${API_BASE_URL}/${createdPostId}`);
    expect(response.status).toBe(204);

    try {
      await axios.get(`${API_BASE_URL}/${createdPostId}`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});