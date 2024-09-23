# Usar imagem oficial do Node.js
FROM node:22

# Definir diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o projeto para o container
COPY . .

# Expor a porta usada pela aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
