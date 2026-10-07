# 单文件夹安装手册（给 AI 的安装说明）

目标：用户把**本文件夹**交给 AI 并说「安装」后，AI 在目标机器的 dsh web 部署上完成：
1. 核心插件（`@wm-coders/dsh-custom-first-control-prompt`）安装 —— 持久，重启不丢；
2. 管理面板 —— **同一个包内的宿主半与浏览器半**（0.2.2 起合并；面板经 `dsh.client`
   自动发现，不在单独的 `client-ui/` 包里）—— 持久，**web 重启后仍在**，无需重装。

**给 AI 的默认决策（照此执行，无需询问用户）**：先跑 `install.ps1`（或手动执行
方式 A 的命令）；装完直接可用——核心包自带 bundle 层（`dsh.bundle` 声明），
`dsh plugin add` 的对账会**自动把包名追加进 profile 的 `dsh.profile.bundles`**，
激活包内 bundle 层（核心行，含中性示例配置），
**不需要手写任何 patch 行**；验证按 1.4 走面板「LLM 监听」。自定义配置用
`cordis.patch.yml.template` 的**带 id 定向覆盖**（或面板「配置编辑」），
**绝不**在 profile patch 里复制 `- insert:` 行（同 id 重复会让 web 起不来）。

> **动手前先确认 dsh 版本 = `0.2.0-rc.2`**（见「前置条件」）。本版本的 dsh peer
> 精确锁定该运行时；版本不符时插件会被框架静默跳过（web 照常启动），
> 表现为「装完没效果」。

> 安装/调试踩过的问题与测试方法见同目录 [DEBUG-NOTES.zh.md](DEBUG-NOTES.zh.md)
> （含「同 id 重复 insert 会让 web 起不来」等关键坑的根因与规避）；
> 另一台机器的完整实测流程见 [INSTALL-FULL.zh.md](INSTALL-FULL.zh.md)。

## 获取插件（从远端仓库）

本插件以单仓库形式发布在 GitHub `WM-CODER/custom-first-control-prompt`：
内容已做脱敏处理（不含任何机器的用户名、绝对路径、凭据或会话标识）。两种获取方式：

```powershell
# 方式 1：git clone（推荐，可 git pull 跟进更新）
git clone https://github.com/WM-CODER/custom-first-control-prompt.git
# 方式 2：GitHub 页面 Code → Download ZIP，解压后得到同一目录
```

后续步骤中的 `<folder>` 一律指克隆/解压得到的目录。注意：获取到的目录
**不含 `node_modules`**（依赖链是本机安装态，见 1.1）也**不含构建缓存**
（sourcemap / tsbuildinfo 不入库）；核心插件产物 `lib/`（含浏览器半 `lib/client.js`）、
包内 bundle 层 `cordis.patch.yml`、安装脚本与文档均随仓库分发，自包含。

## 前置条件

- 本机已有可运行的 dsh web 部署（默认 http://127.0.0.1:3080）。
- **dsh 版本要求（关键，跨机器必查）**：本版本（`0.3.0`）面向 **dsh `0.2.0-rc.2`**
  （npm dist-tag `next`）。确认方式：
  `<DSH_HOME>/profiles/node_modules/@deepseek-ai/dsh-web-app/package.json` 的 `version`
  应为 `0.2.0-rc.2`。
  老线 `0.0.1-rc.x` 缺 Typert Remote 线路与相关槽位，**不兼容**；请先按 dsh 升级流程
  把部署升到 `next` 线再继续。
  > **注意 npm 上的 `latest` 陷阱**：`@deepseek-ai/dsh-web-app` 与 `@deepseek-ai/dsh-web`
  > 的 `latest` 仍指着老线 `0.0.1-rc.1`，只有 `next`（= `0.2.0-rc.2`）才是本插件要的线。
  > 不带 dist-tag 的 `npm i @deepseek-ai/dsh-web-app` 会装到不兼容的老线上。
- **本版本接受的 dsh 版本范围很窄（务必先读）**：`package.json` 的 dsh peer 中，
  除 `@deepseek-ai/dsh`（`>=0.2.0-rc.2`）外，其余 8 个包都是**精确锁定 `0.2.0-rc.2`**。
  框架逐个校验这些 peer，因此当前 manifest **只接受 `0.2.0-rc.2` 这一个运行时**——
  连 `0.2.1-alpha.1` 也会被判为不兼容。若你的部署跑在别的 dsh 版本上，两条路：
  1. 改 `package.json` 的 peer 范围以匹配目标运行时（推荐，前提是已在其上实测）；
  2. 或为该确切 `name@version` 授予豁免：
     ```bash
     dsh plugin --profile web allow-version \
       @wm-coders/dsh-custom-first-control-prompt@0.3.0 \
       --dsh-version <目标确切版本> --accept-risk
     ```
     豁免写进 `<DSH_HOME>/profiles/web/compatibility.json`（键为精确
     `name@version`，值为确切 dsh 版本数组）。
