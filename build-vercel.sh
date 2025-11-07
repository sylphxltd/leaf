#!/bin/bash
set -e

# Save project root
PROJECT_ROOT=$(pwd)

echo "Building packages..."

# Build core
cd "$PROJECT_ROOT/packages/core"
bun run build

# Build theme
cd "$PROJECT_ROOT/packages/theme-default"
bun run build

# Build CLI
cd "$PROJECT_ROOT/packages/cli"
bun run build

# Build docs
echo "Building documentation..."
cd "$PROJECT_ROOT/docs"
bun run build.ts

echo "✓ Build completed successfully!"
