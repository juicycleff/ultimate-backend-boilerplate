import { ExecutorContext, logger } from '@nrwl/devkit';
import { readdir, stat, mkdir, copyFile } from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

export interface ProtoScrubExecutorOptions {
  outputPath: string;
  packagePath: string;
  rewriteProtobufName: boolean;
  isWindows?: boolean;
}

async function getBuildFilePaths(): Promise<Record<string, string[]>> {
  const files: Record<string, string[]> = {};
  const parentDirectory = path.join(process.cwd(), 'apps');
  const dirs = await readdir(parentDirectory);

  for (const dir of dirs) {
    try {
      const currentDirectory = path.join(parentDirectory, dir, 'src/assets');
      const dirStat = await stat(currentDirectory);
      if (dirStat.isDirectory()) {
        let curFiles = await readdir(currentDirectory);
        curFiles = curFiles.filter((value) => value.endsWith('.proto'));

        const protoFilesPath = [];
        for (const curFile of curFiles) {
          protoFilesPath.push(path.join(currentDirectory, curFile));
        }
        files[dir] = protoFilesPath;
      }
    } catch (e) {
      // console.log(e);
    }
  }

  return files;
}

async function writeProtoFile(
  outputPath: string,
  name: string,
  filePaths: string[],
  rewriteProtobufName: boolean,
) {
  for (const fp of filePaths) {
    try {
      let destPath;
      if (rewriteProtobufName) {
        destPath = path.join(outputPath, name + '.proto');
      } else {
        const fpArr = fp.split('/');
        const namePath = fpArr[fpArr.length - 1];
        destPath = path.join(outputPath, namePath);
      }
      await copyFile(fp, destPath, fs.constants.COPYFILE_FICLONE);
    } catch (e) {
      logger.error(e);
    }
  }
}

async function generateTSFromProto(inputPath: string, outputPath: string) {
  const src_dir = `${inputPath}/*.proto`;
  const dest_dir = outputPath;
  await promisify(exec)(
    `protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto --ts_proto_opt=lowerCaseServiceMethods=true,context=false,oneof=unions,useOptionals=true,env=node,returnObservable=false,stringEnums=true,addGrpcMetadata=true,addNestjsRestParameter=true,nestJs=true --ts_proto_out=${dest_dir} ${src_dir}`,
  );
}

async function generateTSFromProtoWin(inputPath: string, outputPath: string) {
  const src_dir = `${inputPath}/*.proto`;
  const dest_dir = outputPath;
  await promisify(exec)(
    `protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto.cmd --ts_proto_opt=lowerCaseServiceMethods=true,context=false,oneof=unions,useOptionals=true,env=node,returnObservable=false,stringEnums=true,addGrpcMetadata=true,addNestjsRestParameter=true,nestJs=true --ts_proto_out=${dest_dir} ${src_dir}`,
  );
}

export default async function protoScrubExecutor(
  options: ProtoScrubExecutorOptions,
  context: ExecutorContext,
) {
  const protoOutputPath = path.join(options.packagePath, 'src/lib');
  const protoFiles = await getBuildFilePaths();
  for (const key in protoFiles) {
    await writeProtoFile(
      protoOutputPath,
      key,
      protoFiles[key],
      options.rewriteProtobufName,
    );
  }
  logger.log(`Copied proto files to ${protoOutputPath}`);

  const tsOutputPath = path.join(options.packagePath, 'src/lib');
  try {
    await mkdir(path.join(tsOutputPath, 'types'), { recursive: true });
  } catch (e) {
    // console.error(e);
  }

  try {
    if (options.isWindows && options.isWindows === true)
      await generateTSFromProtoWin(protoOutputPath, '.');
    else await generateTSFromProto(protoOutputPath, '.');

    logger.log('Generated typescript files from proto files');
    return { success: true };
  } catch (e) {
    logger.error(e);
    return { success: false };
  }
}
