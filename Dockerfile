# 使用 Node.js 官方镜像
FROM node:22.12.0

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install

# 复制项目文件
COPY . .

# 构建项目（如果是 Vue 项目）
RUN pnpm build

# 暴露端口
EXPOSE 30002

# 启动项目
CMD ["pnpm", "start"]