/**
 * @Desc: element
 * @Author: wu xingtao
 * @Date: 2023/12/23
 */
// src/utils.js
export function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  for (let key in props) {
    if (props.hasOwnProperty(key)) {
      element[key] = props[key];
    }
  }

  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
}

export function render(element, container) {
  container.innerHTML = '';
  container.appendChild(element);
}
