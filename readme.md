# koishi-plugin-public

[![npm](https://img.shields.io/npm/v/koishi-plugin-public?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-public)

Serve static files. | 公开部署静态文件。

## 使用场景

### 修改 Koishi 控制台的网页图标。

在 `data/public` 目录下放置 `logo.png` 作为图标文件

### 为部署到公网的 Koishi 实例添加 robots.txt 以防止搜索引擎爬取。

在 `data/public` 目录下放置 `robots.txt`，内容如下：

```
User-agent: *
Disallow: /
```

## 配置项

### root

- 类型: `string`
- 默认值: `data/public`

存放文件的根目录。

### path

- 类型: `string`
- 默认值: `/`

部署文件的路径。

## 许可证

使用 [MIT](./LICENSE) 许可证发布。维护良好的开源生态从我做起 (*>ω<)φ

```
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
