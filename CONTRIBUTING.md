# Contributing Guidelines

Thank you for your interest in contributing to the Alberto Trujillo personal portfolio and systems engineering platform.

## Development Workflow

1. Fork the repository and create your branch from `develop`.
2. Ensure changes adhere to strict semantic styling (corporate slate dark theme) and responsive standards.
3. Test locally using:
   ```bash
   npm install
   npm run dev
   ```
4. Verify edge functions build properly:
   ```bash
   npm run build
   ```

## Commit Message Conventions

We follow Conventional Commits:
- `feat:` Introduces a new feature or interactive command.
- `fix:` Patches an issue or visual defect.
- `docs:` Documentation improvements.
- `refactor:` Code refactoring without functionality changes.
- `chore:` Maintenance, dependency bumps, or configuration changes.

## Security & Sensitive Information

Do not commit any API keys, credentials, or private configuration files. Pre-commit entropy scanners will reject commits with high information entropy.