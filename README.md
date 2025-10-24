# Climate Action Pledge Web App 🌍

A web-based platform to encourage individuals to take climate action pledges, track commitments, and generate certificates of appreciation. The app showcases a **Public Pledge Wall** and provides a seamless user experience for submitting pledges.

# Live Project Link
https://climate-action-pledge.onrender.com/
---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Functionality & Logic](#functionality--logic)
- [Installation](#installation)

---

## Features

- **Pledge Form:** Users can submit their name, email, mobile, state, profile type, and select multiple commitment themes.
- **Live KPIs:** Displays real-time statistics like achieved pledges, target pledges, and user demographics.
- **Public Pledge Wall:** Displays all pledges in a table with relevant details.
- **Certificate Generation:** Generates a visually appealing certificate upon pledge submission.
- **Download Certificate:** Users can download the certificate as a PNG image.
- **Smooth Scrolling:** Clicking "Take the Pledge" scrolls smoothly to the pledge form.
- **Form Validation:** Ensures all required fields and at least one commitment are selected before submission.
- **Responsive Design:** Works on desktop and mobile devices.
- **Auto Refresh Pledge Wall:** Updates the pledge wall upon submission without duplicating entries.

---

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript, Bootstrap 5
- **Libraries:** html2canvas (for certificate download)
- **Backend:** JSON Server (mock API)

---

## Functionality & Logic

### 1. Smooth Scroll to Form
- Clicking the "Take the Pledge" button scrolls smoothly to the pledge form.
- Adjusts scroll position to ensure form heading is visible.

### 2. Loading States Dynamically
- Fetches state data from the server (`/states`) and populates the dropdown.

### 3. Pledge Form Submission
- Prevents default page refresh.
- Validates required fields (`name`, `email`, `mobile`, `state`, `profile type`) and ensures at least one commitment is checked.
- Prepares pledge data with current date.
- Sends a POST request to the server (`/pledges`) to save data.
- Displays a **Bootstrap modal** showing a certificate.
- Clears form and refreshes **Pledge Wall** when the modal is closed.

### 4. Public Pledge Wall
- Fetches all pledges from the server (`/pledges`).
- Displays them in a table with columns: ID, Name, Date, State, Profile, and "⭐ Love for Planet".
- Automatically refreshes after each submission without duplicating rows.

### 5. Certificate Generation & Download
- Shows user’s name and number of selected commitments as stars in a Bootstrap modal.
- Uses `html2canvas` to convert the modal content into an image.
- Allows users to download the certificate as `certificate.png`.

### 6. Error Handling
- Displays inline error messages for invalid or incomplete form submissions.
- Catches errors for server requests and certificate generation.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/BrajendraSing/Climate-Action-Pledge-Microsite
cd Climate-Action-Pledge-Microsite
```

2. Install JSON Server (if not installed):
```bash
npm install -g json-server
```
3. Start the JSON Server:
```bash
json-server --watch db.json --port 3001
```
4. Open index.html in your browser (or use VS Code Live Server).


