export function expendfn({
  list = [],
  id = '',
  isExpend = false // 默认展开/关闭
}) {
  if (list.length === 0) return [];
  let arr = JSON.parse(JSON.stringify(list));
  id === '' && !isExpend && defaultfn(arr, id, isExpend); // 刷新

  // 刷新
  function defaultfn(lists) {
    lists.forEach((x) => {
      x.isExpandBefore = false;
      x.isExpandAfter = false
      if (x.children) defaultfn(x.children);
    });
  }
  return arr;
}
