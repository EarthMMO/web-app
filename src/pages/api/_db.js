import fetch from "node-fetch";

// IMPORTANT: To connect to your database of choice you'll want to
// replace each `fetch` call with your database client library or API call
// to your database server.

// By default we use `json-server` which reads/writes to db.json (just for prototyping)

// Path to JSON server
// Remember to run the command: `npm run json-server`
const JSON_SERVER = "http://localhost:8000";

/**** USERS ****/

// Get user by uid
export function getUser(uid) {
  return fetch(`${JSON_SERVER}/users/${uid}`).then((r) => r.json());
}

// Create a new user
export function createUser(uid, data) {
  return fetch(`${JSON_SERVER}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: uid, ...data }),
  }).then((r) => r.json());
}

// Update an existing user
export function updateUser(uid, data) {
  return fetch(`${JSON_SERVER}/users/${uid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
}

/**** ITEMS ****/

// Fetch item data
export function getItem(id) {
  return fetch(`${JSON_SERVER}/items/${id}`).then((r) => r.json());
}

// Fetch all items by owner
export function getItemsByOwner(owner) {
  return fetch(
    `${JSON_SERVER}/items?owner=${owner}&_sort=createdAt&_order=desc`
  ).then((r) => r.json());
}

// Create a new item
export function createItem(data) {
  return fetch(`${JSON_SERVER}/items/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, createdAt: Date.now() }),
  }).then((r) => r.json());
}

// Update an item
export function updateItem(id, data) {
  return fetch(`${JSON_SERVER}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
}

// Delete an item
export function deleteItem(id) {
  return fetch(`${JSON_SERVER}/items/${id}`, {
    method: "DELETE",
  }).then((r) => r.json());
}
