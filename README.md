# dsh-todo-panel

DeepSeek Harness（DSH）Web 客户端的**右侧栏待办总览插件**：把会话里的 Agent 任务列表、目标、计划模式和你自己的待办放进一个面板，并在关键节点弹窗 + 提示音提醒。

An overview panel for the dsh web client's right sidebar: the agent's harness task list, the session goal, plan mode, and your own todos — with popup and sound notifications when a goal completes or plan mode ends.

## 功能 / Features

- **会话总览**：一个页签里并排显示
  - **我的待办**：浏览器本地保存，可添加 / 勾选 / 删除 / 清除已完成
  - **Agent 任务列表**：读取会话的 `todo_write` 状态（`○ 待开始`、`◐ 进行中`、`✓ 已完成`），新回合开始清空时保留上一轮灰显
  - **目标**：目标全文 + 状态徽章（进行中 / 已暂停 / 受阻）
  - **计划模式**：计划模式生效时显示提示
- **通知**：目标完成、计划模式结束（计划已提交）时弹窗 + 提示音；面板关着也会触发
- **插件页设置**：在 插件 → 待办面板 详情页配置两个触发器、弹窗、提示音（内置和弦 / 单音 / 自定义声音地址）、试听
- 中英文跟随界面语言

## 安装 / Install

在 DSH Web 客户端：**插件（Plugins）→ 添加插件 → 安装第三方插件**，输入本仓库的 Git 地址：

```
https://github.com/AUXUWA/dsh-todo-panel
```

或使用本地目录路径安装（开发模式，`link` 链接）。安装后刷新页面，从右侧栏"开始"页的**待办**卡片进入。

In the dsh web client, open **Plugins → Add plugin → Install a third-party plugin** and enter this repository's Git URL or a local directory path. Refresh the page afterwards and open the **Todos** card from the right sidebar's guide.

## 使用 / Usage

- 右侧栏顶部的"+"标签控件也可以直接打开待办页
- **我的待办**数据存于浏览器 localStorage（按浏览器持久，跨会话共享）；Agent 任务列表 / 目标 / 计划模式为会话状态，只读展示
- 通知与提示音在 **插件 → 待办面板** 详情页开启 / 关闭、选择提示音、填入自定义声音地址（http(s) 或 data: 音频）

## 开发 / Development

仓库根即插件包目录，无需构建步骤：

| 文件 | 职责 |
|---|---|
| `package.json` | 包清单 + `dsh.client` 浏览器端声明 |
| `cordis.patch.yml` | bundle patch：插入 `todo-panel` 插件行 |
| `index.js` | Host 半：Schemastery `Config` schema（设置文档校验） |
| `client.js` | Client 半：右侧栏注册、面板 UI、通知引擎、插件页设置表单 |
| `locale/*.json` | 插件管理页展示元信息（中英） |
| `icon.svg` | 插件图标（原创） |

本地开发：

```bash
pnpm install        # 安装依赖（@deepseek-ai/schemastery）
node --check client.js && node --check index.js
```

以本地目录方式安装后（`link` 链接），改动 `client.js` 刷新页面即生效；改动 `package.json` 的 `dsh.client` 声明或 Host 侧 `index.js` 需要重新安装或重启 Host。

## 协作 / Credits

由 [AUXUWA](https://github.com/AUXUWA) 与 DeepSeek Harness（AI 结对开发）共同维护。

## License

[MIT](LICENSE)

[![](https://img.shields.io/badge/powered_by-dsh-4D6BFE?style=flat-square&logo=deepseek&logoColor=white)](https://github.com/deepseek-ai/deepseek-harness)
