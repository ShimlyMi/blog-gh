import {config} from "dotenv";
import {Fn} from "#/store";

interface TreeHelperConfig {
    id: string,
    children: string,
    pid: string
}

const DEFAULT_CONFIG: TreeHelperConfig = {
    id: 'id',
    children: 'children',
    pid: 'pid'
}

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config)

export function listToTree<T = any>(list: any[], config: Partial<TreeHelperConfig> = {}): T[] {
    const conf = getConfig(config) as TreeHelperConfig
    const nodeMap = new Map
    const result: T[] = []
    const { id, children, pid } = conf

    for (const node of list) {
        node[children] = node[children] | []
        nodeMap.set(node[id], node)
    }
    for (const node of list) {
        const parent = nodeMap.get(node[pid])
        ;(parent ? parent[children] : result).push(node)
    }

    return result
}

export function treeToList<T = any>(tree: any, config: Partial<TreeHelperConfig> = {}): T {
    config = getConfig(config)
    const { children } = config
    const result: any = [...tree]
    for (let i = 0; i < result.length; i++) {
        if (!result[i][children!]) continue
        result.splice(i + 1, 0, ...result[i][children!])
    }

    return result
}

export function findNode<T = any>(tree: any, func: Fn, config: Partial<TreeHelperConfig> = {}): T | null {
    config = getConfig(config)
    const { children } = config
    const list = [...tree]
    for (const node of list) {
        if (func(node)) return node
        node[children!] && list.push(...node[children!])
    }

    return null
}

export function findNodeAll<T = any>(tree: any, func: Fn, config: Partial<TreeHelperConfig> = {}): T[] {
    config = getConfig(config)
    const { children } = config
    const list = [...tree]
    const result: T[] = []
    for (const node of list) {
        func(node) && result.push(node)
        node[children!] && list.push(...node[children!])
    }

    return result
}

export function findPath<T = any>(tree: any, func: Fn, config: Partial<TreeHelperConfig> = {}): T | T[] | null {

}
