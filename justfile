set dotenv-load

# Show available commands
default:
  @just --list

list:
  @just --list
  
alias help := default

dev:
    #!/usr/bin/env bash
    npm run dev

build:
    #!/usr/bin/env bash
    npm run build
    
start:
    #!/usr/bin/env bash
    npm run start

lint:
    #!/usr/bin/env bash
    npm run lint

format:
    #!/usr/bin/env bash
    npm run format

code-analysis:
    #!/usr/bin/env bash
    npm run static-code-analysis

prepare:
    #!/usr/bin/env bash
    npm run prepare
