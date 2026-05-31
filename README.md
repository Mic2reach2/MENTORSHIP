# Business Mentor - Professional Mentorship Platform

A comprehensive business mentorship platform with role-based access control covering all MVP requirements.

## Features by Category

### Authentication & Profile
- Signup/Login with email authentication
- User profile management (name, industry, experience level)
- Password recovery flow

### User Management
- Super Admin approves/rejects mentees
- Mentor and Support dual approval (Admin + Supervisor)
- User suspension and management capabilities
- Search and filter functionality

### Mentor Assignment
- Automatic mentor matching based on:
  - Gender preferences
  - Mentor availability
  - Balanced mentee distribution
- Manual override capabilities for Admin/Supervisor

### Session Management
- **Availability Management**: Separate configuration for Group (1hr) and 1:1 (15min) sessions
- **Session Publishing**: Mentors create/publish sessions with multiple daily slots
- **Session Selection**: Mentees select from assigned mentor's published schedule
- **Rescheduling/Cancellation**: Business rule-compliant workflows
- **Attendance Tracking**: Mentor marks and tracks attendance
- **Live Session Access**: Role-based access (Mentee: join, Support: view-only, Supervisor: join)

### Communication
- Real-time private and group chat
- Automatic sanitization of sensitive data (emails, phone numbers, social handles)
- Admin and Supervisor moderation tools

### Goals & Performance
- Goal setting and self-assessment (Mentee)
- Mentor feedback and progress tracking
- Performance analytics and attendance reports

### Resources
- Mentor upload portal
- Supervisor approval workflow
- Mentee download access

### Certificates
- Automatic completion tracking
- PDF certificate generation
- Admin verification

### Safeguarding
- Mandatory post-session checklist (radio-button form)
- Report Safeguarding Concern button on all dashboards
- Immediate DSL email notifications
- Communication moderation

### Analytics & Reporting
- Dashboard analytics (users, sessions, completion rates)
- Weekly session reports (Supervisor)
- Performance trending charts

## Pages
| Page | Purpose |
|------|---------|
| `index.html` | Main dashboard with tab navigation |
| `login.html` | User authentication |
| `register.html` | New account registration |
| `chat.html` | Secure messaging interface |
| `checklist.html` | Post-session verification |

## User Roles
- **Mentee**: Profile, goals, sessions, chat, resources, certificates, safeguarding reports
- **Mentor**: Availability, sessions, checklist, mentee management, resources, reports
- **Admin**: User approvals, analytics, oversight, moderation
- **Wellbeing**: View-only monitoring, mentee profiles, safeguarding
- **Supervisor**: Mentor approval, session oversight, reports, DSL access

## Usage
Open `index.html` in your browser. Login with any demo user to explore features. Switch roles via sidebar dropdown to see different dashboards.