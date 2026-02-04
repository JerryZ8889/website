# 东京国际学校咨询 - 个人网站（静态 HTML/CSS/JS）

这是一个**移动端优先**的静态多页面网站模板，适用于“东京华人家长国际学校申请咨询”业务。

## 页面

- `index.html`：首页
- `services.html`：服务与流程
- `guide.html`：学校选择方法（方法论）
- `resources.html`：资料下载
- `about.html`：关于我
- `contact.html`：联系咨询（微信为主）

## 本地打开

直接双击 `index.html` 即可浏览。

如需更接近真实线上环境（例如测试相对路径/缓存），可用任意静态服务器：

- VSCode / Cursor 安装 Live Server 插件
- 或使用 Python（若已安装）：

```bash
python -m http.server 5173
```

然后访问 `http://localhost:5173/`。

## 替换微信二维码

把你的二维码图片（建议 `png`）放到：

- `assets/img/wechat-qr.png`

并保持文件名不变即可（页面与弹窗会自动引用它）。

## 常用修改点

- 站点名称与定位：每个页面 `<title>` 与首页首屏文案
- 微信号/备注格式：`contact.html` 与页脚/弹窗文案
- 服务内容：`services.html`
- 资料下载：`resources.html`（目前为占位链接）

