# Thin wrapper over the bun scripts in package.json. The scripts stay the
# source of truth (CI calls them directly); this is just shorter to type.

.PHONY: help install dev build start format format-check lint typecheck check

help:
	@echo "install       bun install"
	@echo "dev           next dev"
	@echo "build         next build"
	@echo "start         next start"
	@echo "format        oxfmt + oxlint --fix"
	@echo "format-check  oxfmt --check"
	@echo "lint          oxlint"
	@echo "typecheck     tsc --noEmit"
	@echo "check         format-check + lint + typecheck"

install:
	bun install

dev:
	bun run dev

build:
	bun run build

start:
	bun run start

format:
	bun run format

format-check:
	bun run format:check

lint:
	bun run lint

typecheck:
	bun run typecheck

check: format-check lint typecheck
