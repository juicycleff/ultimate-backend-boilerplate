'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
var devkit_1 = require('@nrwl/devkit');
var promises_1 = require('fs/promises');
var fs = require('fs');
var path = require('path');
var child_process_1 = require('child_process');
var util_1 = require('util');
function getBuildFilePaths() {
  return __awaiter(this, void 0, void 0, function () {
    var files,
      parentDirectory,
      dirs,
      _i,
      dirs_1,
      dir,
      currentDirectory,
      dirStat,
      curFiles,
      protoFilesPath,
      _a,
      curFiles_1,
      curFile,
      e_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          files = {};
          parentDirectory = path.join(process.cwd(), 'apps');
          return [4 /*yield*/, promises_1.readdir(parentDirectory)];
        case 1:
          dirs = _b.sent();
          (_i = 0), (dirs_1 = dirs);
          _b.label = 2;
        case 2:
          if (!(_i < dirs_1.length)) return [3 /*break*/, 9];
          dir = dirs_1[_i];
          _b.label = 3;
        case 3:
          _b.trys.push([3, 7, , 8]);
          currentDirectory = path.join(parentDirectory, dir, 'src/assets');
          return [4 /*yield*/, promises_1.stat(currentDirectory)];
        case 4:
          dirStat = _b.sent();
          if (!dirStat.isDirectory()) return [3 /*break*/, 6];
          return [4 /*yield*/, promises_1.readdir(currentDirectory)];
        case 5:
          curFiles = _b.sent();
          curFiles = curFiles.filter(function (value) {
            return value.endsWith('.proto');
          });
          protoFilesPath = [];
          for (_a = 0, curFiles_1 = curFiles; _a < curFiles_1.length; _a++) {
            curFile = curFiles_1[_a];
            protoFilesPath.push(path.join(currentDirectory, curFile));
          }
          files[dir] = protoFilesPath;
          _b.label = 6;
        case 6:
          return [3 /*break*/, 8];
        case 7:
          e_1 = _b.sent();
          return [3 /*break*/, 8];
        case 8:
          _i++;
          return [3 /*break*/, 2];
        case 9:
          return [2 /*return*/, files];
      }
    });
  });
}
function writeProtoFile(outputPath, name, filePaths, rewriteProtobufName) {
  return __awaiter(this, void 0, void 0, function () {
    var _i, filePaths_1, fp, destPath, fpArr, namePath, e_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          (_i = 0), (filePaths_1 = filePaths);
          _a.label = 1;
        case 1:
          if (!(_i < filePaths_1.length)) return [3 /*break*/, 6];
          fp = filePaths_1[_i];
          _a.label = 2;
        case 2:
          _a.trys.push([2, 4, , 5]);
          destPath = void 0;
          if (rewriteProtobufName) {
            destPath = path.join(outputPath, name + '.proto');
          } else {
            fpArr = fp.split('/');
            namePath = fpArr[fpArr.length - 1];
            destPath = path.join(outputPath, namePath);
          }
          return [
            4 /*yield*/,
            promises_1.copyFile(fp, destPath, fs.constants.COPYFILE_FICLONE),
          ];
        case 3:
          _a.sent();
          return [3 /*break*/, 5];
        case 4:
          e_2 = _a.sent();
          devkit_1.logger.error(e_2);
          return [3 /*break*/, 5];
        case 5:
          _i++;
          return [3 /*break*/, 1];
        case 6:
          return [2 /*return*/];
      }
    });
  });
}
function generateTSFromProto(inputPath, outputPath) {
  return __awaiter(this, void 0, void 0, function () {
    var src_dir, dest_dir;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          src_dir = inputPath + '/*.proto';
          dest_dir = outputPath;
          return [
            4 /*yield*/,
            util_1.promisify(child_process_1.exec)(
              'protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto --ts_proto_opt=lowerCaseServiceMethods=true,context=false,oneof=unions,useOptionals=true,env=node,returnObservable=false,stringEnums=true,addGrpcMetadata=true,addNestjsRestParameter=true,nestJs=true --ts_proto_out=' +
                dest_dir +
                ' ' +
                src_dir,
            ),
          ];
        case 1:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
}
function generateTSFromProtoWin(inputPath, outputPath) {
  return __awaiter(this, void 0, void 0, function () {
    var src_dir, dest_dir;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          src_dir = inputPath + '/*.proto';
          dest_dir = outputPath;
          return [
            4 /*yield*/,
            util_1.promisify(child_process_1.exec)(
              'protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto.cmd --ts_proto_opt=lowerCaseServiceMethods=true,context=false,oneof=unions,useOptionals=true,env=node,returnObservable=false,stringEnums=true,addGrpcMetadata=true,addNestjsRestParameter=true,nestJs=true --ts_proto_out=' +
                dest_dir +
                ' ' +
                src_dir,
            ),
          ];
        case 1:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
}
function protoScrubExecutor(options, context) {
  return __awaiter(this, void 0, void 0, function () {
    var protoOutputPath, protoFiles, _a, _b, _i, key, tsOutputPath, e_3, e_4;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          protoOutputPath = path.join(options.packagePath, 'src/lib');
          return [4 /*yield*/, getBuildFilePaths()];
        case 1:
          protoFiles = _c.sent();
          _a = [];
          for (_b in protoFiles) _a.push(_b);
          _i = 0;
          _c.label = 2;
        case 2:
          if (!(_i < _a.length)) return [3 /*break*/, 5];
          key = _a[_i];
          return [
            4 /*yield*/,
            writeProtoFile(
              protoOutputPath,
              key,
              protoFiles[key],
              options.rewriteProtobufName,
            ),
          ];
        case 3:
          _c.sent();
          _c.label = 4;
        case 4:
          _i++;
          return [3 /*break*/, 2];
        case 5:
          devkit_1.logger.log('Copied proto files to ' + protoOutputPath);
          tsOutputPath = path.join(options.packagePath, 'src/lib');
          _c.label = 6;
        case 6:
          _c.trys.push([6, 8, , 9]);
          return [
            4 /*yield*/,
            promises_1.mkdir(path.join(tsOutputPath, 'types'), { recursive: true }),
          ];
        case 7:
          _c.sent();
          return [3 /*break*/, 9];
        case 8:
          e_3 = _c.sent();
          return [3 /*break*/, 9];
        case 9:
          _c.trys.push([9, 14, , 15]);
          if (!(options.isWindows && options.isWindows === true))
            return [3 /*break*/, 11];
          return [4 /*yield*/, generateTSFromProtoWin(protoOutputPath, '.')];
        case 10:
          _c.sent();
          return [3 /*break*/, 13];
        case 11:
          return [4 /*yield*/, generateTSFromProto(protoOutputPath, '.')];
        case 12:
          _c.sent();
          _c.label = 13;
        case 13:
          devkit_1.logger.log('Generated typescript files from proto files');
          return [2 /*return*/, { success: true }];
        case 14:
          e_4 = _c.sent();
          devkit_1.logger.error(e_4);
          return [2 /*return*/, { success: false }];
        case 15:
          return [2 /*return*/];
      }
    });
  });
}
exports['default'] = protoScrubExecutor;
