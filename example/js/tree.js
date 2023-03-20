const data = [
    { id: 2, name: "研发部", parentId: -1 },
    { id: 4, name: "行政人事部", parentId: -1 },
    { id: 6, name: "行政人事部下面的行政", parentId: 4 },
    { id: 7, name: "行政人事部下面的人力资源", parentId: 4 },
    { id: 20, name: "研发下面的产品组", parentId: 2 },
    { id: 21, name: "研发下面的测试组", parentId: 2 },
    { id: 22, name: "研发下面的运维组", parentId: 2 },
    { id: 23, name: "研发下面的前端组", parentId: 2 },
    { id: 24, name: "研发下面的后台组", parentId: 2 },
    { id: 25, name: "研发下面的移动开发组", parentId: 2 },
    { id: 99, name: "移动组下面的组", parentId: 25 },
    { id: 98, name: "移动组下面的组", parentId: 25 },
  ];
// 根据父子关系,格式化数组为树结构
function formatToTree(ary, pid) {
    return ary
      .filter((item) =>
        // 如果没有父id（第一次递归的时候）将所有父级查询出来
        // 这里认为 item.parentId === 1 就是最顶层 需要根据业务调整
        pid === undefined ? item.parentId === -1 : item.parentId === pid
      )
      .map((item) => {
        // 通过父节点ID查询所有子节点
        item.children = formatToTree(ary, item.id);
        return item;
      });
  }



/**
 * @func 查询树里面的指定节点
 * @param tree
 * @param func
 */
const findNode = (tree, func) => {
	for (const node of tree) {
		if (func(node)) return node;
		if (node.children) {
			const res = findNode(node.children, func);
			if (res) return res;
		}
	}
	return null;
};


const treeData =formatToTree(data);
const tragetData = findNode(treeData)