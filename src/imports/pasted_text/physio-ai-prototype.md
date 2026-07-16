Figma AI Prompt: AI Powered Remote Physiotherapy Monitoring System (ACL/Knee Rehabilitation)

Create a professional, modern, and healthcare-focused prototype for an AI Powered Remote Physiotherapy Monitoring System designed specifically for ACL and knee rehabilitation. The prototype should include both a system architecture diagram and complete website wireframes. Use a clean healthcare aesthetic with blue and white as the primary colours, complemented by subtle green accents. The design should be suitable for a university Technopreneurship Team Project (TTP) presentation and future implementation.

Project Overview

The proposed system aims to improve remote physiotherapy by assisting patients in performing ACL and knee rehabilitation exercises correctly at home. The system utilizes Artificial Intelligence through TensorFlow.js MoveNet pose estimation to monitor body movements in real time, provide corrective feedback, and allow physiotherapists to remotely track patient progress.

The system is intended to support physiotherapy services and improve rehabilitation accessibility, but it should not replace professional medical diagnosis or treatment.

Part 1: System Architecture Diagram

Design a detailed system architecture diagram illustrating the complete workflow of the proposed system. Include clear directional arrows, icons, labels, and sections to differentiate between users, AI components, and data flow.

User Roles
Physiotherapist
Registers and manages patients.
Creates personalized rehabilitation plans.
Assigns ACL or knee rehabilitation exercises.
Generates unique patient access codes.
Monitors patient rehabilitation progress remotely.
Reviews exercise reports and common movement errors.
Patient
Accesses the rehabilitation website using a laptop or desktop browser.
Logs in using credentials or a patient access code.
Views assigned rehabilitation exercises.
Watches reference exercise videos before starting.
Performs rehabilitation exercises using a webcam.
Receives immediate corrective feedback.
Views exercise results and progress history.
AI Processing Workflow

Illustrate the following sequence:

Physiotherapist Dashboard
↓
Assign Rehabilitation Plan
↓
Generate Patient Access Code
↓
Patient Login
↓
Patient Dashboard
↓
Select Assigned Exercise
↓
Reference Exercise Video
↓
Webcam Capture
↓
TensorFlow.js MoveNet Pose Estimation
↓
Body Keypoint Detection
↓
Joint Angle Calculation
↓
Exercise Recognition and Repetition Counting
↓
Dynamic Time Warping (DTW) Comparison
↓
Real-Time Feedback Engine
↓
Performance Evaluation
↓
Database Storage
↓
Physiotherapist Dashboard and Progress Monitoring

AI Engine Section

Create a dedicated section highlighting the technologies used:

TensorFlow.js
MoveNet Pose Estimation
Body Skeleton Tracking
Joint Angle Calculation
Exercise Recognition
Repetition Counting
Dynamic Time Warping (DTW)
Real-Time Feedback Generation

Provide sample feedback messages:

"Bend your knee further."
"Keep your back straight."
"Maintain proper posture."
"Excellent repetition."
"Exercise completed successfully."
Database Section

Illustrate that the system stores:

Patient information
Assigned exercises
Session dates
Repetition counts
Joint angle measurements
Similarity scores
Exercise reports
Progress history
Physiotherapist Dashboard Outputs

Display examples of:

Patient list
Weekly performance trends
Rehabilitation progress charts
Assigned exercise plans
Common movement errors
Exercise reports

Include a note at the bottom:

"This system is intended to support remote ACL and knee rehabilitation through AI-assisted exercise monitoring and should not replace professional medical diagnosis or treatment."

Part 2: Website Wireframes

Design realistic, user-friendly website wireframes that can later be implemented using HTML, CSS, JavaScript, TensorFlow.js, and MoveNet.

Website Sitemap

Home
├── Patient Login
│ └── Patient Dashboard
│ ├── Assigned Exercises
│ ├── Exercise Monitoring Page
│ ├── Exercise Results
│ └── Progress History
│
└── Physiotherapist Login
└── Physiotherapist Dashboard
├── Patient Management
├── Exercise Assignment
├── Reports
└── Progress Monitoring

Home Page

Include:

Project title: "AI Powered Remote Physiotherapy Monitoring System"
Tagline promoting accessible rehabilitation through AI.
Brief introduction to remote physiotherapy.
Patient Login button.
Physiotherapist Login button.
Key features section.
"How It Works" section explaining the rehabilitation process.
Patient Dashboard

Include:

Welcome message.
Assigned rehabilitation exercises.
Progress summary.
Start Exercise button.
Exercise history.
Upcoming rehabilitation sessions.
Exercise Monitoring Page

Create the most detailed page in the prototype.

Layout suggestion:

Left Panel:

Reference exercise video.
Exercise instructions.
Target repetitions.

Centre Panel:

Live webcam feed.
AI skeleton overlay generated from MoveNet.

Right Panel:

Real-time feedback messages.
Knee angle display.
Repetition counter.
Similarity score.
Session timer.
Exercise completion progress bar.

Example feedback:

"Bend your knee further."
"Maintain an upright posture."
"Good job."
"Excellent repetition."
Results Page

Display:

Overall exercise performance score.
Similarity percentage.
Number of repetitions completed.
Average knee angle.
Common mistakes detected.
Improvement recommendations.
Option to send results to the physiotherapist.
Physiotherapist Dashboard

Include:

Patient list.
Patient profiles.
Assign rehabilitation exercises.
Generate patient access codes.
View rehabilitation reports.
Monitor progress trends.
Review common movement errors.
Compare patient performance over time.
Design Requirements
Modern healthcare aesthetic.
Clean and minimal interface.
Blue and white colour palette with subtle green accents.
Use healthcare, AI, webcam, physiotherapy, and dashboard icons.
Include realistic charts and progress indicators.
Ensure accessibility with large buttons and clear typography.
Design should be suitable for future development in VS Code.
The final output should appear as a professional digital healthcare solution that combines artificial intelligence, physiotherapy, and remote patient monitoring for a university technopreneurship project.