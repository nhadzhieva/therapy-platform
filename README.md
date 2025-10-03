# 🌿 Therapy Platform - Online Counseling MVP

A modern, professional Angular application connecting patients with licensed therapists for online counseling sessions.

## ✨ Features

### For Patients
- 🔐 Register and login
- 🔍 Search and filter therapists by specialization, rate
- 📅 Book therapy sessions
- 📆 View appointments in calendar
- 👤 Manage profile

### For Therapists
- 🔐 Register and login as therapist
- 🩺 Manage professional profile (bio, education, specializations, photo)
- ⏰ Set availability slots
- ✅ Confirm/manage appointment requests
- 📆 View sessions in calendar

## 🛠️ Technology Stack

- **Frontend**: Angular 20.3 (latest)
- **UI Library**: Angular Material 20.2
- **State Management**: NGRX 20.0 (Store, Effects, Entity, DevTools)
- **Styling**: SCSS with custom green theme
- **Backend (Mock)**: JSON Server
- **Language**: TypeScript 5.9

## 🎨 Design

- **Primary Color**: Green (#43A047) - representing growth, healing, and health
- **Accent**: Teal (#26A69A)
- **Design System**: Material Design with professional medical aesthetic
- **Responsive**: Mobile-first, works on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation & Running

**Option 1: Run services separately**
```bash
# Terminal 1: Start mock backend
npm run api

# Terminal 2: Start Angular dev server
npm start
```

**Option 2: Run concurrently**
```bash
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:4200
- **Mock API**: http://localhost:3000
- **NGRX DevTools**: Available in browser Redux DevTools

## 👤 Demo Accounts

### Patient Account
```
Email: patient@test.com
Password: password123
```

### Therapist Accounts
```
Dr. Sarah Smith (Anxiety, Depression, Stress)
Email: therapist@test.com
Password: password123

Dr. Michael Johnson (Relationships, Family, Trauma)
Email: therapist2@test.com
Password: password123

Dr. Emily Brown (ADHD, Autism, Child Psychology)
Email: therapist3@test.com
Password: password123
```

## 📊 Current Implementation Status

### ✅ Completed
- [x] Angular project setup with Material and NGRX
- [x] Project structure and architecture
- [x] NGRX store (auth, therapists, appointments)
- [x] All services (API, Auth, Therapist, Appointment)
- [x] Guards (auth, role-based)
- [x] Mock backend with JSON Server
- [x] Routing configuration
- [x] Green Material theme
- [x] Login component (fully functional)
- [x] Mock data (users, appointments)

### 🚧 To Be Built
- [ ] Register component
- [ ] Patient dashboard
- [ ] Therapist search and filters
- [ ] Booking flow
- [ ] Calendar components
- [ ] Therapist dashboard
- [ ] Profile management
- [ ] Availability management
- [ ] Navigation header
- [ ] Shared components (cards, dialogs, etc.)

## 📖 Documentation

- **[PROJECT_SETUP.md](./PROJECT_SETUP.md)** - Detailed setup and architecture
- **[NEXT_STEPS.md](./NEXT_STEPS.md)** - Implementation guide and priorities

## 📦 Project Structure

```
src/app/
├── core/
│   ├── guards/         # Authentication and role guards
│   ├── interceptors/   # HTTP interceptors
│   └── services/       # API services
├── features/
│   ├── auth/           # Login & Register
│   ├── patient/        # Patient features
│   └── therapist/      # Therapist features
├── shared/
│   ├── components/     # Reusable components
│   ├── models/         # TypeScript interfaces
│   └── pipes/          # Custom pipes
└── store/
    ├── auth/           # Auth state
    ├── therapists/     # Therapists state
    └── appointments/   # Appointments state
```

## 🧪 Development Commands

```bash
npm start          # Start dev server
npm run build      # Build for production
npm run watch      # Build with watch mode
npm test           # Run unit tests
npm run api        # Start JSON server
npm run dev        # Start both servers
```

## 🎯 Next Steps

1. **Create Register Component** - Complete auth flow
2. **Build Dashboards** - Patient and Therapist main views
3. **Implement Search** - Therapist discovery
4. **Create Booking Flow** - Appointment creation
5. **Add Calendar** - Schedule visualization
6. **Polish UI** - Animations, transitions, feedback

See **[NEXT_STEPS.md](./NEXT_STEPS.md)** for detailed implementation guide.

---

**Built with ❤️ using Angular, Material Design, and NGRX**
