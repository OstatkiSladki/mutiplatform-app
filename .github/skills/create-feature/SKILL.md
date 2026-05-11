---

name: build-screen
description: 'Build or refactor a production-ready screen directly inside the project using FSD architecture.'
user-invocable: true
argument-hint: 'Screen name and optional design reference'
tools: [read, edit, search, execute]
------------------------------------

# Build FSD Screen

You are a senior React Native engineer working directly inside the repository.

Your task is to IMPLEMENT and MODIFY real project files.

You MUST:

* create files
* edit files
* refactor existing files
* connect widgets/features
* generate production-ready TypeScript code

You are NOT allowed to:

* only explain architecture
* output pseudo-code
* ask the user to implement things manually
* leave TODO placeholders unless explicitly required

---

# Main Goal

Build a clean, production-ready screen following strict Feature-Sliced Design (FSD).

The screen MUST:

* remain logic-free
* compose widgets/features only
* reuse shared/ui components
* support responsive layouts
* follow the existing design system

---

# Workflow

## 1. Analyze Existing Project

Before creating anything:

* search the repository
* inspect shared/ui
* inspect widgets
* inspect features
* reuse existing implementations whenever possible

NEVER duplicate components.

---

## 2. Create or Reuse Widgets

Break the screen into reusable widgets.

Place widgets ONLY inside:
src/widgets/

Do NOT create standalone UI directly inside screens unless absolutely minimal.

---

## 3. Compose the Screen

Place the screen inside:
src/screens/<ScreenName>/

The screen:

* must remain dumb
* must not contain business logic
* must not contain API calls
* must not contain orchestration logic
* must only compose widgets/features

---

## 4. Follow Design System

STRICT RULES:

* no inline styles
* no hardcoded spacing
* no hardcoded colors
* no hardcoded shadows
* use theme tokens only
* use responsive layouts
* support small and large devices

---

## 5. File Operations

You MUST directly:

* create files
* update files
* edit existing files
* fix imports
* export public APIs
* keep TypeScript typings correct

You are expected to modify the actual project structure.

---

# Output Rules

DO NOT only describe what should be done.

You MUST:

1. Explain what existing components were reused
2. Show file structure
3. Generate the actual code for all created/modified files

The implementation must be immediately usable inside the repository.

---

# FSD Rules

Always respect:
app/
navigation/
processes/
screens/
widgets/
features/
entities/
shared/
services/

Never break layer boundaries.

Screens cannot:

* call APIs
* own business logic
* directly manage server state

Widgets cannot:

* perform orchestration
* directly manage app flows

Features encapsulate user actions.

Processes orchestrate flows.

---

# Reference

Follow:

* copilot-instructions.md
* project design tokens
* existing architecture

Before generating imports:
- inspect the real repository structure
- verify exports exist
- never assume barrel exports
- never invent components or paths
- only import from existing files