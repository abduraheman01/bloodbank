# PROJECT SYNOPSIS
**(BCSP-064)**

# BLOOD BANK & DONOR MANAGEMENT SYSTEM 

**SUBMITTED BY**
ABDURAHEMAN k
**ENROLLMENT NO:** 2253380745
**UNDER SUPERVISION OF:** ANURAG KR

Submitted in partial fulfillment of the requirements for qualifying **BCA**

**Indira Gandhi National Open University**
Maidan Garhi
New Delhi – 110068
2025

---

## Introduction

Blood is one of the most essential medical resources required for surgeries, accidents, emergency treatments, childbirth, and treatment of various diseases. In many emergency situations, patients and hospitals face difficulty in finding suitable blood donors at the right time. Delay in arranging blood can seriously affect patient survival and treatment outcomes.

Traditional blood bank systems often depend on manual registers, phone calls, paper records, or outdated donor lists. These methods are time-consuming, less accurate, and difficult to manage during emergencies. They also create problems such as delayed communication, duplicate records, and lack of updated donor availability information.

The Blood Bank & Donor Management System (BBDMS) is a web-based application developed to solve these problems through a centralized digital platform. The system allows blood donors to register online, update their profiles, manage availability status, and maintain donation history. Recipients can search for donors based on blood group and location and submit urgent blood requests.

The system also provides real-time updates so that users can view the latest donor availability instantly. An administrator dashboard is included for managing users, blood requests, reports, and system activities.

This project is developed using Next.js for frontend development and Supabase (PostgreSQL) for backend database services. The proposed system aims to reduce manual work, improve efficiency, save valuable time during emergencies, and support better coordination between donors, recipients, and healthcare organizations.

---

## Objectives

The primary aim of the Blood Bank & Donor Management System (BBDMS) is to develop an efficient, secure, and user-friendly digital platform for managing blood donors and blood requests. The system is designed to improve communication between donors, recipients, hospitals, and administrators while reducing delays during emergencies.

The specific objectives of the project are as follows:
- To create an online platform for maintaining blood donor records in a centralized database. 
- To provide a real-time system where available donors and urgent blood requests are updated instantly. 
- To enable users to search blood donors based on blood group, city, district, or location. 
- To provide secure user registration and login facilities for donors, recipients, and administrators. 
- To protect sensitive user data through proper authentication and access control mechanisms. 
- To maintain donation history and request records for better tracking and management. 
- To send notifications and alerts to matching donors when emergency blood requests are created. 
- To automate donor eligibility checking based on the required waiting period after donation. 
- To provide an administrator dashboard for monitoring users, requests, and reports. 
- To reduce paperwork, save time, and improve efficiency in blood bank operations. 
- To support quick response during emergencies and improve patient care.

---

## Project Category

The Blood Bank & Donor Management System (BBDMS) belongs to the following project categories:
1. **RDBMS (Relational Database Management System)**: The system uses PostgreSQL database through Supabase as its core database engine. It stores and manages structured data such as user details, donor records, blood groups, donation history, notifications, and blood requests. The relational database design helps maintain data consistency, accuracy, and reduced redundancy through proper table relationships and keys.
2. **Web Based Application**: The project is developed as a web-based application that can be accessed through internet browsers on desktop and mobile devices. Users can register, search donors, create requests, and manage data online.
3. **Real-Time Information System**: The system provides real-time updates for donor availability and blood requests. Important information can be updated instantly so that users receive the latest data without delay.
4. **Full Stack Development Project**: The project uses both frontend and backend technologies. Next.js is used for user interface development, while Supabase is used for backend services such as database management, authentication, and real-time communication.
5. **Healthcare Management System**: This project is also categorized as a healthcare management application because it supports blood donation management, emergency blood request handling, and coordination between donors and recipients.

---

## ANALYSIS
System analysis is the process of studying the requirements, structure, and working of the proposed system. It helps in understanding how data is entered, processed, stored, and retrieved.
For the Blood Bank & Donor Management System (BBDMS), analysis is important to understand the interaction between donors, recipients, administrators, and the database. It also helps in designing an efficient and reliable system.

The analysis section includes:

### 4.1 Data Flow Diagrams (DFDs)
Data Flow Diagrams are graphical representations used to show the movement of data between users, processes, and data stores in the system.
* Level 0 DFD (Context Diagram)
* Level 1 DFD
* Level 2 DFD

### 4.2 Entity Relationship Diagram (ERD)
The Entity Relationship Diagram shows the entities and relationships used in the database.
Relationships:
- One user can create many requests 
- One user can become one donor 
- One donor belongs to one blood group 
- One donor can donate many times 
- One user can receive many notifications 

