# Show available commands
default:
  @just --list

list:
  @just --list
  
alias help := default

frontend_dev:
  just frontend/apps/dev
  
frontend_release:
  just frontend/apps/release
  
update_ethers:
  just frontend/apps/ethers