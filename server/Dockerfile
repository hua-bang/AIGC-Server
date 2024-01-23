# 使用 Node.js 18 的官方镜像作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 pnpm-lock.yaml 文件
RUN pwd
COPY package*.json pnpm-lock.yaml* ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装项目依赖
RUN pnpm install

# 复制项目文件和目录到工作目录
COPY . .

# 构建应用
RUN pnpm run build

# 暴露 3000 端口
EXPOSE 3000

# 定义容器启动时执行的命令
CMD ["pnpm", "run", "start:prod"]