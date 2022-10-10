// THIS FILE IS BASED OF THE RMIT-FWP LAB 08- login-registration-example

import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "LAN.user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(email, password) {
  const response = await axios.get(API_HOST + "/api/users/login", {
    params: { email, password },
  });
  const user = response.data;

  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if (user !== null) setUserLocal(user);

  return user;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function updateUser(user) {
  const response = await axios.post(API_HOST + `/api/users/update/`, user);

  return response.data;
}

async function deleteUser(user) {
  const response = await axios.post(API_HOST + `/api/users/delete/`, user);

  return response.data;
}

async function updatePassword(passwords) {
  console.log(passwords);
  const response = await axios.post(
    API_HOST + `/api/users/password/`,
    passwords
  );

  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUserLocal(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser,
  findUser,
  createUser,
  getUser,
  removeUser,
  updateUser,
  setUserLocal,
  updatePassword,
  deleteUser,
};
