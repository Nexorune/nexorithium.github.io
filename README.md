# Nexorithium

简洁的个人主页，使用原生 HTML / CSS / JavaScript，无第三方运行依赖，无构建步骤。

网站：https://nexorune.github.io/nexorithium.github.io/

## 本地预览

在此目录启动任意静态文件服务器，例如 `python3 -m http.server 8000`，打开 http://localhost:8000 。直接双击 HTML 可查看静态版，但文章数据需要通过 HTTP 加载。

## 内容维护

- `index.html`：个人介绍、项目、关于和联系信息；同时保留真实文章列表的静态回退。
- `writing.json`：文章列表，页面启动后自动读取。更新文章时同步修改静态列表，并更新 `index.html` 的脚本版本和 `main.js` 的文章数据版本，避免旧缓存覆盖新列表。
- `style.css`：排版与移动端样式。
- `main.js`：文章渲染及年份。
- `favicon.svg`：原创字母标记。

### 添加公众号文章

将 `writing.json` 中的占位条目替换为真实文章，或追加记录：

```json
{
  "id": "your-unique-slug",
  "status": "published",
  "title": "替换为真实文章标题",
  "summary": "替换为文章的真实摘要",
  "category": "文章分类",
  "date": "2026-09-15",
  "url": "https://mp.weixin.qq.com/s/真实文章标识"
}
```

以上仅为字段格式示例，不是真实文章。`date` 可以设为 `null`，只支持 HTTPS 原文链接。`status: "placeholder"` 的条目显示为不可点击占位，避免假文章和假链接。添加真实文章后，建议同步修改 `index.html` 的 `writing-list`，供禁用脚本的访问者和搜索引擎读取。

### 添加项目和联系方式

在 `index.html` 的 `projects` 区维护项目卡片。当前展示 7 个公开项目：旅途、情境书签（此刻一页）、紫禁问迹、UI Remix Lab、Feishu Note Organizer、Product Evidence Deconstruction 与本网站。项目说明已按公开仓库 README 核对（2026-10-04）；GitHub 个人介绍仓库不作为作品卡片。在线体验仅使用已核实的公开网址，其余入口链接到项目仓库。联系方式使用已核实的 GitHub 主页。

## GitHub Pages

仓库为 `Nexorune/nexorithium.github.io` 时，在仓库 Settings → Pages 中选择 **Deploy from a branch**，分支 `main`、目录 `/ (root)`。保存后等待 GitHub Pages 发布。本项目已提供 `.nojekyll`，不需要构建工具。

如果以后换域名，请同步更新 `index.html` 中的 canonical、Open Graph、JSON-LD，以及 `robots.txt` 和 `sitemap.xml`。`404.html` 使用 `/nexorithium.github.io/` 项目路径，适用于当前项目站点部署。

## 设计与事实边界

参考 https://siguadht.github.io/ 的克制排版、细分隔线和暖色强调，重新设计了单页结构、双栏 Hero、原创轨道图形和项目卡片；未复制其内容、图片或代码。姓名与 GitHub 信息来自用户及账号核验。AI、产品与独立开发是用户给定的网站定位，不作为已验证工作履历。已收录微信公众号「迭元」的 8 篇文章，标题、日期和原文链接均从公众号页面核对；项目区已展示 7 个公开项目，说明与链接按公开仓库和 README 核对。

## 基础体验

响应式布局、语义化分区、键盘焦点、跳转到正文、减少动态效果偏好、独立 404 页面、canonical、Open Graph、Person 结构化数据、robots.txt 与 sitemap.xml。无远程字体、统计跟踪或第三方资源请求。
