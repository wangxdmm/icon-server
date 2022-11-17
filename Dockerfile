FROM mhart/alpine-node:16
USER 0
RUN curl -fsSL https://get.pnpm.io/install.sh | sh - && \
/bin/bash -c 'source /root/.bashrc && pnpm --version'
ENTRYPOINT [ "/bin/bash", "source ~/.zshrc" ]