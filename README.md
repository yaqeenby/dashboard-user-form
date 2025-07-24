# DashboardUserForm

## 📦 Project

Angular application with a dashboard and a user creation.

---

## 🚀 Features

- 📊 **Dashboard KPIs Overview** – View key performance indicators at a glance
- 👤 **User Shift Details** – Inspect individual user shift history and details
- ➕ **User Management** – List existing users and add new users through a form

---

## 🛠️ Tech Stack

- Angular v19+.
- Save and retrieve data using a mock backend (jsonserver).

---

## 🧾 Assumptions Made

- User authentication is handled externally. The app assumes that a valid user session or token already exists and does not include login or authentication logic.

- No CSS framework (like Bootstrap or Tailwind) was specified in the instructions, so I implemented the required styles manually using SCSS for full control and customization.

- Assumed API returns paginated responses

## 📌 Important Note

Since the business requirements did not specify data validation for import functionality, this implementation handles only CSV import without validating the file content.

The CSV import accepts the file as-is without validating the content fields.

For testing, a sample CSV file is included at:
src/assets/samples/shifts.csv

## 📦 Setup Instructions

### ✅ Prerequisites

- Node v20+
- Angular CLI v19+
- Package Manager v10+

---

### 🔧 Installation

```bash
# 1. Clone the repository
git clone https://github.com/yaqeenby/dashboard-user-form.git

# 2. Navigate to the project
cd dashboard-user-form

# 3. Install dependencies
npm install
```

### Run

Run `npm start` and then navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
