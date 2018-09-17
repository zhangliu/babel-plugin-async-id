const _ = require('lodash')

const ID_NAME = '__CTRIP_ASYNC_ID__'

export default function({types: t }) {
  return {
    visitor: {
      'IfStatement'(path, state) {
        t.ensureBlock(path.node, 'consequent')
      },

      'ForStatement'(path, state) {
        t.ensureBlock(path.node)
      },

      FunctionDeclaration(path, state) {
        const funcName = path.node.id.name
        insertFuncBodyBefore(t, path, funcName)
      },

      FunctionExpression(path, state) {
        const funcName = path.node.id.name
        insertFuncBodyBefore(t, path, funcName) 
      },

      ArrowFunctionExpression(path, state) {
        const funcName = _.get(path, 'container.id.name')
        t.ensureBlock(path.node, 'body')
        if (funcName) insertFuncBodyBefore(t, path, funcName)
      },

      CallExpression(path, state) {
        if (path.parent.type === 'AwaitExpression') return
        const funcName = getFuncName(path)
        if (funcName) insertFuncBefore(t, path, funcName)
      },

      AwaitExpression(path, state) {
        const funcName = path.node.argument.callee.name
        insertFuncBefore(t, path, funcName)
      }
    }
  };
}

const insertFuncBodyBefore = (t, path, funcName) => {
  if (!funcName) return
  const varNode = t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier(`${ID_NAME}`),
    t.identifier(`${funcName}.${ID_NAME}`))]);
  // const constNode = t.variableDeclarator(`${ID_NAME}`, )
  path.get('body').unshiftContainer('body', varNode);
}

const getFuncName = (path) => {
  switch (path.node.callee.type) {
    case 'MemberExpression':
      const objName = _.get(path, 'node.callee.object.name')
      const propName = _.get(path, 'node.callee.property.name')
      return `${objName}.${propName}`
    default:
      return _.get(path, 'node.callee.name')
  }
}

const insertFuncBefore = (t, path, funcName) => {
  if (!funcName) return
  const left = `${funcName}.${ID_NAME}`
  const uuidFunc = getUUIDFunc()
  const right = `${ID_NAME} ? ${ID_NAME} : ${uuidFunc}`
  const callLinePath = getCallLinePath(path)
  if (callLinePath) callLinePath.insertBefore(t.assignmentExpression('=', t.identifier(left), t.identifier(right)))
}

const getUUIDFunc = () => '`${Date.now()}$${Math.random()}`'

const getCallLinePath = (path) => {
  let resultPath = path
  let parentPath = path.parentPath
  while(parentPath) {
    if (['BlockStatement', 'Program'].includes(parentPath.type)) return resultPath
    resultPath = parentPath
    parentPath = parentPath.parentPath
  }
}