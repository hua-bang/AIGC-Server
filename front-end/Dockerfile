# 设置基础镜像
FROM node:18-alpine AS base

# 设置工作目录
WORKDIR /app

# 首先复制 package.json
COPY package*.json pnpm-lock.yaml* ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装项目依赖
RUN pnpm install

# 复制剩余的应用源代码
COPY . .

RUN pnpm run build

# 应用的启动命令
CMD ["pnpm", "start"]