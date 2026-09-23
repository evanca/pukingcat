# public/ — MOVED, nothing here is served

The Devpost inline images used to live here and were served at
`https://happycode.studio/pukingcat/public/<file>`. **They are now in the
PUBLIC `evanca/evanca.github.io` repo** under `press/pukingcat/`, served at:

    https://happycode.studio/press/pukingcat/<file>

**Why:** on 2026-09-22 GitHub stopped serving Pages for this account's PRIVATE
repos. This whole site went to 404 — root included — while the Pages build
still reported `built` with no error, and public repos on the same domain kept
serving. Anything committed here reaches nobody until that changes.

Do not put press images back in this folder while `evanca/pukingcat` is
private; they will look committed and published and be neither. If the repo is
made public later, this site starts serving again, but the live Devpost
submission points at `press/pukingcat/` — check what it actually references
before moving anything back.
