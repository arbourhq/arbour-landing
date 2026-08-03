.PHONY: format format-check lint typecheck check

# Format code and apply safe lint fixes. This is the one to run by hand.
format:
	bunx oxfmt .
	bunx oxlint --fix

# Verify formatting without writing. Used by CI.
format-check:
	bunx oxfmt --check .

lint:
	bun run lint

typecheck:
	bun run typecheck

# Everything CI runs, in one target.
check: format-check lint typecheck
