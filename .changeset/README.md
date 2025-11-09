# Changesets

We use [changesets](https://github.com/changesets/changesets) to manage versioning and publishing.

## Adding a changeset

To add a changeset, run:

```bash
bun changeset
```

This will prompt you for:
- Whether this is a major, minor, or patch change
- A summary of the changes
- More detailed description

## Versioning

When you're ready to publish a new version:

```bash
bun changeset version
bun changeset publish
```

## For more information

See the [changesets documentation](https://github.com/changesets/changesets/blob/main/docs/README.md).