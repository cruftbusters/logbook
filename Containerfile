FROM mcr.microsoft.com/devcontainers/typescript-node

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y gh ripgrep screen && \
    apt-get clean

RUN curl -sfLO https://github.com/neovim/neovim/releases/latest/download/nvim-linux-x86_64.tar.gz && \
    tar -C /opt -xzf nvim-linux-x86_64.tar.gz && \
    ln -s /opt/nvim-linux-x86_64/bin/nvim /usr/local/bin && \
    rm nvim-linux-x86_64.tar.gz

WORKDIR /root

RUN git clone https://github.com/LazyVim/starter .config/nvim

RUN echo 'vim.o.shell = "zsh"' >> .config/nvim/lua/config/options.lua

COPY ./devcontainer/overrides/.config/nvim/lazyvim.json ./.config/nvim/

RUN nvim --headless "+Lazy! sync" +qa

COPY ./devcontainer/overrides/.ssh/known_hosts ./.ssh/

COPY devcontainer/overrides/.oh-my-zsh/custom/omz.zsh .oh-my-zsh/custom/

COPY devcontainer/run.after /usr/local/bin/

CMD run.after && exec sh -c 'trap : TERM INT; sleep infinity & wait'
