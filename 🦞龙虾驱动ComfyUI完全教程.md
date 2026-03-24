# 🦞 龙虾驱动 ComfyUI 完整教程

> **适合人群**：零基础小白 / 想用聊天控制 AI 出图的任何人  
> **耗时**：配置约 15 分钟，之后每次出图 1 分钟  
> **效果**：对着 OpenClaw 说一句话，ComfyUI 自动生成图片发给你

---

## 📖 目录

1. [🦞 什么是"龙虾"？](#1-什么是龙虾)
2. [🏗️ 它们是怎么配合工作的？](#2-它们是怎么配合工作的)
3. [✅ 第一次配置（只需做一次）](#3-第一次配置只需做一次)
4. [🎨 第一次出图：生成猫咪图（成功案例）](#4-第一次出图生成猫咪图成功案例)
5. [🎯 更多使用场景](#5-更多使用场景)
6. [⚙️ 进阶技巧：参数调整](#6-进阶技巧参数调整)
7. [🔧 常见问题与解决方案](#7-常见问题与解决方案)
8. [📁 你的文件都放在哪里？](#8-你的文件都放在哪里)

---

## 1. 什么是"龙虾"？

**🦞 龙虾 = OpenClaw**  
OpenClaw 是你的 AI 私人助手，24 小时在线。你可以通过：
- 飞书
- Telegram
- WhatsApp
- Web 聊天

……任何聊天工具，对它说话，它就会帮你干活。

**🎨 ComfyUI = AI 画图引擎**  
本地运行的 AI 生图工具，类似于 Stable Diffusion，但用"节点流程图"的方式工作。

**🤝 两者的关系**

```
你（发消息）
    ↓
OpenClaw（"龙虾"）收到消息："画一只猫"
    ↓ 分析意图、判断是 ComfyUI 任务
comfy_client.py（Python 脚本）
    ↓ 调用 ComfyUI API
ComfyUI（AI 画图引擎）
    ↓ 生成图片
OpenClaw → 把图片发回给你
```

**简单说**：装了"龙虾 + ComfyUI"之后，你跟助手说一声，就能生成 AI 图片！

---

## 2. 它们是怎么配合工作的？

### 架构图

```
┌─────────────────────────────────────────────────────┐
│                  你的电脑（本地）                      │
│                                                     │
│  ┌──────────────┐       ┌──────────────────────┐   │
│  │   OpenClaw    │─────▶│   ComfyUI Python 版   │   │
│  │   （助手）    │ HTTP │  localhost:8188        │   │
│  └──────────────┘       └──────────────────────┘   │
│         │                         │                  │
│         │  comfy_client.py        │ 生成图片         │
│         ▼                         ▼                  │
│  ┌──────────────┐       ┌──────────────────────┐   │
│  │  你收到图片   │◀─────│   output/ 文件夹      │   │
│  └──────────────┘ 复制   └──────────────────────┘   │
│                                                     │
│  📂 模型：Documents/ComfyUI/models/                 │
│  📂 输出：C:/AppData/Local/.../ComfyUI/output/      │
└─────────────────────────────────────────────────────┘
```

### 你的专属"画图机器人"能力清单

| 功能 | 说明 |
|------|------|
| 文本生图 | 说一句话，AI 生成图片 |
| 调整参数 | steps（步数）、CFG（风格强度）、seed（随机种子） |
| 固定尺寸 | 512×512 / 768×1024 / 1024×1024 等 |
| 批量生成 | 说"生成 5 张"，一次出多张 |
| 随时随地 | 手机发消息也能控制家里电脑出图 |

---

## 3. 第一次配置（只需做一次）

> ⚠️ **如果你是第一次配置，请严格按照以下步骤操作。**  
> 配置好之后，以后每次用只需要"打开 ComfyUI → 告诉龙虾画什么"。

### 第一步：确认文件已就位

去这个文件夹确认文件存在：

```
C:\Users\charlie\.openclaw\workspace\skills\comfyui-control\
```

里面应该有这些文件：

| 文件 | 作用 |
|------|------|
| `comfy_client.py` | 画图脚本（核心） |
| `gen_cat.py` | 测试脚本（验证配置是否正确） |
| `SKILL.md` | 技能说明 |
| `启动 ComfyUI Server.bat` | ⭐ 启动 ComfyUI 的按钮 |
| `workflows/` | 工作流模板文件夹 |

> 📝 如果找不到这个文件夹，说明还没安装。你需要先把 OpenClaw 和 ComfyUI 装好，参考上一轮对话的操作。

---

### 第二步：安装一个 Python 依赖（一次性）

> **为什么需要这个？**  
> ComfyUI 2024 年之后的版本需要额外安装一个前端组件，否则启动报错。

打开 **PowerShell**（按 `Win + X` → 选择"终端"或"Windows PowerShell"），粘贴以下命令回车：

```powershell
& "C:\Users\charlie\Documents\ComfyUI\.venv\Scripts\python.exe" -m pip install comfyui-frontend-package --no-input
```

看到 `Successfully installed` 即成功。

---

### 第三步：设置 Token（一次性）

> **什么是 Token？**  
> Token = 密码。ComfyUI-OpenClaw 插件出于安全考虑，要求设置一个 Token 才能远程控制。

**操作方法**（双击运行即可）：

```
C:\Users\charlie\.openclaw\workspace\skills\comfyui-control\设置 Token 永久生效.bat
```

运行后显示"✅ 完成"，即表示 Token 已永久写入电脑。

> 🔒 你的 Token：`3KFSyy1VlzZQbb0XPjjgtTTBqJpwEjh3qzbHcTjSsuY`  
> 不要告诉别人！这是控制你电脑的密码。

---

### 第四步：打开 ComfyUI（每次画画前都要做）

**双击这个文件启动 ComfyUI**：

```
C:\Users\charlie\.openclaw\workspace\skills\comfyui-control\启动 ComfyUI Server.bat
```

你会看到一个黑色窗口（命令行），显示 ComfyUI 正在启动。

**等大约 20-30 秒**，直到看到类似这些字：

```
Total VRAM 8192 MB
Device: cuda:0 NVIDIA GeForce RTX 3070
Python version: 3.12.9
ComfyUI version: 0.18.1
```

启动成功后，**不要关闭这个黑色窗口**（最小化即可）。

> 💡 **小技巧**：把这个 bat 文件**固定到任务栏**，以后点击一下就启动。

---

### 第五步：验证是否正常工作

打开浏览器，访问：

```
http://127.0.0.1:8188
```

如果看到 ComfyUI 界面，说明一切正常 ✅

---

## 4. 第一次出图：生成猫咪图（成功案例）

> 🎉 这是我们已经成功测试过的案例，跟着做一定能成功！

### 4.1 确保 ComfyUI 已启动

确认第四步的黑色窗口在运行中。

### 4.2 运行猫咪生成脚本

在 PowerShell 中运行：

```powershell
& "C:\Users\charlie\Documents\ComfyUI\.venv\Scripts\python.exe" "C:\Users\charlie\.openclaw\workspace\skills\comfyui-control\gen_cat.py"
```

### 4.3 等待生成

- ⏱ 预计时间：**1-3 分钟**（取决于你的显卡）
- 黑色窗口会显示进度
- PowerShell 会显示：`[2/4] 等待 ComfyUI 生成图片...` 然后 `✅ 成功！`

### 4.4 查看结果

图片会自动复制到你的桌面：

```
C:\Users\charlie\Desktop\cat_anima.png
```

打开看看！一只可爱的动漫猫咪就在那里 🐱

---

## 5. 更多使用场景

> 💬 **使用方式**：直接告诉 OpenClaw（龙虾）你想画什么，我会帮你调用 ComfyUI

### 5.1 🧑 人物肖像

```
描述：动漫风格少女，银色长发，蓝色眼睛，穿着校服，樱花背景，柔和光线
调整：steps=30, cfg=4, 分辨率=896×1280
```

```
描述：赛博朋克风格的忍者，全身机械装甲，霓虹灯光，黑暗城市背景
调整：steps=30, cfg=4
```

### 5.2 🌅 风景场景

```
描述：未来城市天际线，摩天大楼，霓虹灯光，雨中倒影，赛博朋克风格
调整：steps=25, cfg=4, 分辨率=1024×1024
```

```
描述：宁静的日本乡村，梯田，夕阳，茅草屋顶小屋，远处富士山
调整：steps=30, cfg=4
```

### 5.3 🐱 动物特写

```
描述：机械猎豹，金属外壳，电子发光眼睛，未来风格，细节丰富
调整：steps=30, cfg=4
```

```
描述：一只毛茸茸的小狐狸站在雪地里，冬天，柔和暖色调，动漫风格
调整：steps=25, cfg=4
```

### 5.4 🎮 游戏原画素材

```
描述：RPG 游戏角色立绘，骑士，全身铠甲，剑与盾，背景是战争废墟
调整：steps=30, cfg=4, 分辨率=896×1280
```

```
描述：像素风格游戏场景，16-bit，森林探险，金币和宝箱，夕阳
调整：steps=20, cfg=4
```

### 5.5 🎨 产品概念设计

```
描述：未来电动牙刷产品图，银色金属质感，简洁白色背景，商业摄影风格
调整：steps=25, cfg=4, 分辨率=1024×1024
```

```
描述：极简风格台灯设计稿，木质底座，半透明灯罩，北欧风格
调整：steps=20, cfg=4
```

### 5.6 🌸 头像/壁纸

```
描述：动漫风格头像，粉色头发，花环头饰，柔和粉彩色调，圆形构图
调整：steps=30, cfg=4, 分辨率=1024×1024
```

```
描述：抽象几何风格壁纸，三角形和圆形，深蓝紫色调，8k，简洁大气
调整：steps=20, cfg=4
```

### 5.7 📚 插画/故事板

```
描述：绘本插画风格，小女孩和龙在云端城堡，阳光明媚，宫崎骏风格
调整：steps=30, cfg=4
```

```
描述：科幻小说封面插图，宇宙飞船穿越虫洞，恒星和星云，壮丽宏大
调整：steps=25, cfg=4, 分辨率=1024×1024
```

### 5.8 🎭 风格转换

```
描述：将[你的照片]转换为动漫风格，保留原貌，增加动漫大眼睛和柔和色调
调整：steps=20, cfg=3（低CFG更接近原图）
```

> ⚠️ 图生图需要提供参考图片，告诉龙虾"基于这张图生成动漫风格"即可。

### 5.9 🏠 室内设计灵感

```
描述：极简主义北欧风格客厅，白色沙发，落地窗，大型绿植，自然光
调整：steps=25, cfg=4, 分辨率=1024×768（横版）
```

### 5.10 👗 服装/时装设计

```
描述：高级定制礼服设计稿，渐变紫色，纱质面料，巴黎时装周风格
调整：steps=30, cfg=4, 分辨率=896×1280（竖版）
```

---

## 6. 进阶技巧：参数调整

### 6.1 参数速查表

| 参数 | 默认值 | 调整范围 | 说明 |
|------|--------|---------|------|
| `steps` | 30 | 10-50 | 步数越多越精细，但也越慢 |
| `cfg` | 4.0 | 1-8 | **Anima 模型推荐 2-5**，太高会失真 |
| `seed` | 随机 | 任意整数 | 固定 seed 可以复现相同结果 |
| `width` | 1024 | 512/768/1024 | 图片宽度 |
| `height` | 1024 | 512/768/1024 | 图片高度 |
| `sampler` | er_sde | er_sde/euler/dpm++ | 采样算法，影响风格 |

### 6.2 不同场景的参数建议

**追求速度（快速草稿）**：
```
steps=15, cfg=3.5
```

**平衡质量**：
```
steps=30, cfg=4.0  ← 默认推荐
```

**极致细节**：
```
steps=40, cfg=4.5
```

**更接近 prompt 描述（高 adherence）**：
```
steps=30, cfg=5.5
```

### 6.3 复现相同图片（固定 Seed）

如果看到一张喜欢的图，想要固定结果，可以说：

```
用 seed=12345 生成一只白色猫
```

下次用相同的 seed，就能生成几乎一样的图。

### 6.4 一次生成多张变体

```
生成5张不同的猫，使用不同的随机 seed
```

---

## 7. 常见问题与解决方案

### ❌ 报错：Connection Refused / 无法连接到 127.0.0.1:8188

**原因**：ComfyUI 没有启动

**解决方法**：
1. 双击 `启动 ComfyUI Server.bat`
2. 等 20-30 秒后再试

---

### ❌ 报错：Security Gate FAILED

**原因**：Token 没有设置

**解决方法**：
1. 双击 `设置 Token 永久生效.bat`
2. 重启 ComfyUI（关掉黑色窗口，重新双击启动 bat）

---

### ❌ 生成的图片模糊/全是噪声

**原因**：
- 模型文件损坏
- 显卡驱动问题
- CFG 不适合 Anima

**解决方法**：
1. 降低 CFG 到 3.0 或 3.5
2. 检查 `Documents/ComfyUI/models/unet/anima-preview2.safetensors` 是否存在
3. 更新显卡驱动

---

### ❌ 报错：VAE / CLIP not found

**原因**：ComfyUI 找不到模型文件

**解决方法**：
1. 确认模型文件在 `Documents/ComfyUI/models/` 对应目录下
2. 重启 ComfyUI（让它重新读取模型列表）

---

### ⏱ 生成很慢怎么办？

**加速方法**：
- 降低 `steps` 到 15-20
- 用 `512×512` 而非 `1024×1024`
- 关闭其他占用显卡的程序（游戏、浏览器视频等）

---

### 🖼️ 图片在哪里？

自动保存到：
```
桌面 → cat_anima.png（测试图片）
C:\Users\charlie\AppData\Local\Programs\ComfyUI\resources\ComfyUI\output\（所有生成图片）
```

---

## 8. 你的文件都放在哪里？

### 🔧 配置文件

| 文件 | 路径 |
|------|------|
| ComfyUI 启动脚本 | `workspace/skills/comfyui-control/启动 ComfyUI Server.bat` |
| Token 设置脚本 | `workspace/skills/comfyui-control/设置 Token 永久生效.bat` |
| 核心 Python 脚本 | `workspace/skills/comfyui-control/comfy_client.py` |
| 猫咪生成脚本 | `workspace/skills/comfyui-control/gen_cat.py` |
| Token 密码 | `3KFSyy1VlzZQbb0XPjjgtTTBqJpwEjh3qzbHcTjSsuY` |

### 📂 ComfyUI 文件

| 类型 | 路径 |
|------|------|
| ComfyUI 源码 | `AppData\Local\Programs\ComfyUI\resources\ComfyUI\` |
| 模型文件 | `Documents\ComfyUI\models\` |
| 输出图片 | `AppData\Local\Programs\ComfyUI\resources\ComfyUI\output\` |
| venv Python | `Documents\ComfyUI\.venv\` |

### 🤖 OpenClaw 技能文件

```
C:\Users\charlie\.openclaw\workspace\skills\comfyui-control\
│
├── SKILL.md                  ← 技能说明
├── comfy_client.py           ← API 客户端（核心）
├── gen_cat.py                ← 测试脚本
├── workflows/                ← 工作流模板
│   ├── image_anima_preview.json
│   └── default.json
└── 启动 ComfyUI Server.bat   ← ⭐ 一键启动
```

---

## 🚀 快速开始（总结）

```
第一步（一次性）：设置 Token
  → 双击 "设置 Token 永久生效.bat"

第二步（每次画画前）：启动 ComfyUI
  → 双击 "启动 ComfyUI Server.bat"
  → 等 20-30 秒

第三步：告诉龙虾画什么
  → "画一只可爱的猫"
  → 龙虾自动调用 ComfyUI 生成
  → 图片发给你 / 自动保存到桌面
```

---

## 🎉 恭喜你！

你现在拥有了一个**本地 AI 画图机器人**！

**下一步可以探索**：
- 📕 尝试不同的 prompt 描述
- ⚙️ 调整参数找到你喜欢的风格
- 🖼️ 用你自己的照片做图生图
- 📦 探索其他 ComfyUI 工作流（如 Flux 视频生成）
- 🤖 结合 OpenClaw 的自动化能力做更多事情

---

*🦞 本教程由 OpenClaw 龙虾 + ComfyUI 联合生成*  
*最后更新：2026-03-24*  
*你的 AI 助手：charlie 的私人 OpenClaw*
