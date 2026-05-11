---
name: build-screen
description: 'Workflow to build a new screen in FSD architecture. Use when creating or refactoring a screen component.'
user-invocable: true
argument-hint: 'Name of the screen and main widgets'
---

# Build FSD Screen

## Goal
Build a clean, logic-free screen component that acts purely as a composition layer for widgets and features, adhering strictly to Feature-Sliced Design.

## Procedure

1. **Break Screen into Widgets**
   - Analyze the screen mockups/requirements.
   - Identify and decompose the layout into larger UI blocks (widgets) under `src/widgets/`.

2. **Reuse UI Components**
   - Ensure the screen and its widgets compose smaller, reusable design elements from `src/shared/ui/`.
   - Do NOT create bespoke standalone components inside the `screens/` directory.

3. **Connect Features**
   - Identify actionable user interactions (e.g., checkout, login, add-to-cart).
   - Integrate these directly into the screen or its widgets by importing from `src/features/`.

4. **Keep Screen Clean (No Logic)**
   - The screen component MUST NOT contain business logic.
   - No direct API calls or heavy local state inside the screen itself. 
   - State and logic should be handled mostly by the integrated features and entities.
Before generating imports:
- inspect the real repository structure
- verify exports exist
- never assume barrel exports
- never invent components or paths
- only import from existing files

## Reference
- See `copilot-instructions.md` for architectural constraints and rules.