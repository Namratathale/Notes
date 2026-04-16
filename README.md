# 📝 CloudNotes: AWS Serverless Note-Taking App

## 🌟 Introduction
CloudNotes is a modern, responsive, and fully functional full-stack note-taking application. It was built from the ground up to demonstrate practical implementations of core cloud computing service models, specifically leveraging the **AWS Free Tier**. 

The application features a clean, professional "MINO-inspired" design with a dynamic, engaging user interface, allowing users to seamlessly Create, Read, Update, and Delete (CRUD) their daily notes.

### ✨ Features
* **Full CRUD Functionality:** Seamlessly add, edit, and remove notes.
* **Modern UI/UX:** Professional sidebar layout, custom color-coded note cards, and smooth CSS animations.
* **Responsive Design:** Adapts beautifully to desktop, tablet, and mobile screens.
* **Cloud-Native Backend:** Data is securely stored and retrieved using Amazon DynamoDB via an Express.js API hosted on an EC2 instance.
* **Dynamic Background:** A "funful" animated floating icon background for a unique user experience.

## 🛠️ What I Used (Tech Stack)

This project strictly utilizes the **AWS Free Tier** and maps to the following cloud computing concepts:

**Frontend (Client-Side)**
* **React.js (Vite):** Fast, component-based UI development.
* **CSS3:** Custom Flexbox and Grid layouts, CSS keyframe animations.
* **FontAwesome & Google Fonts (Inter):** For clean typography and professional iconography.

**Backend & Cloud Infrastructure (AWS)**
* **IaaS (Infrastructure as a Service):** **Amazon EC2 (Ubuntu t2.micro)** hosts the Node.js/Express REST API.
* **DBaaS (Database as a Service):** **Amazon DynamoDB** (NoSQL) for fast, serverless data storage.
* **Security:** **AWS IAM (Identity and Access Management)** Roles used to securely connect EC2 to DynamoDB without hardcoding credentials, plus **AWS Security Groups** for firewall management.

## 📸 Project Screenshots

*(Add your images to the repository and update these paths!)*

![Dashboard View](./screenshots/dashboard.png)
> *The main dashboard featuring the responsive grid and dynamic background.*

![Create/Edit Note](./screenshots/create-note.png)
> *The clean, inline form for quickly capturing ideas.*

---

## 🚀 Local Development Setup

Follow these steps to run the frontend locally on your machine. 

### Prerequisites
* [Node.js](https://nodejs.org/) installed on your local machine.
* The AWS backend (EC2 + DynamoDB) must be actively running.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/notes-app-frontend.git](https://github.com/YOUR_GITHUB_USERNAME/notes-app-frontend.git)
cd notes-app-frontend

### 2. Install Dependencies
```bash
npm install
### 3. Configure the Backend Connection
Ensure your src/config.js file is pointing to your active EC2 instance's Public IPv4 address.

``` bash
// src/config.js
export const API_URL = 'http://YOUR_EC2_PUBLIC_IP:3000/api/notes';

### 4. Start the Development Server
``` bash
npm run dev
Open your browser and navigate to http://localhost:5173 to view the application!


