(function (root) {
  function normalizeAbiText(source) {
    if (!source || !source.trim()) {
      throw new Error("请输入从 Chrome DevTools 复制出来的 ABI 数组。");
    }

    const jsonLike = source
      .trim()
      .replace(/\bundefined\b/g, "null")
      .replace(/!0\b/g, "true")
      .replace(/!1\b/g, "false")
      .replace(/([{,]\s*)([A-Za-z_$][\w$]*)(\s*:)/g, '$1"$2"$3')
      .replace(/,\s*([}\]])/g, "$1");

    let abi;
    try {
      abi = JSON.parse(jsonLike);
    } catch (error) {
      throw new Error("无法解析输入内容，请确认粘贴的是完整 ABI 数组。原始错误：" + error.message);
    }

    if (!Array.isArray(abi)) {
      throw new Error("ABI 顶层必须是数组，例如 [{ type: \"function\", ... }]。");
    }

    return JSON.stringify(abi, null, 2);
  }

  root.AbiNormalizer = { normalizeAbiText };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { normalizeAbiText };
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
