# PicGo Paste Image

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue)](https://marketplace.visualstudio.com/items?itemName=jiangtianyou.vs-picgo-paste)

剪贴板图片一键上传图床并插入 Markdown，附带 JSON 格式化与 URL 编解码。

## 功能

### PicGo Paste Image
- 读取系统剪贴板中的图片，调用本地 PicGo CLI 上传至图床
- 自动插入 `![image](url)` 到光标位置
- 支持快捷键 `Ctrl+Alt+V`、命令面板、右键菜单

### Format JSON
- 选中 JSON 文本，格式化为缩进风格
- 无效 JSON 弹出语法错误提示

### URL Encode / Decode
- 选中文本进行 `encodeURIComponent` 或 `decodeURIComponent`

## 安装

1. 全局安装 [PicGo CLI](https://picgo.github.io/PicGo-Core-Doc/):
   ```sh
   npm install -g picgo
   ```
2. 配置 PicGo 图床（以 GitHub 为例）:
   ```sh
   picgo set uploader github
   ```
3. 在 VS Code 扩展商店搜索 **PicGo Paste Image** 安装。

## 使用

| 命令 | 快捷键 | 说明 |
|------|--------|------|
| PicGo Paste Image | `Ctrl+Alt+V` | 粘贴剪贴板图片并上传 |
| Format JSON | — | 格式化选中 JSON |
| URL Encode | — | 编码选中文本 |
| URL Decode | — | 解码选中文本 |

以上命令均支持右键菜单触发（选中文本后右键）。

## 配置

`settings.json`:

| 配置项 | 类型 | 默认值 | 说明 |
|-------|------|--------|------|
| `picgoPaste.picgoPath` | string | `picgo` | PicGo CLI 命令路径 |
| `picgoPaste.tempDir` | string | `""` | 临时图片目录，留空=系统临时目录 |

## 要求

- VS Code >= 1.60.0
- PicGo CLI 已安装并配置好图床
