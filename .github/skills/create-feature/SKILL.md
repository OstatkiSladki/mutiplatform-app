---
name: create-feature
description: 'Workflow to scaffold a new Feature-Sliced Design (FSD) feature slice. Use when creating a new user action or feature module (e.g. add-to-cart, checkout).'
user-invocable: true
argument-hint: 'Name of the feature and its primary entities'
---

# Create FSD Feature

## Goal
Create a new feature slice correctly scoped within the Feature-Sliced Design architecture.

## Rules
- You MUST follow `copilot-instructions.md` strictly.

## Step-by-Step Procedure

1. **Understand the Request**
   - Clarify the scope of the feature.
   - If ambiguous, ask the user.

2. **Identify Entities Involved**
   - Identify the business entities (e.g., Offer, User, Box) that this feature will interact with.

3. **Create Feature Folder**
   - Create a new directory under `src/features/<feature-name>`.

4. **Add Model and UI**
   - Create the `model/` subdirectory for state, hooks, and logic.
   - Create the `ui/` subdirectory for visual components.

5. **Reuse Shared Components**
   - Ensure the UI components import from `src/shared/ui` whenever possible. DO NOT reinvent standard UI blocks.

6. **Connect API using TanStack Query**
   - Hook up server state using TanStack Query.
   - API calls MUST go through the central API client and `entities` hooks.

7. **Add Loading and Error States**
   - The UI must robustly handle pending requests and failures.
