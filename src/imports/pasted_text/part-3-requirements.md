Part 3: Updated Functional Requirements and User Experience Improvements

IMPORTANT:

Retain ALL previous requirements, pages, architecture, workflows, user roles, AI modules, dashboards, and design specifications described above.

Do not remove, simplify, or replace any existing feature.

The following requirements are ADDITIONAL enhancements and corrections that must be incorporated into the final prototype.

=================================================
SYSTEM NAME UPDATE
==================

Use the following official project title throughout the prototype:

Development of a Human-Centered AI-Powered Monitoring and Recovery Support System for Home-Based ACL Rehabilitation of Injured Athletes

Website Branding Name:

PhysioAI Recovery

Tagline:

Human-Centered AI Rehabilitation Support for ACL Recovery

=================================================
PATIENT ACCOUNT CREATION FLOW
=============================

Patient self-registration should NOT be available.

Instead:

1. Physiotherapist creates patient accounts.
2. Physiotherapist assigns:

   * Patient name
   * Email
   * Temporary password
   * Rehabilitation plan
3. System automatically generates:

   * Patient ID
   * Access Code
4. Patient receives credentials.
5. Patient logs in using credentials provided by the physiotherapist.

Update all wireframes and workflows accordingly.

=================================================
INTERACTIVE NAVIGATION REQUIREMENTS
===================================

All buttons must be fully interactive and navigate users to their corresponding sections or pages.

The prototype should simulate a realistic website experience.

Avoid requiring users to manually scroll to access sections.

Buttons must automatically redirect to the appropriate destination.

=================================================
HOME PAGE BUTTON NAVIGATION
===========================

Patient Login Button
→ Redirect to Patient Login Page

Physiotherapist Login Button
→ Redirect to Physiotherapist Login Page

Key Features Button
→ Scroll to Key Features Section

How It Works Button
→ Scroll to How It Works Section

Architecture Button
→ Redirect to Architecture Diagram Page

=================================================
PATIENT DASHBOARD NAVIGATION
============================

Assigned Exercises Card
→ Redirect to Exercise Assignment Page

Start Exercise Button
→ Redirect to Exercise Monitoring Page

Progress History Button
→ Redirect to Progress History Page

Exercise Results Button
→ Redirect to Results Page

Recovery Journal Button
→ Redirect to Recovery Journal Page

Confidence Tracking Button
→ Redirect to Confidence Tracking Page

Weekly Check-In Button
→ Redirect to Weekly Check-In Page

=================================================
PHYSIOTHERAPIST DASHBOARD IMPROVEMENTS
======================================

Create a fully functional Patient Management Module.

Add:

[ Add Patient ]

Button functionality:

1. Opens Add Patient Form
2. Enter:

   * Name
   * Email
   * Injury Stage
   * Rehabilitation Plan
3. Create Account
4. Generate Access Code
5. Save to Patient List

Show success notification:

"Patient account created successfully."

=================================================
ASSIGN EXERCISE MODULE
======================

Assign Exercise Button

Must redirect to:

Exercise Assignment Interface

Features:

* Select patient
* Select exercise
* Set repetitions
* Set frequency
* Set rehabilitation duration
* Save assignment

Display notification:

"Exercise assigned successfully."

=================================================
ACCESS CODE GENERATION
======================

Generate Access Code Button

Must generate unique rehabilitation code.

Display:

Generated Code:
ACL-2025-XXXX

Add:

Copy Code Button

When clicked:

Show success toast notification:

"Access code copied successfully."

=================================================
REPORTS MODULE
==============

Reports Button

Must redirect to:

Reports Page

Display:

* Exercise reports
* Session summaries
* Compliance statistics
* Confidence tracking trends
* Progress analytics

=================================================
PATIENT PROFILE MANAGEMENT
==========================

Add new section:

Manage Profile

For both patients and physiotherapists.

Patient Profile:

* Name
* Email
* Rehabilitation Stage
* Assigned Physiotherapist
* Password Update

Physiotherapist Profile:

* Name
* Clinic Name
* Email
* Contact Number
* Password Update

=================================================
RECOVERY SUPPORT FEATURES
=========================

Add dedicated Human-Centered Recovery Support Module.

---

1. Confidence Tracking

Weekly questionnaire:

"How confident do you feel using your injured leg?"

Scale:

1 = Not Confident
5 = Very Confident

Display confidence trend graph.

---

2. Recovery Journal

Patient can write:

* Recovery experiences
* Concerns
* Daily reflections
* Rehabilitation progress

Journal entries stored in database.

Physiotherapist can review journal entries.

---

3. Weekly Check-In

Patient submits:

* Pain Level
* Confidence Level
* Motivation Level
* Recovery Concerns

Responses appear on physiotherapist dashboard.

---

4. Communication Bridge

Add:

Patient Message Centre

Patient can:

* Ask questions
* Submit concerns
* Report difficulties

Physiotherapist can:

* Respond to concerns
* Provide advice
* Recommend exercise adjustments

---

5. Motivation System

After:

* Completing exercise session
* Completing weekly check-in
* Writing journal entry
* Achieving milestone

Display motivational messages.

Examples:

"Excellent work today."

"Consistency leads to recovery."

"You are one step closer to returning stronger."

"Small progress is still progress."

=================================================
RECOVERY MILESTONES
===================

Create visual milestone tracker.

Examples:

✓ First Week Completed

✓ 50 Exercise Repetitions Completed

✓ Walking Independently

✓ Full Knee Extension Achieved

✓ Return to Jogging

Display milestone progress bar.

=================================================
BUTTON FIXES
============

Ensure all buttons throughout the prototype function correctly.

No inactive buttons should remain.

Examples:

* View Button
* Reports Button
* Add Patient Button
* Assign Exercise Button
* Copy Code Button
* Generate Code Button
* Manage Profile Button
* Progress History Button
* Exercise Results Button

All should navigate to appropriate pages or trigger realistic actions.

=================================================
REMOVE UNUSED FEATURES
======================

Remove:

Session Removal Button

This feature is not required.

=================================================
FINAL DESIGN GOAL
=================

The final prototype should present a complete Human-Centered ACL Rehabilitation Ecosystem that combines:

* AI Exercise Monitoring
* TensorFlow.js MoveNet Pose Estimation
* Real-Time Feedback
* Physiotherapist Oversight
* Patient Progress Monitoring
* Confidence Tracking
* Recovery Journal
* Communication Bridge
* Motivation Support
* Recovery Milestones

The prototype should clearly demonstrate both physical rehabilitation monitoring and human-centered recovery support, differentiating it from conventional rehabilitation monitoring systems.
