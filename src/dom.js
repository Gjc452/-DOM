window.dom = {
  //创建节点
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.children[0];
  },
  //新增弟弟
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  //新增哥哥
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  //新增儿子
  append(parent, node) {
    parent.appendChild(node);
  },
  //新增爸爸
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  //删除节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  //删除后来
  empty(node) {
    const { childNodes } = node;
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  //用于读写属性
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  //读写文本内容
  text(node, string) {
    // 适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerHTML = string; //ie
      } else {
        node.textContent = string; //firefox/Chrome
      }
    } else if (arguments === 1) {
      if ("innerText" in node) {
        return node.innerHTML;
      } else {
        return node.textContent;
      }
    }
  },
  //读写HTML内容
  html(node, string) {
    if (arguments === 2) {
      node.innerHTML = string;
    } else if (arguments === 1) {
      return node.innerHTML;
    }
  },
  //修改style
  style(node, name, value) {
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(div,'color')
        return node.style[name];
      } else if (typeof object) {
        //dom.style(div,{color:'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  //添加class
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  //用于添加事件监听
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  //用于删除事件监听
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  //用于获取标签或标签们
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  //用于获取父元素
  parent(node) {
    return node.parentNode;
  },
  //用于获取子元素
  children(node) {
    return node.children;
  },
  //用于获取兄弟姐妹元素
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  //用于获取弟弟
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  //用于获取哥哥
  pervious(node) {
    let x = node.perviousSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  //用于遍历所有节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  //用于获取排放位置
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
