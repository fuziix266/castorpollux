# PowerShell wrapper to run the Node import script
# Usage: set your env vars first, then run this script
# Example:
# $env:SUPABASE_URL = 'https://xyz.supabase.co'
# $env:SUPABASE_SERVICE_KEY = 'service_role_key'
# node .\scripts\import-images.js

if(-not $env:SUPABASE_URL){ Write-Host 'Set $env:SUPABASE_URL before running'; exit 1 }
if(-not $env:SUPABASE_SERVICE_KEY){ Write-Host 'Set $env:SUPABASE_SERVICE_KEY before running'; exit 1 }

Write-Host 'Running import-images.js ...'
node .\scripts\import-images.js
