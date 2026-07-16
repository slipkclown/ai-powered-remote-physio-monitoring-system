Part 4: Final Prototype Refinements and Synchronization Updates

The overall website structure, user interface, navigation flow, AI rehabilitation monitoring module, physiotherapist dashboard, patient dashboard, confidence tracking, recovery journal, communication bridge, and exercise monitoring features are satisfactory and should be retained.

The following refinements should be implemented to improve usability, consistency, realism, and synchronization between patient and physiotherapist modules.

=================================================
BRANDING AND NAMING UPDATES
===========================

Replace all occurrences of "PhysioAI Recovery" with:

Recovr

The website should consistently use the Recovr branding across all pages, dashboards, login portals, navigation bars, reports, architecture diagrams, and profile pages.

Update all titles and taglines by removing unnecessary dashes (-).

Use the following wording consistently:

AI Powered ACL Rehabilitation Human Centered

Human Centered AI Rehabilitation Support for ACL Recovery

Development of a Human Centered AI Powered Monitoring and Recovery Support System for Home Based ACL Rehabilitation of Injured Athletes

Replace footer text with:

Recovr – TTP Project by Universiti Teknologi PETRONAS

=================================================
LOGIN PAGE IMPROVEMENTS
=======================

The password visibility toggle button should be fully functional on both patient and physiotherapist login pages.

When users click the eye icon:

* Password becomes visible
* Clicking again hides the password

For physiotherapist login:

* Remove Physiotherapist ID completely
* Login should only require:

  * Email Address
  * Password

Add a registration option:

"New Physiotherapist? Create Account"

Existing physiotherapists may sign in using their registered email and password.

For patient login:

* Remove Patient ID completely
* Login should only require:

  * Email Address and Password
    OR
  * Access Code

=================================================
PHYSIOTHERAPIST DASHBOARD IMPROVEMENTS
======================================

Add a permanent Home button in the sidebar navigation so users can return to the dashboard overview from any page.

The following dashboard statistics cards should be fully interactive:

* Active Patients
* Sessions Today
* Average Performance
* Reports Pending

Each card should redirect to its corresponding detailed page.

=================================================
PATIENT MANAGEMENT MODULE IMPROVEMENTS
======================================

When creating a patient:

Remove:

* Rehabilitation Plan dropdown

Keep:

* Name
* Age
* Email
* Rehabilitation Week Number

Replace Injury Stage with:

Current Rehabilitation Week

Examples:

Week 1
Week 2
Week 3
Week 4

This better reflects actual ACL rehabilitation progression.

Add profile photo upload functionality for both patients and physiotherapists.

Users should be able to:

* Upload profile picture
* Change profile picture later
* Remove profile picture

=================================================
EXERCISE ASSIGNMENT WORKFLOW
============================

When a physiotherapist assigns exercises:

The assigned exercise should automatically appear in the patient's dashboard.

Create a dedicated "Assigned Exercises" section showing:

* Exercise name
* Date assigned
* Number of sets
* Number of repetitions
* Current completion status

Example:

Mini Squat
Assigned: Week 3
2 Sets × 8 Repetitions
Status: Pending

After assignment:

Automatically send a notification to the patient.

Example:

"You have been assigned a new rehabilitation exercise by your physiotherapist."

=================================================
REPORTING SYSTEM IMPROVEMENTS
=============================

The reporting workflow should be clarified and synchronized.

Physiotherapists should be able to:

* View exercise reports
* View performance summaries
* View confidence trends
* View journal submissions
* View weekly check-ins

Patients should be able to:

* View all previous exercise reports
* View historical performance records
* View progress trends over time

Reports should not be limited to a single exercise session.

Instead, display:

Week 1 Results
Week 2 Results
Week 3 Results
Week 4 Results

Each week should contain:

* Exercise completed
* Repetition count
* Similarity score
* Knee angle performance
* Feedback received
* Overall performance score

=================================================
PROGRESS HISTORY IMPROVEMENTS
=============================

The Recent History widget should be fully clickable.

Selecting "View Full History" should redirect users to the complete Progress History page.

The Progress History page should contain:

* All completed exercises
* Weekly performance summaries
* Exercise completion records
* Historical reports
* Performance trends

This page should function as a centralized rehabilitation history repository.

=================================================
RECOVERY JOURNAL IMPROVEMENTS
=============================

Recovery Journal entries should be visible to both:

* Patients
* Physiotherapists

Physiotherapists should have a dedicated Journal Review page.

They should be able to review:

* Daily reflections
* Weekly reflections
* Recovery concerns
* Progress observations

The journal should become part of the patient monitoring ecosystem.

=================================================
MESSAGE CENTRE IMPROVEMENTS
===========================

The Message Centre should be available on both sides:

Patient Side:

* Send messages
* Receive responses
* View notifications

Physiotherapist Side:

* Receive patient questions
* Send recommendations
* Respond to concerns

Add notification system for both users.

Examples:

Patient Notification:
"Dr. Sarah Chen has replied to your message."

Physiotherapist Notification:
"Muhammad Arif submitted a new journal entry."

=================================================
PROFILE MANAGEMENT IMPROVEMENTS
===============================

Remove Patient ID completely from all patient profile pages.

Replace with:

* Full Name
* Email
* Phone Number
* Date of Birth
* Current Rehabilitation Week

For physiotherapist profiles:

Clarify registration number functionality.

Registration number should:

* Be editable
* Be validated
* Be stored in the profile database

=================================================
CONFIDENCE TRACKING AND WEEKLY CHECK-IN IMPROVEMENTS
====================================================

The Weekly Confidence Check-In and Weekly Check-In questionnaire should not appear independently.

Instead:

Immediately after completing an exercise session:

1. Exercise Results Page
2. Weekly Confidence Check-In
3. Weekly Check-In Form
4. Results sent to physiotherapist

This creates a complete rehabilitation feedback cycle.

=================================================
PATIENT–PHYSIOTHERAPIST SYNCHRONIZATION
=======================================

This is the most important improvement.

All patient activities should synchronize automatically with the physiotherapist dashboard.

When patients:

* Complete exercises
* Submit journals
* Submit confidence check-ins
* Submit weekly check-ins
* Send messages

The physiotherapist should immediately see updated information.

Likewise, when physiotherapists:

* Assign exercises
* Send messages
* Provide recommendations
* Update rehabilitation plans

Patients should immediately receive notifications.

The entire system should function as a connected rehabilitation ecosystem rather than separate patient and physiotherapist platforms.

The final prototype should clearly demonstrate real-time interaction, monitoring, communication, progress tracking, and recovery support between both users.