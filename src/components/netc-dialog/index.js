/**
 * @Desc: index
 * @Author: wu xingtao
 * @Date: 2023/12/23
 */
import {createElement,render} from '../../utils/element'


const confirmBox = (
  <div id="confirmBox">
    <h2>确认操作</h2>
    <button id="confirmBtn" onclick={onConfirm}>确定</button>
    <button id="cancelBtn" onclick={onCancel}>取消</button>
  </div>
);

function onConfirm() {
  console.log('用户点击了确认按钮');
  hideConfirmBox();
}

function onCancel() {
  console.log('用户点击了取消按钮');
  hideConfirmBox();
}

function hideConfirmBox() {
  document.getElementById('confirmBox').style.display = 'none';
}

// render(confirmBox, document.getElementById('app'));
render(confirmBox, document.body);

export const openConfirm = ()=>{
  render(confirmBox, document.body);
}
