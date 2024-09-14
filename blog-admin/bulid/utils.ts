import fs from 'fs'
import * as path from "path";
import dotenv from 'dotenv'

export function isDevFn(mode: string): boolean {
  return mode === 'development'
}

export function isProFn(mode: string): boolean {
  return mode === 'production'
}

export function isReportMode(): boolean {
  return process.env.REPORT === 'true'
}


export function wrapperEnv(envConf: Recorda)