- **版本不匹配时的表现**（不是静默失败，但也不会替你修好）：框架在启动时逐行校验，
  不兼容的 **bundle 层被跳过**并列入 `skippedBundles`，不兼容的**插件行被 `disabled`**
  并在 stderr 打出 `Plugin <name>@<version> is incompatible with dsh <runtime>` 警告——
  即插件**不工作**，但 web 仍能起来。改完 peer 或加豁免后需**重启** web。
- 本文件夹自包含：核心插件 `package.json` + 构建产物 `lib/`（含 `index.js`、
  `typert.host.js` 等宿主半，以及浏览器半 `lib/client.js`）+ bundle 层
  `cordis.patch.yml`；**0.2.2 起宿主与面板同在一个包**，没有单独的客户端包。
  本插件未发布 npm——方式 A 走 `dsh plugin add`（link 安装），方式 B 走 junction
  直接挂载，都不需要发布。
- `DSH_HOME` 默认位于用户目录下的 `.dsh`（Windows：`%USERPROFILE%\.dsh`，Linux/macOS：
  `~/.dsh`）；更通用的推导方式：settings 文档路径（`<DSH_HOME>/settings.yaml`）的父目录
  即 `DSH_HOME`。
- **非 Windows 系统**：以下所有 `New-Item -ItemType Junction` 换成等价的符号链接
  （`ln -s <目标> <链接>`），其余步骤与验证方式完全一致。

### 0. 安装前检查（目标机器必做）

| 检查项 | 方法 | 通过标准 |
|---|---|---|
| dsh 版本 = `0.2.0-rc.2` | 看 `<DSH_HOME>/profiles/node_modules/@deepseek-ai/dsh-web-app/package.json` 的 `version` | **`0.2.0-rc.2`**；`0.0.1-rc.x` 老线**不兼容**，其它版本需改 peer 或加豁免（见上） |
| pnpm 可用（仅方式 A 需要） | `pnpm --version` | 方式 A 的 `dsh plugin add` 依赖它；离线机器用方式 B（junction） |
| 网络（仅方式 A 需要） | — | `dsh plugin add` 会把 peer 声明的 dsh `0.2.0-rc.2` 包从 registry 解析；离线机器用方式 B |

## 注入机制（安装者需要知道的部分）

`history`（参考对话）在插件加载时构建为深冻结的交替 user/assistant 消息序列，由
`llm/stream` waterfall 监听器前置到**每个普通对话请求**（克隆重分发，dsh `0.2.0-rc.2`
开箱即用，不依赖任何框架钩子/补丁）。会话日志**零写入**：真实 turn 从 1 编号、fork 是普通副本、
压缩无法遮蔽（每请求重新注入）。辅助调用（session-title、compaction）与手工请求不注入。

## 步骤 1：安装（两种方式）

### 方式 A（官方，推荐）：`dsh plugin add`

一条命令（或 `install.ps1` 自动执行）：

```powershell
dsh plugin --profile web add <folder>
# 没有 dsh 命令行别名时用：
node <DSH_HOME>\profiles\node_modules\@deepseek-ai\dsh\lib\bin.js plugin --profile web add <folder>
```

> **只有一个包**：0.2.2 起 host 与 client 两半已合并进同一个包（`dsh.bundle` + `dsh.client`
> 同在 `package.json`），**不要再传第二个参数**。旧文档里的
> `add <folder> <folder>/client-ui` 已失效——本仓库没有 `client-ui/` 目录。

pnpm 把包以 link 依赖装进 `<DSH_HOME>/profiles/web`，CLI 对账读取核心包的
`dsh.bundle` 声明，**自动把包名追加进 profile `package.json` 的 `dsh.profile.bundles`
列表**，从而激活包内 bundle 层（`cordis.patch.yml`：核心行 + 中性示例配置）——
装完即用，无需手写 patch 行。依赖链（1.1）仍需先就位。

