module.exports = {
  root: true, //此项是用来告诉eslint找当前配置文件不能往父级查找
  env: {
    node: true //此项指定环境的全局变量，下面的配置指定为node环境
  },
  // 此项是用来配置vue.js风格
  extends: ["plugin:vue/essential", "@vue/typescript"],
  /**
   * "规则名": [规则值, 规则配置]
   * 规则名大全： https://www.jianshu.com/p/bfc7e7329cff
   * 规则值：
   * "off"或者0    //关闭规则关闭
   * "warn"或者1    //在打开的规则作为警告（不影响退出代码）
   * "error"或者2    //把规则作为一个错误（退出代码触发时为1）
   */
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    semi: [2, "always"] //语句强制分号结尾
  },
  parserOptions: {
    //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    parser: "@typescript-eslint/parser"
  }
};
