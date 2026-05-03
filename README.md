# vs-picgo-paste

剪贴板图片通过 PicGo 上传并自动插入 Markdown。

## 功能

- 读取系统剪贴板中的图片
- 调用本地 `picgo upload` 命令上传至图床
- 自动插入 `![image](url)` 到当前光标位置

## 安装

1. 确保已全局安装 [PicGo CLI](https://picgo.github.io/PicGo-Core-Doc/)
2. 将本插件目录拷贝到 VS Code 扩展目录，或使用 F5 调试运行

## 使用

1. 截图或复制图片到剪贴板
2. 打开 Markdown 文件
3. 按 `Ctrl+Alt+V`（或 `Ctrl+Shift+P` → `PicGo: 粘贴图片并上传`）
4. 等待上传完成，图片链接自动插入

## 配置

`settings.json`：

| 配置项 | 类型 | 默认值 | 说明 |
|-------|------|--------|------|
| `picgoPaste.picgoPath` | string | `picgo` | PicGo CLI 命令路径 |
| `picgoPaste.tempDir` | string | `""` | 临时图片目录，留空=系统临时目录 |
