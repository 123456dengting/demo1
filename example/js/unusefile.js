import { OptionsConfig } from "./types";
import {Compilation} from  "webpack";

const fs = require("fs");
const path = require("path");

const glob = require("glob");
const shelljs = require("shelljs");

let num: number = 0;

// 打印日志
const logger = (path = "./logger.log", data: string | object): void => {
  fs.writeFileSync(path, typeof data === "string" ? data : JSON.stringify(data, null, 4));
};

class CleanUnusedFilesPlugin {
  opts: any;

  constructor(options: OptionsConfig) {
    this.opts = options;
  }

  apply(compiler: any) {
    const _this = this;
    compiler.plugin("after-emit", function (compilation: Compilation, done: any) {
      num++;
      if (num === 2 || _this.opts.code === "vue") {
        _this.findUnusedFiles(compilation, _this.opts);
      }
      done();
    });
  }

  /**
   * 获取依赖的文件
   */
  getDependFiles(compilation: Compilation): any {
    let deps: any[] = []
    compilation.fileDependencies.forEach(item => {
      if(item.indexOf("node_modules") === -1){
        deps.push(item)
      }
    })
    return deps;
  }

  /**
   * 获取项目目录所有的文件
   */
  getAllFiles({ pattern, exclude }: { pattern: string; exclude: any }): any {
    return new Promise((resolve, reject) => {
      glob(
        pattern,
        {
          nodir: true,
        },
        (err: any, files: any) => {
          if (err) {
            throw err;
          }
          let out = files.map((item: any) => path.resolve(item));
          out = out.filter((item: any) => {
            if (item.indexOf("node_modules") === -1) {
              if (exclude) {
                let res = true;
                exclude.forEach((exc: string) => {
                  if (item.indexOf(exc) > -1) {
                    res = false;
                  }
                });
                return res;
              } else {
                return true;
              }
            } else {
              return false;
            }
          });
          resolve(out);
        }
      );
    });
  }

  // 排除的文件
  dealExclude(path: string[], unusedList: string[]): string[] {
    return unusedList.filter((item: any) => {
      let res = true;
      if (Array.isArray(path)) {
        path.forEach((pa) => {
          if (item.includes(pa)) {
            res = false;
          }
        });
      } else {
        try {
          res = item.includes(path);
        } catch (error) {
          // eslint-disable-next-line
          console.log("dealExclude-error", error);
          res = true;
        }
      }
      return res;
    });
  }

  // 过滤指定后缀的文件
  filterTargetSrc(srcs: any, targetSuffixs: string[]): string[] {
    if (Array.isArray(srcs)) {
      const result = srcs.filter((item) => {
        const strs = item.split(".");
        const suffix: string = strs[strs.length - 1];
        return targetSuffixs.includes(suffix.toLowerCase());
      });
      return result;
    } else {
      return srcs;
    }
  }

  // 获取未使用的文件
  async findUnusedFiles(compilation: Compilation, config: OptionsConfig = {}) {
    const {
      root = "./src",
      clean = false,
      output = "./unused-files.log",
      suffixs = [],
      exclude = false,
    } = config;
    const pattern = root + "/**/*";
    // 把后缀全部转化为小写
    const targetSuffixs = suffixs.map((item: string) => {
      try {
        return item.toLowerCase();
      } catch (error) {
        return item;
      }
    });

    try {
      // 获取依赖的文件夹
      let allDepFiles = this.getDependFiles(compilation);
      // 过滤需要排除的文件夹
      // allFiles = this.dealExclude(exclude, allDepFiles);
      // 获取所有的文件
      let allFiles = await this.getAllFiles({ pattern, exclude });
      // allFiles = this.dealExclude(exclude, allFiles);

      // 过滤出需要处理的后缀文件
      allDepFiles = this.filterTargetSrc(allDepFiles, targetSuffixs);
      allFiles = this.filterTargetSrc(allFiles, targetSuffixs);

      // allFiles = allFiles.filter((item) => item.indexOf("/node_modules/") === -1 && item.indexOf("next/static") === -1);
      let unUsed = allFiles.filter((item: any) => !~allDepFiles.indexOf(item));
      if (exclude) {
        unUsed = this.dealExclude(exclude, unUsed);
      }
      logger("./logger.allDepFiles.log", allDepFiles);
      logger("./logger.allFiles.log", allFiles);
      if (typeof output === "string") {
        // eslint-disable-next-line
        console.log("remove-list");
        logger(output, unUsed);
      } else if (typeof output === "function") {
        output(unUsed);
      }
      if (clean) {
        unUsed.forEach((file: any) => {
          shelljs.rm(file);
          // eslint-disable-next-line
          console.log(`remove file: ${file}`);
        });
      }
      return unUsed;
    } catch (err) {
      // eslint-disable-next-line
      console.error("findUnusedFiles-error", err);
    }
  }
}

module.exports = CleanUnusedFilesPlugin;
