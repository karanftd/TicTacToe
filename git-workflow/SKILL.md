---
name: git-workflow
description: High-quality Git operations using Conventional Commits and surgical staging. Use when Gemini CLI needs to stage, commit, branch, or sync changes while maintaining a clean, professional commit history and repository structure.
---

# Git Workflow Skill

This skill provides a specialized workflow for managing Git repositories with high precision and adherence to professional standards.

## Core Principles

1.  **Surgical Staging:** Never use `git add .` unless explicitly requested. Always stage specific files relevant to the current task to maintain a clean index.
2.  **Conventional Commits:** Use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for all commit messages.
    - `feat:` for new features
    - `fix:` for bug fixes
    - `docs:` for documentation changes
    - `style:` for formatting, missing semi-colons, etc.
    - `refactor:` for code changes that neither fix a bug nor add a feature
    - `test:` for adding missing tests or correcting existing tests
    - `chore:` for updating build tasks, package manager configs, etc.
3.  **Branching Strategy:** Use descriptive branch names prefixed by their purpose:
    - `feature/name-of-feature`
    - `bugfix/name-of-bug`
    - `hotfix/urgent-fix`
4.  **Verification First:** Always run `git status` and `git diff --staged` before committing to ensure only intended changes are included.

## Specialized Workflows

### 1. The Atomic Commit
Use this workflow to commit a completed task:
- Run `git status` to identify modified files.
- Stage only the relevant files using `git add <file>`.
- Run `git diff --staged` to verify the changes.
- Commit using a concise, descriptive conventional commit message.

### 2. Feature Branching
Use this workflow to start a new feature:
- Ensure the current branch is up-to-date (`git pull origin main`).
- Create and switch to a new branch: `git checkout -b feature/<descriptive-name>`.
- Periodically commit changes using the Atomic Commit workflow.

### 3. Syncing with Remote
- Use `git pull --rebase` to integrate remote changes while maintaining a linear history.
- Always ask for confirmation before running `git push`.

## Constraints
- **NEVER** log, print, or commit sensitive information like API keys or secrets.
- **NEVER** use `--force` or `--hard` unless specifically instructed by the user after explaining the risks.
