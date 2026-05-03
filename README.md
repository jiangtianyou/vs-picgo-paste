# PicGo Paste Image

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue)](https://marketplace.visualstudio.com/items?itemName=jiangtianyou.vs-picgo-paste)

剪贴板图片一键上传图床并插入 Markdown。

## 功能

- 读取系统剪贴板中的图片
- 调用本地 PicGo CLI 上传至图床
- 自动插入 `![image](url)` 到光标位置
- 支持快捷键、命令面板、右键菜单三种触发方式

## 安装

1. 全局安装 [PicGo CLI](https://picgo.github.io/PicGo-Core-Doc/):
   ```sh
   npm install -g picgo
   ```
2. 配置 PicGo 图床（以 GitHub 为例）:
   ```sh
   picgo set uploader github
   ```
3. 在 VS Code 扩展商店搜索 **PicGo Paste Image** 安装，或下载 `.vsix` 手动安装。

## 使用

| 方式 | 操作 |
|------|------|
| 快捷键 | `Ctrl+Alt+V` |
| 命令面板 | `Ctrl+Shift+P` → `PicGo: Paste Image` |
| 右键菜单 | 编辑器中右键 → `PicGo: Paste Image` |

1. 截图或复制图片到剪贴板
2. 在 `.md` 文件中触发上述操作
3. 图片自动上传并插入 `![image](url)`

## 配置

`settings.json`:

| 配置项 | 类型 | 默认值 | 说明 |
|-------|------|--------|------|
| `picgoPaste.picgoPath` | string | `picgo` | PicGo CLI 命令路径 |
| `picgoPaste.tempDir` | string | `""` | 临时图片目录，留空=系统临时目录 |

## 要求

- VS Code >= 1.60.0
- PicGo CLI 已安装并配置好图床
