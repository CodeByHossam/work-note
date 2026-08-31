# Work Note — User Stories

## Purpose

This document defines the functional requirements and development roadmap for the **Work Note** application.

The application is intended to replace handwritten work notes with a digital system that allows users to record, organize, search, update, and review work-related information.

Because the project is already under development, the user stories are organized to support both:

- functionality that has already been implemented
- functionality that still needs to be completed

The status of each story should be updated during development.

---

# Status Legend

- `[ ]` Not started
- `[~]` In progress
- `[x]` Completed
- `[!]` Needs review / correction

---

# Epic 1 — Project Foundation

## US-001 — Application Structure

**As a developer,**

I want the application to have a clear separation between frontend and backend,

**so that the project is easier to develop, maintain, and deploy.**

### Acceptance Criteria

- [ ] React frontend exists inside `client/`
- [ ] Node/Express backend exists inside `server/`
- [ ] Frontend and backend can run independently
- [ ] Project structure is documented
- [ ] Environment variables are separated from source code

**Status:** `[~]`

---

# Epic 2 — User Authentication

## US-002 — User Registration

**As a new user,**

I want to create an account,

**so that I can use the Work Note application.**

### Acceptance Criteria

- [ ] User can open the registration form
- [ ] User can enter required registration information
- [ ] Backend validates the submitted information
- [ ] Duplicate users are rejected
- [ ] Password is securely stored
- [ ] User receives appropriate success/error feedback
- [ ] User can log in after registration

**Status:** `[ ]`

---

## US-003 — User Login

**As a registered user,**

I want to log in,

**so that I can access my work notes.**

### Acceptance Criteria

- [ ] User can enter login credentials
- [ ] Backend verifies credentials
- [ ] Invalid credentials are rejected
- [ ] Successful login creates an authenticated session/token
- [ ] User is redirected to the appropriate application page
- [ ] Authentication state is maintained correctly

**Status:** `[ ]`

---

## US-004 — User Logout

**As an authenticated user,**

I want to log out,

**so that my account is no longer accessible from the current session.**

### Acceptance Criteria

- [ ] Logout control is available
- [ ] Authentication information is removed/invalidated
- [ ] Protected pages cannot be accessed after logout
- [ ] User is redirected appropriately

**Status:** `[ ]`

---

# Epic 3 — Work Notes

## US-005 — Create a Work Note

**As a user,**

I want to create a work note,

**so that I can record information about my work.**

### Acceptance Criteria

- [ ] User can open the create-note form
- [ ] User can enter the required note information
- [ ] User can save the note
- [ ] Frontend sends the note to the backend
- [ ] Backend validates the data
- [ ] Note is stored in MongoDB
- [ ] User receives confirmation after successful creation
- [ ] Newly created note can be viewed

**Status:** `[~]`

---

## US-006 — View Work Notes

**As a user,**

I want to view my work notes,

**so that I can review previously recorded information.**

### Acceptance Criteria

- [ ] User can access the notes list
- [ ] Notes are retrieved from the backend
- [ ] Notes are displayed clearly
- [ ] Important note information is visible
- [ ] Loading state is displayed when required
- [ ] Errors are handled appropriately

**Status:** `[~]`

---

## US-007 — View a Single Work Note

**As a user,**

I want to open a specific work note,

**so that I can see its complete information.**

### Acceptance Criteria

- [ ] User can select a note
- [ ] Application retrieves the selected note
- [ ] Complete note information is displayed
- [ ] User can return to the notes list
- [ ] Invalid/non-existing notes are handled appropriately

**Status:** `[ ]`

---

## US-008 — Edit a Work Note

**As a user,**

I want to edit an existing work note,

**so that I can correct or update information.**

### Acceptance Criteria

- [ ] User can select edit
- [ ] Existing note data is loaded into the form
- [ ] User can modify the required fields
- [ ] User can save the changes
- [ ] Backend validates the updated data
- [ ] Database is updated
- [ ] Updated information is displayed

**Status:** `[~]`

---

## US-009 — Delete a Work Note

**As a user,**

I want to delete a work note,

**so that obsolete or incorrect notes can be removed.**

### Acceptance Criteria

- [ ] User can select delete
- [ ] Application asks for confirmation before deletion
- [ ] Backend deletes the note
- [ ] Deleted note no longer appears in the list
- [ ] Errors are handled appropriately

**Status:** `[ ]`

---

# Epic 4 — Note Organization

## US-010 — Categorize Work Notes

**As a user,**

I want to assign a category to a work note,

**so that my notes can be organized according to their subject or purpose.**

### Acceptance Criteria

- [ ] Categories can be created/defined
- [ ] User can select a category when creating a note
- [ ] User can change a note's category
- [ ] Category is stored with the note
- [ ] Notes can be displayed by category

**Status:** `[ ]`

---

## US-011 — Search Work Notes

**As a user,**

I want to search my work notes,

**so that I can quickly find previous information.**

### Acceptance Criteria

- [ ] Search input is available
- [ ] User can search by relevant note information
- [ ] Matching notes are displayed
- [ ] No-result state is handled
- [ ] Search works efficiently with the backend/data source

**Status:** `[ ]`

---

## US-012 — Filter Work Notes

**As a user,**

I want to filter my notes,

**so that I can focus on specific information.**

### Acceptance Criteria

- [ ] User can filter by category
- [ ] User can filter by date where applicable
- [ ] User can filter by status where applicable
- [ ] Filters can be combined where appropriate
- [ ] User can clear filters

