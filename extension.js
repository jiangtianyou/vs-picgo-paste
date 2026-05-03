const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('picgo-paste.uploadImage', async () => {
      try { await uploadAndInsertImage(); }
      catch (err) { vscode.window.showErrorMessage(`PicGo 上传失败: ${err.message}`); }
    }),
    vscode.commands.registerCommand('picgo-paste.formatJson', () => formatJson()),
    vscode.commands.registerCommand('picgo-paste.urlEncode', () => urlEncode()),
    vscode.commands.registerCommand('picgo-paste.urlDecode', () => urlDecode())
  );
}

async function uploadAndInsertImage() {
  const config = vscode.workspace.getConfiguration('picgoPaste');
  const picgoPath = config.get('picgoPath', 'picgo');
  const tempDir = config.get('tempDir') || os.tmpdir();

  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('请先打开一个 Markdown 文件');
    return;
  }

  const ts = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const tempFile = path.join(tempDir, `picgo_${ts}.png`);
  await saveClipboardImageToFile(tempFile);

  await vscode.window.withProgress(
    { location: vscode.ProgressLocation.Notification, title: 'PicGo 上传中...', cancellable: false },
    async () => {
      const imageUrl = await runPicgoUpload(picgoPath, tempFile);

      await editor.edit(editBuilder => {
        const position = editor.selection.active;
        const mdImage = `![image](${imageUrl})`;
        if (editor.selection.isEmpty) {
          editBuilder.insert(position, mdImage);
        } else {
          editBuilder.replace(editor.selection, mdImage);
        }
      });

      vscode.window.showInformationMessage('图片上传成功!');
    }
  );

  fs.unlink(tempFile, () => {});
}

function saveClipboardImageToFile(filePath) {
  return new Promise((resolve, reject) => {
    const psScript = `Add-Type -AssemblyName System.Windows.Forms; Add-Type -AssemblyName System.Drawing; $img = [System.Windows.Forms.Clipboard]::GetImage(); if ($null -eq $img) { exit 1 }; $img.Save('${filePath.replace(/'/g, "''")}', [System.Drawing.Imaging.ImageFormat]::Png); exit 0`;
    const encoded = Buffer.from(psScript, 'utf16le').toString('base64');
    exec(`powershell -NoProfile -NonInteractive -EncodedCommand ${encoded}`, { timeout: 10000, windowsHide: true }, (err) => {
      if (err) {
        reject(new Error('剪贴板中没有图片，请先截图或复制图片'));
        return;
      }
      resolve();
    });
  });
}

function runPicgoUpload(picgoPath, filePath) {
  return new Promise((resolve, reject) => {
    const cmd = `"${picgoPath}" upload "${filePath}"`;
    exec(cmd, { timeout: 60000, shell: 'cmd.exe' }, (err, stdout, stderr) => {
      if (err) {
        reject(new Error(stderr?.trim() || 'picgo 命令执行失败，请确认已安装 PicGo CLI'));
        return;
      }
      const output = (stdout || '') + (stderr || '');
      const match = output.match(/\[PicGo SUCCESS\]:?\s*\r?\n?\s*(https?:\/\/\S+)/);
      if (match) {
        resolve(match[1]);
        return;
      }
      const urlMatch = output.match(/https?:\/\/\S+/);
      if (urlMatch) {
        resolve(urlMatch[0]);
        return;
      }
      reject(new Error(`未能从 picgo 输出中解析到 URL:\n${output}`));
    });
  });
}

function getSelectedText() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) return null;
  return { text: editor.document.getText(editor.selection), editor, selection: editor.selection };
}

function formatJson() {
  const sel = getSelectedText();
  if (!sel) return vscode.window.showWarningMessage('请先选中文本');
  try {
    const obj = JSON.parse(sel.text);
    const formatted = JSON.stringify(obj, null, 2);
    sel.editor.edit(eb => eb.replace(sel.selection, formatted));
  } catch (e) {
    vscode.window.showErrorMessage(`Invalid JSON: ${e.message}`);
  }
}

function urlEncode() {
  const sel = getSelectedText();
  if (!sel) return vscode.window.showWarningMessage('请先选中文本');
  const encoded = encodeURIComponent(sel.text);
  sel.editor.edit(eb => eb.replace(sel.selection, encoded));
}

function urlDecode() {
  const sel = getSelectedText();
  if (!sel) return vscode.window.showWarningMessage('请先选中文本');
  try {
    const decoded = decodeURIComponent(sel.text);
    sel.editor.edit(eb => eb.replace(sel.selection, decoded));
  } catch (e) {
    vscode.window.showErrorMessage(`Invalid URL encoding: ${e.message}`);
  }
}

function deactivate() {}

module.exports = { activate, deactivate };
