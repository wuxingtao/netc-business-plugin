# netc-business-plugin

## 支持自定义jsx createElement识别
```js
// rollup.config.mjs
{
  babel({
    babelHelpers: 'bundled',
    plugins: [['@babel/plugin-transform-react-jsx', {
      'pragma': 'createElement'
    }]],
  }),
}
```

```js
// netc-dialog/index.jsx

const confirmBox = (
  <div id="confirmBox" class="netc-dialog">
    <div class="netc-dialog__header">标题</div>
    <div class="netc-dialog__content">
      <div className="netc-dialog__message">
        如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。
      </div>
    </div>
    <div className="netc-dialog__footer">
      <button id="confirmBtn" onClick={onConfirm}>确定</button>
      <button id="cancelBtn" onClick={onCancel}>取消</button>
    </div>

  </div>
)

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

export const openConfirm = () => {
  render(confirmBox, document.body)
}

export function render(element, container) {
  container.innerHTML = '';
  container.appendChild(element);
}

```
