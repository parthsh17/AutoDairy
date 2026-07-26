# Feature Scaffolding

Each feature owns its UI, hooks, services, types, and utilities. Shared infrastructure belongs in `src/components`, `src/hooks`, `src/lib`, `src/repositories`, `src/services`, `src/types`, or `src/utils`.

Feature modules should expose a small public surface and keep business rules inside their own `services` directory. Feature services may use the shared service and repository contracts, but shared infrastructure must not import feature modules.

```text
features/<feature>/
  components/
  hooks/
  services/
  types/
  utils/
```
