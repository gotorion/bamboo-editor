import { useMemo, useState } from "react";
import Editor from "react-simple-code-editor";
import "./App.css";
import BgOne from "./assets/bg-1.jpg";
import BgTwo from "./assets/bg-2.jpg";
import BgThree from "./assets/bg-3.jpg";

const FONT_OPTIONS = [
  { label: "Ubuntu", value: "Ubuntu, system-ui, sans-serif" },
  { label: "Fira Code", value: "\"Fira Code\", ui-monospace, SFMono-Regular, monospace" },
  { label: "Roboto", value: "Roboto, system-ui, sans-serif" },
  { label: "Mozilla Text", value: "\"Mozilla Text\", system-ui, sans-serif" },
  { label: "LXGW WenKai", value: "\"LXGW WenKai\", " +
      "\"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", " +
      "system-ui, sans-serif" },
  { label: "Lucide Consola", value: "\"Lucide Consola\", \"Lucida Console\", \"Courier New\", monospace" }
];

const DEFAULT_TEXT = `欢迎使用 Web Notepad\n\n- 支持字体与字号调整\n- 支持亮/暗主题切换\n\n开始记录你的灵感吧！`;

function App() {
  const [content, setContent] = useState(DEFAULT_TEXT);
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0].value);
  const [fontSize, setFontSize] = useState(16);
  const [isDark, setIsDark] = useState(false);

  const backgrounds = useMemo(() => [BgOne, BgTwo, BgThree], []);
  const [bgIndex, setBgIndex] = useState(() => Math.floor(Math.random() * backgrounds.length));

  const backgroundUrl = backgrounds[bgIndex] ?? backgrounds[0];

  return (
    <div
      className={`app ${isDark ? "theme-dark" : "theme-light"}`}
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      data-testid="app-root"
    >
      <div className="editor-shell">
        <header className="topbar">
          <div className="brand">
            <span className="brand-icon" aria-hidden="true">✦</span>
            <span className="brand-title">Modern Notepad</span>
          </div>
          <div className="topbar-actions">
            <button
              className="ghost"
              type="button"
              onClick={() => setBgIndex(Math.floor(Math.random() * backgrounds.length))}
            >
              换一张背景
            </button>
            <button
              className="toggle"
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
            >
              {isDark ? "浅色模式" : "深色模式"}
            </button>
          </div>
        </header>
        <div className="toolbar">
          <div className="toolbar-group">
            <label className="label">
              字体
              <select
                className="select"
                value={fontFamily}
                onChange={(event) => setFontFamily(event.target.value)}
                aria-label="Font family"
              >
                {FONT_OPTIONS.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="label">
              字号
              <input
                className="range"
                type="range"
                min={12}
                max={24}
                value={fontSize}
                onChange={(event) => setFontSize(Number(event.target.value))}
                aria-label="Font size"
              />
              <span className="value">{fontSize}px</span>
            </label>
          </div>
        </div>
        <main className="content">
          <section className="pane">
            <h2 className="pane-title">编辑器</h2>
            <label className="sr-only" htmlFor="editor-textarea">
              Editor
            </label>
            <div
              className="editor-wrapper"
              data-testid="editor-wrapper"
              style={{ fontFamily, fontSize }}
            >
              <Editor
                value={content}
                onValueChange={(value) => setContent(value)}
                highlight={(value) => value}
                padding={16}
                textareaId="editor-textarea"
                textareaClassName="editor-textarea"
                preClassName="editor-pre"
                className="simple-editor"
                style={{ fontFamily, fontSize }}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