> **0.2.x 的注册位置变了（排障要点）**：组合树由 profile `package.json` 的
> `dsh.profile.bundles`（有序列表，各 bundle 的 patch 层依次叠加）**加上**
> `cordis.patch.yml`（用户覆盖层）构成；`cordis.yml` 本身是空数组。
> 所以「插件装没装」要看 `dsh.profile.bundles` 里有没有它，而不是去 patch 里找
> `- insert:` 行——patch 层只该出现**带 id 的定向覆盖**。

### 方式 B（离线 / 无 pnpm）：junction

`install.ps1 -Offline` 一键完成，或手动（1.1/1.2/1.3）。bundle 对账只在
`dsh plugin add` 内运行，junction 路径必须在 profile patch 里自带两行
（install.ps1 会自动追加；等价于 bundle 层内容）。

### 1.1 依赖链（两种方式都需要）

本地安装是 link 依赖：Node 从**被链接目录自己的** `node_modules` 解析插件的
`@deepseek-ai/schemastery`、`zod` 等导入，不会沿 profile 向上找。确认
`<folder>/node_modules` 存在且能解析这些依赖——junction 到部署自己的已发布安装即可
（`install.ps1` 自动做）：

```powershell
New-Item -ItemType Junction -Path <folder>\node_modules -Target <DSH_HOME>\profiles\node_modules
```

标准的 pnpm 部署都有该目录（0.2.x 线含插件全部依赖）。若不存在（非 pnpm 部署形态），
找到部署解析 `@deepseek-ai/dsh-*` 包所用的 node_modules 根目录并 junction 到它即可。
`zod` 是 Typert 生成产物（`lib/typert.host.js`）的运行时依赖，缺失会导致 web 启动在
typert-loader 阶段报 `ERR_MODULE_NOT_FOUND`。浏览器 bundle（`lib/client.js`）
**无需安装依赖**：它已把 zod 与 Remote 贡献内联。

> **实测提醒（rc.2）**：`<DSH_HOME>\profiles\node_modules` 里的
> `@deepseek-ai/cosmokit` 是 **1.8.2**，而 `schemastery@3.18.4` 需要 **1.8.5**
> （`createVolatile` 未导出）。若入口 import 冒烟测试报
> `does not provide an export named 'createVolatile'`，把 1.8.5 的 cosmokit 补进
> `<folder>/node_modules` 即可。

### 1.2 方式 B 手动步骤：profile 注册 junction

0.2.2 起只有一个包，所以**只需一个 junction**：

```powershell
$dir = "<DSH_HOME>\profiles\web\node_modules\@wm-coders"
New-Item -ItemType Directory -Path $dir -Force
New-Item -ItemType Junction -Path "$dir\dsh-custom-first-control-prompt" -Target "<folder>"
```

> 注意 scope 是 **`@wm-coders`**（带 s）。旧文档里的 `@wm-coder` 与
> `dsh-client-ui-custom-first-control-prompt` 均已废弃。

### 1.3 方式 B 手动步骤：注册 bundle + profile patch 行

junction 模式没有对账，所以两件事都要自己做：

**① 把包名写进 profile `package.json` 的 `dsh.profile.bundles`**（0.2.x 下这一步才是
「启用插件」，junction 只解决模块解析）：

```jsonc
// <DSH_HOME>/profiles/web/package.json
"dsh": { "profile": { "bundles": [ /* … 其它 bundle … */ ,
  "@wm-coders/dsh-custom-first-control-prompt" ] } }
```

**② 在 profile patch 里自带核心行**（`<DSH_HOME>/profiles/web/cordis.patch.yml`）。
`install.ps1 -Offline` 会自动追加（与 bundle 层同内容）；手动追加时把本仓库根
`cordis.patch.yml` 的 `- insert:` 段并入 profile patch（顶层数组；已有条目则追加）。

> **铁律：核心行只出现一次。** 方式 A 装完后 bundle 层已带此行——此时若 profile
> patch 里还存在**旧安装遗留**的 `- insert:` 同 id 行（如手工时代的残留），
> 必须删掉（否则同 id 重复 → web fail-loud 起不来）。自定义配置永远用
> **带 id 的定向覆盖**（非 insert），见下节。`uninstall.ps1` 会清理这两种行。

### 自定义配置（两种方式通用）

安装后想改提示词内容，两个入口等价：
- **面板**：设置 → 「自定义优先控制提示词」→ 配置编辑（保存生成定向覆盖，保留其它行）；
- **手工**：把 `cordis.patch.yml.template` 的内容（带 id 的定向 patch，**非 insert**）
  追加到 profile patch 并改成自己的内容。覆盖语义：同 id 的 config 后写胜出。