**Status:** `[ ]`

---

# Epic 5 — Note Information

## US-013 — Work Note Date

**As a user,**

I want each work note to have a date,

**so that I can understand when the information was recorded.**

### Acceptance Criteria

- [ ] Note has a creation date
- [ ] Date is stored in the database
- [ ] Date is displayed clearly
- [ ] Date format is consistent

**Status:** `[ ]`

---

## US-014 — Work Note Status

**As a user,**

I want to assign a status to a work note,

**so that I can identify whether the recorded item is active, completed, or requires follow-up.**

### Acceptance Criteria

- [ ] Note can have a status
- [ ] Status can be selected/updated
- [ ] Status is stored in the database
- [ ] Status is clearly displayed
- [ ] Notes can eventually be filtered by status

**Status:** `[ ]`

---

## US-015 — Work Note Priority

**As a user,**

I want to assign a priority to important notes,

**so that I can identify items that require more attention.**

### Acceptance Criteria

- [ ] User can select a priority
- [ ] Priority is stored
- [ ] Priority is displayed clearly
- [ ] Priority can be changed
- [ ] Notes can eventually be filtered by priority

**Status:** `[ ]`

---

# Epic 6 — User Experience

## US-016 — Responsive Interface

**As a user,**

I want the application to work on different screen sizes,

**so that I can use it on different devices.**

### Acceptance Criteria

- [ ] Application works on desktop
- [ ] Application works on tablet-sized screens
- [ ] Application works on mobile-sized screens
- [ ] Navigation remains usable
- [ ] Forms remain usable
- [ ] Notes remain readable

**Status:** `[ ]`

---

## US-017 — Loading States

**As a user,**

I want the application to show loading feedback,

**so that I know when information is being retrieved or processed.**

### Acceptance Criteria

- [ ] Loading state is displayed during API requests
- [ ] User cannot accidentally submit the same request repeatedly where appropriate
- [ ] Loading state disappears after the request completes

**Status:** `[ ]`

---

## US-018 — Error Handling

**As a user,**

I want clear error messages,

**so that I understand when something goes wrong.**

### Acceptance Criteria

- [ ] API errors are handled
- [ ] Form validation errors are displayed
- [ ] Network errors are handled
- [ ] User receives understandable messages
- [ ] Application does not crash because of normal API errors

**Status:** `[ ]`

---

# Epic 7 — Security

## US-019 — Protected User Data

**As a user,**

I want my work notes to be protected,

**so that other users cannot access information that does not belong to them.**

### Acceptance Criteria

- [ ] Authentication is required where appropriate
- [ ] Protected API routes verify authentication
- [ ] User ownership is checked
- [ ] Users cannot access another user's private notes
- [ ] Sensitive information is not exposed to the frontend unnecessarily

**Status:** `[ ]`

---

## US-020 — Secure Environment Configuration

**As a developer,**

I want sensitive configuration to be stored in environment variables,

**so that secrets are not exposed in the Git repository.**

### Acceptance Criteria

- [ ] `.env` is excluded from Git
- [ ] Database credentials are not hardcoded
- [ ] Authentication secrets are not hardcoded
- [ ] Production secrets are configured through the deployment platform
- [ ] Example environment configuration can be documented safely

**Status:** `[ ]`

---

# Epic 8 — Future Features

These stories are potential future improvements and should not be treated as required until confirmed.

## US-021 — Attachments

**As a user,**

I want to attach files or images to a work note,

**so that supporting information can be stored with the note.**

**Status:** `[ ]`

---

## US-022 — Tags

**As a user,**

I want to add tags to my notes,

**so that I can organize and find related notes more easily.**

**Status:** `[ ]`

---

## US-023 — Notifications and Reminders

**As a user,**

I want to create reminders for important work notes,

**so that I do not forget required follow-up actions.**

**Status:** `[ ]`

---

## US-024 — Dashboard

**As a user,**

I want a dashboard showing useful information about my work notes,

**so that I can quickly understand outstanding and completed items.**

**Status:** `[ ]`

---

## US-025 — Export Notes

**As a user,**

I want to export my work notes,

**so that I can use the information outside the application when required.**

Possible formats:

- PDF
- Excel
- CSV

**Status:** `[ ]`

---

# Development Backlog

The backlog should be updated as the application develops.

## Completed

- [ ] Move completed user stories here or mark them `[x]` above.

## In Progress

- [ ] Identify currently active development tasks.

## Next

- [ ] Complete core note functionality
- [ ] Complete authentication
- [ ] Complete note organization
- [ ] Improve validation and error handling
- [ ] Test frontend/backend integration
- [ ] Prepare production environment
- [ ] Deploy frontend and backend
- [ ] Final application testing

---

# Definition of Done

A user story should normally be considered **Done** when:

- [ ] Functionality is implemented
- [ ] Frontend is connected to the backend where required
- [ ] Backend validation is implemented
- [ ] Database operations work correctly
- [ ] Error handling is implemented
- [ ] UI provides appropriate feedback
- [ ] Feature has been manually tested
- [ ] No known critical bug remains
- [ ] Related documentation is updated
- [ ] Git commit has been created

---

# Development Rule

Do not implement future features simply because they are listed here.

Before starting a feature:

```text
User Story
    ↓
Confirm requirement
    ↓
Break into tasks
    ↓
Implement
    ↓
Test
    ↓
Mark [x]
    ↓
Commit
```

The user stories are a **roadmap**, not a requirement to implement everything immediately.
