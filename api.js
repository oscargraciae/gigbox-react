import axios from 'axios';
// import fetch from 'isomorphic-unfetch';

const baseUrl = 'http://localhost:8000';
// const baseUrl = 'http://127.0.0.1:3000';
// const baseUrl = 'https://api.gigbox.mx';
const api = {
  user: {
    async authentication(email, password) {
      const response = await axios.post(`${baseUrl}/api/v1/authentication`, { email, password });
      return response;
    },

    async create(userData) {
      const response = await axios.post(`${baseUrl}/api/v1/users`, userData);
      return response.data;
    },
    async get(username) {
      const response = await axios.get(`${baseUrl}/api/v1/users/${username}`);
      return response.data;
    },
    async getServices(username) {
      const response = await axios.get(`${baseUrl}/api/v1/services/user_services?user_id=${username}`);
      return response.data;
    },
    async setAvatar(id, avatar) {
      const response = await axios.put(`${baseUrl}/api/v1/users/${id}/avatar`, { avatar });
      return response.data;
    },
    async update(id, data) {
      const response = await axios.put(`${baseUrl}/api/v1/users/${id}`, data);
      return response.data;
    },
    async me(id) {
      const response = await axios.get(`${baseUrl}/api/v1/users/${id}/me_show`);
      return response.data;
    },
    async sendPasswordEmail(email) {
      const response = await axios.get(`${baseUrl}/api/v1/users/send_password_email?email=${email}`);
      return response.data;
    },
    async changePassword(id, data) {
      const response = await axios.put(`${baseUrl}/api/v1/users/${id}/password_reset`, data);
      return response.data;
    },
    async validationToken(token) {
      const response = await axios.get(`${baseUrl}/api/v1/users/valid_token?token_user=${token}`);
      return response.data;
    },
  },
  categories: {
    async getCategories() {
      const response = await axios.get(`${baseUrl}/api/v1/categories`, { headers: { 'content-type': 'application/json; charset=utf-8', data: {} } });
      return response.data;
    },
    async getServices(category = '', subcategory = '', lat = '', lng = '') {
      const response = await axios.get(`${baseUrl}/api/v1/services/search?q=&category=${category}&sub_category=${subcategory}&lat=${lat}&lng=${lng}`, { headers: { 'content-type': 'application/json; charset=utf-8', data: {} } });
      return response.data;
    },
  },
  services: {
    async get(id) {
      const service = await axios.get(`${baseUrl}/api/v1/services/${id}`);
      return service.data;
    },
    async getSample() {
      const service = await axios.get(`${baseUrl}/api/v1/services/sample`);
      return service.data;
    },
    async getByUser(userId) {
      const service = await axios.get(`${baseUrl}/api/v1/services/user_services?user_id=${userId}`);
      return service.data;
    },
    async search(query, lat, lng) {
      const response = await axios.get(`${baseUrl}/api/v1/services/search?q=${query}&lat=${lat}&lng=${lng}`);
      return response.data;
    },
    async getSimilar() {
      const response = await axios.get(`${baseUrl}/api/v1/services/search?q=&lat=25.6866142&lng=-100.3161126`);
      return response.data;
    },
    async getEvaluations(idService) {
      const response = await axios.get(`${baseUrl}/api/v1/services/${idService}/evaluations`);
      return response.data;
    },
    async getComments(idService, page) {
      const response = await axios.get(`${baseUrl}/api/v1/services/${idService}/comments?page=${page}`);
      return response.data;
    },
    async setComment(idService, data) {
      const response = await axios.post(`${baseUrl}/api/v1/services/${idService}/comments`, data);
      return response.data;
    },
    async deleteComment(idService, idComment) {
      const response = await axios.delete(`${baseUrl}/api/v1/services/${idService}/comments/${idComment}`);
      return response.data;
    },
    async getBySubCategory(id) {
      const response = await axios.get(`${baseUrl}/api/v1/services/search?sub_category_id=${id}`);
      return response.data;
    },
    async favorite(id) {
      const response = await axios.get(`${baseUrl}/api/v1/services/${id}/favorite`);
      return response.data;
    },
    async myfavorites() {
      const response = await axios.get(`${baseUrl}/api/v1/services/favorites`);
      return response.data;
    },
    async getMyServices() {
      const response = await axios.get(`${baseUrl}/api/v1/services/my_services`);
      return response.data;
    },
    async getMyService(id) {
      const response = await axios.get(`${baseUrl}/api/v1/services/${id}}/show_service`);
      return response.data;
    },
    async create(data) {
      const response = await axios.post(`${baseUrl}/api/v1/services`, data);
      return response.data;
    },
    async getUnitTypes() {
      const response = await axios.get(`${baseUrl}/api/v1/unit_types`);
      return response.data;
    },
  },
  packages: {
    async create(data) {
      const response = await axios.post(`${baseUrl}/api/v1/packages`, data);
      return response.data;
    },
  },
  notifications: {
    async getNotifications() {
      const response = await axios.get(`${baseUrl}/api/v1/notification`);
      return response.data;
    },
    async previewNotifications() {
      const response = await axios.get(`${baseUrl}/api/v1/notification/preview_notifications`);
      return response.data;
    },
  },
  inbox: {
    async getInbox(idUser) {
      const response = await axios.get(`${baseUrl}/api/v1/inbox/${idUser}`);
      return response.data;
    },
    async getConversations() {
      const response = await axios.get(`${baseUrl}/api/v1/inbox`);
      return response.data;
    },
    async send(data) {
      const response = await axios.post(`${baseUrl}/api/v1/inbox`, data);
      return response.data;
    },
    async previewMessages() {
      const response = await axios.get(`${baseUrl}/api/v1/inbox/preview_inbox`);
      return response.data;
    },
    async getById(id) {
      const response = await axios.get(`${baseUrl}/api/v1/inbox/${id}/get_by_id`);
      return response.data;
    },
    async getByUser(username) {
      const response = await axios.get(`${baseUrl}/api/v1/inbox/${username}/get_by_user`);
      return response.data;
    },
  },
};

export default api;