- 临时停用：覆盖里写 `disabled: true`；彻底卸载：`dsh plugin --profile web remove
  @wm-coders/dsh-custom-first-control-prompt`
  （或 `uninstall.ps1`，会连带清理 junction 与 patch 残留）。
  注意**不传第二个包名**——0.2.2 起只有这一个包。

配置类变更（cordis.patch.yml）走 HMR 热重载（几秒），**无需重启**。

### 1.4 验证（面板「LLM 监听」）

聊天 transcript **看不到**种子消息是预期行为（注入只走请求路径，零日志写入）。正确验证方式：
1. 对话输入框上方展开「自定义提示词」dock 条，点「开始」监听；
2. 新开会话发送第一条真实消息；
3. dock 展开区应出现**完整请求列表**：普通对话请求（无 `[purpose]` 徽标，如
   `#3 · 9 条消息`——数量 = 2×种子对 + 真实消息序列）点开后**前几条就是注入的
   user/assistant 种子消息**；`[session-title]` 等辅助请求（相隔毫秒级的那条）
   **不含**注入是设计行为（scope 过滤，避免污染标题生成）；
4. 模型的回复应能引用种子内容（如答出「用户测试提示词1」相关上下文）。
注意请求按到达顺序编号，最新一条默认展开。装完先跑
`powershell -ExecutionPolicy Bypass -File verify-deploy.ps1` 做整体健康检查；
更多验证手段见 `DEBUG-NOTES.zh.md` §4（门禁 / 单测 / 独立测试实例 + API 链路）。

## 步骤 2：管理面板（随方式 A 自动激活）

浏览器面板通过包的 `dsh.client` 声明自动发现，**不需要单独的 patch 行**——
方式 A 由对账激活，方式 B 由 install.ps1 写入。重启 web 后：
（注意：`disabled: true` 会连客户端 bundle 一起摘掉，面板就不再渲染；要「装了但不注入」
请改用空的 section 列表覆盖。）

- **对话输入框上方**：可展开/收起的「自定义提示词」条（`conversation.input.dock`），
  **监听默认关闭**，点「开始」后显示最近 30 条**真实 LLM 明文请求**（`llm/stream` 采集），
  条上有开始/停止、清空、隐藏按钮；展开后是**完整请求列表**（每条一行，最新默认展开），
  行内显示 `#序号 · [purpose 徽标] 模型 · 消息数 · 时间`，点开任一条看系统提示词与
  全部消息正文；
- 设置 → 「自定义优先控制提示词」页面：预览 / 配置编辑 / RAW /
  **LLM 监听**（同样有开始/停止、清空按钮）；profile patch 无行时编辑器显示
  当前生效的组合配置（bundle 层默认值），保存即生成 profile 覆盖；
- 设置 → 插件 → `@wm-coders/dsh-custom-first-control-prompt` 卡片：「显示输入框上方条状 inspector」
  与「监听 LLM 请求」两个开关（被隐藏的 dock 条从这里恢复）；
- 若插件未安装，面板自动保持休眠，不影响 web 启动。

## 备注

- 面板写回 `cordis.patch.yml` 走 `fs.writeText` + `danger-full-access` 沙箱策略，可能触发写入审批。
- 面板定位补丁文件的方式（0.3.0 起）：优先读 `profileContext.patchPath`（就是 Loader
  实际组合的那个文件），其次回退到 `settings.prepareDocument()`；两者都拿不到才报
  「无法定位补丁文件路径」。**修好前的老逻辑**是往 `prepareDocument()` 结果后无条件拼
  `/profiles/web/cordis.patch.yml`，而该结果本身已是补丁文件，于是写到
  `<profile>/profiles/web/cordis.patch.yml` 这个 Loader 根本不读的嵌套文件——
  保存「成功」但毫无效果。若你从旧版本升级，先删掉那个嵌套目录及旁边的
  `cfcp-templates.json` 残留。
- 配置语义（跳过坏条目而非崩溃）：空 text / 空历史对会被核心插件跳过并告警，不会导致 web 拉不起来。
- 一键脚本：`install.ps1`（官方 add 主线 / `-Offline` junction 回退）、`uninstall.ps1`
  （官方 remove + junction 清理 + patch 行外科剥离）、`verify-deploy.ps1`
  （部署健康检查，含安装模式探测）、`verify-build.ps1`（产物质量门禁）。
