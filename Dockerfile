# Usar uma imagem base do Node.js
FROM node:18.13

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Expor a porta que a aplicação irá rodar
EXPOSE 80

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
