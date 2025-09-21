FROM mcr.microsoft.com/devcontainers/typescript-node

CMD trap : TERM INT; sleep infinity & wait