### 4.3 Database Design
The system uses PostgreSQL database through Supabase. The database is normalized to reduce redundancy and improve consistency.

---

## Modules

The Blood Bank & Donor Management System (BBDMS) is divided into major modules to simplify development, improve maintainability, and provide smooth operation. Each module performs specific tasks and works together with other modules.

### 5.1 Authentication and User Management Module
This module handles user registration, login, logout, and profile management.
Functions:
- New user registration 
- Secure login and logout 
- Password reset 
- User profile update 
- Role management (Donor / Recipient / Admin) 

### 5.2 Donor Management Module
This module manages donor information and donation status.
Functions:
- Add donor details 
- Update blood group 
- Update city and phone number 
- Update availability status 
- Store last donation date 
- Check donor eligibility 

### 5.3 Search and Blood Request Module
This module allows recipients to search donors and create emergency blood requests.
Functions:
- Search donor by blood group 
- Search donor by city / district 
- Filter available donors 
- Create urgent blood request 
- View request status 

### 5.4 Notification Module
This module sends alerts and important updates to users.
Functions:
- Emergency request alerts 
- Matching donor notifications 
- Eligibility reminders 
- Request completed messages 

### 5.5 Admin Control Module
This module is used by the administrator to control and monitor the system.
Functions:
- Manage users 
- View donor records 
- View blood requests 
- Remove fake users 
- Generate reports 
- Monitor activities

---

## SOFTWARE REQUIREMENT SPECIFICATION (SRS)
The Software Requirement Specification (SRS) defines the functional and non-functional requirements of the proposed Blood Bank & Donor Management System (BBDMS). It describes the services, user roles, system performance, and technical needs of the project.

### 6.1 Functional Requirements
- **6.1.1 User Registration**: The system shall allow users to register using name, email, password, mobile number, blood group, city, and user type (Donor / Recipient). All inputs shall be validated.
- **6.1.2 User Login and Authentication**: The system shall provide secure login using email and password. It shall also support logout, password reset, and session management.
- **6.1.3 Donor Profile Management**: Donors shall be able to create and update profile details, blood group, contact number, city, and availability status.
- **6.1.4 Search Donor Module**: Users shall search donors by blood group, city, district, or pincode. Matching donor records shall be displayed.
- **6.1.5 Blood Request Management**: Recipients shall create blood requests by entering required blood group, patient name, hospital name, location, urgency level, and contact number.
- **6.1.6 Notification System**: The system shall send alerts for new blood requests, emergency requests, eligibility reminders, and request completion.
- **6.1.7 Donor Eligibility Verification**: The system shall automatically verify donor eligibility based on donation history. Donors who donated within 90 days shall be marked not eligible.
- **6.1.8 Admin Dashboard**: The administrator shall manage users, donor records, blood requests, reports, and notifications.
- **6.1.9 Report Generation**: The system shall generate reports such as total users, donors, blood-group-wise donors, city-wise donors, monthly requests, and successful donations.
- **6.1.10 Database Management**: The system shall securely store and retrieve data related to users, donors, requests, notifications, donation history, and blood groups.

### 6.2 Non-Functional Requirements
- Fast page loading and quick response time 
- Secure login and protected data 
- Accurate and reliable data storage 
- 24x7 system availability 
- Easy and user-friendly interface 
- Responsive design for mobile and desktop 
- Modular structure for easy maintenance

### Tools, Hardware and Software Requirements
| Category | Component | Details |
|---|---|---|
| **Frontend** | Framework | Next.js 15, Tailwind CSS, TypeScript |
| **Backend** | Serverless | Supabase (PostgreSQL, Auth, Realtime) |
| **Hardware** | RAM/CPU | 8 GB RAM Minimum, Intel i3/i5 or Apple M-series |
| **Software** | OS/Env | Windows 10/11 or macOS; Node.js v20+ |

---

## Testing Process

Testing is performed to ensure that the system works correctly, securely, and efficiently. Different types of testing are conducted to identify and remove errors.

### 7.1 Unit Testing
Unit testing checks individual components or functions of the system.
Examples:
- Login form validation 
- Search button functionality 
- Request form submission 

### 7.2 Integration Testing
Integration testing checks whether modules work properly together.
Examples:
- Login connected with database 
- Search module connected with donor records 
- Notifications triggered after request creation 

### 7.3 System Testing
System testing checks the complete application as a whole.
Examples:
- Full registration to request workflow 
- Admin management process 
- Donor availability update process
