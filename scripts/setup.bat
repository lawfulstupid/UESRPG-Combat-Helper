@echo off
mklink /H .git\hooks\pre-push scripts\pre-push
git config push.followTags true