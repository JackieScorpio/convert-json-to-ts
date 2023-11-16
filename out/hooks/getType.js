"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameScheme = void 0;
const parse_1 = __importDefault(require("json5/lib/parse"));
/**
 * 获取json类型
 * @param jsonString json字符串
 * @param space 自定义缩进
 * @returns typescript类型
 */
function default_1(jsonString, space = " ") {
    const json = (0, parse_1.default)(jsonString);
    const typeArray = [];
    walk(json);
    /**
     * 遍历节点
     * @param node 节点
     * @param propsName 节点名称
     * @param level 当前层级, 用来控制缩进
     */
    function walk(node, propsName, parentType, level = 0) {
        const indent = space.repeat(level);
        // 对象
        if (isObject(node)) {
            if (void 0 === propsName) {
                typeArray.push(`${indent}{`);
            }
            else {
                typeArray.push(`${indent}${propsName}:{`);
            }
            for (let key in node) {
                walk(node[key], key, 'object', level + 1);
            }
            typeArray.push(`${indent}}` + (void 0 === propsName || 'array' === parentType ? '' : ';'));
        }
        // 数组
        else if (isArray(node)) {
            // true就是数组
            // false就是元组
            let isAllSameChildNode = true;
            let prevNode;
            for (let currentNode of node) {
                if (void 0 !== prevNode) {
                    isAllSameChildNode = isSameScheme(prevNode, currentNode);
                    if (!isAllSameChildNode) {
                        break;
                    }
                }
                prevNode = currentNode;
            }
            // 所有元素相同, 数组
            // 结构: xxx[]
            if (isAllSameChildNode) {
                walk(node[0], propsName, 'array', level + 1);
                typeArray.push('[]');
            }
            // 元组
            // 结构: [xxx, yyy]
            else {
                typeArray.push(void 0 !== propsName ? `${propsName}:[` : '[');
                for (let childNode of node) {
                    walk(childNode, void 0, 'array', level + 1);
                    typeArray.push(`,`);
                }
                // 删除尾部","
                typeArray.pop();
                typeArray.push(`]`);
            }
            if (propsName)
                typeArray.push(';');
        }
        // 简单类型
        else {
            const type = typeof node;
            if (void 0 === propsName) {
                typeArray.push(`${indent}${type}`);
            }
            else {
                typeArray.push(`${indent}${propsName}: ${type}` + ('array' === parentType ? '' : ';'));
            }
        }
    }
    const typeString = typeArray.join('');
    return typeString;
    // return prettier.format(typeString, { parser: 'typescript',plugins:[typescriptParser] });
}
exports.default = default_1;
function isObject(node) {
    return '[object Object]' === Object.prototype.toString.call(node);
}
function isArray(node) {
    return '[object Array]' === Object.prototype.toString.call(node);
}
function isSameScheme(input1, input2) {
    const type = [getType(input1), getType(input2)];
    // 类型相同,
    // 继续判断引用类型的值
    if (type[0] === type[1]) {
        if ('object' === type[0]) {
            const obj1 = input1;
            const obj2 = input2;
            const isSameKeysLength = Object.keys(obj1).length === Object.keys(obj2).length;
            // 键值数量不同
            if (!isSameKeysLength)
                return false;
            // 键值数量相同
            // 判断值的类型是否相同
            for (const key in obj1) {
                // 有不同的键值
                if (void 0 === obj2[key]) {
                    return false;
                }
                // 判断值的类型是否相同
                else if (!isSameScheme(obj1[key], obj2[key])) {
                    return false;
                }
            }
            return true;
        }
        else if ('array' === type[0]) {
            const length1 = type[0].length;
            const length2 = type[1].length;
            if (length1 !== length2) {
                return false;
            }
            else {
                const length = Math.max(length1, length2);
                for (let i = 0; i < length; i++) {
                    const isSame = isSameScheme(input1[i], input2[i]);
                    if (!isSame) {
                        return false;
                    }
                }
                return true;
            }
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}
exports.isSameScheme = isSameScheme;
function getType(input) {
    const type = typeof input;
    if ('object' === type) {
        if (isArray(input)) {
            return 'array';
        }
        else if (null === input) {
            return 'null';
        }
        else {
            return 'object';
        }
    }
    else {
        return type;
    }
}
//# sourceMappingURL=getType.js.map