set dotenv-load

# Show available commands
default:
  @just --list

list:
  @just --list
  
alias help := default
  
fuji:
  just contracts/fuji